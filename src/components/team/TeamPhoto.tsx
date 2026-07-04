import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/team";

interface TeamPhotoProps {
  member: TeamMember;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { container: "h-16 w-16", text: "text-lg", px: 64 },
  md: { container: "h-20 w-20", text: "text-2xl", px: 80 },
  lg: { container: "h-32 w-32", text: "text-3xl", px: 128 },
};

export function TeamPhoto({ member, size = "md", className = "" }: TeamPhotoProps) {
  const s = sizes[size];
  const initials = member.name.split(" ").map((n) => n[0]).join("");

  if (member.photo) {
    return (
      <div className={`relative ${s.container} shrink-0 overflow-hidden rounded-full ${className}`}>
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes={`${s.px}px`}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex ${s.container} shrink-0 items-center justify-center rounded-full bg-cream font-serif ${s.text} text-navy ${className}`}
    >
      {initials}
    </div>
  );
}

interface CredentialBadgeProps {
  credentials: string;
  className?: string;
}

export function CredentialBadge({ credentials, className = "" }: CredentialBadgeProps) {
  if (!credentials) return null;
  return (
    <span className={`text-gold ${className}`}>, {credentials}</span>
  );
}

interface AdvisorCardProps {
  member: TeamMember;
  showBio?: boolean;
}

export function AdvisorCard({ member, showBio = true }: AdvisorCardProps) {
  const yearsAtMS = new Date().getFullYear() - parseInt(member.marketStreetSince);
  const yearsIndustry = new Date().getFullYear() - parseInt(member.industrySince);

  return (
    <article className="rounded-2xl border border-border bg-white p-8 transition-all hover:border-gold/30 hover:shadow-lg">
      <div className="flex items-start gap-5">
        <TeamPhoto member={member} size="lg" />
        <div>
          <h3 className="font-serif text-xl text-navy">
            {member.name}
            <CredentialBadge credentials={member.credentials} />
          </h3>
          <p className="text-sm text-muted">{member.title}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
            <span>{yearsAtMS}+ years at Market Street</span>
            <span aria-hidden="true">·</span>
            <span>{yearsIndustry}+ years in industry</span>
          </div>
        </div>
      </div>
      {showBio && (
        <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
      )}
      {member.certifications && (
        <p className="mt-3 text-xs">
          <span className="font-semibold text-navy">Certifications:</span>{" "}
          <span className="text-muted">{member.certifications}</span>
        </p>
      )}
      {member.specialties.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {member.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-cream px-3 py-1 text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
