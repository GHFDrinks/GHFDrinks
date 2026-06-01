"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { ImageReveal } from "@/components/experience/ImageReveal";

export function BrandStory({ brand }: { brand: Brand }) {
  return (
    <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div className="order-2 lg:order-1 space-y-8">
        <RevealAnimation direction="up" delay={0.2}>
          <h2 className="text-sm uppercase tracking-widest text-accent font-medium mb-4">
            The Story
          </h2>
          <h3 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
            {brand.story.title}
          </h3>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.4}>
          <p className="text-xl text-white/70 font-light leading-relaxed">
            {brand.story.description}
          </p>
        </RevealAnimation>

        {brand.story.founders && (
          <RevealAnimation direction="up" delay={0.6}>
            <div className="pt-8 border-t border-white/10 mt-8">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Founded By
              </p>
              <p className="text-2xl font-serif italic text-white/90">
                {brand.story.founders.join(" & ")}
              </p>
            </div>
          </RevealAnimation>
        )}
      </div>

      <div className="order-1 lg:order-2 h-[600px] lg:h-[800px] w-full">
        {brand.story.image && (
          <ImageReveal
            src={brand.story.image.url}
            alt={brand.story.image.alt}
            className="w-full h-full rounded-[2rem]"
          />
        )}
      </div>
    </section>
  );
}
