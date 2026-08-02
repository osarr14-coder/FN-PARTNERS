import { LoginForm } from "./login-form";

export const metadata = { title: "Connexion" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="font-heading text-lg font-semibold text-ink-950">FN Partners</p>
        <p className="mt-1 text-sm text-slate-500">Espace administrateur</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
