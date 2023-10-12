export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="background-light850_dark100 relative">{children}</main>
  );
}
