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
    id: "carmel",
    name: "Carmel Office",
    address: "8450 North Bridge Parkway, Suite 200",
    city: "Carmel",
    state: "IN",
    zip: "46032",
    phone: "(317) 555-0148",
    hours: "Monday – Friday: 8:00 AM – 5:00 PM",
    mapUrl:
      "https://maps.google.com/?q=8450+North+Bridge+Parkway+Suite+200+Carmel+IN+46032",
  },
  {
    id: "greenwood",
    name: "Greenwood Office",
    address: "1520 County Line Road, Suite 110",
    city: "Greenwood",
    state: "IN",
    zip: "46143",
    phone: "(317) 555-0163",
    hours: "Monday – Friday: 8:00 AM – 5:00 PM",
    mapUrl:
      "https://maps.google.com/?q=1520+County+Line+Road+Suite+110+Greenwood+IN+46143",
  },
];
