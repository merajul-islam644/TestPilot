import { Bell, CheckCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../shared/ui/dropdown-menu";

// The notifications bell sits in the top bar per the look & feel. The shell
// reads from the SDK and would render real notifications as soon as the runs
// pipeline emits lifecycle events; until then the menu stays at its empty
// state. The bell does not pretend to have data it doesn't.
export function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="icon-button compact" aria-label="Notifications">
        <Bell size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[320px]">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Bell size={14} /> Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
          <CheckCheck size={22} className="text-[hsl(var(--muted-foreground))]" />
          <p className="text-sm font-medium">You're all caught up</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">No new notifications right now.</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}