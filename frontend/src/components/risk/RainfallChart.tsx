"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { RainfallRecord } from "@/data/mockLocations";

interface RainfallChartProps {
  records: RainfallRecord[];
}

export function RainfallChart({ records }: RainfallChartProps) {
  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={records}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E6E1" />
          <XAxis
            dataKey="date"
            stroke="#526056"
            fontSize={11}
            tickLine={false}
          />
          <YAxis
            stroke="#526056"
            fontSize={11}
            tickLine={false}
            unit="mm"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#E1E6E1",
              borderRadius: "6px",
              color: "#202923",
              fontSize: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "10px", color: "#526056" }}
          />
          <Bar
            dataKey="daily"
            name="Daily Rainfall (mm)"
            fill="#247343"
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="cumulative7d"
            name="7-day Cumulative (mm)"
            stroke="#D97706"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#D97706" }}
          />
          <Line
            type="monotone"
            dataKey="cumulative15d"
            name="15-day Cumulative (mm)"
            stroke="#DC2626"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 2.5, fill: "#DC2626" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
