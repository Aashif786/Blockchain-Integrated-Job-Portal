import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../App";
import ProfileSetupModal from "../components/ProfileSetupModal";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ bio: "", skills: [], linkedin: "", walletAddress: "" });
  const [stats, setStats] = useState({ totalJobs: 0, appliedJobs: 0, savedJobs: 0 });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Fetch user data
      const userRes = await axios.get('http://localhost:5000/api/auth/me', { headers });
      setUser(userRes.data);

      // Show profile modal if user doesn't have a profile
      if (!userRes.data.hasProfile) {
        setShowProfileModal(true);
      }

      // Fetch profile data separately
      try {
        const profileRes = await axios.get('http://localhost:5000/api/profile', { headers });
        setProfile(profileRes.data);
      } catch (profileError) {
        console.error("Failed to load profile data initially");
        // If profile doesn't exist yet, the modal will handle creation
      }


      // Fetch jobs data for stats
      const jobsRes = await axios.get('http://localhost:5000/api/jobs', { headers });
      setRecentJobs(jobsRes.data.slice(0, 3)); // Get latest 3 jobs
      setStats({
        totalJobs: jobsRes.data.length,
        appliedJobs: Math.floor(jobsRes.data.length * 0.3), // Mock data
        savedJobs: Math.floor(jobsRes.data.length * 0.2), // Mock data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post("/api/profile", profile, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert("Profile saved!");
    } catch (err) {
      alert("Save failed");
    }
  };

  const handleProfileComplete = () => {
    // Refresh user data after profile completion
    fetchUserData();
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>Your Profile</h1>

        <div className={`bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDark ? 'bg-gray-700 border-gray-600 focus:bg-gray-600' : 'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:bg-white'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Skills (comma-separated)</label>
              <input
                type="text"
                value={profile.skills?.join(", ") || ""}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) })
                }
                className={`w-full px-4 py-3 border rounded-lg text-white ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="React, Node, Web3"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn</label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg text-white ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="https://linkedin.com/in/you"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Wallet Address (Web3)</label>
              <input
                type="text"
                value={profile.walletAddress}
                onChange={(e) => setProfile({ ...profile, walletAddress: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg text-white font-mono text-sm ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="0x..."
              />
            </div>

            <button
              onClick={handleSave}
              className={`w-full py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <ProfileSetupModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onProfileComplete={handleProfileComplete}
      />
    </div>
  );
}