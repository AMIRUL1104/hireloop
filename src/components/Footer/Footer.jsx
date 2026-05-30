// Footer Component - Server Component
// Built with Next.js, Tailwind CSS, and Gravity UI Icons
// Responsive design for all screen sizes

import { LogoFacebook, LogoLinkedin, Xmark } from "@gravity-ui/icons";

function Footer() {
  // Footer Data Structure - Easy to modify
  const footerSections = {
    product: {
      title: "Product",
      links: [
        { label: "Job Discovery", href: "#" },
        { label: "Worker AI", href: "#" },
        { label: "Companies", href: "#" },
        { label: "Salary Data", href: "#" },
      ],
    },
    navigations: {
      title: "Navigations",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Career Library", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "#" },
        { label: "Newsroom", href: "#" },
      ],
    },
  };

  // Social Media Icons Configuration
  const socialLinks = [
    { icon: LogoFacebook, label: "Facebook", href: "#" },
    { icon: LogoLinkedin, label: "LinkedIn", href: "#" },
    { icon: Xmark, label: "Twitter/X", href: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h3 className="text-xl font-bold">HireLoop</h3>
            </div>

            {/* Brand Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.values(footerSections).map((section, index) => (
            <div key={index} className="md:col-span-1">
              {/* Section Title */}
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>

              {/* Links List */}
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and Policy Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright Text */}
          <p className="text-gray-500 text-sm">
            Copyright {currentYear} — HireLoop
          </p>

          {/* Policy Links */}
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Terms & Policy
            </a>
            <span className="hidden md:block text-gray-700">-</span>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Privacy Guideline
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
