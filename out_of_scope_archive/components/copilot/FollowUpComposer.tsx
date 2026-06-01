"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Bot, Copy, CheckCircle2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FollowUpComposer() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [emailContent, setEmailContent] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setEmailContent(`Hi James,

Thank you for your time this afternoon at the Ritz. It was fantastic to hear about your summer terrace plans and your focus on sustainable luxury.

As discussed, I've put together a bespoke portal for you containing the Maison Mirabeau and Everleaf assets we went through, including the specific pricing structures for the botanical masterclass activation.

You can access your customized portfolio here:
[Insert Secure Portal Link]

I believe the Mirabeau B-Corp narrative aligns perfectly with your new sustainability mandate, and I'd love to jump on a quick call next week to finalize the September menu takeover.

Best regards,
Sarah`);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black border border-white/10 rounded-[2rem] overflow-hidden max-w-4xl mx-auto shadow-2xl flex flex-col">
      <div className="p-8 border-b border-white/5 bg-accent/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-wide">AI Follow-Up Intelligence</h2>
            <p className="text-sm text-white/50">Synthesize presentation logs into personalized client emails.</p>
          </div>
        </div>
        
        {!hasGenerated && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium flex items-center space-x-2 disabled:opacity-50 hover:bg-white transition-colors"
          >
            {isGenerating ? (
              <span className="animate-pulse">Synthesizing...</span>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Follow-Up</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/40 font-medium mb-3">Context Sources</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-sm">Presentation Log (Ritz)</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3">
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-sm">Copilot Insights</span>
              </div>
            </div>
          </div>
          
          {hasGenerated && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-accent/10 border border-accent/20 rounded-2xl"
            >
              <h3 className="text-sm font-medium text-accent mb-2">Suggested Next Actions</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Create Shared Portal</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Set 1-week reminder call</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-2">
          {hasGenerated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-white/70">Draft Email</h3>
                <button 
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-xs font-medium text-accent hover:text-white transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy to Clipboard"}</span>
                </button>
              </div>
              <textarea 
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full flex-1 min-h-[300px] bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white/90 leading-relaxed focus:outline-none focus:border-accent/50 resize-none"
              />
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-3 bg-white text-black rounded-full font-medium flex items-center space-x-2 hover:bg-white/90 transition-colors">
                  <Send className="w-4 h-4" />
                  <span>Send via CRM Integrations</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8">
              <Bot className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white/40">Click generate to let AI synthesize your meeting context into a personalized follow-up email.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
