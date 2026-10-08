import { MerklonFooter, MerklonMark } from "@merklon/ui";
import { site } from "@/site";
import "./page.css";

// Placeholder: replace <main> with the site's one idea. Keep the footer.
export default function Home() {
  return (
    <div className="page">
      <main className="page-main">
        <MerklonMark size={40} title="Merklon" />
        <h1 className="page-title">{site.name}</h1>
        <p className="page-tagline">{site.tagline}</p>
      </main>
      <MerklonFooter />
    </div>
  );
}
