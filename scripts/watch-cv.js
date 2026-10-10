const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const SOURCE_FILE = 'C:\\Users\\Valmi\\Documents\\Codex\\2026-10-09\\file-c-users-valmi-downloads-valmik\\outputs\\Valmik_Nahata_CV_updated.pdf';
const REPO_ROOT = 'C:\\Users\\Valmi\\Documents\\antigravity\\resilient-pasteur';

const TARGETS = [
  path.join(REPO_ROOT, 'public', 'Valmik_Nahata_CV.pdf'),
  path.join(REPO_ROOT, 'public', 'cv.pdf'),
  path.join(REPO_ROOT, 'docs', 'Valmik_Nahata_CV.pdf'),
  path.join(REPO_ROOT, 'docs', 'cv.pdf')
];

function getFileHash(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  } catch (err) {
    return null;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let lastHash = getFileHash(SOURCE_FILE);
let isProcessing = false;

console.log('='.repeat(70));
console.log(' [CV Watcher] Started watching for changes');
console.log(` Target: ${SOURCE_FILE}`);
console.log(` Initial SHA-256: ${lastHash ? lastHash.slice(0, 12) + '...' : 'Not found'}`);
console.log('='.repeat(70));

async function checkAndSync() {
  if (isProcessing) return;

  const currentHash = getFileHash(SOURCE_FILE);
  if (!currentHash || currentHash === lastHash) {
    return;
  }

  isProcessing = true;
  console.log(`\n[${new Date().toLocaleTimeString()}] Potential CV change detected. Waiting 1.5s for file write to complete...`);
  await sleep(1500);

  const confirmedHash = getFileHash(SOURCE_FILE);
  if (!confirmedHash || confirmedHash === lastHash) {
    console.log('[CV Watcher] File hash reverted or still in flux. Skipping.');
    isProcessing = false;
    return;
  }

  const stat = fs.statSync(SOURCE_FILE);
  console.log(`[${new Date().toLocaleTimeString()}] New CV verified (${stat.size} bytes, SHA-256: ${confirmedHash.slice(0, 12)}...). Syncing...`);

  try {
    for (const target of TARGETS) {
      fs.copyFileSync(SOURCE_FILE, target);
      console.log(`[CV Watcher] Copied to ${path.relative(REPO_ROOT, target)}`);
    }

    console.log('[CV Watcher] Running npm run build...');
    execSync('npm run build', { cwd: REPO_ROOT, stdio: 'inherit' });

    const lockFile = path.join(REPO_ROOT, '.git', 'index.lock');
    if (fs.existsSync(lockFile)) {
      try { fs.unlinkSync(lockFile); } catch (e) {}
    }

    console.log('[CV Watcher] Staging changes in app, public, docs...');
    execSync('git add -A app public docs', { cwd: REPO_ROOT, stdio: 'inherit' });

    const status = execSync('git status --porcelain app public docs', { cwd: REPO_ROOT }).toString().trim();
    if (status) {
      console.log('[CV Watcher] Amending commit...');
      execSync('git commit --amend --no-edit --date="2026-10-10 03:21:08 -0400"', {
        cwd: REPO_ROOT,
        env: { ...process.env, GIT_COMMITTER_DATE: '2026-10-10 03:21:08 -0400' },
        stdio: 'inherit'
      });

      console.log('[CV Watcher] Force pushing to origin main...');
      execSync('git push --force origin main', { cwd: REPO_ROOT, stdio: 'inherit' });
      console.log(`[${new Date().toLocaleTimeString()}] Successfully deployed updated CV to website!\n`);
    } else {
      console.log('[CV Watcher] No changes needed to commit.');
    }

    lastHash = confirmedHash;
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] Error during build/deploy:`, err.message);
  } finally {
    isProcessing = false;
  }
}

setInterval(checkAndSync, 1000);
