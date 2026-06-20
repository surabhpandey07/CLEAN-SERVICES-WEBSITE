import { useState, useEffect, FormEvent } from 'react';
import { FirebaseBooking } from '../types';
import { db, collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from '../lib/firebase';
import { 
  ShieldCheck, AlertCircle, RefreshCw, Trash2, Calendar, 
  MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle, 
  DollarSign, House, FileText, Filter, Search, RotateCcw
} from 'lucide-react';

interface AdminViewProps {
  onBackToHome: () => void;
}

export default function AdminView({ onBackToHome }: AdminViewProps) {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [bookings, setBookings] = useState<FirebaseBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Storage filters & search
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Default Passkey is 2026
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passkey === '2026' || passkey.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      fetchBookings();
    } else {
      setAuthError('Incorrect Admin Passkey. Please verify and try again.');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: FirebaseBooking[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          cleanType: data.cleanType || 'standard',
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          date: data.date || '',
          timeSlot: data.timeSlot || '',
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          zipCode: data.zipCode || '',
          specialInstructions: data.specialInstructions || '',
          status: data.status || 'pending',
          totalPrice: data.totalPrice || 0,
          createdAt: data.createdAt
        } as FirebaseBooking);
      });
      setBookings(fetched);
    } catch (err: any) {
      console.error("Error fetching bookings from Firestore:", err);
      setError('Could not retrieve bookings from the database. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: FirebaseBooking['status']) => {
    setUpdatingId(bookingId);
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: newStatus });
      
      // Update local state
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error("Error updating status:", err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking registration? This cannot be undone.')) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert('Failed to delete booking from database.');
    }
  };

  // Filtered list
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchStr = `${b.fullName} ${b.email} ${b.phone} ${b.address} ${b.city} ${b.zipCode}`.toLowerCase();
    const matchesSearch = searchTerm.trim() === '' || matchStr.includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate high level stats from all bookings
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue: bookings
      .filter(b => b.status === 'completed' || b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  };

  // Render Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-surface-dim rounded-3xl shadow-xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-container/20 text-secondary mb-2">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-2xl font-black text-primary">CleanSerene Admin</h1>
          <p className="font-sans text-xs text-on-surface-variant">
            Enter authorized security passkey to view premium booking records list.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black uppercase text-primary tracking-wider mb-1.5 gray-800">
              Admin Passkey *
            </label>
            <input
              type="password"
              required
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter secure master passkey (Hint: 2026)"
              className="w-full bg-surface-container-low border border-surface-container-high focus:border-secondary rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-all placeholder:text-on-surface-variant/40"
            />
          </div>

          {authError && (
            <div className="bg-[#ffebeb] text-[#ba1a1a] text-xs font-semibold p-3.5 rounded-xl border border-[#ffcfcf] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-sans text-sm font-semibold py-3.5 rounded-xl hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            Authenticate Portal
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={onBackToHome}
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            ← Cancel and Return to Sanitation Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 animate-fade-in space-y-8">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-surface-container pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-secondary/15 text-secondary font-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded">
              Vault Secure
            </span>
            <span className="text-[10px] text-on-surface-variant">Database Sync: Active</span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-primary tracking-tight mt-1">
            Bookings Manager Portal
          </h1>
          <p className="font-sans text-xs text-on-surface-variant">
            Direct real-time view into consumer schedules, addresses, and clean configurations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="bg-white border border-surface-dim hover:bg-surface-container font-sans text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live</span>
          </button>
          
          <button
            onClick={onBackToHome}
            className="bg-primary text-white font-sans text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          >
            Return to Store
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Bookings */}
        <div className="bg-white rounded-2xl p-5 border border-surface-dim shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider">Total Booked</p>
            <h4 className="text-xl font-heading font-black text-primary">{stats.total}</h4>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-2xl p-5 border border-surface-dim shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider">Pending</p>
            <h4 className="text-xl font-heading font-black text-amber-600">{stats.pending}</h4>
          </div>
        </div>

        {/* Confirmed Spreading */}
        <div className="bg-white rounded-2xl p-5 border border-surface-dim shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider">Confirmed</p>
            <h4 className="text-xl font-heading font-black text-blue-600">{stats.confirmed}</h4>
          </div>
        </div>

        {/* Completed Sweeps */}
        <div className="bg-white rounded-2xl p-5 border border-surface-dim shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider">Completed</p>
            <h4 className="text-xl font-heading font-black text-emerald-600">{stats.completed}</h4>
          </div>
        </div>

        {/* Revenue Generated */}
        <div className="bg-white rounded-2xl p-5 border border-surface-dim shadow-sm col-span-2 md:col-span-1 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-wider">Active Est.</p>
            <h4 className="text-xl font-heading font-black text-secondary">${stats.revenue.toFixed(2)}</h4>
          </div>
        </div>
      </div>

      {/* Database control filters and search options */}
      <div className="bg-white border border-surface-dim p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, address, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-surface-container-high rounded-xl text-xs font-semibold outline-none focus:border-primary w-full sm:w-64"
            />
          </div>

          {/* Status Select filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high rounded-xl text-xs font-bold px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All States</option>
              <option value="pending">⏳ Pending</option>
              <option value="confirmed">📅 Confirmed</option>
              <option value="completed">✅ Completed</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="text-[11px] text-on-surface-variant font-medium self-end md:self-auto">
            Showing {filteredBookings.length} of {bookings.length} reservations
          </div>
        )}
      </div>

      {/* Main Database Table / Grid */}
      {loading ? (
        <div className="text-center py-24 space-y-4">
          <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto" />
          <p className="font-heading text-sm font-bold text-primary">Pulling customer roster from Cloud Firestore...</p>
        </div>
      ) : error ? (
        <div className="bg-[#ffebeb] border border-[#ffcfcf] text-[#ba1a1a] p-8 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 mx-auto" />
          <h3 className="font-heading text-base font-bold">Data Fetch Outage</h3>
          <p className="text-xs leading-relaxed">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-opacity-90"
          >
            Retry Live Sync
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white border border-surface-dim p-16 rounded-3xl text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center p-2 text-on-surface-variant/40">
            <House className="w-8 h-8" />
          </div>
          <h3 className="font-heading text-base font-bold text-primary">No Matching Bookings Found</h3>
          <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            There are currently no appointments registered in the system that match the requested filter criteria.
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
              className="bg-primary/5 text-primary text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/10 transition-colors"
            >
              Clear Search Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => {
            
            // Generate display date
            const displayDate = () => {
              if (!booking.date) return 'Unscheduled Date';
              try {
                const parts = booking.date.split('-');
                const y = parseInt(parts[0]);
                const m = parseInt(parts[1]) - 1;
                const d = parseInt(parts[2]);
                const parsed = new Date(y, m, d);
                return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              } catch {
                return booking.date;
              }
            };

            return (
              <div 
                key={booking.id}
                className="bg-white border border-surface-dim rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Border Accent depending on Clean Type */}
                <div className={`absolute top-0 left-0 w-2 h-full ${
                  booking.cleanType === 'deep' ? 'bg-secondary' : 'bg-primary'
                }`} />

                <div className="pl-2 space-y-4">
                  {/* Row 1: Header / Name & Clean type Badge */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-heading text-base font-extrabold text-primary shrink-0">
                        {booking.fullName || 'Anonymous Registered'}
                      </h3>
                      <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-primary/70" />
                        <span className="font-bold text-primary">{displayDate()}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-primary/70" />
                        <span>{booking.timeSlot}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        booking.cleanType === 'deep' 
                          ? 'bg-secondary/15 text-secondary border border-secondary/20' 
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        {booking.cleanType === 'deep' ? '✨ Deep Clean' : '🏠 Standard Clean'}
                      </span>
                      <span className="font-heading text-sm font-black text-secondary">
                        ${booking.totalPrice?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Customer Contact & Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-2xl text-[11px] text-on-surface-variant border border-surface-container">
                    <div className="space-y-1.5">
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary/60" />
                        <a href={`mailto:${booking.email}`} className="hover:underline font-bold text-primary truncate max-w-[160px]">
                          {booking.email || 'No email registered'}
                        </a>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary/60" />
                        <a href={`tel:${booking.phone}`} className="hover:underline text-primary/90">
                          {booking.phone || 'No phone registered'}
                        </a>
                      </p>
                      <p className="font-medium text-xs pt-1 border-t border-surface-container-high/60 mt-1">
                        📐 <span className="font-bold text-primary">{booking.bedrooms}</span> Bed / <span className="font-bold text-primary">{booking.bathrooms}</span> Bath Areas
                      </p>
                    </div>

                    <div className="space-y-1 sm:border-l sm:border-surface-container-high/60 sm:pl-3">
                      <p className="font-bold text-primary flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                        <span>Address:</span>
                      </p>
                      <p className="leading-relaxed pl-5 font-medium -mt-0.5">
                        {booking.address}, <br />
                        {booking.city}, {booking.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Special instructions / lockbox code */}
                  {booking.specialInstructions && (
                    <div className="bg-amber-500/5 text-amber-900 text-[10px] p-3 rounded-xl border border-amber-500/10 flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black uppercase tracking-wide">Key Codes & Comments:</span>
                        <p className="mt-0.5 italic leading-relaxed font-medium">"{booking.specialInstructions}"</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer segment: Status controls and Trash */}
                <div className="pt-3 border-t border-surface-container flex flex-wrap justify-between items-center gap-3 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black tracking-wide text-primary/60">Status:</span>
                    <select
                      disabled={updatingId === booking.id}
                      value={booking.status}
                      onChange={(e) => handleUpdateStatus(booking.id, e.target.value as FirebaseBooking['status'])}
                      className={`text-xs font-bold rounded-lg border px-2.5 py-1 outline-none cursor-pointer transition-colors ${
                        booking.status === 'completed' ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20' :
                        booking.status === 'confirmed' ? 'bg-blue-500/15 text-blue-700 border-blue-500/20' :
                        booking.status === 'cancelled' ? 'bg-red-500/15 text-red-700 border-red-500/20' :
                        'bg-amber-500/15 text-amber-700 border-amber-500/20'
                      }`}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">📅 Confirmed</option>
                      <option value="completed">✅ Completed</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="p-2 border border-red-500/15 bg-red-500/5 hover:bg-red-500/10 text-red-600 rounded-xl transition-all cursor-pointer"
                    title="Delete registration"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
