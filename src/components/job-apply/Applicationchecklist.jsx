import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";

// Renders a single checklist item — green if done, gray if not
const CheckItem = ({ label, checked }) => (
  <div className="flex items-center gap-2.5">
    {checked ? (
      <HiOutlineCheckCircle className="text-green-400 text-base shrink-0" />
    ) : (
      <HiOutlineXCircle className="text-gray-600 text-base shrink-0" />
    )}
    <span className={`text-sm ${checked ? "text-gray-300" : "text-gray-500"}`}>
      {label}
    </span>
  </div>
);

// Receives real-time check states from the parent form (Client Component)
// This component itself is pure UI — no state
const ApplicationChecklist = ({ hasResume, hasName, hasEmail }) => {
  const allDone = hasResume && hasName && hasEmail;

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
        Application Checklist
      </p>

      <div className="space-y-2.5">
        <CheckItem label="Full name provided" checked={hasName} />
        <CheckItem label="Email address provided" checked={hasEmail} />
        <CheckItem label="Resume attached (PDF)" checked={hasResume} />
      </div>

      {allDone && (
        <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
          <p className="text-green-300 text-xs font-medium">
            ✓ Ready to submit your application
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationChecklist;
