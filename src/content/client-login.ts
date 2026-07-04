export interface ClientLoginLink {
  label: string;
  href: string;
  icon: string;
}

export const clientLoginLinks: ClientLoginLink[] = [
  {
    label: "Client Portal",
    href: "https://login.orionadvisor.com/login.html?g=2906eee2-0fda-4e8d-b1c3-bf8a3c3de815",
    icon: "lock",
  },
  {
    label: "Schwab",
    href: "https://client.schwab.com/Areas/Access/Login?&kc=y&sim=y",
    icon: "building",
  },
  {
    label: "The Standard",
    href: "https://login.standard.com/?goto=https:%2F%2Fwww3.standard.com%2Fportal_default%2F",
    icon: "shield",
  },
  {
    label: "KTrade",
    href: "https://www.ktradeonline.com/Account-Access/",
    icon: "trending",
  },
  {
    label: "RightCapital",
    href: "https://app.rightcapital.com/account/login",
    icon: "chart",
  },
];
