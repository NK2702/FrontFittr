import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleDescription = (jobId) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchJobs();
  }, [isHome]); // Added isHome to the dependency array

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => {
              let description = job.description;

              if (!showFullDescription[job.id]) {
                description = description.substring(0, 90) + '...';
              }

              return (
                <div className="bg-white rounded-xl shadow-md relative" key={job.id}>
                  <div className="p-4">
                    <div className="mb-6">
                      <div className="text-gray-600 my-2">{job.type}</div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                    </div>
                    <div className="mb-5">{description}</div>

                    <button
                      onClick={() => toggleDescription(job.id)}
                      className="text-purple-500 mb-5 hover:text-purple-700"
                    >
                      {showFullDescription[job.id] ? 'Less' : 'More'}
                    </button>

                    <h3 className="text-indigo-500 mb-2">{job.salary}</h3>
                    <div className="border border-gray-100 mb-5"></div>
                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                      <div className="text-orange-700 mb-3">
                        <FaMapMarker className="inline text-lg mb-1 mr-1" />
                        {job.location}
                      </div>
                      <Link
                        to={`/jobs/${job.id}`} // Link to a specific job
                        className="h-[36px] bg-black hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-center text-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </section>
  );
};

// Add PropTypes for props validation
JobListings.propTypes = {
  isHome: PropTypes.bool,
};

export default JobListings;
