"use client";

import { useEffect } from "react";

export default function CVPage() {
  useEffect(() => {
    window.location.replace("/Valmik_Nahata_CV.pdf#zoom=90");
  }, []);

  return (
    <div style={{ padding: "40px 20px", fontFamily: "'Crimson Text', serif", fontSize: "18px", color: "#1a1a1a" }}>
      <p>
        Opening CV... If it does not load automatically,{" "}
        <a href="/Valmik_Nahata_CV.pdf#zoom=90" target="_blank" rel="noopener noreferrer" style={{ color: "#8C651E" }}>
          click here to view the PDF
        </a>.
      </p>
    </div>
  );
}
