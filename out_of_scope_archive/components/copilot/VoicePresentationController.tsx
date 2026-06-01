"use client";

import React, { useEffect, useState } from "react";
import { Mic, MicOff, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoicePresentationControllerProps {
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onExit: () => void;
  isActive: boolean;
  onToggle: () => void;
}

export function VoicePresentationController({
  onNextSlide,
  onPrevSlide,
  onExit,
  isActive,
  onToggle
}: VoicePresentationControllerProps) {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      // Auto-restart if it's supposed to be active (prevents timeout drop-offs)
      if (isActive) {
        try { recognition.start(); } catch (e) {}
      } else {
        setIsListening(false);
      }
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase().trim();
      
      setLastCommand(transcript);

      if (transcript.includes("next slide") || transcript.includes("move forward") || transcript.includes("continue")) {
        onNextSlide();
      } else if (transcript.includes("previous slide") || transcript.includes("go back")) {
        onPrevSlide();
      } else if (transcript.includes("end presentation") || transcript.includes("exit")) {
        onExit();
      }
      
      setTimeout(() => setLastCommand(null), 3000);
    };

    if (isActive) {
      try { recognition.start(); } catch (e) {}
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isActive, onNextSlide, onPrevSlide, onExit]);

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    return null; // Not supported
  }

  return (
    <div className="fixed top-8 right-8 z-[60] flex flex-col items-end pointer-events-none">
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all pointer-events-auto",
          isActive 
            ? "bg-accent/20 border-accent/50 text-accent shadow-[0_0_20px_rgba(var(--accent),0.3)]" 
            : "bg-black/40 border-white/10 text-white/50 hover:bg-white/10"
        )}
      >
        {isActive ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
      </button>

      {lastCommand && (
        <div className="mt-4 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white/80 animate-in fade-in slide-in-from-top-4 flex items-center space-x-2">
          <Command className="w-3 h-3 text-accent" />
          <span>Heard: "{lastCommand}"</span>
        </div>
      )}
    </div>
  );
}
