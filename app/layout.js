import './globals.css';

export const metadata = {
  title: 'All Things Bunnies',
  description: 'Your daily dose of bunny joy, facts, and fun!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
