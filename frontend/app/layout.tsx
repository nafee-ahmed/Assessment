import { AuthContextProvider } from "./contexts/AuthContext";
import "./globals.css";

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
