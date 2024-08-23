"use client";
import { CompanyData } from "@ncl/app/shared/models";
import React, { createContext, useContext, useState } from "react";

interface CompanyContextType {
  company: CompanyData | null;
  setCompany: React.Dispatch<React.SetStateAction<CompanyData | null>>;
  companies: CompanyData[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyData[]>>;
  currentCompany: CompanyData | null;
  setCurrentCompany: React.Dispatch<React.SetStateAction<CompanyData | null>>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [currentCompany, setCurrentCompany] = useState<CompanyData | null>(
    null,
  );

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        companies,
        setCompanies,
        currentCompany,
        setCurrentCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a UserProvider");
  }
  return context;
};
