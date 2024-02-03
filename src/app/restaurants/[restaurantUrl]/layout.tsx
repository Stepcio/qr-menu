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
        {children}
      </body>
    </html>
  )
}