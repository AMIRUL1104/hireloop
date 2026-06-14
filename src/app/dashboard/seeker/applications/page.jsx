import getUserSession from "@/lib/core/session";
import { getApplicationByApplicant } from "@/lib/Server/api/jobApplications";
import { Table, Button } from "@heroui/react";
import Link from "next/link";
import {
  Download,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
} from "lucide-react";

async function ApplicationsPage() {
  const user = await getUserSession();
  const applications = await getApplicationByApplicant(user.id);

  // ইমেজের মতো করে ডাইনামিক স্ট্যাটিস্টিকস ক্যালকুলেশন
  const totalApplied = applications.length;
  const shortlisted = applications.filter(
    (app) => app.status?.toLowerCase() === "shortlisted",
  ).length;
  const interviews = applications.filter(
    (app) =>
      app.status?.toLowerCase() === "interview" ||
      app.status?.toLowerCase() === "review",
  ).length;
  const successRate =
    totalApplied > 0 ? Math.round((shortlisted / totalApplied) * 100) : 0;

  // তারিখ সুন্দর করে দেখানোর ফাংশন (যেমন: 1 day ago বা নির্দিষ্ট তারিখ)
  const formatAppliedDate = (dateObj) => {
    if (!dateObj || !dateObj.$date) return "N/A";
    const appliedDate = new Date(dateObj.$date);
    const now = new Date();
    const diffTime = Math.abs(now - appliedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Today";
    if (diffDays === 2) return "1 day ago";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return appliedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  // স্ট্যাটাস অনুসারে প্রিমিয়াম ব্যাজ কালার ম্যাপিং (ইমেজের কালার স্কিম অনুযায়ী)
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "border-gray-500/50 text-gray-300 bg-gray-500/5";
      case "review":
        return "border-amber-500/40 text-amber-400 bg-amber-500/5";
      case "shortlisted":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-500/5";
      case "rejected":
        return "border-rose-500/40 text-rose-400 bg-rose-500/5";
      case "offered":
        return "border-purple-500/40 text-purple-400 bg-purple-500/5";
      default:
        return "border-gray-600 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0E121F] p-6 lg:p-10 text-white">
      {/* 🔝 টপ হেডার এরিয়া (`image_55d228.png` অনুযায়ী) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-gray-400 text-sm mt-1">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        {/* ফিল্টার এবং ডাউনলোড বাটন গ্রুপ */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-[#161D30] border border-gray-800 p-1 rounded-xl text-xs text-gray-400 font-medium">
            <span className="px-4 py-2 bg-[#232D4A] border border-gray-700/50 rounded-lg text-white cursor-pointer transition-all">
              Active
            </span>
            <span className="px-4 py-2 hover:text-white cursor-pointer transition-all flex items-center">
              Archived
            </span>
          </div>

          <Button className="bg-white hover:bg-gray-100 text-black font-semibold text-xs px-4 h-10 rounded-xl shadow-lg flex items-center gap-2">
            <Download className="size-3.5 stroke-[2.5]" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* 📊 স্ট্যাটাস গ্রিড সেকশন (৪টি কার্ড - হুবহু ইমেজ থিম) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Applied */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <p className="text-gray-400 text-xs font-medium tracking-wide">
            Total Applied
          </p>
          <h2 className="text-3xl font-bold mt-2 tracking-tight text-white">
            {totalApplied}
          </h2>
        </div>
        {/* Shortlisted */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <p className="text-gray-400 text-xs font-medium tracking-wide">
            Shortlisted
          </p>
          <h2 className="text-3xl font-bold mt-2 tracking-tight text-white">
            {shortlisted}
          </h2>
        </div>
        {/* Interviews */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <p className="text-gray-400 text-xs font-medium tracking-wide">
            Interviews
          </p>
          <h2 className="text-3xl font-bold mt-2 tracking-tight text-amber-500">
            {interviews}
          </h2>
        </div>
        {/* Success Rate */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <p className="text-gray-400 text-xs font-medium tracking-wide">
            Success Rate
          </p>
          <h2 className="text-3xl font-bold mt-2 tracking-tight text-emerald-500">
            {successRate}%
          </h2>
        </div>
      </div>

      {/* 📑 HeroUI অ্যাপ্লিকেশান টেবিল কন্টেইনার */}
      <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table
          aria-label="Applications Matrix Table"
          className="bg-transparent"
        >
          <Table.ScrollContainer>
            <Table.Content className="min-w-[850px]">
              <Table.Header>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase py-4 px-6 tracking-wider">
                  Job Title
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Company
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Applied
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Status
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase tracking-wider text-right px-6">
                  Action
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {applications.map((app) => (
                  <Table.Row
                    key={app._id?.$oid || app._id}
                    className="border-b border-gray-800/50 last:border-none hover:bg-[#1C243D]/20 transition-colors"
                  >
                    {/* কলাম ১: জব টাইটেল এবং টাইপ (ইমেজের বাম পাশের রেন্ডারিং স্টাইল) */}
                    <Table.Cell className="py-5 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 bg-[#232D4A] border border-gray-700/60 rounded-xl flex items-center justify-center text-gray-300">
                          <Briefcase className="size-4.5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-sm tracking-wide">
                            {/* যদি ডাইনামিক জব টাইটেল না থাকে তবে ফলব্যাক টেক্সট */}
                            {app.jobTitle || "Software Engineer Intern"}
                          </span>
                          <span className="text-gray-500 text-xs mt-0.5 font-medium">
                            Full-time • Remote
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* কলাম ২: কোম্পানির নাম */}
                    <Table.Cell>
                      <span className="text-gray-300 text-sm font-medium">
                        {app.companyName || "Tesla"}
                      </span>
                    </Table.Cell>

                    {/* কলাম ৩: আবেদনের সময়কাল */}
                    <Table.Cell>
                      <span className="text-gray-400 text-sm">
                        {formatAppliedDate(app.createdAt)}
                      </span>
                    </Table.Cell>

                    {/* কলাম ৪: গ্লোয়িং বর্ডার স্ট্যাটাস ব্যাজ */}
                    <Table.Cell>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 border rounded-full text-xs font-semibold tracking-wide capitalize ${getStatusStyle(app.status)}`}
                      >
                        {app.status || "Applied"}
                      </span>
                    </Table.Cell>

                    {/* কলাম ৫: অ্যাকশন লিংক */}
                    <Table.Cell className="text-right px-6">
                      <Link
                        href={`/dashboard/recruiter/job/${app.jobId}`}
                        className="text-gray-300 hover:text-white text-sm font-medium hover:underline inline-flex items-center gap-1 transition-all"
                      >
                        Details
                        <ExternalLink className="size-3 text-gray-500" />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {/* যদি ডাটা এরে খালি থাকে (Empty State Handling) */}
        {applications.length === 0 && (
          <div className="p-16 text-center text-gray-500 text-sm border-t border-gray-800/40">
            No active job applications found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;
