import type { Metadata } from "next";
import { Inter, Kantumruy_Pro, Poppins } from "next/font/google";
import "./globals.css";
import NextUILayout from "./NextUIProvider";
import NavbarComponent from "@/components/layouts/navbar/NavbarComponent";
import { Suspense } from "react";
import LoadingComponent from "./loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import StyledJsxRegistry from "./registry";
import FooterComponent from "@/components/layouts/footer/FooterComponent";


export const metadata: Metadata = {
  title: {
    template: "%s - LoveShop",
    default: "LoveShop",
  },
  description: "This is description for LoveShop",
  keywords: ["shop", "ecommerce", "sell","product"],
  openGraph: {
    title: {
      template: "%s - LoveShop",
      default: "LoveShop",
    },
    description: "This is descriptiop for LoveShop",
    images: [
      "https://i.pinimg.com/564x/05/29/bf/0529bfbf4f10c2e8134192d237269dbc.jpg",
    ],
  },
};


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

const kantumruy_pro = Kantumruy_Pro({
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-kantumruy-pro",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${kantumruy_pro.variable}`}>
        <NextUILayout>
          <StyledJsxRegistry>
            <NavbarComponent />
            <Suspense fallback={<LoadingComponent />}>
              <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
            </Suspense>
            <FooterComponent/>
          </StyledJsxRegistry>
        </NextUILayout>
      </body>
    </html>
  );
}
