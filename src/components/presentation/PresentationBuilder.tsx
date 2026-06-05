"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { mockBrands } from "@/data/brands";
import { Brand } from "@/types/brand";
import { SlideType, PRESENTATION_TEMPLATES } from "@/types/presentation";
import { usePresentationStore } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { GripVertical, X, Check, Save, Play, Plus, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { getBrandImages } from "@/lib/brand-images";

// Sortable Brand Item Component
function SortableBrandItem({ brand, onRemove }: { brand: Brand, onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: brand.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-2xl p-4 group">
      <button {...attributes} {...listeners} className="cursor-grab text-white/30 hover:text-white transition-colors">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
        <img src={brand.heroImage.url || getBrandImages(brand.slug)?.hero || ""} alt={brand.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{brand.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{brand.category}</p>
      </div>
      <button onClick={onRemove} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function PresentationBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { savePresentation } = usePresentationStore();
  const { brands } = useBrands();
  
  const [name, setName] = useState("Untitled Presentation");
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const templateId = searchParams?.get("template");
    if (templateId) {
      const template = PRESENTATION_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setName(template.name);
        const resolvedBrands = template.brandSlugs
          .map(slug => brands.find(b => b.slug === slug) || mockBrands.find(b => b.slug === slug))
          .filter(Boolean) as Brand[];
        setSelectedBrands(resolvedBrands);
      }
    }
  }, [searchParams, brands]);

  const toggleBrand = (brand: Brand) => {
    if (selectedBrands.find(b => b.id === brand.id)) {
      setSelectedBrands(selectedBrands.filter(b => b.id !== brand.id));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedBrands((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const generatePresentation = () => {
    const id = uuidv4();
    
    // Auto-generate slides based on brand capabilities
    const slides = selectedBrands.flatMap(brand => {
      const brandSlides = [
        { id: `s_${brand.id}_intro`, brandId: brand.id, type: "intro" as SlideType }
      ];
      if (brand.variants.length > 0) {
        brandSlides.push({ id: `s_${brand.id}_tasting`, brandId: brand.id, type: "tasting" as SlideType });
      }
      if (brand.activations.length > 0) {
        brandSlides.push({ id: `s_${brand.id}_act`, brandId: brand.id, type: "activation" as SlideType });
      }
      if (brand.supportPackages.length > 0) {
        brandSlides.push({ id: `s_${brand.id}_sup`, brandId: brand.id, type: "support" as SlideType });
      }
      return brandSlides;
    });

    savePresentation({
      id,
      name,
      dateCreated: new Date().toISOString(),
      brands: selectedBrands.map(b => b.id),
      slides
    });

    return id;
  };

  const handleSave = () => {
    if (selectedBrands.length === 0) return;
    generatePresentation();
    router.push("/presentations");
  };

  const handlePresent = () => {
    if (selectedBrands.length === 0) return;
    const id = generatePresentation();
    router.push(`/present-mode/${id}`);
  };

  const availableBrandsSource = brands.length > 0 ? brands : mockBrands;
  const filteredAvailableBrands = availableBrandsSource.filter(b => 
    !selectedBrands.find(sb => sb.id === b.id) &&
    (b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-full bg-background">
      {/* Left Sidebar - Brand Selection & Ordering */}
      <div className="w-[400px] border-r border-white/5 flex flex-col bg-white/[0.01]">
        <div className="p-6 border-b border-white/5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent text-2xl font-light focus:outline-none placeholder:text-white/30"
            placeholder="Presentation Name"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          {/* Selected Brands Sequence */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Presentation Sequence</h3>
            {selectedBrands.length === 0 ? (
              <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center text-white/40 text-sm">
                Select brands from the library to build your sequence.
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={selectedBrands.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {selectedBrands.map(brand => (
                      <SortableBrandItem 
                        key={brand.id} 
                        brand={brand} 
                        onRemove={() => toggleBrand(brand)} 
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>

          <div className="border-t border-white/10" />

          {/* Available Brand Library */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Brand Library</h3>
            </div>
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors mb-4"
            />
            
            <div className="space-y-2">
              {filteredAvailableBrands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => toggleBrand(brand)}
                  className="w-full flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 mr-4">
                    <img src={brand.heroImage.url || getBrandImages(brand.slug)?.hero || ""} alt={brand.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{brand.name}</div>
                    <div className="text-xs text-muted-foreground">{brand.category}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              ))}
              {filteredAvailableBrands.length === 0 && (
                <div className="text-center p-4 text-sm text-white/40">No brands found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Builder Actions */}
        <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex space-x-3">
            <button 
              onClick={handleSave}
              disabled={selectedBrands.length === 0}
              className="flex-1 py-3 rounded-full border border-white/20 flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button 
              onClick={handlePresent}
              disabled={selectedBrands.length === 0}
              className="flex-1 py-3 rounded-full bg-accent text-accent-foreground font-medium flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Present</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Canvas - Preview */}
      <div className="flex-1 bg-black p-8 lg:p-12 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Presentation Preview</h2>
          </div>
          
          {selectedBrands.length === 0 ? (
            <div className="aspect-video rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-white/30">
              <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
              <p>Add brands to preview slides</p>
            </div>
          ) : (
            <div className="space-y-12">
              {selectedBrands.map((brand, bIdx) => (
                <div key={brand.id} className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-widest text-accent font-medium">{brand.name} Sequence</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  
                  {/* Mock Slide Preview Cards */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Intro Slide */}
                    <div className="aspect-video rounded-2xl border border-white/10 overflow-hidden relative group bg-black">
                      <img src={brand.heroImage.url || getBrandImages(brand.slug)?.hero || ""} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <h3 className="text-2xl font-light uppercase tracking-widest">{brand.name}</h3>
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase font-medium">Intro Slide</div>
                    </div>

                    {/* Tasting Slide */}
                    {brand.variants.length > 0 && (
                      <div className="aspect-video rounded-2xl border border-white/10 overflow-hidden relative group bg-[#0a0a0a] p-6 flex flex-col justify-center">
                        <h4 className="text-sm text-white/50 uppercase tracking-widest mb-4">The Collection</h4>
                        <div className="flex space-x-4">
                          {brand.variants.map(v => (
                            <div key={v.id} className="w-12 h-20 bg-white/5 rounded-lg flex items-center justify-center p-2">
                              <img src={v.image.url || getBrandImages(brand.slug)?.variants?.[brand.variants.indexOf(v)] || ""} className="max-h-full object-contain" alt="" />
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] uppercase font-medium">Tasting & Variants</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
