import { useState, useEffect } from "react";
import API from "../utils/api";
import ConnectWallet from "./components/ConnectWallet";

export default function Dashboard() {
  const [profile, setProfile] = useState({ bio: "", skills: [], linkedin: "", walletAddress: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await API.post("/api/profile", profile);
      alert("Profile saved!");
    } catch (err) {
      alert("Save failed");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                value={profile.skills?.join(", ") || ""}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="React, Node, Web3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="https://linkedin.com/in/you"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address (Web3)</label>
              <input
                type="text"
                value={profile.walletAddress}
                onChange={(e) => setProfile({ ...profile, walletAddress: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm"
                placeholder="0x..."
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}