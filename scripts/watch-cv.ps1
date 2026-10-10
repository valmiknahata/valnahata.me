$source = "C:\Users\Valmi\Documents\Codex\2026-10-09\file-c-users-valmi-downloads-valmik\outputs\Valmik_Nahata_CV_updated.pdf"
$repo = "C:\Users\Valmi\Documents\antigravity\resilient-pasteur"

Write-Host "======================================================================"
Write-Host " [CV Watcher] Watching for changes to: $source"
Write-Host "======================================================================"

node "$repo\scripts\watch-cv.js"
