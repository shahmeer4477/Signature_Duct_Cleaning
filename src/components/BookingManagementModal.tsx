import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  RefreshCw,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Trash2,
  Mail,
} from "lucide-react";
import { BookingRecord } from "../../server.ts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingManagementModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to load bookings from backend database.");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Failed to communicate with booking backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      const data = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? data.booking : b))
      );
    } catch (err: any) {
      alert(`Could not update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete booking ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking.");
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(`Could not delete: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  // Filtered list
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      (b.customer_email || b.email || "").toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.address.street.toLowerCase().includes(search.toLowerCase()) ||
      b.address.zip.toLowerCase().includes(search.toLowerCase()) ||
      (b.address.city ? b.address.city.toLowerCase().includes(search.toLowerCase()) : false);

    const matchesStatus =
      statusFilter === "ALL" ? true : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0A0A0E] border border-[#D6A447]/40 rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.98)] text-white overflow-hidden">
        {/* Top Header */}
        <div className="p-6 sm:p-8 border-b border-[#D6A447]/20 flex flex-wrap items-center justify-between gap-4 bg-[#07070A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D6A447]/15 border border-[#D6A447] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#D6A447]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#D6A447] tracking-[0.25em] uppercase">
                  Signature Dispatch Portal
                </span>
                <span className="text-[10px] bg-[#1A1A22] text-[#A1A1AA] px-2 py-0.5 rounded-xs font-mono">
                  Live DB
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white">
                APPOINTMENT REQUEST MANAGEMENT
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D6A447]/40 rounded-xs text-[#C7C7C7] hover:text-[#D6A447] transition-colors"
              title="Refresh bookings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 rounded-xs text-[#C7C7C7] hover:text-white transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 bg-[#0E0E14] border-b border-white/5 text-xs font-mono">
          <div className="p-3 bg-[#07070A] border border-white/5 rounded-xs">
            <span className="text-[#71717A] uppercase block text-[10px]">Total Submissions</span>
            <span className="text-xl font-bold text-white">{bookings.length}</span>
          </div>
          <div className="p-3 bg-[#07070A] border border-amber-500/20 rounded-xs">
            <span className="text-amber-400 uppercase block text-[10px]">Pending Review</span>
            <span className="text-xl font-bold text-amber-400">{pendingCount}</span>
          </div>
          <div className="p-3 bg-[#07070A] border border-emerald-500/20 rounded-xs">
            <span className="text-emerald-400 uppercase block text-[10px]">Confirmed</span>
            <span className="text-xl font-bold text-emerald-400">{confirmedCount}</span>
          </div>
          <div className="p-3 bg-[#07070A] border border-blue-500/20 rounded-xs">
            <span className="text-blue-400 uppercase block text-[10px]">Completed</span>
            <span className="text-xl font-bold text-blue-400">{completedCount}</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, address, ID..."
              className="w-full pl-9 pr-4 py-2 bg-[#07070A] border border-white/10 rounded-xs text-xs text-white placeholder-[#52525B] focus:outline-none focus:border-[#D6A447]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-[#07070A] border border-white/10 rounded-xs text-xs">
            {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 font-mono text-[11px] rounded-xs transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? "bg-[#D6A447] text-[#050505] font-bold"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {loading ? (
            <div className="text-center py-16 text-[#A1A1AA] text-xs font-mono">
              Loading requests from database...
            </div>
          ) : error ? (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-xs">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-[#71717A] text-xs font-mono">
              No matching booking requests found.
            </div>
          ) : (
            filtered.map((booking) => (
              <div
                key={booking.id}
                className="p-5 sm:p-6 bg-[#0E0E14] border border-white/5 hover:border-[#D6A447]/30 rounded-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Customer & Address */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#D6A447]">
                      {booking.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] font-mono tracking-widest uppercase border ${
                        booking.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : booking.status === "CONFIRMED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : booking.status === "COMPLETED"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="text-[11px] text-[#71717A] font-mono">
                      Received: {new Date(booking.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D6A447]" />
                    <h3 className="text-base sm:text-lg font-display font-bold uppercase text-white">
                      {booking.fullName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#C7C7C7]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#D6A447]" />
                      <a
                        href={`tel:${booking.phone.replace(/\D/g, "")}`}
                        className="hover:text-[#D6A447] underline underline-offset-2"
                      >
                        {booking.phone}
                      </a>
                    </div>
                    {(booking.customer_email || booking.email) && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-[#D6A447] shrink-0" />
                        <a
                          href={`mailto:${booking.customer_email || booking.email}`}
                          className="hover:text-[#D6A447] underline underline-offset-2 truncate"
                        >
                          {booking.customer_email || booking.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A447]" />
                      <span className="truncate">
                        {booking.address.street}, {booking.address.city ? `${booking.address.city}, ` : ""}{booking.address.zip}
                      </span>
                    </div>
                  </div>

                  {/* Services & Schedule */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-white">
                      <Calendar className="w-3.5 h-3.5 text-[#D6A447]" />
                      <span className="font-medium">{booking.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#C7C7C7]">
                      <Clock className="w-3.5 h-3.5 text-[#D6A447]" />
                      <span>{booking.preferredTime}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {booking.services.map((svc) => (
                        <span
                          key={svc}
                          className="px-2 py-0.5 bg-[#171720] border border-white/10 rounded-xs text-[10px] text-[#D6A447]"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notes if any */}
                  {booking.notes && (
                    <div className="p-2.5 bg-[#08080C] border border-white/5 rounded-xs text-xs text-[#A1A1AA] flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#71717A] shrink-0 mt-0.5" />
                      <p className="italic font-light">"{booking.notes}"</p>
                    </div>
                  )}
                </div>

                {/* Right: Actions & Status Change */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#71717A] uppercase">
                      Update:
                    </span>
                    <select
                      value={booking.status}
                      disabled={updatingId === booking.id}
                      onChange={(e) =>
                        handleStatusUpdate(booking.id, e.target.value)
                      }
                      className="px-3 py-1.5 bg-[#07070A] border border-[#D6A447]/40 text-xs text-[#D6A447] rounded-xs font-mono focus:outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${booking.phone.replace(/\D/g, "")}`}
                      className="px-3 py-1.5 bg-[#D6A447] text-[#050505] text-xs font-bold tracking-wider uppercase rounded-xs hover:brightness-110 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Client</span>
                    </a>

                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-1.5 text-[#71717A] hover:text-red-400 hover:bg-white/5 rounded-xs transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/5 bg-[#07070A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <span>Data stored persistently at /data/bookings.json</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xs transition-colors"
          >
            Close Management Portal
          </button>
        </div>
      </div>
    </div>
  );
};
