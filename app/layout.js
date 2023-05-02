import { manrope } from "./fonts";
import "./globals.css";
// import { Providers } from "./store/provider";
import { Providers } from "@/context/ContextProvider";

export const metadata = {
  title: "Blascounter",
  description: "TikTok accounts nimble marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Blascounter</title>
      </head>
      <body
        className={manrope.className}
        style={{
          overflowX: "hidden",
        }}
      >
        <div className="dec__1" />
        <div className="dec__2" />
        <div className="dec__3" />
        <div className="dec__4" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
