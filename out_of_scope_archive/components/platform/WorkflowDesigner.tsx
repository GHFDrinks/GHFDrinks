"use client";

import React, { useState } from "react";
import { 
  Zap, 
  ArrowDown, 
  Settings2, 
  Trash2, 
  Plus, 
  Check, 
  AlertCircle, 
  Sliders, 
  Mail, 
  MessageSquare, 
  Database,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Workflow } from "./mockData";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  name: string;
  description: string;
  icon: any;
  config: Record<string, any>;
}

export function WorkflowDesigner({ 
  workflow, 
  onSave, 
  onCancel 
}: { 
  workflow?: Workflow | null;
  onSave?: (name: string, description: string, trigger: string, actions: string[]) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(workflow?.name || "New Automation Loop");
  const [description, setDescription] = useState(workflow?.description || "Bespoke follow-up task triggered from client activity.");
  const [trigger, setTrigger] = useState(workflow?.trigger || "meeting_completed");
  
  // Custom interactive steps representation
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "step_1",
      type: "trigger",
      name: "Event Trigger",
      description: `Occurs when "${trigger}" is published to the event bus.`,
      icon: Zap,
      config: { trigger: trigger }
    },
    {
      id: "step_2",
      type: "condition",
      name: "Condition Filter",
      description: "Only execute if Client Tier is Platinum or Gold.",
      icon: Sliders,
      config: { criteria: "tier IN ('Platinum', 'Gold')" }
    },
    ...(workflow?.actions.map((act, index) => {
      let icon = Database;
      if (act.toLowerCase().includes("mail") || act.toLowerCase().includes("sendgrid")) icon = Mail;
      if (act.toLowerCase().includes("slack")) icon = MessageSquare;
      if (act.toLowerCase().includes("ai") || act.toLowerCase().includes("recommend")) icon = Sparkles;
      
      return {
        id: `step_act_${index}`,
        type: "action" as const,
        name: act,
        description: "Configure integration action parameters.",
        icon: icon,
        config: {}
      };
    }) || [
      {
        id: "step_act_0",
        type: "action",
        name: "Queue SendGrid Email Template",
        description: "Send bespoke portfolio proposal attachment.",
        icon: Mail,
        config: { template: "luxury_follow_up_v2" }
      }
    ])
  ]);

  const addActionStep = () => {
    const newStep: WorkflowStep = {
      id: `step_act_${Date.now()}`,
      type: "action",
      name: "Push Salesforce Sync Action",
      description: "Log synced follow-up tasks to Salesforce timeline.",
      icon: Database,
      config: {}
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    // Cannot remove trigger or condition for this demo
    if (id === "step_1" || id === "step_2") return;
    setSteps(steps.filter(s => s.id !== id));
  };

  const handleTriggerChange = (val: string) => {
    setTrigger(val);
    setSteps(prev => prev.map(s => {
      if (s.id === "step_1") {
        return { ...s, description: `Occurs when "${val}" is published to the event bus.` };
      }
      return s;
    }));
  };

  const handleSave = () => {
    if (onSave) {
      const actionsTextList = steps
        .filter(s => s.type === "action")
        .map(s => s.name);
      onSave(name, description, trigger, actionsTextList);
    }
  };

  return (
    <div className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-[2.5rem]">
      {/* Design Header */}
      <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
              Automation Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-xl px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-base font-medium text-white"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 font-medium mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full max-w-xl px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-white/30 focus:outline-none text-xs text-white/70"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 justify-end shrink-0 pt-6 md:pt-0">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-white text-black hover:bg-white/95 rounded-xl text-xs font-semibold shadow-lg shadow-white/5 transition-all cursor-pointer"
          >
            Save Workflow
          </button>
        </div>
      </div>

      {/* Visual Canvas Designer */}
      <div className="flex flex-col items-center py-6 select-none max-w-2xl mx-auto">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Node Card */}
              <div 
                className={cn(
                  "w-full max-w-md p-5 rounded-[2rem] border relative group transition-all duration-300 bg-[#0c0c0e]/80 backdrop-blur-xl",
                  step.type === 'trigger' && "border-amber-500/25 bg-amber-500/[0.01]",
                  step.type === 'condition' && "border-blue-500/20 bg-blue-500/[0.01]",
                  step.type === 'action' && "border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      step.type === 'trigger' && "bg-amber-500/10 border-amber-500/20 text-amber-400",
                      step.type === 'condition' && "bg-blue-500/10 border-blue-500/20 text-blue-400",
                      step.type === 'action' && "bg-white/5 border-white/10 text-white/80"
                    )}>
                      <StepIcon className="w-5 h-5" />
                    </div>

                    <div>
                      {step.type === 'trigger' ? (
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Trigger Stage</span>
                          <select
                            value={trigger}
                            onChange={(e) => handleTriggerChange(e.target.value)}
                            className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer border-b border-white/10"
                          >
                            <option value="meeting_completed" className="bg-[#0f0f11]">meeting_completed</option>
                            <option value="client_viewed_portal" className="bg-[#0f0f11]">client_viewed_portal</option>
                            <option value="presentation_created" className="bg-[#0f0f11]">presentation_created</option>
                            <option value="content_published" className="bg-[#0f0f11]">content_published</option>
                          </select>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <span className={cn(
                            "text-[9px] uppercase tracking-wider font-semibold",
                            step.type === 'condition' ? "text-blue-400" : "text-white/40"
                          )}>
                            {step.type === 'condition' ? "Evaluation Rule" : "Integration Step"}
                          </span>
                          
                          {step.type === 'action' ? (
                            <input
                              type="text"
                              value={step.name}
                              onChange={(e) => {
                                const newNameVal = e.target.value;
                                setSteps(prev => prev.map(s => s.id === step.id ? { ...s, name: newNameVal } : s));
                              }}
                              className="bg-transparent text-sm font-semibold text-white focus:outline-none border-b border-white/5 focus:border-white/20 w-56"
                            />
                          ) : (
                            <h5 className="text-sm font-semibold text-white">{step.name}</h5>
                          )}
                        </div>
                      )}
                      
                      <p className="text-white/45 text-xs mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {step.type === 'action' && steps.filter(s => s.type === 'action').length > 1 && (
                    <button
                      onClick={() => removeStep(step.id)}
                      className="p-1.5 text-white/30 hover:text-red-400 rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Connecting Connector Arrow */}
              {!isLast && (
                <div className="py-4 flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-white/5" />
                  <ArrowDown className="w-4 h-4 text-white/20" />
                  <div className="w-0.5 h-4 bg-gradient-to-b from-white/5 to-white/20" />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Add Step Button */}
        <div className="mt-8">
          <button
            onClick={addActionStep}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-semibold text-white transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Flow Action</span>
          </button>
        </div>
      </div>
    </div>
  );
}
