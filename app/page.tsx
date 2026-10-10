"use client";

import { useState, useEffect } from "react";
import LinkPreview from "./components/LinkPreview";
import EstClockHeader from "./components/EstClockHeader";
import ImageLightbox, { LightboxImage } from "./components/ImageLightbox";
import PolaroidGallery from "./components/PolaroidGallery";

const ESSAY_PHOTOS: LightboxImage[] = [
  {
    src: "/images/gallery/nyc-subway.jpg",
    alt: "NYC Subway",
    caption: "",
  },
];

export default function Home() {
  // Eagerly prefetch and decode photo immediately on site start
  useEffect(() => {
    ESSAY_PHOTOS.forEach((photo) => {
      const img = new Image();
      img.src = photo.src;
    });
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "transparent", color: "#000000" }}>
      <section className="section-essay">
        <div style={{ fontSize: "18px", lineHeight: 1.9, color: "#1a1a1a", fontFamily: "'Crimson Text', serif" }}>
          <EstClockHeader
            rightContent={
              <>
                <div className="social-links">
                  <a href="mailto:vnahata@mgh.harvard.edu" style={{ textDecoration: "none", color: "#1a1a1a" }} title="Email">
                    {/* @ts-ignore */}
                    <iconify-icon icon="lucide:mail" width="18" height="18" style={{ display: "block", color: "#1a1a1a" }}></iconify-icon>
                  </a>
                  <LinkPreview href="https://scholar.google.com/citations?user=nv1ym54AAAAJ" domain="scholar.google.com" title="Google Scholar" linkStyle={{ textDecoration: "none", color: "#1a1a1a" }}>
                    {/* @ts-ignore */}
                    <iconify-icon icon="simple-icons:googlescholar" width="18" height="18" style={{ display: "block", color: "#1a1a1a" }}></iconify-icon>
                  </LinkPreview>
                  <LinkPreview href="https://linkedin.com/in/valmiknahata" domain="linkedin.com" title="LinkedIn" linkStyle={{ textDecoration: "none", color: "#1a1a1a" }}>
                    {/* @ts-ignore */}
                    <iconify-icon icon="simple-icons:linkedin" width="18" height="18" style={{ display: "block", color: "#1a1a1a" }}></iconify-icon>
                  </LinkPreview>
                  <LinkPreview href="https://github.com/nahatav" domain="github.com" title="GitHub" linkStyle={{ textDecoration: "none", color: "#1a1a1a" }}>
                    {/* @ts-ignore */}
                    <iconify-icon icon="simple-icons:github" width="18" height="18" style={{ display: "block", color: "#1a1a1a" }}></iconify-icon>
                  </LinkPreview>
                  <LinkPreview href="https://x.com/valmiknahata" domain="x.com" title="X" linkStyle={{ textDecoration: "none", color: "#1a1a1a" }}>
                    {/* @ts-ignore */}
                    <iconify-icon icon="simple-icons:x" width="18" height="18" style={{ display: "block", color: "#1a1a1a" }}></iconify-icon>
                  </LinkPreview>
                </div>
                <div className="header-cv-link">
                  <LinkPreview
                    href="/Valmik_Nahata_CV.pdf#zoom=90"
                    domain="valnahata.me"
                    target="_blank"
                    linkStyle={{ textDecoration: "none", color: "#8C651E" }}
                  >
                    Click here for CV (pdf)
                  </LinkPreview>
                </div>
              </>
            }
          />

          <p className="bio" style={{ margin: "0 0 1.9em 0" }}>
            I’m Valmik Nahata, though most people know me as Val. I work across Medical AI, AI Safety &amp; Governance, and AI Evaluations &amp; Scientific Computing, with the overarching goal of building foundation models and evaluation frameworks that generalize and democratize science for advancing humanity.
          </p>

          {/* Personal Essay with Authentic Lee Robinson Style Polaroid Galleries */}
          <div>
            {/* Section 1 · NYC */}
            <p style={{ margin: "0 0 1.4em 0" }}>
              I’m from New Jersey, born in New York, and (debatably) a New Yorker at heart. My proof lies in my ability to support New York teams when we’re winning. To those that don’t know me, I live vicariously through humor, and to those that do, why are you reading this?
            </p>

            <PolaroidGallery
              photos={ESSAY_PHOTOS}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
