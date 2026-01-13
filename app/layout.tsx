import { AuthProvider } from "@/context/StateContext";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
