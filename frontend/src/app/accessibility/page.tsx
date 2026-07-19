"use client";

import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader } from "@/components/ui/Card";

const FEATURES = [
  { title: "Voice Navigation", detail: "Turn-by-turn spoken directions in 50+ languages." },
  { title: "Wheelchair Routing", detail: "Step-free paths using ramps and concourse elevators." },
  { title: "Audio Descriptions", detail: "Generated scene descriptions for visually impaired visitors." },
  { title: "Sign Language Clips", detail: "Generated sign-language videos for key announcements." },
];

export default function AccessibilityPage() {
  return (
    <>
      <Topbar title="Accessibility" subtitle="Support for visually impaired, hearing impaired, wheelchair and elderly visitors" />
      <div className="px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map((f) => (
          <Card key={f.title}>
            <CardHeader title={f.title} />
            <p className="px-5 pb-5 text-sm text-[var(--text-secondary)]">{f.detail}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
