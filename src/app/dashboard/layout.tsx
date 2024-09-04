"use client";
import Button from "@ncl/app/components/shared/button";
import { SIDEBAR_NAV_MENU, SidebarNavMenuProps } from "@ncl/app/shared";
import { Icon, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { removeSession } from "@ncl/app/actions/auth-actions";
import { signOut } from "@ncl/app/lib/firebase/auth";
import { UserProvider, useUser } from "@ncl/app/context/user-context";
import { RoleEnum } from "@ncl/app/shared/enums";
import { UserData } from "@ncl/app/shared/models";
import { CompanyProvider } from "@ncl/app/context/company-context";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <CompanyProvider>
        <Layout>{children}</Layout>
      </CompanyProvider>
    </UserProvider>
  );
}

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const handleSignOut = async () => {
    await signOut();
    await removeSession();
  };
  return (
    <div className="dashboard">
      <aside
        id="default-sidebar"
        className={`dashboard-aside ${!isSidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
        aria-label="Sidebar"
      >
        <div
          className="dashboard-aside-backdrop"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="relative z-20 h-full flex flex-col px-3 py-4 w-72 overflow-y-auto bg-primary">
          <div className="text-white absolute top-2 right-3 sm:hidden">
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Icon className="text-white">close</Icon>
            </IconButton>
          </div>
          <Image
            className="mx-auto mb-6 md:mb-8"
            src="/logo.svg"
            alt="NCL Certificaciones Logo"
            width={120}
            height={24}
            priority
          />
          <ul className="dashboard-nav">
            {SIDEBAR_NAV_MENU.map((item) => (
              <li
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                key={item.route}
              >
                <ActiveLink navItem={item} user={user} />
              </li>
            ))}
          </ul>
          <Button
            className={"justify-self-end"}
            color={"light"}
            onClick={() => handleSignOut()}
            startIcon={"logout"}
          >
            Salir
          </Button>
        </div>
      </aside>

      <div className="sm:hidden py-2 px-3 flex items-center gap-4">
        <IconButton
          color="primary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Image
          src="/logo.svg"
          alt="NCL Certificaciones Logo"
          width={60}
          height={45}
          priority
        />
      </div>

      <div className="p-4 sm:ml-72 print:ml-0">
        <div className="p-4">
          <div className="dashboard__container">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ActiveLink({
  navItem,
  user,
}: {
  navItem: SidebarNavMenuProps;
  user: UserData | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(navItem.route);
  };

  return !["Empresas", "Usuarios"].includes(navItem.label) ||
    user?.role === RoleEnum.admin ? (
    <a
      href={navItem.route}
      onClick={handleClick}
      className={`dashboard-menu-item ${pathname === navItem.route && "dashboard-menu-item--active"}`}
    >
      <Icon fontSize={"small"}>{navItem.icon}</Icon>
      <span>{navItem.label}</span>
    </a>
  ) : null;
}
