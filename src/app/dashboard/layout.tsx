"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
// Data navigasi


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <DashboardNavbar />

      {/* Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold">E-Kerja Karawang</span>
              </div>
              <p className="text-gray-400">
                Platform terpercaya untuk menemukan penyedia jasa profesional di Indonesia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/ac" className="hover:text-white">Service AC</Link></li>
                <li><Link href="/services/cleaning" className="hover:text-white">Jasa Kebersihan</Link></li>
                <li><Link href="/services/construction" className="hover:text-white">Tukang Bangunan</Link></li>
                <li><Link href="/services/electronics" className="hover:text-white">Elektronik</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">Tentang Kami</Link></li>
                <li><Link href="/careers" className="hover:text-white">Karir</Link></li>
                <li><Link href="/contact" className="hover:text-white">Kontak</Link></li>
                <li><Link href="/help" className="hover:text-white">Bantuan</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-Kerja Karawang. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
