import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { PartyMemberCard } from "../components/PartyMemberCard";
import { fetchPartyMembers } from "../api/party";
import type { PartyMember } from "../types/party";

type Status = "loading" | "ready" | "error";

export function Party() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<PartyMember[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    fetchPartyMembers()
      .then((data) => {
        console.log(data);
        if (!cancelled) {
          setMembers(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow={t("home.eyebrow")}
        title={t("party.title")}
        subtitle={t("party.subtitle")}
      />
      {status === "loading" && (
        <p className="text-center text-[var(--color-muted)]">
          {t("common.loading")}
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-[var(--color-rose-deep)]">
          {t("party.loadError")}
        </p>
      )}
      {status === "ready" && members.length === 0 && (
        <p className="text-center text-[var(--color-muted)]">
          {t("party.empty")}
        </p>
      )}
      {status === "ready" && members.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {members.map((m) => (
            <PartyMemberCard key={m.name} member={m} />
          ))}
        </div>
      )}
    </div>
  );
}
