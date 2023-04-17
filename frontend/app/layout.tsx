import { AuthContextProvider } from "./contexts/AuthContext";
import "./globals.css";

// layout pages can have logic that you want the consecutive child pages
// to inherit such as it can be a navbar.
// here the provider since i want all the child pages from here
// to inherit the context
export const metadata = {
  title: "Students Club",
  description: "Connecting students to clubs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
