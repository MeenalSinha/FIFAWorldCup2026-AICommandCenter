"use client";

import { useEffect, useRef, useState } from "react";
import type { Gate } from "@/lib/api";

interface LiveUpdate {
  type: "live_update";
  timestamp: string;
  gates: Gate[];
}

/**
 * Subscribes to the backend's /ws/live channel and returns the latest
 * gate occupancy snapshot. Falls back silently (keeps last known value)
 * if the socket cannot connect, so the dashboard still renders fully
 * from the initial REST fetch when running the frontend standalone.
 */
export function useLiveFeed() {
  const [latest, setLatest] = useState<LiveUpdate | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws/live";
    let socket: WebSocket;
    try {
      socket = new WebSocket(url);
      socketRef.current = socket;
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as LiveUpdate;
          setLatest(data);
        } catch {
          // ignore malformed frames
        }
      };
    } catch {
      // WebSocket unavailable (e.g. backend not running) - dashboard
      // keeps showing the initial REST snapshot.
    }

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return latest;
}
