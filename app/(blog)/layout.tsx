import './globals.css'
import Navbar from '../components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* Removed <html> & <body> because <html> cannot appear as a child of <body> */
    <>
      <Navbar />
      {children}
      <footer className='fixed bottom-0 p-5 w-full bg-slate-800 text-white text-center'>
        Developed by Suhail Sheikh &copy; 2023
      </footer>
    </>
  )
}
