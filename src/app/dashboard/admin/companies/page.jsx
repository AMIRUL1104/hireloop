import { getAllCompanies } from "@/lib/Server/api/myCompanies";
import { Table } from "@heroui/react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import CompanyActionButtons from "./CompanyActionButtons"; // ক্লায়েন্ট কম্পোনেন্টটি ইমপোর্ট করছি

export default async function AdminCompaniesPage() {
  // প্রাথমিকভাবে pending ডাটা লোড হচ্ছে
  const AllCompanies = await getAllCompanies("");

  // ইমেজের নিচের ৩টি কার্ডের জন্য স্ট্যাটিস্টিকস (রিয়েল-টাইম ডাটা কাউন্ট)
  const pendingCount = AllCompanies.filter(
    (c) => c.status === "pending",
  ).length;
  const approvedCount = AllCompanies.filter(
    (c) => c.status === "approved",
  ).length;
  const rejectedCount = AllCompanies.filter(
    (c) => c.status === "rejected",
  ).length;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-emerald-400";

      case "rejected":
        return "text-rose-400";

      case "pending":
        return "text-amber-400";

      default:
        return "text-gray-400";
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500 shadow-[0_0_6px_#10b981]";

      case "rejected":
        return "bg-rose-500 shadow-[0_0_6px_#f43f5e]";

      case "pending":
        return "bg-amber-500 shadow-[0_0_6px_#f59e0b]";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#0E121F] p-6 lg:p-10 text-white">
      {/* 🔝 টপ হেডার এরিয়া */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Company Registrations
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Review and manage corporate entity access requests for the HireLoop
            ecosystem.
          </p>
        </div>

        {/* ফিল্টার এবং রেজিস্টার বাটন গ্রপ */}
        <div className="flex items-center gap-3 w-full sm:w-auto self-end sm:self-auto">
          <button className="flex items-center gap-2 bg-[#161D30] hover:bg-[#1C243D] border border-gray-800 text-gray-300 text-xs px-4 h-9 rounded-xl transition-all">
            <SlidersHorizontal className="size-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 bg-white hover:bg-gray-100 text-black font-semibold text-xs px-4 h-9 rounded-xl transition-all shadow-md">
            <Plus className="size-3.5 stroke-[2.5]" />
            Register New
          </button>
        </div>
      </div>

      {/* 📑 HeroUI টেবিল কন্টেইনার */}
      <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
        <Table
          aria-label="Company Registrations Table"
          className="bg-transparent"
        >
          <Table.ScrollContainer>
            <Table.Content className="min-w-[900px]">
              <Table.Header>
                {/* 🛠️ এখানে isRowHeader যুক্ত করা হয়েছে */}
                <Table.Column
                  isRowHeader
                  className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase py-4 px-6"
                >
                  Company Name
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase">
                  Recruiter Email
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase">
                  Industry
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase">
                  Status
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase">
                  Date Submitted
                </Table.Column>
                <Table.Column className="bg-[#1C243D] text-gray-400 text-xs font-semibold uppercase text-center px-6">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {AllCompanies.map((company) => (
                  <Table.Row
                    key={company._id}
                    className="border-b border-gray-800/50 last:border-none hover:bg-[#1C243D]/20 transition-colors"
                  >
                    {/* কোম্পানি নাম ও লোগো */}
                    <Table.Cell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#232D4A] border border-gray-700/50 rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building2 className="size-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-sm capitalize">
                            {company.name}
                          </span>
                          <span className="text-gray-500 text-xs mt-0.5">
                            {company.size || "1-10 employees"}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* রিক্রুটার ইমেইল */}
                    <Table.Cell>
                      <span className="text-gray-300 text-sm">
                        {company.recruiterEmail}
                      </span>
                    </Table.Cell>

                    {/* ইন্ডাস্ট্রি */}
                    <Table.Cell>
                      <span className="px-2.5 py-1 bg-[#232D4A]/60 border border-gray-700/40 text-gray-300 text-xs rounded-lg font-medium">
                        {company.industry}
                      </span>
                    </Table.Cell>

                    {/* স্ট্যাটাস ইন্ডিকেটর */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(
                            company.status,
                          )}`}
                        ></span>

                        <span
                          className={`${getStatusColor(
                            company.status,
                          )} text-xs font-semibold capitalize`}
                        >
                          {company.status}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* সাবমিশন ডেট */}
                    <Table.Cell>
                      <span className="text-gray-400 text-sm">
                        {formatDate(company.createdAt)}
                      </span>
                    </Table.Cell>

                    {/* অ্যাকশন বাটনস */}
                    <Table.Cell className="text-center px-6">
                      <CompanyActionButtons
                        companyId={company._id}
                        status={company.status}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        {AllCompanies.length === 0 && (
          <div className="p-16 text-center text-gray-500 text-sm border-t border-gray-800/40">
            No pending company registrations found.
          </div>
        )}
      </div>

      {/* 📊 বটম স্ট্যাটাস গ্রিড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pending Review */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="flex justify-between items-center text-gray-400 text-xs font-medium uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-amber-500" /> PENDING REVIEW
            </span>
            <span className="text-emerald-500 font-semibold">
              +12% vs last week
            </span>
          </div>
          <h2 className="text-3xl font-bold mt-3 tracking-tight text-white">
            {pendingCount}
          </h2>
        </div>

        {/* Approved Partners */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="flex justify-between items-center text-gray-400 text-xs font-medium uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" /> APPROVED
              PARTNERS
            </span>
            <span className="text-emerald-500 font-semibold">
              +5% vs last week
            </span>
          </div>
          <h2 className="text-3xl font-bold mt-3 tracking-tight text-white">
            {approvedCount}
          </h2>
        </div>

        {/* Total Rejections */}
        <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="flex justify-between items-center text-gray-400 text-xs font-medium uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <XCircle className="size-4 text-rose-500" /> TOTAL REJECTIONS
            </span>
            <span className="text-gray-500 font-semibold">Stable</span>
          </div>
          <h2 className="text-3xl font-bold mt-3 tracking-tight text-white">
            {rejectedCount}
          </h2>
        </div>
      </div>
    </div>
  );
}
