import React from 'react';

const UserManagement = ({ 
  userData, 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType,
  setSelectedUser 
}) => {
  // SEARCH AND FILTER LOGIC
  const filteredUsers = userData.filter(user => {
    const name = user.name ? user.name.toLowerCase() : "";
    const email = user.email ? user.email.toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    const matchesSearch = name.includes(search) || email.includes(search);
    const matchesFilter = filterType === 'all' || user.userType === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full justify-end">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-6 py-3.5 rounded-2xl bg-white shadow-sm border-none focus:ring-2 focus:ring-[#94BD1C] outline-none flex-1 md:w-64 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-6 py-3.5 rounded-2xl bg-white shadow-sm border-none focus:ring-2 focus:ring-[#29C28C] outline-none cursor-pointer font-bold text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="premium">Premium Only</option>
          <option value="waitlist">Waitlist Only</option>
        </select>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Membership</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id || user._id} className="hover:bg-[#F9FBF7] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#111111] text-[17px]">{user.name}</span>
                          {user.canPostBlog && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-300 rounded-md text-[9px] font-black uppercase" title="Can post blogs">
                              ✍️ Author
                            </span>
                          )}
                          <span className={`md:hidden px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border ${user.userType === 'premium'
                            ? 'bg-[#D4EFC7] text-[#4A6D34] border-[#B6E39D]'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                            }`}>
                            {user.userType}
                          </span>
                        </div>
                        <span className="text-sm text-[#888888] font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.userType === 'premium'
                        ? 'bg-[#D4EFC7] text-[#4A6D34] border-[#B6E39D]'
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-3 md:px-5 md:py-2.5 rounded-xl bg-white border-2 border-gray-100 text-[#94BD1C] font-bold text-sm hover:border-[#94BD1C] hover:bg-[#94BD1C] hover:text-white transition-all shadow-sm cursor-pointer"
                      >
                        <span className="hidden md:inline">View Details</span>
                        <span className="md:hidden">→</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-bold">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
