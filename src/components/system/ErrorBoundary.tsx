"use client";

import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white font-sans">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <div>
              <h2 className="text-3xl font-light mb-4">Presentation Interrupted</h2>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                We encountered an unexpected issue while rendering this view. Your saved presentations and offline data are safe.
              </p>
            </div>
            <button
              onClick={this.resetError}
              className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 w-full"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Recover Session</span>
            </button>
            <p className="text-xs text-white/30 font-mono break-words">
              {this.state.error?.message}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
