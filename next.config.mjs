// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "www.linkedin.com",
//         port: "",
//         pathname: "**",
//         search: "",
//       },
//       {
//         protocol: "https",
//         hostname: "www.google.com",
//         port: "",
//         pathname: "**",
//         search: "",
//       },
//     ],
//   },
//   experimental: {
//     serverComponentsExternalPackages: ["@better-auth/kysely-adapter"],
//   },

// };

// export default nextConfig;
/** @type {import('next').Next} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.linkedin.com",
        port: "",
        pathname: "**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
