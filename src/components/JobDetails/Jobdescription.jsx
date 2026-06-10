import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import RichContent from "./Richcontent";

const JobDescription = ({ responsibilities }) => {
  if (!responsibilities) return null;

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6">
      {/* Section heading */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
          <HiOutlineClipboardDocumentList className="text-blue-400 text-base" />
        </div>
        <h2 className="text-white font-semibold text-lg">Responsibilities</h2>
      </div>

      <RichContent content={responsibilities} />
    </div>
  );
};

export default JobDescription;
