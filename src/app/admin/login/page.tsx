import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-3xl font-medium">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">For the Askale team only.</p>
      <LoginForm />
    </div>
  );
}
