import React from 'react';
import { AIPrioritySorter } from './AIPrioritySorter';
import { MessageStream } from './MessageStream';

export function InboxDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      <div className="lg:col-span-1 h-full">
        <AIPrioritySorter />
      </div>
      <div className="lg:col-span-2 h-full">
        <MessageStream />
      </div>
    </div>
  );
}
