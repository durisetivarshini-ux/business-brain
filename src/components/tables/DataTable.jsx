import React from "react";
import { motion } from "framer-motion";

export function DataTable({ columns, data }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/[0.02] border-b border-white/5">
            {columns.map((col, i) => (
              <th key={i} className={`px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider ${col.align === "right" ? "text-right" : ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row, rowIndex) => (
            <motion.tr 
              key={rowIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.05 }}
              className="hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`px-6 py-4 ${col.align === "right" ? "text-right" : ""}`}>
                  {col.cell ? col.cell(row) : <span className="text-white/70 text-sm">{row[col.accessor]}</span>}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
