import { jsPDF } from "jspdf";
// html-to-image renders Tailwind v4 / modern CSS reliably. We also avoid the
// interactive slide components here (they use router/context hooks that throw in
// a detached render) and build self-contained static slides with inline styles.
import * as htmlToImage from "html-to-image";
import { Presentation } from "@/types/presentation";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

const PAGE_W = 1280;
const PAGE_H = 720;

const PEARL = "#faf8f3";
const IVY = "#0a1410";
const SAGE = "#7a8f7a";
const MUTED = "#6b6f6a";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function esc(s: string | undefined | null): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function introHTML(brand: Brand): string {
  const imgs = getBrandImages(brand.slug);
  const hero = imgs?.hero || imgs?.lifestyle?.[0] || brand.heroImage?.url || "";
  const desc = brand.story?.description || brand.tagline || "";
  return `
  <div style="width:${PAGE_W}px;height:${PAGE_H}px;display:flex;background:${PEARL};font-family:${FONT};box-sizing:border-box;">
    <div style="width:50%;height:100%;padding:72px 64px;display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;">
      <div style="font-size:12px;letter-spacing:0.35em;text-transform:uppercase;color:${SAGE};font-weight:700;margin-bottom:20px;">${esc(brand.category)} Presentation</div>
      <div style="font-size:68px;font-weight:300;color:${IVY};line-height:1.05;margin-bottom:18px;letter-spacing:-0.02em;">${esc(brand.name)}</div>
      <div style="font-size:22px;font-style:italic;color:${IVY};margin-bottom:24px;">${brand.tagline ? "&ldquo;" + esc(brand.tagline) + "&rdquo;" : ""}</div>
      <div style="font-size:14px;color:${MUTED};line-height:1.7;max-width:460px;">${esc(desc)}</div>
    </div>
    <div style="width:50%;height:100%;background:#e8e6df;overflow:hidden;">
      ${hero ? `<img src="${esc(hero)}" style="width:100%;height:100%;object-fit:cover;display:block;" />` : ""}
    </div>
  </div>`;
}

function activationHTML(brand: Brand): string {
  const acts = (brand.activations || []).slice(0, 2);
  const cards = acts
    .map(
      (a) => `
    <div style="flex:1;background:#ffffff;border:1px solid #e2e0d8;border-radius:16px;padding:28px;box-sizing:border-box;">
      <div style="font-size:22px;font-weight:400;color:${IVY};margin-bottom:12px;">${esc(a.title)}</div>
      <div style="font-size:13px;color:${MUTED};line-height:1.6;">${esc(a.description)}</div>
    </div>`
    )
    .join("");
  return `
  <div style="width:${PAGE_W}px;height:${PAGE_H}px;background:${PEARL};font-family:${FONT};padding:64px;box-sizing:border-box;display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e0d8;padding-bottom:16px;margin-bottom:40px;">
      <div style="font-size:12px;letter-spacing:0.35em;text-transform:uppercase;color:${SAGE};font-weight:700;">Activations</div>
      <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};">${esc(brand.name)}</div>
    </div>
    <div style="flex:1;display:flex;gap:32px;align-items:stretch;">
      ${cards || `<div style="margin:auto;color:${MUTED};font-size:16px;">More activations coming soon</div>`}
    </div>
  </div>`;
}

export async function generatePresentationPdf(presentation: Presentation, availableBrands: Brand[]) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [PAGE_W, PAGE_H] });

  const selectedBrands = presentation.brands
    .map((brandId) => availableBrands.find((b) => b.id === brandId))
    .filter(Boolean) as Brand[];

  // Ordered slide list
  const slides: { brand: Brand; type: "intro" | "activation" }[] = [];
  if (presentation.slides && presentation.slides.length > 0) {
    presentation.slides.forEach((slide) => {
      const brand = selectedBrands.find((b) => b.id === slide.brandId);
      if (brand) {
        if (slide.type === "intro") slides.push({ brand, type: "intro" });
        else if (slide.type === "activation" && brand.activations && brand.activations.length > 0) {
          slides.push({ brand, type: "activation" });
        }
      }
    });
  }
  if (slides.length === 0) {
    selectedBrands.forEach((brand) => {
      slides.push({ brand, type: "intro" });
      if (brand.activations && brand.activations.length > 0) slides.push({ brand, type: "activation" });
    });
  }
  if (slides.length === 0) return;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = `${PAGE_W}px`;
  container.style.height = `${PAGE_H}px`;
  container.style.zIndex = "-99999";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.style.background = PEARL;
  document.body.appendChild(container);

  try {
    for (let i = 0; i < slides.length; i++) {
      const s = slides[i];
      container.innerHTML = s.type === "intro" ? introHTML(s.brand) : activationHTML(s.brand);

      // Wait for images to finish loading before capture.
      const imgEls = Array.from(container.querySelectorAll("img"));
      await Promise.all(
        imgEls.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              })
        )
      );
      await new Promise((res) => setTimeout(res, 150));

      const imgData = await htmlToImage.toJpeg(container, {
        quality: 0.95,
        pixelRatio: 2,
        width: PAGE_W,
        height: PAGE_H,
        backgroundColor: PEARL,
        cacheBust: true,
      });

      if (i > 0) pdf.addPage([PAGE_W, PAGE_H], "landscape");
      pdf.addImage(imgData, "JPEG", 0, 0, PAGE_W, PAGE_H);
    }

    pdf.save(`${presentation.name || "GHF-Presentation"}.pdf`);
  } catch (err) {
    console.error("PDF Generation error:", err);
    throw err;
  } finally {
    document.body.removeChild(container);
  }
}
