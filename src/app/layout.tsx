import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
