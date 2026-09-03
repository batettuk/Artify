"use client";

import { useActionState } from "react";
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
    message: string;
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

  return (
    <form
      action={formAction}
      className="rounded-none bg-card p-6 shadow-sm lg:rounded-none lg:p-10"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            aria-invalid={state.fieldErrors.name === true}
            aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
            className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
          {state.fieldErrors.name ? (
            <p id="name-error" className="mt-1 text-sm text-destructive">
              {labels.invalidName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            {labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            aria-invalid={state.fieldErrors.email === true}
            aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
            className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
          />
          {state.fieldErrors.email ? (
            <p id="email-error" className="mt-1 text-sm text-destructive">
              {labels.invalidEmail}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            {labels.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={4000}
            aria-invalid={state.fieldErrors.message === true}
            aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
            className="mt-2 block w-full rounded-none border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
          ></textarea>
          {state.fieldErrors.message ? (
            <p id="message-error" className="mt-1 text-sm text-destructive">
              {labels.invalidMessage}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-6 text-sm font-medium" aria-live="polite">
        {state.status === "success" ? (
          <span className="text-success">{labels.success}</span>
        ) : state.status === "error" ? (
          <span className="text-destructive">{labels.error}</span>
        ) : null}
      </p>

      {state.status !== "success" ? (
        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-none bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          {pending ? labels.submitting : labels.submit}
        </button>
      ) : null}
    </form>
  );
}
