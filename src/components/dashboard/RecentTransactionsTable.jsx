import React from 'react';
import { DataTable } from '../ui/DataTable';

export function RecentTransactionsTable() {
  const transactions = [
    { id: 'TXN-001', client: 'Acme Corp', amount: '$12,500', status: 'Completed', date: '2026-07-07', rep: 'Varshini' },
    { id: 'TXN-002', client: 'Global Tech', amount: '$4,200', status: 'Pending', date: '2026-07-06', rep: 'John' },
    { id: 'TXN-003', client: 'Nexus Ind.', amount: '$28,000', status: 'Completed', date: '2026-07-05', rep: 'Sarah' },
    { id: 'TXN-004', client: 'Stellar Cloud', amount: '$8,900', status: 'Failed', date: '2026-07-04', rep: 'Varshini' },
    { id: 'TXN-005', client: 'DataSync', amount: '$15,000', status: 'Completed', date: '2026-07-03', rep: 'Mike' },
    { id: 'TXN-006', client: 'Alpha Net', amount: '$3,100', status: 'Completed', date: '2026-07-02', rep: 'Sarah' },
    { id: 'TXN-007', client: 'Quantum AI', amount: '$45,000', status: 'Pending', date: '2026-07-01', rep: 'Varshini' },
  ];

  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'client', label: 'Client' },
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
    { key: 'rep', label: 'Sales Rep' },
  ];

  return (
    <div className="w-full mt-6">
      <DataTable 
        data={transactions} 
        columns={columns} 
        title="Recent Transactions" 
      />
    </div>
  );
}
