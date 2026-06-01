import React from "react";
import Link from "next/link";
import { Brain, Bot, Sparkles, Wand2, ArrowRight } from "lucide-react";

export default function AIWorkflowsPage() {
  return (
    <div className="space-y-10">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">AI Sales Copilot</h1>
        <p className="text-muted-foreground font-light text-lg">Intelligent workflows to streamline your sales process.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/meeting-prep">
          <div className="group h-full p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-accent/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-3">Meeting Intelligence</h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1 mb-8">Generate adaptive presentation sequences and talking points based on client CRM profiles and seasonal opportunities.</p>
            <div className="flex items-center text-accent text-sm font-medium">
              <span>Start Prep</span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        </Link>

        <Link href="/followups">
          <div className="group h-full p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-accent/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium mb-3">Smart Follow-ups</h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1 mb-8">Synthesize live presentation logs and voice interactions into highly personalized, CRM-ready follow-up emails.</p>
            <div className="flex items-center text-accent text-sm font-medium">
              <span>Compose Email</span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        </Link>

        <div className="group h-full p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-accent/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-medium mb-3">Sales Coaching</h3>
          <p className="text-white/50 text-sm leading-relaxed flex-1 mb-8">Review post-meeting engagement scores and AI-generated coaching notes based on your presentation pacing and objection handling.</p>
          <div className="flex items-center text-accent text-sm font-medium">
            <span>View Insights</span>
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
