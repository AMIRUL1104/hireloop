// app/dashboard/recruiter/company/page.jsx

import CompanyGrid from "@/components/Dashboard/reqruiter/Company/CompanyGrid";

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
  // Simulating server-side data load
  const companies = mockCompanies;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* CompanyGrid handles the persistent header, modal state, and rendering */}
        <CompanyGrid initialCompanies={companies} />
      </div>
    </div>
  );
}
