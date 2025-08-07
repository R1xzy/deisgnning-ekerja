"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react"; // Impor ikon X untuk tombol close
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

// Definisikan tipe untuk data yang akan ditampilkan di modal
type DocumentDetail = {
  title: string;
  imageUrl: string;
} | null;

export default function Verify() {
  // State untuk mengontrol visibilitas modal
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  
  // State baru untuk modal detail dokumen
  const [documentModalDetail, setDocumentModalDetail] = useState<DocumentDetail>(null);

  // Fungsi untuk membuka modal detail dokumen
  const viewDocument = (title: string, imageUrl: string) => {
    setDocumentModalDetail({ title, imageUrl });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Verifikasi Penyedia Jasa</h2>

        <div className="relative overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Nama Provider</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Dokumen KTP</th>
                <th className="px-6 py-3">Sertifikat</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">Andi Prasetyo</td>
                <td className="px-6 py-4">andi@mail.com</td>
                <td className="px-6 py-4">
                  {/* Tombol untuk membuka modal KTP */}
                  <button 
                    onClick={() => viewDocument('Dokumen KTP - Andi Prasetyo', 'https://placehold.co/600x400/EEE/31343C?text=Contoh+KTP')}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Lihat KTP
                  </button>
                </td>
                <td className="px-6 py-4">
                   {/* Tombol untuk membuka modal Sertifikat */}
                  <button 
                    onClick={() => viewDocument('Sertifikat - Andi Prasetyo', 'https://placehold.co/600x400/EEE/31343C?text=Contoh+Sertifikat')}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Lihat Sertifikat
                  </button>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => setApproveModalOpen(true)} className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-sans">Approve</button>
                  <button onClick={() => setRejectModalOpen(true)} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-sans">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-5">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronDown className="h-5 w-5 rotate-90" />
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronDown className="h-5 w-5 -rotate-90" />
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* Approve Modal */}
      {approveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-full max-w-md max-h-full">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Approve</h3>
              <p className="mb-4 text-gray-600">Apakah Anda yakin ingin menyetujui provider ini?</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setApproveModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-600">Batal</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Ya, Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-full max-w-md max-h-full">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tolak Provider</h3>
              <textarea id="reject-reason-1" rows={3} className="w-full p-2 border rounded mb-4 text-gray-600" placeholder="Alasan penolakan..."></textarea>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setRejectModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-600">Batal</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Kirim Penolakan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Detail Modal */}
      {documentModalDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 p-4">
          <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                {documentModalDetail.title}
              </h3>
              <button 
                onClick={() => setDocumentModalDetail(null)} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Tutup modal</span>
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-4">
              <img 
                src={documentModalDetail.imageUrl} 
                alt={documentModalDetail.title} 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
