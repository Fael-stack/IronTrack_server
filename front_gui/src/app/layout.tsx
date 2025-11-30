import './globals.css'; 
import Header from '../components/Header/Header'; 

export const metadata = {
  title: 'Iron Track',
  description: 'Seu app fitness',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
