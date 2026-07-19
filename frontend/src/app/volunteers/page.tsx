"use client";

import { useQuery } from "@tanstack/react-query";
import Topbar from "@/components/layout/Topbar";
import { Card, CardHeader } from "@/components/ui/Card";
import { api } from "@/lib/api";

export default function VolunteersPage() {
  const { data } = useQuery({
    queryKey: ["volunteer-tasks"],
    queryFn: api.volunteerTasks,
    initialData: {
      volunteers: [
        { id: "v-1", name: "Volunteer Team North", zone: "Gate A-B", status: "available", tasks_open: 2 },
        { id: "v-2", name: "Volunteer Team East", zone: "Gate C", status: "dispatched", tasks_open: 4 },
        { id: "v-3", name: "Volunteer Team South", zone: "Gate D-E", status: "available", tasks_open: 1 },
      ],
    },
  });

  const { data: lostFound } = useQuery({
    queryKey: ["lost-found"],
    queryFn: api.lostFoundItems,
    initialData: {
      items: [
        { id: "lf-1", description: "Black backpack", location: "Near Gate B", status: "reported", reported_at: "18:42" },
        { id: "lf-2", description: "Blue child's cap", location: "Section 114", status: "matched", reported_at: "18:10" },
      ],
    },
  });

  return (
    <>
      <Topbar title="Volunteer Hub" subtitle="AI-generated task prioritization and incident reporting" />
      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader title="Prioritized Teams" />
          {data.volunteers.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-[var(--text-secondary)]">No volunteer teams checked in yet.</p>
          ) : (
            <ul className="px-5 pb-5 space-y-3">
              {data.volunteers.map((v) => (
                <li key={v.id} className="flex items-center justify-between rounded-xl border border-[var(--border-soft)] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{v.zone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs capitalize text-[var(--text-secondary)]">{v.status}</p>
                    <p className="text-sm font-semibold">{v.tasks_open} tasks</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="Lost & Found" />
          {lostFound.items.length === 0 ? (
            <p className="px-5 pb-5 text-sm text-[var(--text-secondary)]">No lost & found reports at this time.</p>
          ) : (
            <ul className="px-5 pb-5 space-y-3">
              {lostFound.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-xl border border-[var(--border-soft)] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{item.location}</p>
                  </div>
                  <span className="text-xs capitalize text-[var(--text-secondary)]">{item.status}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
