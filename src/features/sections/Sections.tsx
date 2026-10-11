import { BarChart3, BookOpen, Code2, Flag, FolderKanban, ListChecks, MonitorSmartphone, PlayCircle, Settings } from "lucide-react";
import { SectionPage } from "./SectionPage";

export function ProjectsPage() {
  return <SectionPage title="Projects" icon={<FolderKanban size={20} />} description="One application under test, with its environments, targets and runs." />;
}

export function TestRunsPage() {
  return <SectionPage title="Test Runs" icon={<PlayCircle size={20} />} description="Every execution: exploration, suite run, or single file." />;
}

export function TestSuitesPage() {
  return <SectionPage title="Test Suites" icon={<ListChecks size={20} />} description="Named groups of tests that run together on demand." />;
}

export function CodeWorkspacePage() {
  return (
    <SectionPage
      title="Code Workspace"
      icon={<Code2 size={20} />}
      description="Edit generated tests, search, run individual files."
    >
      <div className="desktop-hint">
        <MonitorSmartphone size={16} />
        <span>Best experienced on desktop — line numbers and side panels need a wider viewport.</span>
      </div>
    </SectionPage>
  );
}

export function FindingsPage() {
  return <SectionPage title="Findings" icon={<Flag size={20} />} description="Defects raised from verified failures, with reproduction and evidence." />;
}

export function ReportsPage() {
  return <SectionPage title="Reports" icon={<BarChart3 size={20} />} description="HTML, PDF summary, JSON result or Playwright project ZIP." />;
}

export function SettingsPage() {
  return <SectionPage title="Settings" icon={<Settings size={20} />} description="Workspace, members, browser defaults and retention." />;
}

export function HelpPage() {
  return <SectionPage title="Help" icon={<BookOpen size={20} />} description="Guides and shortcuts." />;
}