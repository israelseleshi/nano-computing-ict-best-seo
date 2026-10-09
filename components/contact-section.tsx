"use client";

import { useState, type FormEvent } from "react";
import FlipTitle from "@/components/flip-title";

const fields = [
  { id: "name", label: "Full name", type: "text", placeholder: "Enter your full name", autoComplete: "name" },
  { id: "email", label: "Email address", type: "email", placeholder: "Enter your email address", autoComplete: "email" },
  { id: "company", label: "Company", type: "text", placeholder: "Enter your company name", autoComplete: "organization" },
] as const;

interface Detail {
  label: string;
  value: string;
  href?: string;
  paths: string[];
}

const details: Detail[] = [
  {
    label: "Email",
    value: "info@nanocomputingict.com",
    href: "mailto:info@nanocomputingict.com",
    paths: [
      "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    ],
  },
  {
    label: "Phone",
    value: "+251 923 78 78 78",
    href: "tel:+251923787878",
    paths: [
      "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    ],
  },
  {
    label: "Office",
    value: "Rayuma Building, Airport Road",
    paths: [
      "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
      "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z",
    ],
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
      {/* Details */}
      <div className="flex flex-col justify-center">
        {/* Static h1: the primary heading must not change under a crawler.
            The rotating brand line moved into the paragraph below. */}
        <h1 className="text-left text-4xl font-black tracking-tight text-black md:text-5xl">
          Contact us in Addis Ababa
        </h1>

        <p className="mt-5 max-w-md text-left text-base leading-relaxed text-zinc-600">
          <FlipTitle
            words={[
              "Talk to our team.",
              "Talk to our office.",
              "Talk to our engineers.",
            ]}
            className="px-0 font-medium text-zinc-700"
          />{" "}
          Tell us what you need and we will come back with something that
          actually works. Whether it is a single camera or a whole building
          wired up, we will tell you honestly what it takes.
        </p>

        <ul className="mt-8 flex flex-col gap-1">
          {details.map((detail) => {
            const body = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 transition-colors duration-200 group-hover:bg-zinc-200">
                  <svg
                    className="h-[18px] w-[18px] text-zinc-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {detail.paths.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                    {detail.label}
                  </span>
                  <span className="mt-1 text-[15px] font-medium tracking-tight text-zinc-900">
                    {detail.value}
                  </span>
                </span>
              </>
            );

            const shared =
              "group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors duration-200";

            return (
              <li key={detail.label}>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className={`${shared} hover:bg-zinc-50 active:scale-[0.97] transition-transform duration-100`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={shared}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="relative mt-12 w-full">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
            We are here
          </span>
          <iframe
            title="Nano Computing ICT Solutions location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6769968845338!2d38.767092074654975!3d9.00183938941426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b0052a4f3d%3A0x10401dbee19b1be2!2snano%20computing%20ICT%20solution%20CCTV%20Security%20camera%20installation%20In%20Ethiopia%20%2F%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1790965988291!5m2!1sen!2set"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-64 w-full rounded-xl"
          />
        </div>
      </div>

      {/* Form card */}
      <div className="relative rounded-3xl bg-zinc-100 p-2">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-8 h-40 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(212,212,216,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,212,216,0.55) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 80% 60% at 80% 0%, #000 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 80% 0%, #000 20%, transparent 70%)",
          }}
        />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col gap-5 rounded-2xl bg-zinc-50 p-6 sm:p-10"
        >
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-zinc-900"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                className="w-full rounded-md border-0 bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-1 ring-zinc-200 transition placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-900">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Enter your message"
              className="w-full resize-none rounded-md border-0 bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-1 ring-zinc-200 transition placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="mt-1 w-fit rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-60"
          >
            {status === "idle" && "Submit"}
            {status === "sending" && "Sending"}
            {status === "sent" && "Message sent"}
          </button>

          <p aria-live="polite" className="sr-only">
            {status === "sent"
              ? "Thanks. We will get back to you shortly."
              : ""}
          </p>
        </form>
      </div>
    </div>
  );
}