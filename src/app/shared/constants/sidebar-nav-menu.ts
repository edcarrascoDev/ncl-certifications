import { RoleEnum } from "@ncl/app/shared/enums";

export interface SidebarNavMenuProps {
  label: string;
  route: string;
  icon: string;
  roleToDisplay?: RoleEnum;
}
export const SIDEBAR_NAV_MENU: SidebarNavMenuProps[] = [
  { label: "Dashboard", route: "/dashboard", icon: "dashboard" },
  {
    label: "Alistamiento de vehículos",
    route: "/dashboard/alistamientos-de-vehiculos",
    icon: "today",
  },
  { label: "Usuarios", route: "/dashboard/usuarios", icon: "group" },
];
