import { AuthProvider } from "@/context/StateContext";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { getUserFromCookie } from "@/lib/getUserFromCookie";
import "./globals.css";
import { User } from "@/types/types";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getUserFromCookie();

  // Convert Date to string
  const user: User | null = data?.user
    ? {
        ...data.user,
        createdAt: data.user.createdAt.toISOString(),
      }
    : null;

  return (
    <html lang="en">
      <body>
        <AuthProvider initialUser={user}>
          <Navbar />
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
