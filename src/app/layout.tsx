import '@/app/styles/globals.css'
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={roboto.className}>
      <head></head>
      <body className="bg-dark text-light">
        <header>
          <nav className="fixed top-0 inset-x-0 h-[40px] flex justify-between">
            <div className="name">QR Menu</div>
            <div className="collapse"></div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}