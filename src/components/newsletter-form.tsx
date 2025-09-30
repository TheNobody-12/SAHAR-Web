"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

export default function NewsletterForm({
  variant = "light",
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      // Dummy submission handler
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setName("");
      setEmail("");
      setErrors({});
      setToast({ type: "success", message: "Subscribed! Check your inbox to confirm." });
      setTimeout(() => setToast(null), 2500);
    } catch {
      setStatus("error");
      setToast({ type: "error", message: "Something went wrong. Please try again." });
      setTimeout(() => setToast(null), 2500);
    }
  };

  const inputBase =
    variant === "dark"
      ? "bg-white text-gray-900 placeholder:text-gray-500"
      : "bg-white text-gray-900 placeholder:text-gray-500";

  const onNameChange = (v: string) => {
    setName(v);
    if (v.trim()) setErrors((e) => ({ ...e, name: undefined }));
  };
  const onEmailChange = (v: string) => {
    setEmail(v);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setErrors((e) => ({ ...e, email: undefined }));
  };

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col md:flex-row gap-3 md:items-start">
        <div className="w-full md:max-w-xs">
          <label htmlFor="nl-name" className="sr-only">Name</label>
          <Input
            id="nl-name"
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Your name"
            className={`${inputBase} rounded-xl px-4 py-2 focus-visible:ring-rose-600 ${inputClassName}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "nl-name-error" : undefined}
          />
          {errors.name && (
            <p id="nl-name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div className="w-full md:max-w-sm">
          <label htmlFor="nl-email" className="sr-only">Email</label>
          <Input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Your email"
            className={`${inputBase} rounded-xl px-4 py-2 focus-visible:ring-rose-600 ${inputClassName}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "nl-email-error" : undefined}
          />
          {errors.email && (
            <p id="nl-email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="shrink-0">
          <Button
            type="submit"
            className={`bg-amber-400 text-black hover:bg-amber-500 rounded-xl px-6 py-2 ${buttonClassName}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </Button>
        </div>
      </div>
      {status === "success" && (
        <p className="mt-3 text-sm text-emerald-600">Thanks for subscribing! Check your inbox for a confirmation.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      {/* Simple toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[60] rounded-lg px-4 py-3 shadow-lg ${
            toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </form>
  );
}
