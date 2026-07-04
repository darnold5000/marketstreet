"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  inquiryType: string;
  lifePhase: string;
  message: string;
  website: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  inquiryType: "general",
  lifePhase: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData(initialFormData);

      if (typeof window !== "undefined" && "gtag" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "form_submission", {
          event_category: "conversion",
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="font-serif text-xl text-navy">Thank you for reaching out!</h3>
        <p className="mt-3 text-muted">
          A member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-navy">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-navy">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-navy">
            How can we help?
          </label>
          <select
            id="inquiryType"
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="general">General Inquiry</option>
            <option value="becoming-client">Becoming A Client</option>
            <option value="careers">Careers</option>
          </select>
        </div>
        <div>
          <label htmlFor="lifePhase" className="mb-2 block text-sm font-medium text-navy">
            What phase of life are you in?
          </label>
          <select
            id="lifePhase"
            value={formData.lifePhase}
            onChange={(e) => setFormData({ ...formData, lifePhase: e.target.value })}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="">Select...</option>
            <option value="young-professional">Young Professional</option>
            <option value="mid-career">Mid-Career</option>
            <option value="pre-retiree">Pre-Retiree</option>
            <option value="retiree">Retiree</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg border border-border px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-50 sm:w-auto"
        data-track="form_submission"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
