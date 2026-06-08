import { Chip } from "@heroui/react";

// Maps status → HeroUI Chip color
const STATUS_COLOR = {
  Active: "success",
  Closed: "danger",
  Draft: "warning",
};

export default function JobStatusBadge({ status }) {
  return (
    <Chip
      color={STATUS_COLOR[status] ?? "default"}
      variant="flat"
      size="sm"
      className="capitalize font-medium"
    >
      {status}
    </Chip>
  );
}
