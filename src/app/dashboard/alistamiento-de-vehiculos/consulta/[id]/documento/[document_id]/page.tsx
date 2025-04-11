"use client";
import PrepareDocumentItem from "@ncl/app/components/dashboard/prepare-documents/prepare-document-item";

export default function Page({ params }: { params: { document_id: string } }) {
  return <PrepareDocumentItem documentId={params.document_id} />;
}
