import './globals.css'; // ou onde estiver seu CSS global
import Header from '../components/Header/Header'; // ajuste o caminho se necessário

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
