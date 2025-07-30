import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import DotGridBackground from '@/components/DotGridBackground';

export const metadata = {
  title: 'JavaPVP – Minecraft Server',
  description: 'Join JavaPVP, a custom lifesteal Minecraft server!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white font-sans antialiased min-h-screen relative">
        {/* Background dots */}
        <DotGridBackground />

        {/* Main content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
