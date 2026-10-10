import Link from "next/link";
import EstClockHeader from "../components/EstClockHeader";

export default function SurgicalVideoModelsPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "transparent", color: "#000000" }}>
      <section className="section-essay">
        <div style={{ fontSize: "18px", lineHeight: 1.9, color: "#1a1a1a", fontFamily: "'Crimson Text', serif" }}>
          <EstClockHeader
            leftContent={
              <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>
                &larr; Home
              </Link>
            }
          />

          <p style={{ margin: "0 0 0.5em 0", fontWeight: "bold", fontSize: "20px" }}>
            Inference Time Adaptation of a Surgical Video Language Model
          </p>

          <p style={{ margin: "0 0 1.5em 0", color: "#444", fontSize: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span>A challenge expo on adapting surgical video models to MedVidBench.</span>
            <a
              href="https://valnahata.me/surgical-video-models.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "#1f4e8c",
                textDecoration: "underline",
                fontSize: "15px",
              }}
            >
              Open PDF in new tab ↗
            </a>
          </p>

          <div
            style={{
              width: "100%",
              height: "clamp(550px, 80vh, 900px)",
              minHeight: "450px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
              background: "#525659",
              margin: "0 0 2em 0",
            }}
          >
            <object
              data="/surgical-video-models.pdf#navpanes=0&pagemode=none&view=FitH"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            >
              <iframe
                src="/surgical-video-models.pdf#navpanes=0&pagemode=none&view=FitH"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Inference Time Adaptation of a Surgical Video Language Model"
              >
                <div style={{ padding: "30px", background: "#fff", color: "#1a1a1a" }}>
                  <p>Your browser does not support embedded PDF viewing.</p>
                  <p>
                    <a href="/surgical-video-models.pdf" target="_blank" rel="noopener noreferrer">
                      Click here to download or view the PDF
                    </a>.
                  </p>
                </div>
              </iframe>
            </object>
          </div>


        </div>
      </section>
    </div>
  );
}
