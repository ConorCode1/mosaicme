import { useRef, useState } from "react";
import DigitalGallery from "./DigitalGallery.jsx";
import { EMAIL, INSTAGRAM_URL, digitalOrder } from "./siteConfig.js";
import "./DigitalPage.css";

const questions = [
  {
    question: "How does a photo mosaic work?",
    answer:
      "Lots of smaller photos are arranged to form one larger image. From a distance, you see the main portrait. Look closer and you’ll find the individual memories that make it up. You choose up to three main images and we create a different mosaic for each.",
  },
  {
    question: "How many photos do I need?",
    answer:
      "There’s no fixed number. Send the collection you have and we’ll recommend a layout that works with it. We’ll let you know if a few more photos would help the result.",
  },
  {
    question: "How do I send you my photos?",
    answer: `Attach your photos to an email, or share a Google Drive folder with ${EMAIL}. Another accessible download link works too. Tell us which photos you want as the main pictures by describing them in your email or sending them separately. Check that we can view and download the files.`,
  },
  {
    question: "What will I receive?",
    answer:
      "Three separate mosaics, based on up to three different main images you choose. Each design comes in colour and black and white as high-resolution digital files. Keep them, share them or arrange your own printing. Printing and framing are not included. Let us know if you have a print size in mind.",
  },
  {
    question: "How long does it take?",
    answer:
      "Usually within 48 hours once we have your photos and have confirmed the order with you. Need it sooner for an engagement, birthday or another occasion? Let us know and we’ll do our best to expedite it. We’ll confirm your deadline by email.",
  },
  {
    question: "Can I ask for changes?",
    answer:
      "Yes. Unlimited revisions are included, so we can refine the designs with you. If you’re not happy with the final artwork, email us within 30 days of receiving it and we’ll refund what you paid.",
  },
];

function InstagramLink() {
  return (
    <a
      className="instagram-link"
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
      </svg>
      Instagram<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function DigitalPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site digital-page" id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeMenu();
            menuButton.current?.focus();
          }
        }}
      >
        <div className="navbar wrap">
          <a href="/" className="logo" aria-label="Mosaic Me home">
            mosaic<span>me</span>
          </a>
          <nav
            id="digital-navigation"
            className={`nav-links ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#gallery" onClick={closeMenu}>
              Gallery
            </a>
            <a href="#how-to-order" onClick={closeMenu}>
              How to order
            </a>
            <a href="#digital-questions" onClick={closeMenu}>
              FAQs
            </a>
            <a href="/">Live events</a>
            <InstagramLink />
          </nav>
          <div className="nav-actions">
            <a href={digitalOrder} className="button button-small button-dark">
              Order now
            </a>
            <button
              ref={menuButton}
              type="button"
              id="menu-button"
              className="menu-button"
              aria-controls="digital-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "Close" : "Menu"}
              <span
                className={`menu-icon ${menuOpen ? "is-open" : ""}`}
                aria-hidden="true"
              >
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section
          className="digital-product-hero wrap"
          aria-labelledby="digital-product-title"
        >
          <p className="eyebrow">Personalised digital photo mosaics</p>
          <h1 id="digital-product-title">
            Your moments.
            <br />
            <span>One bigger picture.</span>
          </h1>
          <p className="digital-product-intro">
            Your favourite photos, brought together to form a larger portrait. A
            personal gift for an engagement, wedding or anniversary, filled with
            the moments that make it theirs.
          </p>
          <div className="digital-product-actions">
            <a href={digitalOrder} className="button button-dark">
              Order now
            </a>
            <p className="digital-product-price">
              Three mosaics from <strong>€29</strong>
            </p>
          </div>
        </section>

        <DigitalGallery />

        <section
          className="digital-gift-section"
          aria-labelledby="digital-gift-title"
        >
          <div className="wrap digital-gift-layout">
            <div>
              <p className="eyebrow">For their next chapter</p>
              <h2 id="digital-gift-title">Their story makes the best gift.</h2>
              <p>
                The first trip away. The friends who were there. The little
                moments they’ve forgotten you captured. Give a newly engaged
                couple something full of their story, or celebrate a wedding,
                birthday or another year together.
              </p>
            </div>
            <div className="digital-three-offer">
              <h3>
                Three favourite photos.
                <br />
                Three different mosaics.
              </h3>
              <p>
                Choose up to three main images. We’ll create a separate mosaic
                for each, using your collection of smaller photos. Every design
                comes in colour and black and white.
              </p>
              <p className="digital-craft-note">
                Personally refined for clear faces, balanced colours and a
                picture that comes together beautifully.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section wrap digital-order-section"
          id="how-to-order"
          aria-labelledby="order-title"
        >
          <div className="digital-order-heading">
            <h2 id="order-title">Simple to order. Personal to give.</h2>
            <p>
              Click Order now to open an email with the details ready to fill
              in.
            </p>
          </div>
          <ol className="digital-order-steps">
            <li>
              <span className="order-step-number" aria-hidden="true">
                01
              </span>
              <h3>Pick your main photos.</h3>
              <p>
                Choose up to three photos for the bigger pictures. Tell us which
                ones you’ve chosen in your email, or send them separately.
              </p>
            </li>
            <li>
              <span className="order-step-number" aria-hidden="true">
                02
              </span>
              <h3>Share the memories.</h3>
              <p>
                Attach your smaller photos, or send a Google Drive folder or
                download link we can open. Include the occasion and any
                deadline.
              </p>
            </li>
            <li>
              <span className="order-step-number" aria-hidden="true">
                03
              </span>
              <h3>We’ll bring them together.</h3>
              <p>
                We’ll confirm the order, create your designs and share a
                preview. Usually ready within 48 hours. Need it sooner? Just
                ask.
              </p>
            </li>
          </ol>
          <div className="digital-order-next">
            <a href={digitalOrder} className="button button-dark">
              Order now
            </a>
          </div>
        </section>

        <section
          className="section wrap digital-questions-section"
          id="digital-questions"
          aria-labelledby="digital-questions-title"
        >
          <div className="questions-layout">
            <div>
              <h2 id="digital-questions-title">Frequently asked questions.</h2>
              <p className="questions-intro">
                Anything else? <a href={`mailto:${EMAIL}`}>Send us an email</a>{" "}
                and we’ll help.
              </p>
            </div>
            <div className="faq-list">
              {questions.map(({ question, answer }) => (
                <details key={question} className="faq-item">
                  <summary>
                    {question}
                    <span className="toggle-symbol" aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="digital-final-section"
          aria-labelledby="digital-final-title"
        >
          <div className="wrap digital-final-inner">
            <h2 id="digital-final-title">Make their next gift personal.</h2>
            <p>Three mosaics from €29, each in colour and black and white.</p>
            <a href={digitalOrder} className="button button-dark">
              Order now
            </a>
            <p className="digital-file-note">
              High-resolution digital files. Printing and framing are separate.
            </p>
            <p className="digital-final-promise">
              Unlimited revisions included, with a 30-day money-back promise.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div>
              <a href="/" className="logo" aria-label="Mosaic Me home">
                mosaic<span>me</span>
              </a>
              <p>Small moments. Big picture.</p>
              <div className="instagram-footer">
                <InstagramLink />
              </div>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="/">Live events</a>
              <a href="#gallery">Gallery</a>
              <a href="#how-to-order">How to order</a>
              <a href={`mailto:${EMAIL}`}>Get in touch</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Mosaic Me</span>
            <span>Ireland</span>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
