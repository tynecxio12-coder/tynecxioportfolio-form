import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// EmailJS configuration — replace with your real values
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  profession: string;
  website_type: string;
  message: string;
};

const initial: FormState = {
  full_name: "",
  email: "",
  phone: "",
  profession: "",
  website_type: "Portfolio Website",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.profession || !form.website_type) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...form },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm(initial);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-smooth hover:shadow-[var(--shadow-elegant)] sm:p-10">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Email Address" required>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Phone Number" required>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+880 1XXX XXXXXX"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Profession / Current Role" required>
            <input
              name="profession"
              value={form.profession}
              onChange={handleChange}
              placeholder="Designer, Developer, Student..."
              className={inputCls}
              required
            />
          </Field>
        </div>

        <Field label="What type of website do you need?" required>
          <select
            name="website_type"
            value={form.website_type}
            onChange={handleChange}
            className={inputCls}
            required
          >
            <option>Portfolio Website</option>
            <option>Business Website</option>
            <option>Landing Page</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Message / Requirements">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us a bit about your project (optional)"
            rows={4}
            className={inputCls}
          />
        </Field>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-smooth hover:scale-[1.02] hover:shadow-[0_25px_70px_-15px_oklch(0.55_0.18_245/0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          style={{ background: "var(--gradient-hero)" }}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </button>

        {status === "success" && (
          <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span>Thank you! Your request has been submitted. We will contact you soon.</span>
          </div>
        )}
        {status === "error" && errorMsg && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
            <span>{errorMsg}</span>
          </div>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
