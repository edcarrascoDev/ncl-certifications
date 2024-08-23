"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import BackdropLoading from "@ncl/app/components/shared/backdrop-loading";
import SnackbarResponse from "@ncl/app/components/shared/snackbar-response";
import { SnackbarResponseType } from "@ncl/app/shared/types";

interface UiContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  snackbarData: SnackbarResponseType | null;
  setSnackbarData: (value: SnackbarResponseType) => void;
}
const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarResponseType | null>(
    null,
  );

  useEffect(() => {
    if (snackbarData?.open) {
      setTimeout(() => {
        setSnackbarData({ ...snackbarData, open: false });
      }, 6000);
    }
  }, [snackbarData]);

  return (
    <UiContext.Provider
      value={{ loading, setLoading, snackbarData, setSnackbarData }}
    >
      {children}
      <BackdropLoading open={loading} />
      <SnackbarResponse
        open={snackbarData?.open || false}
        message={snackbarData?.message}
        messageType={snackbarData?.messageType}
      />
    </UiContext.Provider>
  );
};

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
