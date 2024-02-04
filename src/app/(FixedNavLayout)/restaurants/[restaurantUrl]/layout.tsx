import Navbar from '@/components/layout/navbar/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Navbar fixed/>
      </header>
      <main>{children}</main>
    </>
  )
}