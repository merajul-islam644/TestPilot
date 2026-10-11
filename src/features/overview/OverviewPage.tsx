import { Beaker, Plane } from "lucide-react";
import { useCurrentUser, userDisplayName } from "../profile/useCurrentUser";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { PageHeader } from "../../shared/ui/PageHeader";

export function OverviewPage() {
  const { t } = useT();
  const me = useCurrentUser();
  const name = userDisplayName(me.data?.data);

  return (
    <section>
      <PageHeader
        title={t("overview.title")}
        subtitle={name ? `${name} — ${t("overview.subtitle")}` : t("overview.subtitle")}
      />

      <div className="section-band">
        <div className="section-band-row">
          <Plane size={16} />
          <h3>{t("app.tagline")}</h3>
        </div>
        <p>
          Pick a project on the left to test a URL, or open <strong>Settings</strong> to set up your
          workspace. The sections in this sidebar are the same ones TestPilot uses every day.
        </p>
      </div>

      <div className="panel">
        <div className="panel-title"><Beaker size={16} /><span>How a session runs</span></div>
        <ol className="next-steps">
          <li><Beaker size={16} /><span>Add a <strong>project</strong> with a name and a target URL.</span></li>
          <li><Beaker size={16} /><span>Configure <strong>access</strong> so TestPilot can sign in if needed.</span></li>
          <li><Beaker size={16} /><span>Choose <strong>what to verify</strong> and start an exploration.</span></li>
          <li><Beaker size={16} /><span>Review generated tests, run them, raise findings from failures.</span></li>
        </ol>
      </div>
    </section>
  );
}