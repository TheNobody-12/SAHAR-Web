"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  placeholder?: string;
  className?: string;
  variant?: "light" | "dark";
};

export default function FeedbackForm({
  title = "Send us your feedback",
  placeholder = "Your message (comments, suggestions, corrections)…",
  className = "",
  variant = "light",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!isEmail(email)) next.email = "Enter a valid email.";
    if (!message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setStatus("loading");
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    variant === "dark"
      ? "bg-white text-gray-900 placeholder:text-gray-500"
      : "bg-white text-gray-900 placeholder:text-gray-500";

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label htmlFor="fb-name" className="sr-only">Name</label>
          <Input
            id="fb-name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "fb-name-error" : undefined}
            className={`${inputBase}`}
            required
          />
          {errors.name && <p id="fb-name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="fb-email" className="sr-only">Email</label>
          <Input
            id="fb-email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "fb-email-error" : undefined}
            className={`${inputBase}`}
            required
          />
          {errors.email && <p id="fb-email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="fb-message" className="sr-only">Message</label>
        <textarea
          id="fb-message"
          rows={4}
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "fb-message-error" : undefined}
          className="w-full rounded-md border border-input bg-white text-gray-900 placeholder:text-gray-500 px-3 py-2"
          required
        />
        {errors.message && <p id="fb-message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>
      <div className="mt-4">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send feedback"}
        </Button>
        {status === "success" && (
          <span className="ml-3 text-sm text-emerald-600">Thanks! We received your feedback.</span>
        )}
        {status === "error" && (
          <span className="ml-3 text-sm text-red-600">Something went wrong. Please try again.</span>
        )}
      </div>
    </form>
  );
}

