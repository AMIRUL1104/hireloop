// Stats Component - Server Component
// Displays key platform statistics in an organized grid

"use client";

import { Briefcase, Factory, Person, Snowflake } from "@gravity-ui/icons";

export default function Stats() {
  // Statistics Data
  const statistics = [
    {
      id: 1,
      icon: Briefcase,
      number: "50K",
      label: "Active Jobs",
      description: "Opportunities waiting for you",
    },
    {
      id: 2,
      icon: Factory,
      number: "12K",
      label: "Companies",
      description: "Top employers hiring now",
    },
    {
      id: 3,
      icon: Person,
      number: "2M",
      label: "Job Seekers",
      description: "Community members",
    },
    {
      id: 4,
      icon: Snowflake,
      number: "97%",
      label: "Satisfaction Rate",
      description: "Happy professionals",
    },
  ];

  return (
    <div className="w-full">
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statistics.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 rounded-xl transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-300">
                  <Icon
                    size={24}
                    className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                  />
                </div>

                {/* Main Number */}
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {stat.number}
                  </p>
                </div>

                {/* Label */}
                <div>
                  <p className="text-gray-200 font-semibold text-sm md:text-base">
                    {stat.label}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    {stat.description}
                  </p>
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-purple-600/0 via-purple-600/50 to-purple-600/0 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
