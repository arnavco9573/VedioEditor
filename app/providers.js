import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return <HeroUIProvider theme="light">{children}</HeroUIProvider>;
}
