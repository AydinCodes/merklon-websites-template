import { Button, MerklonFooter, MerklonMark } from "@merklon/ui";
import "./page.css";

export default function NotFound() {
  return (
    <div className="page">
      <main className="page-main">
        <MerklonMark size={32} />
        <p className="page-tagline" aria-hidden="true" style={{ letterSpacing: "0.2em", fontSize: 15 }}>
          404
        </p>
        <h1 className="page-title" style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)" }}>
          Nothing lives here.
        </h1>
        <p className="page-tagline">The link may be old or mistyped.</p>
        <Button asChild style={{ marginTop: 8 }}>
          <a href="/">Back to the start</a>
        </Button>
      </main>
      <MerklonFooter />
    </div>
  );
}
