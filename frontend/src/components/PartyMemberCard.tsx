import { StatusBadge } from "./StatusBadge";
import type { PartyMember } from "../types/party";

export type { PartyMember };

export function PartyMemberCard({ member }: { member: PartyMember }) {
  const initials = member.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl items-center overflow-hidden">
      <div className="w-30 h-30 overflow-hidden bg-[var(--color-cream)] text-[var(--color-sage-700)] flex items-center justify-center font-serif text-xl">
        {member.imageName ? (
          <img
            src={`guests/${member.imageName}.jpg`}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0 flex-1 items-center px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="font-serif text-xl text-[var(--color-ink)]">
            {member.name}
          </div>
          <StatusBadge status={member.status} size="sm" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-sage-600)] mt-0.5">
          {member.role}
        </div>
        {member.description && (
          <div className="text-sm text-[var(--color-ink-soft)] mt-2 leading-relaxed">
            {member.description}
          </div>
        )}
      </div>
    </div>
  );
}
