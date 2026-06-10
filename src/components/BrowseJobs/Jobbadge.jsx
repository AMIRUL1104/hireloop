// Server component — renders styled badges for job type, category, remote
// Extend colorMap as more types/categories are added

const colorMap = {
  // Job types
  "Full-time": "bg-blue-500/15 text-blue-300 border-blue-500/20",
  "Part-time": "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  Remote: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  Contract: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  Internship: "bg-pink-500/15 text-pink-300 border-pink-500/20",

  // Categories
  Engineering: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  Design: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20",
  Marketing: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
  Finance: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Product: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  Sales: "bg-rose-500/15 text-rose-300 border-rose-500/20",
};

const defaultColor = "bg-gray-700/50 text-gray-400 border-gray-600/30";

const JobBadge = ({ value }) => {
  const style = colorMap[value] ?? defaultColor;

  return (
    <span
      className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[11px] font-medium ${style}`}
    >
      {value}
    </span>
  );
};

export default JobBadge;
