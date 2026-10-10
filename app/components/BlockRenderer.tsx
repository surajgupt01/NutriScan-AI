import { PulseBlock } from "../constants/responseType";
import { Activity, AlertTriangle , ShieldAlert } from "lucide-react";

export default function BlockRenderer({ block }: { block: PulseBlock }) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case "text":
      return (
        <div className="w-full text-xs leading-relaxed text-neutral-700 font-normal whitespace-pre-wrap break-words">
          {block.content}
        </div>
      );

    case "score":
      return (
        <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 shadow-2xs">
                <Activity className="w-4 h-4 text-neutral-800" />
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-900">{block.label || "Health Score"}</span>
                <p className="text-[9px] text-neutral-400 font-mono">Nutritional Density Score</p>
              </div>
            </div>
            {block.value !== undefined && (
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold tracking-tight text-neutral-900 font-mono">
                  {block.value}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">/100</span>
              </div>
            )}
          </div>
          {block.explanation && (
            <p className="mt-2 text-[11px] text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-2 font-normal">
              {block.explanation}
            </p>
          )}
        </div>
      );

    case "warning":
      return (
        <div className="w-full flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
          <div className="p-0.5 text-amber-700 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-800 font-mono">
              {block.severity || "Moderate"} Risk Warning
            </p>
            <p className="text-xs text-neutral-700 leading-relaxed font-normal">{block.content}</p>
          </div>
        </div>
      );

    case "allergens":
      return (
        <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50/40 p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-700" />
            <span className="text-xs font-medium text-neutral-900">Detected Allergens & Sensitive Compounds</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {block.items?.map((item) => (
              <span
                key={item}
                className="rounded-md bg-white border border-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-700 shadow-2xs hover:border-neutral-300 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );

    case "bullet_list":
      return (
        <div className="w-full space-y-1.5 rounded-xl border border-neutral-200 bg-neutral-50/30 p-3">
          <span className="text-xs font-medium text-neutral-900">{block.title}</span>
          <ul className="space-y-1 pl-4 text-xs text-neutral-600 list-disc marker:text-neutral-400">
            {block.items?.map((item, idx) => (
              <li key={idx} className="leading-relaxed font-normal">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-neutral-50 text-neutral-700 border-b border-neutral-200">
              <tr>
                {block.headers?.map((h) => (
                  <th key={h} className="p-2.5 font-medium text-[10px] font-mono">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {block.rows?.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-neutral-50/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2.5 text-[11px] text-neutral-600 font-normal">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "ingredient":
      return (
        <div className="w-full rounded-xl border border-neutral-200 bg-white p-3 shadow-2xs space-y-1 hover:border-neutral-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-900">{block.name}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
              {block.category}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">{block.explanation}</p>
        </div>
      );

    default:
      return null;
  }
}