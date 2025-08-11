import { useEffect, useState } from "react";
import API from "../utils/api";

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Job Feed</h1>
        <p className="text-gray-400 text-center mb-8">Browse the latest opportunities</p>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <h2 className="text-xl font-bold text-white mb-2">{job.title}</h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-400 font-semibold">
                    {job.budget ? `${job.budget} ETH` : "Budget not specified"}
                  </span>
                  {job.postedBy?.name && (
                    <span className="text-xs text-gray-500">by {job.postedBy.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}