import { Quicksand, Nunito_Sans } from "next/font/google";

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const fontClasses = `${quicksand.variable} ${nunitoSans.variable}`;
