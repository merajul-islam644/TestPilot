import {
  BarChart3,
  Code2,
  Flag,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  PlayCircle,
  Settings
} from "lucide-react";
import type { TranslationKey } from "../../lib/i18n/dictionary";

export type NavItem = {
  href: string;
  labelKey: TranslationKey;
  icon: typeof LayoutDashboard;
};

export const navItems: readonly NavItem[] = [
  { href: "/", labelKey: "nav.overview", icon: LayoutDashboard },
  { href: "/projects", labelKey: "nav.projects", icon: FolderKanban },
  { href: "/test-runs", labelKey: "nav.testRuns", icon: PlayCircle },
  { href: "/test-suites", labelKey: "nav.testSuites", icon: ListChecks },
  { href: "/code", labelKey: "nav.code", icon: Code2 },
  { href: "/findings", labelKey: "nav.findings", icon: Flag },
  { href: "/reports", labelKey: "nav.reports", icon: BarChart3 }
] as const;

export const navFooterItems: readonly NavItem[] = [
  { href: "/settings", labelKey: "nav.settings", icon: Settings },
  { href: "/help", labelKey: "nav.help", icon: HelpCircle }
] as const;