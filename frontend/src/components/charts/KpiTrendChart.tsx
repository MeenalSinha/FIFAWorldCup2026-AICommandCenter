"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";

const TREND_DATA = [
  { time: "16:00", waitMinutes: 4.1, incidents: 1 },
  { time: "16:30", waitMinutes: 4.6, incidents: 1 },
  { time: "17:00", waitMinutes: 5.2, incidents: 2 },
  { time: "17:30", waitMinutes: 5.8, incidents: 2 },
  { time: "18:00", waitMinutes: 6.0, incidents: 3 },
  { time: "18:30", waitMinutes: 6.2, incidents: 3 },
];

export default function KpiTrendChart() {
  return (
    <Card>
      <CardHeader title="Entry Wait Time Trend" />
      <div className="h-56 px-3 pb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={TREND_DATA}
            margin={{ top: 8, right: 16, left: -12, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
            <XAxis
              dataKey="time"
              fontSize={12}
              stroke="var(--text-secondary)"
            />
            <YAxis fontSize={12} stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border-soft)",
                fontSize: 12,
              }}
              formatter={(value) => [`${value} min`, "Avg entry wait"]}
            />
            <Line
              type="monotone"
              dataKey="waitMinutes"
              stroke="#2f6fed"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
