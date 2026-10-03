import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function AdminPortal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${api_based_url}/getAllUsers`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user and all their projects?")) return;
    
    try {
      const res = await fetch(`${api_based_url}/deleteUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u._id !== userId));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Manage registered users and their data.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-all border border-red-500/20"
          >
            Logout
          </button>
        </div>

        {error && <div className="mb-6 bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20">{error}</div>}

        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-500">Loading users...</div>
        ) : (
          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Name</th>
                    <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Email</th>
                    <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold">Joined</th>
                    <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold text-center">Projects</th>
                    <th className="p-4 text-xs tracking-widest uppercase text-gray-400 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">@{user.username}</div>
                      </td>
                      <td className="p-4 text-gray-300">{user.email}</td>
                      <td className="p-4 text-sm text-gray-400">{new Date(user.date).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        <span className="bg-orange-600/20 text-orange-400 py-1 px-3 rounded-full text-xs font-bold border border-orange-500/20">
                          {user.projectCount || 0}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {user.isAdmin ? (
                          <span className="text-xs text-blue-500 font-bold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">ADMIN</span>
                        ) : (
                          <button 
                            onClick={() => deleteUser(user._id)}
                            className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 px-4 py-2 rounded-lg border border-red-500/20"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
