import "./style.css";

export const metadata = {
  title: "AI Factory HQ",
  description: "AI workforce operating system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
