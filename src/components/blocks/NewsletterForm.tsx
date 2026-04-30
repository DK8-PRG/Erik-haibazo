"use client";

import { useState, useTransition } from "react";
import { subscribeEmail } from "@/app/[lang]/(site)/actions/subscribe";

type NewsletterFormProps = {
  ctaLabel: string;
  placeholder: string;
  locale: string;
  successMsg: string;
  alreadyMsg: string;
  invalidMsg: string;
  errorMsg: string;
};

// =============================================================================
// NewsletterForm — client komponenta. Volá Server Action `subscribeEmail`.
//   - useTransition pro pending state
//   - feedback inline pod formem (success / error)
// =============================================================================
export function NewsletterForm({
  ctaLabel,
  placeholder,
  locale,
  successMsg,
  alreadyMsg,
  invalidMsg,
  errorMsg,
}: NewsletterFormProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    text: string;
    tone: "ok" | "err";
  } | null>(null);

  return (
    <form
      action={(fd) => {
        setMessage(null);
        fd.append("locale", locale);
        startTransition(async () => {
          const res = await subscribeEmail(fd);
          if (res.ok) {
            setMessage({
              text: res.alreadyExists ? alreadyMsg : successMsg,
              tone: "ok",
            });
          } else {
            setMessage({
              text: res.error === "invalid_email" ? invalidMsg : errorMsg,
              tone: "err",
            });
          }
        });
      }}
      className="w-full"
    >
      {/* Honeypot — skrytý field, lidé ho nevyplní, boti ano. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 transition focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-gold sm:text-base"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-night transition hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          {pending ? "..." : ctaLabel}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${
            message.tone === "ok" ? "text-gold" : "text-red-400"
          }`}
          role="status"
        >
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
