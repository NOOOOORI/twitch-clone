import { Logo } from "./_components/logo";
import { InAppBrowserBanner } from "@/components/in-app-browser-banner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
      <Logo />
      <InAppBrowserBanner />
      {children}
    </div>
  );
};

export default AuthLayout;
