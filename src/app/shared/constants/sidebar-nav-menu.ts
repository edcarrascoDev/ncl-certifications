import { RoleEnum } from "@ncl/app/shared/enums";
import { ROUTES } from "./routes";

export interface SidebarNavMenuProps {
  label: string;
  route: string;
  icon: string;
  roleToDisplay?: RoleEnum;
}
export const SIDEBAR_NAV_MENU: SidebarNavMenuProps[] = [
  { label: "Dashboard", route: ROUTES.DASHBOARD, icon: "dashboard" },
  {
    label: "Alistamiento de vehículos",
    route: ROUTES.CARS_PREPARE,
    icon: "today",
  },
  {
    label: "Alistamientos",
    route: ROUTES.COMPANIES_REPORT,
    icon: "apartment",
  },
  { label: "Empresas", route: ROUTES.COMPANIES, icon: "apartment" },
  { label: "Usuarios", route: ROUTES.USERS, icon: "group" },
];
