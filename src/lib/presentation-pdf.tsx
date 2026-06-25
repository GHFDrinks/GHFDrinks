import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React from "react";
import { createRoot } from "react-dom/client";
import { Presentation } from "@/types/presentation";
import { Brand } from "@/types/brand";
import { BrandIntroSlide } from "@/components/brand/BrandIntroSlide";
import { BrandActivationSlide } from "@/components/brand/BrandActivationSlide";

export async function generatePresentationPdf(presentation: Presentation, availableBrands: Brand[]) {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1024, 768]
  });

  // Resolve target brands
  const selectedBrands = presentation.brands
    .map((brandId) => availableBrands.find((b) => b.id === brandId))
    .filter(Boolean) as Brand[];

  // Define the ordered slide list
  const slidesToRender: { brand: Brand; type: "intro" | "activation" }[] = [];
  
  if (presentation.slides && presentation.slides.length > 0) {
    presentation.slides.forEach((slide) => {
      const brand = selectedBrands.find((b) => b.id === slide.brandId);
      if (brand) {
        if (slide.type === "intro") {
          slidesToRender.push({ brand, type: "intro" });
        } else if (slide.type === "activation" && brand.activations && brand.activations.length > 0) {
          slidesToRender.push({ brand, type: "activation" });
        }
      }
    });
  } else {
    selectedBrands.forEach((brand) => {
      slidesToRender.push({ brand, type: "intro" });
      if (brand.activations && brand.activations.length > 0) {
        slidesToRender.push({ brand, type: "activation" });
      }
    });
  }

  if (slidesToRender.length === 0) return;

  // Create absolute offscreen container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "1024px";
  container.style.height = "768px";
  container.style.zIndex = "-99999";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.style.backgroundColor = "#faf8f3"; // Pearl background — kept as literal hex because html2canvas does not reliably resolve CSS vars on cloned DOM
  container.className = "ghf-pdf-render-container";
  document.body.appendChild(container);

  const root = createRoot(container);

  try {
    for (let i = 0; i < slidesToRender.length; i++) {
      const slide = slidesToRender[i];
      
      // Render slide inside root
      await new Promise<void>((resolve) => {
        if (slide.type === "intro") {
          root.render(<BrandIntroSlide brand={slide.brand} />);
        } else {
          root.render(<BrandActivationSlide brand={slide.brand} />);
        }
        // Wait for rendering pass
        setTimeout(resolve, 800);
      });

      // Wait for image tags to complete loading
      const images = Array.from(container.querySelectorAll("img"));
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        })
      );

      // Additional layout stabilization
      await new Promise((res) => setTimeout(res, 200));

      // Capture screen canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#faf8f3", // Pearl background — kept as literal hex because html2canvas does not reliably resolve CSS vars on cloned DOM
        width: 1024,
        height: 768
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      if (i > 0) {
        pdf.addPage([1024, 768], "landscape");
      }
      pdf.addImage(imgData, "JPEG", 0, 0, 1024, 768);
    }

    pdf.save(`${presentation.name || "GHF-Presentation"}.pdf`);
  } catch (err) {
    console.error("PDF Generation error:", err);
    throw err;
  } finally {
    // Cleanup container from DOM
    root.unmount();
    document.body.removeChild(container);
  }
}
