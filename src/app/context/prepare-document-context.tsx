"use client";
import { PrepareDocument } from "@ncl/app/shared/models";
import React, { createContext, useContext, useState } from "react";

interface PrepareDocumentContextType {
  document: PrepareDocument | null;
  documents: PrepareDocument[] | null;
  setDocument: React.Dispatch<React.SetStateAction<PrepareDocument | null>>;
  setDocuments: React.Dispatch<React.SetStateAction<PrepareDocument[] | null>>;
}

const PrepareDocumentContext = createContext<
  PrepareDocumentContextType | undefined
>(undefined);

export const PrepareDocumentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [document, setDocument] = useState<PrepareDocument | null>(null);
  const [documents, setDocuments] = useState<PrepareDocument[] | null>(null);

  return (
    <PrepareDocumentContext.Provider
      value={{ documents, setDocuments, document, setDocument }}
    >
      {children}
    </PrepareDocumentContext.Provider>
  );
};

export const usePrepareDocument = () => {
  const context = useContext(PrepareDocumentContext);
  if (context === undefined) {
    throw new Error(
      "usePrepareDocument must be used within a PrepareDocumentProvider",
    );
  }

  return context;
};
