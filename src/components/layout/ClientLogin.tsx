import { Icon, type IconName } from "@/components/icons";
import { clientLoginLinks } from "@/content/client-login";

function ExternalLoginLink({
  label,
  href,
  icon,
  className = "",
  onDark = false,
  onClick,
}: {
  label: string;
  href: string;
  icon: IconName;
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        onDark
          ? "text-white/70 hover:bg-white/10 hover:text-white"
          : "text-foreground/80 hover:bg-cream hover:text-navy"
      } ${className}`}
    >
      <Icon name={icon} size={16} className={onDark ? "text-gold" : "text-gold"} />
      <span className="flex-1 font-medium">{label}</span>
      <Icon name="external-link" size={14} className={onDark ? "text-white/40" : "text-muted"} />
    </a>
  );
}

export function ClientLoginDropdown() {
  return (
    <details className="relative hidden sm:block">
      <summary className="cursor-pointer list-none rounded-full border-2 border-navy/15 bg-transparent px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy/30 hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-1.5">
          Client Login
          <Icon name="chevron-down" size={16} className="opacity-60" />
        </span>
      </summary>
      <div className="absolute top-full right-0 z-50 min-w-[240px] pt-2">
        <div className="rounded-xl border border-border bg-white py-2 shadow-lg">
          <p className="px-4 py-2 text-xs font-semibold tracking-wider text-muted uppercase">
            Client portals
          </p>
          {clientLoginLinks.map((link) => (
            <ExternalLoginLink
              key={link.href}
              label={link.label}
              href={link.href}
              icon={link.icon as IconName}
              className="mx-1"
            />
          ))}
        </div>
      </div>
    </details>
  );
}

export function ClientLoginMobileSection({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <details className="border-t border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-3 text-sm font-medium text-navy [&::-webkit-details-marker]:hidden">
        Client Login
        <Icon name="chevron-down" size={16} className="text-muted" />
      </summary>
      <div className="space-y-0.5 px-3 pb-3">
        {clientLoginLinks.map((link) => (
          <ExternalLoginLink
            key={link.href}
            label={link.label}
            href={link.href}
            icon={link.icon as IconName}
            onClick={onLinkClick}
          />
        ))}
      </div>
    </details>
  );
}

export function ClientLoginFooterLinks() {
  return (
    <ul className="space-y-2">
      {clientLoginLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Icon name={link.icon as IconName} size={14} className="text-gold" />
            {link.label}
            <Icon name="external-link" size={12} className="text-white/40" />
          </a>
        </li>
      ))}
    </ul>
  );
}
