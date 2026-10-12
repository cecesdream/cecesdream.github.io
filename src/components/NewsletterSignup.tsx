import ZeffyForm from "./ZeffyForm";

const ZEFFY_NEWSLETTER_FORM = "/en-US/embed/newsletter-form/sign-up-for-our-newsletter-4519";

/**
 * The newsletter band above the footer, on every page. The form is Zeffy's
 * and draws its own white card inside an iframe (its fonts, corners and
 * button colour are set in Zeffy's form editor, not here); this band gives it
 * the site's own heading and copy beside it.
 */
export default function NewsletterSignup() {
  return (
    <section id="newsletter" className="bg-surface border-t border-border scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5">
          <h4 className="text-[12px] font-bold uppercase tracking-[3px] text-accent mb-4">Stay Connected</h4>
          <h2 className="serif text-[32px] md:text-[42px] italic text-text leading-[1.1] mb-4">
            News from the classroom.
          </h2>
          <p className="text-[16px] text-text-dim leading-[1.6]">
            Stories from our students in Liberia, school-year updates, and what your support made possible. Occasional emails; unsubscribe any time.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ZeffyForm formPath={ZEFFY_NEWSLETTER_FORM} title="Newsletter sign-up powered by Zeffy" fallbackHeight={280} />
        </div>
      </div>
    </section>
  );
}
