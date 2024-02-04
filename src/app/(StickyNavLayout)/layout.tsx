import Navbar from '@/components/layout/navbar/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>{children}</main>
    </>
  )
}