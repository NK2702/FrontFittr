// src/loaders/JobLoaders.jsx
export const jobLoader = async ({ params }) => {
    const response = await fetch(`/api/jobs/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed to load job');
    }
    const job = await response.json();
    return job;
  };
  