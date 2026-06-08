"use client";

import { Card, Input, Select, Label, ListBox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const STATUS_OPTIONS = ["All", "Active", "Closed", "Draft"];
const CATEGORY_OPTIONS = ["All", "Development", "Design", "Marketing", "Sales"];

export default function JobsFilters({
  search,
  statusFilter,
  categoryFilter,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}) {
  return (
    <Card className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/50">
      <Card.Content>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input — no validation needed, use Input directly */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
              <FiSearch size={15} />
            </span>
            <Input
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              fullWidth
              className="pl-9"
            />
          </div>

          {/* Status filter */}
          <div className="w-full sm:w-44">
            <Select
              value={statusFilter}
              onChange={(val) => onStatusChange(val ?? "All")}
              fullWidth
            >
              <Label>Status</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {STATUS_OPTIONS.map((s) => (
                    <ListBox.Item key={s} id={s} textValue={s}>
                      {s}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Category filter */}
          <div className="w-full sm:w-48">
            <Select
              value={categoryFilter}
              onChange={(val) => onCategoryChange(val ?? "All")}
              fullWidth
            >
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {CATEGORY_OPTIONS.map((c) => (
                    <ListBox.Item key={c} id={c} textValue={c}>
                      {c === "All" ? "All Categories" : c}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
