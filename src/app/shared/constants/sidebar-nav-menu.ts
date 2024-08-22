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
    route: "/dashboard/alistamiento-de-vehiculos",
    icon: "today",
  },
  { label: "Empresas", route: "/dashboard/empresas", icon: "apartment" },
  { label: "Usuarios", route: "/dashboard/usuarios", icon: "group" },
];
