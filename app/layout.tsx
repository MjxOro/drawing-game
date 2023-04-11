import './globals.css';
import { Providers } from './GlobalRedux/provider';
import ProtectedRoute from '../components/ProtectedRoute';

export const metadata = {
  title: 'Ai Guessing Drawing Game',
  description: 'Be Creative!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
          </Providers>
      </body>
    </html>
  );
}
