import type { RouteGroup } from "~/types";

const resourcesRoutes: RouteGroup[] = [
  {
    name: "Manage",
    routes: [
      {
        name: "People",
        to: "/x/resources/people",
      },
      {
        name: "Contractors",
        to: "/x/resources/contractors",
      },
      {
        name: "Equipment",
        to: "/x/resources/equipment",
      },
      {
        name: "Facilities",
        to: "/x/resources/facilities",
      },
      {
        name: "Crews",
        to: "/x/resources/crews",
      },
    ],
  },
  {
    name: "Configure",
    routes: [
      {
        name: "Abilities",
        to: "/x/resources/abilities",
      },
      {
        name: "Attributes",
        to: "/x/resources/attributes",
      },
      {
        name: "Departments",
        to: "/x/resources/departments",
      },
      {
        name: "Holidays",
        to: "/x/resources/holidays",
      },
      {
        name: "Locations",
        to: "/x/resources/locations",
      },
      {
        name: "Shifts",
        to: "/x/resources/shifts",
      },
      {
        name: "Work Cells",
        to: "/x/resources/work-cells",
      },
    ],
  },
];

export default function useResourcesSidebar() {
  return { groups: resourcesRoutes };
}
