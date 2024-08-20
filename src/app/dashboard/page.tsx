"use client";
import { useUser } from "@ncl/app/context/user-context";
import { Skeleton } from "@mui/material";
import UserProfile from "@ncl/app/components/dashboard/user-profile";
import UserPassword from "@ncl/app/components/dashboard/user-password-form";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="w-full max-w-[900px] grid lg:grid-cols-2 gap-3">
      {user ? (
        <>
          <UserProfile user={user} />
          <UserPassword user={user} />
        </>
      ) : (
        <>
          <Skeleton width="100%" height={400} sx={{ transformOrigin: "top" }} />
          <Skeleton width="100%" height={400} sx={{ transformOrigin: "top" }} />
        </>
      )}
    </div>
  );
}
