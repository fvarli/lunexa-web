export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-semibold tracking-tight">
            Lunexa
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#work" className="transition-colors hover:text-foreground">
              What We Build
            </a>
            <a href="#principles" className="transition-colors hover:text-foreground">
              Principles
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Digital craftsmanship
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Simple. Fast.
            <br />
            <span className="text-accent">Intelligent.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            We design and build mobile and web applications with clarity,
            precision, and purpose.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get in Touch
            </a>
            <a
              href="#about"
              className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* ── About / Brand Story ── */}
        <section id="about" className="border-t border-border/50 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Our Story
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Born from light and scale
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Lunexa comes from <em>Luna</em> — the moon, a symbol of clarity in
              darkness — and <em>exa</em>, representing exponential scale. We
              exist to bring calm, focused technology to a noisy world.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Every product we build starts with a single question: does this
              make life simpler? If it doesn&apos;t, we rethink it.
            </p>
          </div>
        </section>

        {/* ── What We Build ── */}
        <section id="work" className="border-t border-border/50 bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                What We Build
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Products that move with purpose
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface-light p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Mobile Applications</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Native and cross-platform apps built for performance,
                  reliability, and delightful user experiences.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-light p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Web Platforms</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Fast, accessible, and SEO-optimized web applications that
                  scale from startup to enterprise.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-light p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Intelligent Systems</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Smart integrations and automation that reduce complexity and
                  let teams focus on what matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Principles ── */}
        <section id="principles" className="border-t border-border/50 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Principles
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Why Lunexa
              </h2>
            </div>
            <div className="mt-16 grid gap-12 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Clarity over complexity</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  We believe the best software feels invisible. No clutter, no
                  confusion — just solutions that work the way you expect.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Speed as a feature</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Performance is not an afterthought. Every millisecond matters.
                  We ship fast products built on fast foundations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Craft at every layer</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  From database schemas to pixel-level UI details, we treat
                  every layer of the stack with the same care and attention.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Global by default</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  We build products that work for people everywhere —
                  accessible, performant, and culturally aware from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section className="border-t border-border/50 bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Coming Soon
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Something new is on the horizon
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We are preparing our first wave of products. Stay close — the
              launch is near.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              In development
            </div>
          </div>
        </section>

        {/* ── Contact (UI only) ── */}
        <section id="contact" className="border-t border-border/50 py-24 sm:py-32">
          <div className="mx-auto max-w-xl px-6">
            <div className="text-center">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Contact
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mt-4 text-muted">
                Have a project in mind or just want to say hello? We&apos;d love to
                hear from you.
              </p>
            </div>
            <form className="mt-12 space-y-6" action="#">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-muted">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Lunexa. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a
              href="mailto:hello@uselunexa.com"
              className="transition-colors hover:text-foreground"
            >
              hello@uselunexa.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
