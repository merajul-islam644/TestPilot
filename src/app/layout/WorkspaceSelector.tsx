import { Building2, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import { blocksClient } from "../../lib/blocks/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../shared/ui/dropdown-menu";

type WorkspaceEntry = {
  itemId: string;
  name: string;
  isDefault?: boolean;
};

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";
}

export function WorkspaceSelector() {
  const { status } = useAuth();
  const organizationsQuery = useQuery({
    enabled: status === "authenticated",
    queryFn: async () => {
      const response = await blocksClient.iam.organizations.my();
      const list = (response as { data?: unknown }).data ?? response;
      if (!Array.isArray(list)) return [] as WorkspaceEntry[];
      return list.map((raw: Record<string, unknown>) => {
        const itemId = String(raw.itemId ?? raw.id ?? "");
        const name = String(
          raw.name ??
          raw.organizationName ??
          raw.displayName ??
          (itemId || "Workspace")
        );
        return { itemId, name, isDefault: Boolean(raw.isDefault) };
      });
    },
    queryKey: ["iam", "organizations", "my"]
  });

  const entries: WorkspaceEntry[] = organizationsQuery.data ?? [];
  const current = entries.find((entry) => entry.isDefault) ?? entries[0];
  const label = current?.name ?? "No workspace";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="workspace-switcher"
        aria-label="Switch workspace"
        disabled={status !== "authenticated"}
      >
        <span className="workspace-mark">{current ? initialsOf(current.name) : "—"}</span>
        <span className="workspace-name">{label}</span>
        <ChevronsUpDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[240px]">
        <DropdownMenuLabel>
          <span className="muted"><Building2 size={14} /> Workspaces</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {entries.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
            <p>No workspaces yet.</p>
            <p className="muted">An admin will add you to one.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <DropdownMenuItem key={entry.itemId} disabled aria-disabled>
              <span className="workspace-mark">{initialsOf(entry.name)}</span>
              <span className="flex-1 truncate">{entry.name}</span>
              {entry.isDefault ? <span className="muted">Current</span> : null}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}