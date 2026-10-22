import "./App.css";

import heroMosaic from "./assets/images/hero-mosaic.jpg";
import finalMosaic from "./assets/images/final-mosaic.jpg";
import guestTakingPhoto from "./assets/images/guest-taking-photo.jpg";
import tilePrinting from "./assets/images/tile-printing.jpg";
import guestPlacingTile from "./assets/images/guest-placing-tile.jpg";
import mosaicProgress from "./assets/images/mosaic-progress.jpg";
import mosaicCloseup from "./assets/images/mosaic-closeup.jpg";
import eventWideShot from "./assets/images/event-wide-shot.jpg";

function App() {
  return (
    <div className="site">
      <header className="navbar">
        <a href="#" className="logo">
          mosaic<span>me</span>
        </a>

        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#events">Events</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
        </nav>

        <a href="#contact" className="nav-button">
          Get a quote
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              LIVE PHOTO MOSAICS FOR UNFORGETTABLE EVENTS
            </div>

            <h1>
              Your moments.
              <br />
              <span>One bigger picture.</span>
            </h1>

            <p className="hero-text">
              Mosaic Me turns hundreds of individual photos into one incredible
              piece of art, created live by the people who make your event
              special.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="button primary-button">
                Create your mosaic
              </a>

              <a href="#how-it-works" className="button secondary-button">
                See how it works
              </a>
            </div>

            <div className="hero-meta">
              <div>
                <strong>Live.</strong>
                <span>Guests become part of the experience.</span>
              </div>

              <div>
                <strong>Personal.</strong>
                <span>Every tile tells its own story.</span>
              </div>

              <div>
                <strong>Unforgettable.</strong>
                <span>One final image to keep forever.</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src={heroMosaic}
                alt="Guests creating a Mosaic Me photo mosaic at an event"
                className="hero-image"
              />

              <div className="hero-image-badge">
                <strong>300+</strong>
                <span>moments</span>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-number">01</span>
              Take your photo
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-number">∞</span>
              One shared memory
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="intro">
          <p className="section-label">THE EXPERIENCE</p>

          <h2>
            A photo experience people
            <br />
            actually want to be part of.
          </h2>

          <p className="intro-copy">
            Guests take a photo, watch it print, find its place and help build
            the final artwork together. The result is part entertainment, part
            keepsake and completely unique to your event.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works" id="how-it-works">
          <div className="section-heading">
            <div>
              <p className="section-label">HOW IT WORKS</p>
              <h2>Three steps. One incredible reveal.</h2>
            </div>

            <p>
              From the first photo to the final tile, Mosaic Me turns your
              guests into part of the story.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <div className="step-number">01</div>

              <div className="step-photo">
                <img
                  src={guestTakingPhoto}
                  alt="Guests having their photo taken"
                />
              </div>

              <h3>Capture</h3>

              <p>
                Guests take a photo during the event, creating individual
                moments that become part of something bigger.
              </p>
            </article>

            <article className="step-card">
              <div className="step-number">02</div>

              <div className="step-photo">
                <img
                  src={tilePrinting}
                  alt="Mosaic Me photo tiles being printed"
                />
              </div>

              <h3>Print</h3>

              <p>
                Each image is transformed into its own physical photo tile,
                ready to take its place on the mosaic.
              </p>
            </article>

            <article className="step-card">
              <div className="step-number">03</div>

              <div className="step-photo">
                <img
                  src={guestPlacingTile}
                  alt="Guest placing a photo tile onto the mosaic"
                />
              </div>

              <h3>Create</h3>

              <p>
                Guests find their tile's position and add it themselves as the
                final artwork gradually comes to life.
              </p>
            </article>
          </div>
        </section>

        {/* EXPERIENCE FEATURE */}
        <section className="feature-section">
          <div className="feature-image">
            <img
              src={mosaicProgress}
              alt="Photo mosaic taking shape during a live event"
            />
          </div>

          <div className="feature-copy">
            <p className="section-label">WATCH IT COME TO LIFE</p>

            <h2>The picture changes all night.</h2>

            <p>
              The experience grows with the event. Every new photo adds another
              piece to the final image, giving guests a reason to keep coming
              back and see what's changed.
            </p>

            <a href="#gallery" className="text-link">
              See the full experience →
            </a>
          </div>
        </section>

        {/* EVENTS */}
        <section className="events" id="events">
          <div className="events-copy">
            <p className="section-label">MADE FOR MOMENTS</p>

            <h2>Where does Mosaic Me fit?</h2>

            <p>
              Anywhere people come together. From weddings and milestone
              celebrations to corporate events, festivals and branded
              experiences.
            </p>

            <a href="#contact" className="text-link">
              Tell us about your event →
            </a>
          </div>

          <div className="event-list">
            <div className="event-row">
              <span>01</span>
              <h3>Weddings</h3>
              <p>A guest experience and keepsake in one.</p>
            </div>

            <div className="event-row">
              <span>02</span>
              <h3>Corporate events</h3>
              <p>Bring hundreds of people into one shared experience.</p>
            </div>

            <div className="event-row">
              <span>03</span>
              <h3>Brand activations</h3>
              <p>Turn participation into a visual centrepiece.</p>
            </div>

            <div className="event-row">
              <span>04</span>
              <h3>Festivals</h3>
              <p>Build something memorable throughout the day.</p>
            </div>

            <div className="event-row">
              <span>05</span>
              <h3>Celebrations</h3>
              <p>Birthdays, anniversaries and everything in between.</p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery" id="gallery">
          <div className="section-heading">
            <div>
              <p className="section-label">THE GALLERY</p>
              <h2>Small moments. Big picture.</h2>
            </div>

            <p>
              From the first photograph to the final reveal, every stage becomes
              part of the experience.
            </p>
          </div>

          <div className="photo-gallery">
            <div className="gallery-photo gallery-photo-large">
              <img src={finalMosaic} alt="Completed Mosaic Me photo mosaic" />

              <div className="gallery-caption">
                <span>01</span>
                The final reveal
              </div>
            </div>

            <div className="gallery-photo">
              <img
                src={mosaicCloseup}
                alt="Close-up of individual Mosaic Me photo tiles"
              />

              <div className="gallery-caption">
                <span>02</span>
                Every tile tells a story
              </div>
            </div>

            <div className="gallery-photo">
              <img
                src={guestPlacingTile}
                alt="Guest contributing to the mosaic"
              />

              <div className="gallery-caption">
                <span>03</span>
                Made by your guests
              </div>
            </div>

            <div className="gallery-photo gallery-photo-wide">
              <img
                src={eventWideShot}
                alt="Mosaic Me experience at a live event"
              />

              <div className="gallery-caption">
                <span>04</span>
                The full experience
              </div>
            </div>
          </div>
        </section>

        {/* CLOSE UP FEATURE */}
        <section className="detail-feature">
          <div className="detail-copy">
            <p className="section-label">LOOK CLOSER</p>

            <h2>One picture made from hundreds more.</h2>

            <p>
              Step back and you see the final image. Step closer and you
              discover hundreds of individual moments captured throughout the
              event.
            </p>
          </div>

          <div className="detail-image">
            <img
              src={mosaicCloseup}
              alt="Detailed close-up showing individual photos within a mosaic"
            />
          </div>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="about-stat">
            <span>300</span>

            <p>
              individual moments can become one unforgettable piece of artwork.
            </p>
          </div>

          <div className="about-copy">
            <p className="section-label">MORE THAN A PHOTO BOOTH</p>

            <h2>
              Your guests don't just take something home.
              <br />
              They leave something behind.
            </h2>

            <p>
              Traditional photo experiences create individual souvenirs. Mosaic
              Me creates something collaborative. Every guest contributes a
              small piece to one shared result, giving everyone a reason to come
              back and watch the picture grow.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <p className="section-label light-label">LET'S MAKE SOMETHING</p>

          <h2>
            Got a moment worth
            <br />
            turning into a mosaic?
          </h2>

          <p>
            Tell us about your event and we'll help you create something people
            will remember.
          </p>

          <a href="mailto:hello@mosaicme.ie" className="button cta-button">
            Start your mosaic
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#" className="logo footer-logo">
          mosaic<span>me</span>
        </a>

        <p>Live photo mosaics for unforgettable moments.</p>

        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#events">Events</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Mosaic Me</span>
          <span>Ireland</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
