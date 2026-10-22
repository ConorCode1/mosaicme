import { useRef, useState } from "react";
import "./App.css";
import heroMosaic from "./assets/images/hero-mosaic.jpg";
import finalMosaic from "./assets/images/final-mosaic.jpg";
import guestTakingPhoto from "./assets/images/guest-taking-photo.jpg";
import tilePrinting from "./assets/images/tile-printing.jpg";
import guestPlacingTile from "./assets/images/guest-placing-tile.jpg";

// These are your existing pictures. Swap the imports above when new photos are ready.
const EMAIL = "mosaicmeevents@gmail.com";
// Stand-in until your Instagram profile URL is ready. Used in the menu and footer.
const INSTAGRAM_URL = "https://www.instagram.com/";

// Replace these four sources with your digital mosaic photos when ready.
const digitalPhotos = [
  { src: finalMosaic, alt: "A personalised photo mosaic portrait" },
  {
    src: heroMosaic,
    alt: "A mosaic made from a collection of favourite photographs",
  },
  {
    src: guestPlacingTile,
    alt: "A close-up of individual photographs within a mosaic",
  },
  {
    src: guestTakingPhoto,
    alt: "A finished mosaic bringing photo memories together",
  },
];

function emailLink(subject, lines) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}

const weddingEnquiry = emailLink("Mosaic Me | Wedding enquiry", [
  "Hi Mosaic Me,",
  "",
  "I'd love to find out more about a photo mosaic for our wedding.",
  "",
  "Wedding date:",
  "Venue / location:",
  "Approximate guest numbers:",
  "Anything else you should know:",
  "",
  "My name:",
  "Thanks!",
]);
const eventEnquiry = emailLink("Mosaic Me | Event enquiry", [
  "Hi Mosaic Me,",
  "",
  "I'd love to find out more about a live photo mosaic for an event.",
  "",
  "Event type:",
  "Event date:",
  "Venue / location:",
  "Approximate guest numbers:",
  "Anything else you should know:",
  "",
  "My name:",
  "Thanks!",
]);
const digitalEnquiry = emailLink("Mosaic Me | Digital mosaic enquiry", [
  "Hi Mosaic Me,",
  "",
  "I'd love to find out more about a personalised digital mosaic.",
  "",
  "Occasion / who it is for:",
  "When I need it:",
  "What I have in mind:",
  "",
  "My name:",
  "Thanks!",
]);

const steps = [
  {
    number: "01",
    title: "Capture",
    image: guestTakingPhoto,
    alt: "Photo mosaic at a wedding reception",
    description:
      "Guests take a photo during the event, creating individual moments that become part of something bigger.",
  },
  {
    number: "02",
    title: "Print",
    image: tilePrinting,
    alt: "Wedding photo mosaic made from individual printed tiles",
    description:
      "Each image is transformed into its own physical photo tile, ready to take its place on the mosaic.",
  },
  {
    number: "03",
    title: "Reveal",
    image: guestPlacingTile,
    alt: "A guest adding a photo tile to the wedding mosaic",
    description:
      "Guests find their tile’s position and add it themselves as the final artwork gradually comes to life.",
  },
];
const questions = [
  {
    question: "Can we choose the main picture?",
    answer:
      "Yes. A favourite photo of the two of you is a great place to start. We’ll help you choose an image that works well as a mosaic.",
  },
  {
    question: "How many photos can we include?",
    answer:
      "There’s no single photo count. We’ll suggest a layout to suit your guest numbers and chosen image. Digital mosaics can be designed around the photo collection you have.",
  },
  {
    question: "Do we keep the finished mosaic?",
    answer:
      "Yes. The finished artwork is a keepsake from your day. We’ll agree the size, finish and practical details with you when planning your booking.",
  },
  {
    question: "What do you need from our venue?",
    answer:
      "We’ll agree the space, access and power needed with you and your venue before the day. Include your venue in your enquiry and we can talk through a suitable setup.",
  },
  {
    question: "How do we check availability and get a quote?",
    answer:
      "Email us your wedding date, venue and approximate guest numbers. We’ll confirm availability and put together a quote with the setup, running time and finished artwork clearly explained.",
  },
  {
    question: "Can I order a digital mosaic without booking an event?",
    answer:
      "Absolutely. Digital mosaics are a separate service. You send us your photos and we create the artwork for you. We’ll confirm the price, timing and how to share your pictures by email.",
  },
  {
    question: "Where do you travel for events?",
    answer:
      "Mosaic Me is based in Ireland. Send us your venue and date and we’ll confirm availability and any travel arrangements.",
  },
];

function InstagramLink({ className = "", children = "Instagram", onClick }) {
  return (
    <a
      className={`instagram-link ${className}`}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
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
      <span>{children}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function DigitalCarousel() {
  const track = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);

  function goToPhoto(index) {
    const next = Math.max(0, Math.min(digitalPhotos.length - 1, index));
    const slide = track.current?.children[next];
    if (!slide) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.current.scrollTo({
      left: slide.offsetLeft,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  function updateActivePhoto(event) {
    const element = event.currentTarget;
    const closest = Array.from(element.children).reduce(
      (nearest, slide, index, slides) =>
        Math.abs(slide.offsetLeft - element.scrollLeft) <
        Math.abs(slides[nearest].offsetLeft - element.scrollLeft)
          ? index
          : nearest,
      0,
    );
    setActivePhoto(closest);
  }

  return (
    <div
      className="mosaic-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Digital mosaic examples"
    >
      <div
        ref={track}
        className="carousel-track"
        id="digital-photo-track"
        tabIndex={0}
        onScroll={updateActivePhoto}
        aria-label="Mosaic photos. Swipe, or use the previous and next controls."
        onKeyDown={(event) => {
          const destinations = {
            ArrowRight: activePhoto + 1,
            ArrowLeft: activePhoto - 1,
            Home: 0,
            End: digitalPhotos.length - 1,
          };
          if (Object.hasOwn(destinations, event.key)) {
            event.preventDefault();
            goToPhoto(destinations[event.key]);
          }
        }}
      >
        {digitalPhotos.map((photo, index) => (
          <div
            className="carousel-slide"
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${index + 1} of ${digitalPhotos.length}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-step"
          aria-controls="digital-photo-track"
          disabled={activePhoto === 0}
          onClick={() => goToPhoto(activePhoto - 1)}
        >
          Previous
        </button>
        <div
          className="carousel-dots"
          role="group"
          aria-label="Choose a mosaic photo"
        >
          {digitalPhotos.map((_, index) => (
            <button
              type="button"
              key={index}
              className="carousel-dot"
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={activePhoto === index}
              aria-controls="digital-photo-track"
              onClick={() => goToPhoto(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="carousel-step"
          aria-controls="digital-photo-track"
          disabled={activePhoto === digitalPhotos.length - 1}
          onClick={() => goToPhoto(activePhoto + 1)}
        >
          Next
        </button>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Photo {activePhoto + 1} of {digitalPhotos.length}
      </p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site" id="top">
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
          <a
            href="#top"
            className="logo"
            aria-label="Mosaic Me home"
            onClick={closeMenu}
          >
            mosaic<span>me</span>
          </a>
          <nav
            id="primary-navigation"
            className={`nav-links ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#how-it-works" onClick={closeMenu}>
              How it works
            </a>
            <a href="#weddings" onClick={closeMenu}>
              Weddings
            </a>
            <a
              href="#digital-mosaics"
              className="digital-nav-link"
              onClick={closeMenu}
            >
              Digital mosaics
            </a>
            <a href="#pricing" onClick={closeMenu}>
              Pricing
            </a>
            <a href="#questions" onClick={closeMenu}>
              FAQs
            </a>
            <InstagramLink onClick={closeMenu} />
          </nav>
          <div className="nav-actions">
            <a
              href={weddingEnquiry}
              className="button button-small button-dark"
            >
              Get a quote
            </a>
            <button
              ref={menuButton}
              type="button"
              id="menu-button"
              className="menu-button"
              aria-controls="primary-navigation"
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
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Live photo mosaics for unforgettable events
            </p>
            <h1 id="hero-title">
              Your moments.
              <br />
              <span>One bigger picture.</span>
            </h1>
            <p className="hero-description">
              Mosaic Me turns hundreds of individual photos into one incredible
              piece of art, created live by the people who make your event
              special.
            </p>
            <div className="button-row">
              <a href={weddingEnquiry} className="button button-accent">
                Get a wedding quote
              </a>
              <a href="#how-it-works" className="button button-outline">
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-image-frame">
            <img
              src={heroMosaic}
              alt="Wedding guests adding their photos to a shared photo mosaic"
              width="1448"
              height="1086"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="experience" aria-labelledby="experience-title">
          <div className="wrap experience-inner">
            <p className="eyebrow">The experience</p>
            <h2 id="experience-title">
              A photo experience people
              <br className="desktop-break" /> actually want to be part of.
            </h2>
            <p>
              Guests take a photo, watch it print, find its place and help build
              the final artwork together. The result is part entertainment, part
              keepsake and completely unique to your event.
            </p>
          </div>
        </section>

        <section
          className="section wrap process"
          id="how-it-works"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="process-title">
                Three steps.
                <br />
                One incredible reveal.
              </h2>
            </div>
            <p>
              From the first photo to the final tile, Mosaic Me turns your
              guests into part of the story.
            </p>
          </div>
          <div className="process-grid">
            {steps.map((step) => (
              <article className="process-card" key={step.number}>
                <div className="step-photo">
                  <img
                    src={step.image}
                    alt={step.alt}
                    width="1448"
                    height="1086"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-heading">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="wedding-section"
          id="weddings"
          aria-labelledby="wedding-title"
        >
          <div className="wrap wedding-layout">
            <div className="wedding-copy">
              <p className="eyebrow">Made for your wedding</p>
              <h2 id="wedding-title">
                Your favourite people.
                <br />
                One unforgettable keepsake.
              </h2>
              <p>
                A photo booth gets people smiling. A live mosaic gives them
                something to make together, and a reason to keep coming back as
                the picture grows.
              </p>
              <p>
                By the end of the celebration, you have a piece of artwork
                filled with the people who made it special.
              </p>
              <a href={weddingEnquiry} className="button button-dark">
                Check your wedding date
              </a>
            </div>
            <div className="wedding-image">
              <img
                src={guestPlacingTile}
                alt="A wedding guest placing a photo onto the couple’s mosaic"
                width="1448"
                height="1086"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section
          className="section wrap digital-section"
          id="digital-mosaics"
          aria-labelledby="digital-title"
        >
          <div className="digital-content">
            <div className="digital-copy">
              <p className="eyebrow">Digital photo mosaics</p>
              <h2 id="digital-title">
                All those memories.
                <br />
                One personal gift.
              </h2>
              <p>
                Turn a collection of favourite moments into a picture worth
                keeping. Choose a main image, send us your photos, and we’ll
                create a personalised mosaic delivered as a high-resolution
                digital file.
              </p>
              <p>
                For birthdays, anniversaries, wedding gifts and the people who
                have everything.
              </p>
            </div>
            <DigitalCarousel />
            <a
              href={digitalEnquiry}
              className="button button-accent digital-enquiry"
            >
              Enquire about a digital mosaic
            </a>
          </div>
        </section>

        <section
          className="other-events-section"
          id="events"
          aria-labelledby="other-events-title"
        >
          <div className="wrap other-events-inner">
            <div>
              <h2 id="other-events-title">Celebrating something else?</h2>
              <p>
                From birthdays and anniversaries to company celebrations, brand
                events and festivals, Mosaic Me brings people together to create
                something worth remembering.
              </p>
            </div>
            <a href={eventEnquiry} className="button button-outline">
              Ask about an event
            </a>
          </div>
        </section>

        <section
          className="section wrap pricing-section"
          id="pricing"
          aria-labelledby="pricing-title"
        >
          <div className="pricing-heading">
            <p className="eyebrow">Event and digital mosaics</p>
            <h2 id="pricing-title">Pricing</h2>
            <p>
              Two ways to bring your photos together. Tell us what you have in
              mind and we’ll confirm the details and final price.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <h3>Event mosaics</h3>
              <p className="price">
                <span>From</span> €249
              </p>
              <p>
                A live photo mosaic for weddings, birthdays and celebrations,
                created by the people who make your event special.
              </p>
              <p className="price-note">
                Your quote will reflect the setup, duration and location of your
                event.
              </p>
              <a href={eventEnquiry} className="button button-dark">
                Get an event quote
              </a>
            </article>
            <article className="price-card">
              <h3>Digital mosaics</h3>
              <p className="price">
                <span>From</span> €29
              </p>
              <p>
                A personalised mosaic made from your photos, delivered as a
                high-resolution digital artwork to keep, share or have printed.
              </p>
              <p className="price-note">
                Digital artwork only. Printing and framing are separate.
              </p>
              <a href={digitalEnquiry} className="button button-accent">
                Enquire about a digital mosaic
              </a>
            </article>
          </div>
        </section>

        <section
          className="section wrap questions-section"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div className="questions-layout">
            <div>
              <p className="eyebrow">Before you book</p>
              <h2 id="questions-title">Frequently asked questions.</h2>
              <p className="questions-intro">
                Something else you’d like to know? Email us at{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
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
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap contact-inner">
            <p className="eyebrow">Let’s make something</p>
            <h2 id="contact-title">
              Got a moment worth
              <br className="desktop-break" /> turning into a mosaic?
            </h2>
            <p>
              Tell us your wedding date and venue, and we’ll help you create
              something your guests will remember.
            </p>
            <a href={weddingEnquiry} className="button button-accent">
              Get a wedding quote
            </a>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div>
              <a href="#top" className="logo" aria-label="Mosaic Me home">
                mosaic<span>me</span>
              </a>
              <p>Small moments. Big picture.</p>
              <InstagramLink className="instagram-footer">
                Follow us on Instagram
              </InstagramLink>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#weddings">Weddings</a>
              <a href="#digital-mosaics" onClick={closeMenu}>
                Digital mosaics
              </a>
              <a href="#events">Other events</a>
              <a href="#pricing">Pricing</a>
              <a href={weddingEnquiry}>Get in touch</a>
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

export default App;
