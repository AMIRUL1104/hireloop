import SimilarJobCard from "./Similarjobcard";

// Server component — renders a row/grid of similar jobs
const SimilarJobs = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-white font-bold text-xl">Similar Jobs</h2>
        <p className="text-gray-500 text-sm mt-1">
          More opportunities that might interest you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <SimilarJobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default SimilarJobs;
