import React from 'react';

const UserDetailModal = ({ 
    selectedUser, 
    setSelectedUser, 
    handleUpdateUser, 
    handleDeleteUser,
    handleToggleBlogAccess,
    isUpdating,
    isDeleting
}) => {
    if (!selectedUser) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
            <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-8 md:p-10 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0">
                    <div>
                        <h2 className="text-3xl font-bold text-[#111111]">{selectedUser.name}</h2>
                        <p className="text-[#0CBF95] font-bold text-sm uppercase tracking-widest mt-1">{selectedUser.userType} Access</p>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">✕</button>
                </div>

                <div className="p-8 md:p-10 overflow-y-auto">
                    {/* Blog Access Section */}
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#F7FAF3] to-[#F0FFF6] border-2 border-[#D4EFC7]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-black text-gray-800 mb-1">Article Posting Access</h4>
                                <p className="text-xs text-gray-600">
                                    {selectedUser.canPostBlog 
                                        ? "This user can create and submit articles" 
                                        : "This user cannot post articles"}
                                </p>
                            </div>
                            <button
                                onClick={() => handleToggleBlogAccess(selectedUser._id, !selectedUser.canPostBlog)}
                                disabled={isUpdating}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                                    selectedUser.canPostBlog
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-gradient-to-r from-[#AABD05] to-[#0CBF95] hover:opacity-90 text-white'
                                }`}
                            >
                                {isUpdating ? 'Updating...' : selectedUser.canPostBlog ? '🚫 Revoke Access' : '✅ Grant Access'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Seeking</h4>
                                <p className="text-xl font-bold text-[#111111]">{selectedUser.seeking || "Not Specified"}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Interests</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedUser?.areaOfInterest?.map((item, i) => (
                                        <span key={i} className="px-4 py-2 bg-[#F8FAF6] border border-[#D4EFC7] rounded-xl text-sm font-bold text-[#111111]">{item}</span>
                                    )) || "None"}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Languages</h4>
                                <p className="text-[#111111] font-bold">{selectedUser?.languagePreferance || "Not Specified"}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Growth Vision</h4>
                                {selectedUser?.grow?.map((path, i) => (
                                    <p key={i} className="text-sm text-[#666666] italic mb-3 pl-4 border-l-2 border-[#0CBF95]">"{path}"</p>
                                )) || "No vision entries found."}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8 p-8 md:p-10 pt-0">
                    <button
                        onClick={() =>
                            handleUpdateUser(selectedUser._id, { 
                                userType: selectedUser.userType === 'premium' ? 'waitlist' : 'premium' 
                            })
                        }
                        disabled={isUpdating || isDeleting}
                        className="flex-1 px-5 py-3 md:py-2 rounded-xl bg-gradient-to-r from-[#AABD05] to-[#0CBF95] text-white font-bold hover:opacity-90 transition-all text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            selectedUser.userType === 'premium' ? 'Demote to Waitlist' : 'Promote to Premium'
                        )}
                    </button>

                    <button
                        onClick={() => handleDeleteUser(selectedUser._id)}
                        disabled={isUpdating || isDeleting}
                        className="flex-1 px-5 py-3 md:py-2 rounded-xl bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-all text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </span>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
