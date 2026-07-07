import React from "react";
import { Avatar } from "@/components/common/Avatar";

export function EmployeeListItem({ employee }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-white/[0.02] transition-colors rounded-lg">
      <Avatar name={employee.name} size="md" />
      <div>
        <p className="text-white font-medium text-sm">{employee.name}</p>
        <p className="text-white/50 text-xs">{employee.role}</p>
      </div>
    </div>
  );
}
