"use client";
import {
  PrepareDocument,
  PrepareDocumentsRequestParams,
} from "@ncl/app/shared/models";
import React, { createContext, useContext, useState } from "react";

interface PrepareDocumentContextType {
  document: PrepareDocument | null;
  documents: PrepareDocument[] | null;
  requestParams: PrepareDocumentsRequestParams;
  setDocument: React.Dispatch<React.SetStateAction<PrepareDocument | null>>;
  setDocuments: React.Dispatch<React.SetStateAction<PrepareDocument[] | null>>;
  setRequestParams: React.Dispatch<
    React.SetStateAction<PrepareDocumentsRequestParams>
  >;
}

const PrepareDocumentContext = createContext<
  PrepareDocumentContextType | undefined
>(undefined);

export const PrepareDocumentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [document, setDocument] = useState<PrepareDocument | null>(null);
  const [documents, setDocuments] = useState<PrepareDocument[] | null>(null);
  const [requestParams, setRequestParams] =
    useState<PrepareDocumentsRequestParams>({
      start: null,
      end: null,
      plate: "",
    });

  return (
    <PrepareDocumentContext.Provider
      value={{
        documents,
        setDocuments,
        document,
        setDocument,
        requestParams,
        setRequestParams,
      }}
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
