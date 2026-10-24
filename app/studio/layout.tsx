/** The studio has no site header, footer or intro loader; those live in app/(site)/layout.tsx. */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="studio-root">{children}</div>;
}
