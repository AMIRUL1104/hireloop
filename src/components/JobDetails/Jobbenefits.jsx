import { HiOutlineGift } from "react-icons/hi2";
import RichContent from "./Richcontent";

const JobBenefits = ({ benefits }) => {
  if (!benefits) return null;

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center shrink-0">
          <HiOutlineGift className="text-green-400 text-base" />
        </div>
        <h2 className="text-white font-semibold text-lg">Benefits</h2>
      </div>

      <RichContent content={benefits} />
    </div>
  );
};

export default JobBenefits;
