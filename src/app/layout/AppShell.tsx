import { Menu, PanelLeft, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { NotificationsMenu } from "./NotificationsMenu";
import { RunStatusIndicator } from "./RunStatusIndicator";
import { ThemeToggle } from "./ThemeToggle";
import { TopBarSearch } from "./TopBarSearch";
import { UserMenu } from "./UserMenu";
import { WorkspaceSelector } from "./WorkspaceSelector";
import { navFooterItems, navItems } from "./navItems";
import { useT } from "../../lib/i18n/LocalizationProvider";

const COLLAPSED_KEY = "testpilot:sidebar-collapsed";
const MOBILE_QUERY = "(max-width: 880px)";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => typeof window === "undefined" ? false : window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function NavLink({
  active,
  collapsed,
  href,
  icon: Icon,
  label,
  onNavigate
}: {
  active: boolean;
  collapsed: boolean;
  href: string;
  icon: typeof Plane;
  label: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <a
      href={href}
      data-tooltip={label}
      className={`nav-link${active ? " active" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );
}

export function AppShell({ activePath, children, onNavigate }: { activePath: string; children: ReactNode; onNavigate: (path: string) => void }) {
  const isMobile = useIsMobile();
  const [collapsedPref, setCollapsedPref] = useState(() => localStorage.getItem(COLLAPSED_KEY) === "true");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useT();

  // On mobile the sidebar slides in as a drawer; the collapse preference is
  // kept separately for desktop.
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) localStorage.setItem(COLLAPSED_KEY, String(collapsedPref));
  }, [collapsedPref, isMobile]);

  function closeDrawer() {
    if (isMobile) setDrawerOpen(false);
  }

  function handleNavigate(path: string) {
    onNavigate(path);
    closeDrawer();
  }

  const collapsed = isMobile ? false : collapsedPref;
  const sidebarClass = [
    "sidebar",
    !isMobile && collapsed ? "collapsed" : "",
    isMobile && drawerOpen ? "drawer-open" : ""
  ].filter(Boolean).join(" ");

  const activeItem =
    [...navItems, ...navFooterItems].find((item) => item.href === activePath) ?? navItems[0];

  return (
    <div className="shell">
      {isMobile ? <div className={`sidebar-backdrop${drawerOpen ? " open" : ""}`} onClick={closeDrawer} /> : null}
      <aside className={sidebarClass} aria-label="Primary navigation">
        <div className="sidebar-header">
          {!isMobile && collapsed ? (
            <span className="brand">
              <span className="brand-mark"><Plane size={16} /></span>
            </span>
          ) : (
            <a className="brand" href="/" onClick={(event) => { event.preventDefault(); handleNavigate("/"); }}>
              <span className="brand-mark"><Plane size={16} /></span>
              <span>{t("app.name")}</span>
            </a>
          )}
          {!isMobile ? (
            <button
              className="icon-button compact sidebar-collapse-toggle"
              onClick={() => setCollapsedPref((value) => !value)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft size={16} />
            </button>
          ) : null}
        </div>
        <nav className="sidebar-nav">
          {isMobile || !collapsed ? <span className="sidebar-section-label">{t("nav.workspaceSection")}</span> : null}
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              active={activePath === item.href}
              collapsed={collapsed && !isMobile}
              href={item.href}
              icon={item.icon}
              label={t(item.labelKey)}
              onNavigate={handleNavigate}
            />
          ))}
          {isMobile || !collapsed ? (
            <>
              <span className="sidebar-divider" />
              <span className="sidebar-section-label">{t("nav.accountSection")}</span>
            </>
          ) : (
            <span className="sidebar-divider" />
          )}
          {navFooterItems.map((item) => (
            <NavLink
              key={item.href}
              active={activePath === item.href}
              collapsed={collapsed && !isMobile}
              href={item.href}
              icon={item.icon}
              label={t(item.labelKey)}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </aside>
      <div className="content">
        <header className="topbar">
          <button
            className="icon-button compact topbar-mobile-toggle"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <WorkspaceSelector />
          <TopBarSearch />
          <span className="topbar-spacer" />
          <RunStatusIndicator />
          <NotificationsMenu />
          <ThemeToggle />
          <UserMenu onNavigate={handleNavigate} />
          <span className="sr-only">{t("app.name")}</span>
        </header>
        <main>{children}</main>
      </div>
      {!isMobile && activeItem ? (
        <span className="sr-only"><activeItem.icon size={14} /> {t(activeItem.labelKey)}</span>
      ) : null}
    </div>
  );
}