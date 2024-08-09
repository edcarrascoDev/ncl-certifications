"use client";
import Button from "@ncl/app/components/shared/button";
import { SIDEBAR_NAV_MENU, SidebarNavMenuProps } from "@ncl/app/shared";
import { Icon } from "@mui/material";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { removeSession } from "@ncl/app/actions/auth-actions";
import { signOut } from "@ncl/app/lib/firebase/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleSignOut = async () => {
    await signOut();
    await removeSession();
  };

  return (
    <div className="dashboard">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-primary">
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
              <li key={item.route}>
                <ActiveLink navItem={item} />
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

      <div className="p-4 sm:ml-72">
        <div className="p-4">
          <div className="dashboard__container">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ActiveLink({ navItem }: { navItem: SidebarNavMenuProps }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(navItem.route);
  };

  return (
    <a
      href={navItem.route}
      onClick={handleClick}
      className={`dashboard-menu-item ${pathname === navItem.route && "dashboard-menu-item--active"}`}
    >
      <Icon fontSize={"small"}>{navItem.icon}</Icon>
      <span>{navItem.label}</span>
    </a>
  );
}
