"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, MoreVertical, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  resolved: boolean;
}

interface ReviewCommentLayerProps {
  slideId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewCommentLayer({ slideId, isOpen, onClose }: ReviewCommentLayerProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", author: "Marcus Chen", text: "Can we swap this image for the newer summer activation shot? The lighting is better.", time: "2 hrs ago", resolved: false },
    { id: "2", author: "Elena Rodriguez", text: "Agreed. I'll upload the hi-res version to the shared asset library.", time: "1 hr ago", resolved: false }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: Date.now().toString(),
      author: "You",
      text: newComment,
      time: "Just now",
      resolved: false
    }]);
    setNewComment("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute right-8 top-24 bottom-8 w-96 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col overflow-hidden shadow-2xl z-50"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h3 className="font-medium text-white">Review Comments</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className={`group ${comment.resolved ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-white">
                      {comment.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white">{comment.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-white/40">{comment.time}</span>
                    <button className="text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="pl-8 text-sm text-white/70 leading-relaxed">
                  {comment.text}
                </div>
                {!comment.resolved && (
                  <div className="pl-8 mt-3">
                    <button 
                      onClick={() => setComments(comments.map(c => c.id === comment.id ? { ...c, resolved: true } : c))}
                      className="flex items-center space-x-1.5 text-xs text-green-400/70 hover:text-green-400 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Resolve</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-accent resize-none min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button 
                onClick={handleSend}
                disabled={!newComment.trim()}
                className="absolute right-3 bottom-3 p-2 bg-accent text-accent-foreground rounded-lg disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
