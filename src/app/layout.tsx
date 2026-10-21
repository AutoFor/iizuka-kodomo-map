import type { Metadata, Viewport } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  preload: false,
  variable: "--font-zen-maru",
});

export const metadata: Metadata = {
  title: "いいづか こどもマップ",
  description:
    "飯塚市で「地域で子どもを支える」お店・居場所・支援サービスを地図で探せます。子ども食堂、無料学習支援、高校生の居場所など。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2E8B57",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`h-full ${zenMaru.variable}`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
