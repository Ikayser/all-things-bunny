import './globals.css';

export const metadata = {
  title: 'All Things Bunnies - Your Daily Dose of Bunny Joy',
  description: 'Discover bunny jokes, famous rabbits, literature, habitat maps, adorable pictures, videos, adoption resources, and fun crafts!',
  keywords: 'bunnies, rabbits, bunny jokes, pet rabbits, rabbit adoption, bunny crafts',
  openGraph: {
    title: 'All Things Bunnies',
    description: 'Your daily dose of bunny joy, facts, and fun!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐰</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
