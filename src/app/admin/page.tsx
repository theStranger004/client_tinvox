export default function AdminDashboard() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-playfair font-medium">Dashboard Overview</h1>
        <p className="text-neutral-400 mt-2 text-sm">Welcome back. Here is what is happening with your studio today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm font-medium">Total Bookings</h3>
          <p className="text-3xl font-playfair mt-2 text-white">124</p>
          <div className="mt-4 flex items-center text-progreen-400 text-xs font-medium">
            <span>+12% from last month</span>
          </div>
        </div>
        
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm font-medium">Portfolio Items</h3>
          <p className="text-3xl font-playfair mt-2 text-white">48</p>
          <div className="mt-4 flex items-center text-neutral-500 text-xs font-medium">
            <span>3 added this week</span>
          </div>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm font-medium">Pending Inquiries</h3>
          <p className="text-3xl font-playfair mt-2 text-white">7</p>
          <div className="mt-4 flex items-center text-gold-400 text-xs font-medium">
            <span>Requires attention</span>
          </div>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm font-medium">Active Packages</h3>
          <p className="text-3xl font-playfair mt-2 text-white">6</p>
          <div className="mt-4 flex items-center text-neutral-500 text-xs font-medium">
            <span>Across 3 categories</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Placeholder */}
      <div className="mt-10 bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="font-playfair text-lg">Recent Bookings</h3>
        </div>
        <div className="p-6">
          <p className="text-neutral-400 text-sm text-center py-8">No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
