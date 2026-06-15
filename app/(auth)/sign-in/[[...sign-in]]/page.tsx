import { SignIn } from "@clerk/nextjs";

import { LastLoginHint } from "@/components/auth/last-login-hint";

export default function Page() {
  return (
    <div className="space-y-4">
      <LastLoginHint />
      <SignIn />
    </div>
  );
}
