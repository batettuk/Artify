"use client";

import { useActionState, useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { ContactFormState } from "@/api/forms/types/public";

const INITIAL_STATE: ContactFormState = { status: "idle", fieldErrors: {} };

interface ContactFormIslandProps {
  action: (
    state: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
  labels: {
    name: string;
    email: string;
    phone?: string;
    phonePlaceholder?: string;
    service?: string;
    serviceSelect?: string;
    serviceConsulting?: string;
    serviceCustom?: string;
    serviceCleanAir?: string;
    serviceMasterclass?: string;
    serviceGeneral?: string;
    message: string;
    messagePlaceholder?: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    invalidName: string;
    invalidEmail: string;
    invalidMessage: string;
  };
}

export function ContactFormIsland({ action, labels }: ContactFormIslandProps) {
  const [state, formAction, pending] = useActionState(action, INITIAL_STATE);
  const [selectedService, setSelectedService] = useState("");

  return (
    <div className="relative border border-slate-200/90 bg-white p-6 shadow-xl sm:p-10 lg:p-12 [clip-path:polygon(22px_0,100%_0,100%_100%,0_100%,0_22px)]">
      {/* Top-left chamfer geometric accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-b border-r border-[#0d1a46]/20 bg-slate-100/90 [clip-path:polygon(0_0,100%_0,0_100%)] opacity-80" />

      {/* Architectural Corner Crosshairs */}
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-xs text-slate-300 select-none">+</div>
      <div className="pointer-events-none absolute left-3 bottom-3 font-mono text-xs text-slate-300 select-none">+</div>
      <div className="pointer-events-none absolute right-3 bottom-3 font-mono text-xs text-slate-300 select-none">+</div>

      <div className="mb-8 border-b border-slate-100 pb-5">
        <span className="inline-block border border-[#0d1a46]/20 bg-[#0d1a46]/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d1a46]">
          Direct Inquiry Form
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-[#0d1a46] sm:text-3xl">
          {labels.submit ? "Submit Consultation Request" : "Request Consultation"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Fill out the details below to receive expert advice from our engineering team.
        </p>
      </div>

      {state.status === "success" ? (
        <div className="border border-emerald-500/30 bg-emerald-50/80 p-8 text-center text-emerald-950 shadow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="mt-5 font-display text-2xl font-bold text-emerald-900">
            Request Successfully Sent
          </h4>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-800">
            {labels.success}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-emerald-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
            <span>24-Hour Response Active</span>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#0d1a46]">
                {labels.name} <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                placeholder="John Doe"
                aria-invalid={state.fieldErrors.name === true}
                aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
                className={`mt-2 block w-full border bg-slate-50/50 px-4 py-3 text-sm text-[#0d1a46] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#0d1a46] ${
                  state.fieldErrors.name ? "border-rose-500 bg-rose-50/30" : "border-slate-200"
                }`}
              />
              {state.fieldErrors.name && (
                <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                  <AlertCircle size={13} />
                  {labels.invalidName}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#0d1a46]">
                {labels.phone || "Phone Number"}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={50}
                placeholder={labels.phonePlaceholder || "+976 9911 2233"}
                className="mt-2 block w-full border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-[#0d1a46] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#0d1a46]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#0d1a46]">
                {labels.email} <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="john@example.com"
                aria-invalid={state.fieldErrors.email === true}
                aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
                className={`mt-2 block w-full border bg-slate-50/50 px-4 py-3 text-sm text-[#0d1a46] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#0d1a46] ${
                  state.fieldErrors.email ? "border-rose-500 bg-rose-50/30" : "border-slate-200"
                }`}
              />
              {state.fieldErrors.email && (
                <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                  <AlertCircle size={13} />
                  {labels.invalidEmail}
                </p>
              )}
            </div>

            {/* Service / Solution Selector */}
            <div>
              <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#0d1a46]">
                {labels.service || "Area of Interest"}
              </label>
              <select
                id="service"
                name="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="mt-2 block w-full border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-[#0d1a46] outline-none transition-all focus:bg-white focus:border-[#0d1a46]"
              >
                <option value="">{labels.serviceSelect || "Select a solution type..."}</option>
                <option value="Consulting Services">{labels.serviceConsulting || "Consulting Services (Engineering & Project Management)"}</option>
                <option value="Custom Fabrication">{labels.serviceCustom || "Custom Fabrication (Bespoke Materials)"}</option>
                <option value="Clean Air Solutions (Zehnder)">{labels.serviceCleanAir || "Clean Air Solutions (Zehnder Smart Ventilation)"}</option>
                <option value="Masterclass (Block Academy)">{labels.serviceMasterclass || "Masterclass (Block Academy Training)"}</option>
                <option value="General Inquiry">{labels.serviceGeneral || "General Inquiry / Other Questions"}</option>
              </select>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#0d1a46]">
              {labels.message} <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={4000}
              placeholder={labels.messagePlaceholder || "Please describe your project location, scope, building requirements, or questions..."}
              aria-invalid={state.fieldErrors.message === true}
              aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
              className={`mt-2 block w-full border bg-slate-50/50 px-4 py-3 text-sm text-[#0d1a46] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#0d1a46] ${
                state.fieldErrors.message ? "border-rose-500 bg-rose-50/30" : "border-slate-200"
              }`}
            ></textarea>
            {state.fieldErrors.message && (
              <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                <AlertCircle size={13} />
                {labels.invalidMessage}
              </p>
            )}
          </div>

          {state.status === "error" && (
            <div className="flex items-center gap-2.5 border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{labels.error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-between bg-[#0d1a46] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-70 sm:w-auto sm:min-w-[240px]"
            >
              <span>{pending ? labels.submitting : labels.submit}</span>
              {pending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
