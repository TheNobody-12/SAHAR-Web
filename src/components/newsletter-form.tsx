"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export default function NewsletterForm({ variant = "light", className = "" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    } catch {
      setStatus("error");
    }
  };

  const inputBase = variant === "dark"
    ? "bg-white text-gray-900 placeholder:text-gray-500"
    : "bg-white text-gray-900 placeholder:text-gray-500";

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col md:flex-row gap-3 md:items-start">
        <div className="w-full md:max-w-xs">
          <label htmlFor="nl-name" className="sr-only">Name</label>
          <Input
            id="nl-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputBase}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={inputBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "nl-email-error" : undefined}
          />
          {errors.email && (
            <p id="nl-email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="shrink-0">
          <Button type="submit" className="bg-amber-400 text-black hover:bg-amber-500" disabled={status === "loading"}>
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
    </form>
  );
}

