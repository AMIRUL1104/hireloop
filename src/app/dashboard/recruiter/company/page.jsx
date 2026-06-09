// app/dashboard/recruiter/company/page.jsx

import CompanyGrid from "@/components/Dashboard/reqruiter/Company/CompanyGrid";
import getUserSession from "@/lib/core/session";
import { getReqruiterCompanies } from "@/lib/Server/api/myCompanies";

// Mock Data Source
const mockCompanies = [
  {
    id: "1",
    name: "TechVerse Solutions",
    industry: "Software & Technology",
    location: "Dhaka, Bangladesh",
    size: "50-200 Employees",
    description:
      "Leading enterprise software development agency specializing in cloud-native solutions and scalable web applications.",
    status: "approved",
    logo: "T",
  },
  {
    id: "2",
    name: "Innovate FinTech",
    industry: "Financial Services",
    location: "Chittagong, Bangladesh",
    size: "11-50 Employees",
    description:
      "A fast-growing fintech startup building modern digital payment systems and decentralized banking apps.",
    status: "pending",
    logo: "",
  },
  {
    id: "3",
    name: "Creative Media Agency",
    industry: "Marketing & Advertising",
    location: "Remote",
    size: "1-10 Employees",
    description:
      "Full-service digital marketing and branding agency focusing on high-converting ad campaigns and visual identity.",
    status: "rejected",
    logo: "C",
  },
];
export default async function CompanyDashboardPage() {
  const companies = mockCompanies; // Assumed mock data source

  const user = await getUserSession();
  const reqruiterId = user.id;
  const reqruiterCompanies = await getReqruiterCompanies(reqruiterId);
  // console.log(user);

  return (
    // Rich dark premium background with strategic blur spots for glow effect
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 p-4 md:p-8 relative overflow-hidden">
      {/* Background Neon Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <CompanyGrid
          initialCompanies={reqruiterCompanies}
          reqruiterId={reqruiterId}
        />
      </div>
    </div>
  );
}
