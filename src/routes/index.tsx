import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import logo from "@/assets/tynecxio-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TynecXio — Professional Portfolio Websites from ৳1499" },
      {
        name: "description",
        content:
          "Get a modern, mobile responsive portfolio website to showcase your skills, projects, and personal brand. Starting from only ৳1499.",
      },
      { property: "og:title", content: "TynecXio — Portfolio Websites from ৳1499" },
      {
        property: "og:description",
        content: "Modern, mobile responsive portfolio websites by TynecXio.",
      },
    ],
    links: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main
      className="min-h-screen w-full"
      style={{ background: "var(--gradient-bg)" }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="TynecXio logo" className="h-11 w-11 rounded-full object-contain" />
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            TynecXio
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-12 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Starting From Only ৳1499
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Build Your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              Professional Portfolio
            </span>{" "}
            Presence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Get a modern, mobile responsive portfolio website to showcase your skills, projects,
            and personal brand.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <LeadForm />
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TynecXio. All rights reserved.
      </footer>
    </main>
  );
}
