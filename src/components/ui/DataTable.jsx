import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Download } from 'lucide-react';

export function DataTable({ data, columns, title = "Data Table", searchable = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-[#0B1120]/60 border border-white/5 rounded-2xl flex flex-col w-full overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {searchable && (
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#050816] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]/50"
              />
            </div>
          )}
          <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {columns.map((col, index) => (
                <th 
                  key={index}
                  className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => requestSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortConfig.key === col.key && (
                      <ArrowUpDown size={12} className={sortConfig.direction === 'desc' ? 'text-[#00D4FF]' : 'text-[#5B5FFF]'} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-[#94A3B8] text-sm">
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm text-white/90 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
        <span className="text-xs text-[#94A3B8] font-medium">
          Showing {Math.min(sortedData.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(sortedData.length, currentPage * itemsPerPage)} of {sortedData.length} entries
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-bold text-white px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
