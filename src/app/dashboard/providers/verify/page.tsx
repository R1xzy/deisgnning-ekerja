"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ReusableTable from "@/components/ReusableTable";

// Tipe data tidak berubah
interface Provider {
  id: number;
  name: string;
  email: string;
  ktpUrl: string;
  certificateUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}
type ModalState = | { type: 'document'; title: string; url: string; } | { type: 'approve'; provider: Provider; } | { type: 'reject'; provider: Provider; } | null;

const initialProviders: Provider[] = [
  // ... mock data Anda yang banyak di sini ...
  { id: 1, name: "Andi Prasetyo", email: "andi.prasetyo@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'pending' },
  { id: 2, name: "Budi Santoso", email: "budi.santoso@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'approved' },
  { id: 3, name: "Citra Lestari", email: "citra.lestari@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'rejected' },
  { id: 4, name: "Dewi Anggraini", email: "dewi.anggraini@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'pending' },
  { id: 5, name: "Eko Wijoyo", email: "eko.wijoyo@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'approved' },
  { id: 6, name: "Fajar Nugroho", email: "fajar.nugroho@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'pending' },
  { id: 7, name: "Gita Permata", email: "gita.permata@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'approved' },
  { id: 8, name: "Hendra Gunawan", email: "hendra.gunawan@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'rejected' },
  { id: 9, name: "Indah Puspita", email: "indah.puspita@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'pending' },
  { id: 10, name: "Joko Susilo", email: "joko.susilo@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'approved' },
  { id: 11, name: "Kartika Sari", email: "kartika.sari@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'pending' },
  { id: 12, name: "Lia Amelia", email: "lia.amelia@mail.com", ktpUrl: "...", certificateUrl: "...", status: 'rejected' },
];

const ITEMS_PER_PAGE = 5;

export default function VerifyProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // State untuk datatable
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  // State BARU untuk sorting
  const [sortConfig, setSortConfig] = useState<{ key: keyof Provider; direction: 'ascending' | 'descending' } | null>(null);

  // ... fungsi handleApprove dan handleReject tetap sama ...
  const handleApprove = (providerId: number) => { /* ... */ };
  const handleReject = (providerId: number) => { /* ... */ };

  // Logika untuk filter, cari, DAN SORTING
  const processedData = useMemo(() => {
    let filtered = providers
      .filter(provider => (statusFilter === "Semua Status" || provider.status === statusFilter.toLowerCase()))
      .filter(provider => provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || provider.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Logika BARU untuk sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [providers, statusFilter, searchTerm, sortConfig]);

  // Logika paginasi sekarang menggunakan processedData
  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedData, currentPage]);
  
  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(startItem + ITEMS_PER_PAGE - 1, processedData.length);

  // Fungsi BARU untuk menangani klik pada header
  const handleSort = (key: keyof Provider) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Definisikan kolom untuk ReusableTable
  const columns = [
    { header: "#", accessorKey: "id" as keyof Provider, sortable: true, cell: (_row: Provider, index: number) => <span>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</span>},
    { header: "Nama", accessorKey: "name" as keyof Provider, sortable: true, cell: (row: Provider) => <span className="font-medium">{row.name}</span> },
    { header: "Email", accessorKey: "email" as keyof Provider, sortable: true },
    { header: "KTP", cell: (row: Provider) => (<button onClick={() => setModalState({ type: 'document', title: `KTP - ${row.name}`, url: row.ktpUrl })} className="text-blue-600 hover:underline">Lihat</button>) },
    { header: "Sertifikat", cell: (row: Provider) => (<button onClick={() => setModalState({ type: 'document', title: `Sertifikat - ${row.name}`, url: row.certificateUrl })} className="text-blue-600 hover:underline">Lihat</button>) },
    { header: "Status", accessorKey: "status" as keyof Provider, sortable: true, cell: (row: Provider) => (
        <>
          {row.status === 'approved' && <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Disetujui</span>}
          {row.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Ditolak</span>}
          {row.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Pending</span>}
        </>
    )},
    { header: "Aksi", cell: (row: Provider) => (
      <div className="text-center space-x-2">
        {row.status === 'pending' ? (
          <>
            <button onClick={() => setModalState({ type: 'approve', provider: row })} className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 text-xs">Approve</button>
            <button onClick={() => setModalState({ type: 'reject', provider: row })} className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-xs">Reject</button>
          </>
        ) : (<span className="text-gray-400">-</span>)}
      </div>
    )}
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Verifikasi Penyedia</h1>
        
        {/* ... Filter & Search tidak berubah ... */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama atau email..." 
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-blue-500 text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="text-gray-600 border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Semua Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        
        {/* Mengirim props sorting BARU ke ReusableTable */}
        <ReusableTable 
          data={paginatedData} 
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {/* Komponen Paginasi Fungsional */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow">
          <div>
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">{processedData.length > 0 ? startItem : 0}</span> sampai{' '}
              <span className="font-medium">{endItem}</span> dari{' '}
              <span className="font-medium">{processedData.length}</span> hasil
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {modalState?.type === 'document' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-800">{modalState.title}</h2>
              <button onClick={() => setModalState(null)} className="text-gray-500 hover:text-gray-800"><X className="w-5 h-5" /></button>
            </div>
            <img src={modalState.url} alt={modalState.title} className="w-full h-auto" />
          </div>
        </div>
      )}
      {modalState?.type === 'approve' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Konfirmasi Approve</h3>
            <p className="text-sm text-gray-600 mb-4">Yakin ingin menyetujui penyedia **{modalState.provider.name}**?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalState(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Batal</button>
              <button onClick={() => handleApprove(modalState.provider.id)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
            </div>
          </div>
        </div>
      )}
      {modalState?.type === 'reject' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tolak Penyedia: {modalState.provider.name}</h3>
            <textarea 
              rows={3} 
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 text-gray-600" 
              placeholder="Alasan penolakan..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalState(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Batal</button>
              <button onClick={() => handleReject(modalState.provider.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Tolak</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}