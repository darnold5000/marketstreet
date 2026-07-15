export interface ClientLoginLink {
  label: string;
  href: string;
  icon: string;
}

export const clientLoginLinks: ClientLoginLink[] = [
  {
    label: "Client Portal",
    href: "#",
    icon: "lock",
  },
  {
    label: "Schwab",
    href: "https://client.schwab.com/Areas/Access/Login",
    icon: "building",
  },
  {
    label: "The Standard",
    href: "https://login.standard.com/",
    icon: "shield",
  },
  {
    label: "RightCapital",
    href: "https://app.rightcapital.com/account/login",
    icon: "chart",
  },
];
