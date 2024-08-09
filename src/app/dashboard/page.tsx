"use client";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@ncl/app/lib/firebase/firebase.config";
import { Skeleton } from "@mui/material";

export default function DashboardPage() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {loading ? (
        <Skeleton width={400} />
      ) : (
        <span>Bienvenido {user?.email}</span>
      )}
    </div>
  );
}
