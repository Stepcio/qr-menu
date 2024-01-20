import './styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-dark text-light">
        <header>
          <nav className="sticky bg-light top-0 inset-x-0 h-[20px] flex justify-between">
            <div className="name">QR Menu</div>
            <div className="collapse"></div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}