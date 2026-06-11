import Link from "next/link";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

// Shown after successful application submission
// Accepts job details to display a personalized success message
const ApplicationSuccess = ({ jobTitle, companyName }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-6">
    {/* Success icon */}
    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mb-5">
      <HiOutlineCheckCircle className="text-green-400 text-3xl" />
    </div>

    <h2 className="text-white text-xl font-bold mb-2">
      Application Submitted!
    </h2>
    <p className="text-gray-400 text-sm max-w-xs mb-1">Your application for</p>
    <p className="text-white font-semibold text-sm mb-0.5">{jobTitle}</p>
    <p className="text-gray-500 text-xs mb-6">at {companyName}</p>

    <p className="text-gray-400 text-sm max-w-sm mb-8">
      The recruiter will review your application and get back to you. You can
      track your application status from your dashboard.
    </p>

    {/* Action buttons */}
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
      <Link
        href="/browse-jobs"
        className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl border border-gray-700/50 bg-gray-800 text-gray-300 hover:text-white hover:border-gray-600 text-sm font-medium transition-all duration-200"
      >
        <HiOutlineArrowLeft className="text-base" />
        Back to Jobs
      </Link>
      <Link
        href="/dashboard/applications"
        className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-sm font-medium transition-opacity duration-200"
      >
        <HiOutlineClipboardDocumentList className="text-base" />
        My Applications
      </Link>
    </div>
  </div>
);

export default ApplicationSuccess;
