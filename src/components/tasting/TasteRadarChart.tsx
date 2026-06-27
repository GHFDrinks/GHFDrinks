"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { TasteProfileRadar } from "@/data/tasting-notes";

export function TasteRadarChart({ data }: { data: TasteProfileRadar }) {
  const chartData = [
    { axis: "Sweet", value: data.sweet },
    { axis: "Fruity", value: data.fruity },
    { axis: "Fresh", value: data.fresh },
    { axis: "Savoury", value: data.savoury },
    { axis: "Herbal", value: data.herbal },
    { axis: "Spicy", value: data.spicy },
    { axis: "Floral", value: data.floral },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="var(--border)" strokeOpacity={0.3} />
        <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--foreground)", fontSize: 11, letterSpacing: 1 }} />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
        <Radar
          name="Taste Profile"
          dataKey="value"
          stroke="var(--foreground)"
          fill="var(--sage)"
          fillOpacity={0.35}
          strokeWidth={1.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
