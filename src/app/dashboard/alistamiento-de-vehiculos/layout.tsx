import { PrepareDocumentProvider } from "@ncl/app/context/prepare-document-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrepareDocumentProvider>{children}</PrepareDocumentProvider>;
}
