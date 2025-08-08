// src/components/ReusableTable.tsx

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Tipe data kolom
type Column<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean; // Properti untuk menandai kolom bisa di-sort
};

// Tipe data props untuk komponen tabel
type ReusableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  // Props BARU untuk sorting
  sortConfig?: { key: keyof T; direction: 'ascending' | 'descending' } | null;
  onSort?: (key: keyof T) => void;
};

export default function ReusableTable<T extends object>({ 
  data, 
  columns, 
  sortConfig, 
  onSort 
}: ReusableTableProps<T>) {
  
  // Fungsi untuk menampilkan ikon sort yang sesuai
  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      // Tampilkan ikon netral atau tidak sama sekali jika tidak aktif
      // Untuk tampilan lebih bersih, kita tidak tampilkan apa-apa
      return <span className="w-4 h-4"></span>; 
    }
    if (sortConfig.direction === 'ascending') {
      return <ArrowUp className="w-3 h-3 text-gray-800" />;
    }
    return <ArrowDown className="w-3 h-3 text-gray-800" />;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {/* Membuat header menjadi tombol jika 'sortable' */}
                {column.sortable && onSort && column.accessorKey ? (
                  <button 
                    onClick={() => onSort(column.accessorKey!)}
                    className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                  >
                    {column.header}
                    {getSortIcon(column.accessorKey!)}
                  </button>
                ) : (
                  // Tampilkan header biasa jika tidak bisa di-sort
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.header}`}
                  className="text-gray-600 px-6 py-4 whitespace-nowrap"
                >
                  {column.cell
                    ? column.cell(row, rowIndex)
                    : column.accessorKey
                    ? (row[column.accessorKey] as React.ReactNode)
                    : null
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}