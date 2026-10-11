import { Search } from "lucide-react";

export function TopBarSearch() {
  return (
    <label className="topbar-search">
      <Search size={16} />
      <input
        type="search"
        aria-label="Search projects, runs, findings"
        autoComplete="off"
      />
      <span className="kbd">/</span>
    </label>
  );
}