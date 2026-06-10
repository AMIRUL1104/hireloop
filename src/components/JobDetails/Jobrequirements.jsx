import { HiOutlineCheckBadge } from "react-icons/hi2";
import RichContent from "./Richcontent";

const JobRequirements = ({ requirements }) => {
  if (!requirements) return null;

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center shrink-0">
          <HiOutlineCheckBadge className="text-purple-400 text-base" />
        </div>
        <h2 className="text-white font-semibold text-lg">Requirements</h2>
      </div>

      <RichContent content={requirements} />
    </div>
  );
};

export default JobRequirements;
