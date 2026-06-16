import { getSavedJobsBySeekerId } from "@/lib/Server/api/savedJobs";
import { Button } from "@heroui/react";
import Link from "next/link";
import {
  Bookmark,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import getUserSession from "@/lib/core/session";
import SaveJobButton from "@/components/BrowseJobs/SaveJobButton";

export default async function SavedJobs() {
  const user = await getUserSession();
  const savedJobs = await getSavedJobsBySeekerId(user.id);

  // ইমেজের মতো ওপরের স্ট্যাটস ক্যালকুলেশন
  const totalSaved = savedJobs.length;

  // ডেডলাইন ক্লোজ কি না তা চেক করার লজিক (ধরি ৭ দিনের কম থাকলে Closing Soon)
  const closingSoonCount = savedJobs.filter((job) => {
    const deadline = new Date(job.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  }).length;

  // ডেডলাইন কতদিন বাকি বা এক্সপায়ার্ড তা বের করার ফাংশন
  const getDeadlineText = (deadlineStr) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: "Closed", isExpired: true };
    if (diffDays === 0)
      return { text: "Closes today", isExpired: false, isUrgent: true };
    if (diffDays === 1)
      return { text: "Closes tomorrow", isExpired: false, isUrgent: true };
    if (diffDays <= 7)
      return {
        text: `Closes in ${diffDays} days`,
        isExpired: false,
        isUrgent: true,
      };
    return {
      text: `Closes on ${deadline.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
      isExpired: false,
    };
  };

  return (
    <div className="min-h-screen bg-[#0E121F] p-6 lg:p-10 text-white">
      {/* 🔝 টপ হেডার এরিয়া এবং কাউন্টার কার্ডস (`Main Content.png` অনুযায়ী) */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage and track your bookmarked opportunities.
          </p>
        </div>

        {/* কাউন্টার কার্ডস */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Total Saved Card */}
          <div className="flex items-center gap-4 bg-[#161D30] border border-gray-800 rounded-2xl p-4 min-w-[160px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <Bookmark className="size-5 fill-blue-400/20" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium">Total Saved</p>
              <h2 className="text-2xl font-bold mt-0.5">{totalSaved}</h2>
            </div>
          </div>

          {/* Closing Soon Card */}
          <div className="flex items-center gap-4 bg-[#161D30] border border-gray-800 rounded-2xl p-4 min-w-[160px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium">Closing Soon</p>
              <h2 className="text-2xl font-bold mt-0.5 text-amber-500">
                {closingSoonCount}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 🎛️ ফিল্টার বার এবং সর্টিং ড্রপডাউন জোন */}
      <div className="bg-[#161D30]/80 border border-gray-800/80 p-3 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-gray-400">
          <span className="px-4 py-2 bg-[#232D4A] border border-gray-700/60 rounded-xl text-white cursor-pointer transition-all">
            All Saved
          </span>
          <span className="px-4 py-2 hover:bg-[#232D4A]/30 hover:text-white rounded-xl cursor-pointer transition-all">
            Engineering
          </span>
          <span className="px-4 py-2 hover:bg-[#232D4A]/30 hover:text-white rounded-xl cursor-pointer transition-all">
            Design
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 px-2 cursor-pointer self-end sm:self-auto">
          <span>Sort by:</span>
          <span className="text-white font-semibold flex items-center gap-1">
            Recently Saved <ChevronDown className="size-3.5" />
          </span>
        </div>
      </div>

      {/* 💼 সেভড জবস লিস্ট কন্টেইনার */}
      <div className="space-y-4">
        {savedJobs.map((job) => {
          const deadlineInfo = getDeadlineText(job.deadline);

          return (
            <div
              key={job._id}
              className={`w-full bg-[#161D30] border rounded-2xl p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 transition-all duration-300 shadow-sm hover:shadow-xl ${
                deadlineInfo.isExpired
                  ? "border-gray-800/40 opacity-60 bg-[#161D30]/40"
                  : "border-gray-800 hover:border-gray-700/80"
              }`}
            >
              {/* বাম পাশ: কোম্পানির লোগো এবং জব ডিটেইলস */}
              <div className="flex items-start gap-4">
                {/* কোম্পানির লোগো বক্স */}
                <div className="w-12 h-12 bg-[#232D4A] border border-gray-700/50 rounded-xl flex items-center justify-center overflow-hidden p-2 shrink-0">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Briefcase className="size-5 text-gray-400" />
                  )}
                </div>

                {/* জব ইনফো */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {job.jobTitle}
                    </h3>
                    <span className="px-2 py-0.5 bg-gray-800 border border-gray-700/60 text-[10px] uppercase font-bold text-gray-400 tracking-wider rounded-md">
                      {job.companyName}
                    </span>
                  </div>

                  {/* সাব-ইনফো মেটা ট্যাগস (লোকেশন এবং স্যালারি পিল) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E121F]/60 border border-gray-800/60 text-gray-300 rounded-xl">
                      <MapPin className="size-3.5 text-blue-400" />
                      <span>
                        {job.city}, {job.country}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E121F]/60 border border-gray-800/60 text-gray-300 rounded-xl">
                      <DollarSign className="size-3.5 text-emerald-400" />
                      <span>
                        {job.salaryMin} - {job.salaryMax} {job.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ডানপাশ: টাইমিং এবং অ্যাকশন বাটনস */}
              <div className="flex flex-row lg:flex-col sm:items-center lg:items-end justify-between lg:justify-center gap-4 w-full lg:w-auto pt-4 lg:pt-0 border-t border-gray-800/40 lg:border-none">
                {/* ডেডলাইন স্ট্যাটাস টেক্সট */}
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Clock
                    className={`size-3.5 ${deadlineInfo.isUrgent ? "text-amber-500" : "text-gray-500"}`}
                  />
                  <span
                    className={
                      deadlineInfo.isExpired
                        ? "text-rose-400"
                        : deadlineInfo.isUrgent
                          ? "text-amber-400 font-semibold"
                          : "text-gray-400"
                    }
                  >
                    {deadlineInfo.text}
                  </span>
                </div>

                {/* বাটন গ্রুপ */}
                <div className="flex items-center gap-2.5">
                  <SaveJobButton job={job} userId={user.id} />

                  {/* অ্যাপ্লাই বাটন */}
                  {!deadlineInfo.isExpired ? (
                    <Link
                      href={`/browse-jobs/${job.jobId}/apply`}
                      className="contents"
                    >
                      <Button
                        size="sm"
                        className="bg-white hover:bg-gray-100 text-black font-semibold text-xs h-10 px-5 rounded-xl transition-all shadow-md active:scale-95"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      size="sm"
                      className="bg-gray-800 text-gray-500 cursor-not-allowed text-xs h-10 px-5 rounded-xl border border-gray-700/30"
                    >
                      Expired
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* এম্পটি স্টেট হ্যান্ডলিং */}
        {savedJobs.length === 0 && (
          <div className="p-20 text-center text-gray-500 border border-dashed border-gray-800 rounded-2xl bg-[#161D30]/20">
            No bookmarked opportunities yet.
          </div>
        )}
      </div>
    </div>
  );
}
