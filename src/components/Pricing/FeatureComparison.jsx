import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import {
  COMPARISON_FEATURES,
  RECRUITER_COMPARISON_FEATURES,
} from "./pricingData";
import getUserSession from "@/lib/core/session";

// Renders a single cell value — boolean, string, or dash
const Cell = ({ value }) => {
  if (value === true)
    return <HiOutlineCheckCircle className="text-green-400 text-lg mx-auto" />;
  if (value === false)
    return <HiOutlineXCircle className="text-gray-700 text-lg mx-auto" />;
  // String value (e.g. "Unlimited", "Up to 10")
  return <span className="text-gray-300 text-sm font-medium">{value}</span>;
};

// Responsive comparison table — scrolls horizontally on mobile
const FeatureComparison = async () => {
  const user = await getUserSession();

  return (
    <section className="px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Compare Plans
          </h2>
          <p className="text-gray-400 text-sm">
            A side-by-side look at what each plan includes.
          </p>
        </div>

        {/* Table wrapper — horizontal scroll on small screens */}
        <div className="overflow-x-auto rounded-2xl border border-gray-700/50">
          <table className="w-full min-w-[580px]">
            {/* Header */}
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4 bg-gray-900/80 w-1/2">
                  Feature
                </th>
                {["Free", "Pro", "Enterprise"].map((plan, i) => (
                  <th
                    key={plan}
                    className={`text-center text-sm font-semibold px-4 py-4 ${
                      i === 1
                        ? "text-purple-300 bg-purple-500/8"
                        : "text-gray-300 bg-gray-900/80"
                    }`}
                  >
                    {plan}
                    {i === 1 && (
                      <span className="block text-purple-400/70 text-xs font-normal mt-0.5">
                        Most Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {user.role === "seeker" &&
                COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-700/30 last:border-0 ${
                      i % 2 === 0 ? "bg-gray-900/40" : "bg-gray-900/20"
                    }`}
                  >
                    <td className="text-gray-300 text-sm px-6 py-3.5">
                      {row.label}
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.free} />
                    </td>
                    <td className="text-center px-4 py-3.5 bg-purple-500/5">
                      <Cell value={row.pro} />
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              {user.role === "recruiter" &&
                RECRUITER_COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-700/30 last:border-0 ${
                      i % 2 === 0 ? "bg-gray-900/40" : "bg-gray-900/20"
                    }`}
                  >
                    <td className="text-gray-300 text-sm px-6 py-3.5">
                      {row.label}
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.free} />
                    </td>
                    <td className="text-center px-4 py-3.5 bg-purple-500/5">
                      <Cell value={row.pro} />
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison;
