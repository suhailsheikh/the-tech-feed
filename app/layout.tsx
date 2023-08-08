import './globals.css'

export const metadata = {
  title: 'The Tech Feed',
  description: 'Welcome to The Tech Feed!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
