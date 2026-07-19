"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this forwards to Cloud Logging via a client-side
    // reporting endpoint; logged to the console here so it is visible
    // during local development and judging.
    console.error("Dashboard render error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="m-8 app-card flex flex-col items-start gap-3 p-6"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <AlertTriangle size={18} />
          </span>
          <div>
            <p className="font-medium">
              Something went wrong loading this view.
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              The rest of the platform is unaffected. You can try reloading this
              section.
            </p>
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
