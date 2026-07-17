import React from 'react';
import { DataTable } from '../ui/DataTable';
import { useWorkspace } from '../../context/WorkspaceContext';

export function RecentTransactionsTable() {
  const { businessData, currencySymbol } = useWorkspace();
  const rawTransactions = businessData.transactions || [];

  const transactions = rawTransactions.map(t => ({
    id: t.id || 'TXN-001',
    client: t.desc || 'Acme Corp',
    amount: `${t.amount < 0 ? '-' : ''}${currencySymbol}${Math.abs(t.amount).toLocaleString()}`,
    status: t.status || 'Completed',
    date: t.date || 'Today',
    rep: 'Admin'
  }));

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'client', label: 'Transaction Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-2 py-1 rounded text-xs font-bold ${
        val === 'Completed' ? 'bg-[#10B981]/20 text-[#10B981]' :
        val === 'Pending' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
        'bg-[#EF4444]/20 text-[#EF4444]'
      }`}>
        {val}
      </span>
    )},
    { key: 'date', label: 'Date' },
    { key: 'rep', label: 'Actor' },
  ];

  return (
    <div className="w-full">
      <DataTable 
        data={transactions} 
        columns={columns} 
        title="Recent Transactions Ledger" 
      />
    </div>
  );
}
