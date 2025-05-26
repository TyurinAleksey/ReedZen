"use client";

import Header from "./shared/components/Header";
import "@app/shared/style/globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeWrapper from "./shared/components/ThemeWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeWrapper>
            <Header />
            {children}
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}
