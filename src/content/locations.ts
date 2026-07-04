export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  mapUrl: string;
}

export const locations: Location[] = [
  {
    id: "indianapolis",
    name: "Indianapolis Office",
    address: "3105 East 98th Street, Suite 170",
    city: "Indianapolis",
    state: "IN",
    zip: "46280",
    phone: "(317) 552-0505",
    hours: "Monday – Friday: 7:30 AM – 4:00 PM",
    mapUrl:
      "https://maps.google.com/?q=3105+East+98th+Street+Suite+170+Indianapolis+IN+46280",
  },
  {
    id: "crawfordsville",
    name: "Crawfordsville Office",
    address: "120 South Green Street",
    city: "Crawfordsville",
    state: "IN",
    zip: "47933",
    phone: "(317) 860-1085",
    hours: "Monday – Friday: 7:30 AM – 4:00 PM",
    mapUrl:
      "https://maps.google.com/?q=120+South+Green+Street+Crawfordsville+IN+47933",
  },
];
