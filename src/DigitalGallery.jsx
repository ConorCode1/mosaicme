import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dara from "./assets/images/dara.jpg";
import eiffel from "./assets/images/eiffel.jpg";
import ep from "./assets/images/ep.jpg";
import hammock from "./assets/images/hammock.jpg";
import ryan from "./assets/images/ryan.jpg";
import scot from "./assets/images/scot.jpg";
import ski from "./assets/images/ski.jpg";

// Temporary examples reuse existing files. Replace the sources and alt text
// here with your digital artwork. Add or remove entries as your gallery grows.
const photos = [
  { src: ski, alt: "A personalised photo mosaic of a couple" },
  {
    src: scot,
    alt: "A close-up of the small photos that form a mosaic portrait",
  },
  { src: ryan, alt: "A couple looking at their photo mosaic" },
  { src: ep, alt: "A photo mosaic displayed at a celebration" },
  {
    src: hammock,
    alt: "Individual photos arranged into a larger portrait",
  },
  {
    src: dara,
    alt: "A finished portrait made from a collection of photos",
  },
  {
    src: eiffel,
    alt: "A finished portrait made from a collection of photos",
  },
];

function MosaicViewer({ initialPhoto, onClose }) {
  const dialog = useRef(null);
  const shell = useRef(null);
  const stage = useRef(null);
  const drag = useRef(null);
  const ownsFullscreen = useRef(false);
  const [index, setIndex] = useState(initialPhoto);
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });
  const [imageSize, setImageSize] = useState({ width: 1448, height: 1086 });
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState("");
  const photo = photos[index];

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    const observer = new ResizeObserver(([entry]) => {
      setViewport({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(stage.current);
    function updateFullscreen() {
      setFullscreen(document.fullscreenElement === shell.current);
    }
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", updateFullscreen);
      if (ownsFullscreen.current && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);

  const fit = Math.min(
    (viewport.width * 0.95) / imageSize.width,
    (viewport.height * 0.95) / imageSize.height,
  );
  const imageWidth = imageSize.width * fit * zoom;
  const imageHeight = imageSize.height * fit * zoom;
  const canvasWidth = Math.max(viewport.width, imageWidth);
  const canvasHeight = Math.max(viewport.height, imageHeight);

  useLayoutEffect(() => {
    stage.current?.scrollTo({
      left: (canvasWidth - viewport.width) / 2,
      top: (canvasHeight - viewport.height) / 2,
      behavior: "instant",
    });
  }, [canvasWidth, canvasHeight, viewport.width, viewport.height, index]);

  function changePhoto(direction) {
    setIndex(
      (current) => (current + direction + photos.length) % photos.length,
    );
    setZoom(1);
    drag.current = null;
  }

  function changeZoom(amount) {
    setZoom((current) => Math.max(1, Math.min(4, current + amount)));
  }

  async function toggleFullscreen() {
    setFullscreenMessage("");
    try {
      if (document.fullscreenElement === shell.current) {
        await document.exitFullscreen();
        ownsFullscreen.current = false;
      } else {
        await shell.current.requestFullscreen();
        ownsFullscreen.current = true;
      }
    } catch {
      setFullscreenMessage(
        "Full screen isn’t available here. You can still zoom and explore this larger view.",
      );
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="mosaic-viewer"
      aria-labelledby="viewer-title"
      aria-describedby="viewer-instructions"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          changePhoto(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          changePhoto(-1);
        }
        if (event.key === "+" || event.key === "=") {
          event.preventDefault();
          changeZoom(0.5);
        }
        if (event.key === "-") {
          event.preventDefault();
          changeZoom(-0.5);
        }
        if (event.key === "0") {
          event.preventDefault();
          setZoom(1);
        }
      }}
    >
      <div ref={shell} className="viewer-shell">
        <div className="viewer-heading">
          <div>
            <h2 id="viewer-title">Digital mosaic gallery</h2>
            <p aria-live="polite">
              Photo {index + 1} of {photos.length}
            </p>
          </div>
          <button
            type="button"
            className="viewer-close"
            onClick={onClose}
            autoFocus
          >
            Close
          </button>
        </div>
        <div
          ref={stage}
          className={`viewer-stage ${zoom > 1 ? "is-zoomed" : ""}`}
          onPointerDown={(event) => {
            if (
              zoom <= 1 ||
              event.pointerType !== "mouse" ||
              event.button !== 0
            )
              return;
            event.preventDefault();
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              left: stage.current.scrollLeft,
              top: stage.current.scrollTop,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            stage.current.scrollLeft =
              drag.current.left - (event.clientX - drag.current.x);
            stage.current.scrollTop =
              drag.current.top - (event.clientY - drag.current.y);
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <div
            className="viewer-canvas"
            style={{ width: canvasWidth, height: canvasHeight }}
          >
            <img
              key={index}
              src={photo.src}
              alt={photo.alt}
              style={{ width: imageWidth, height: imageHeight }}
              onLoad={(event) =>
                setImageSize({
                  width: event.currentTarget.naturalWidth,
                  height: event.currentTarget.naturalHeight,
                })
              }
              draggable="false"
            />
          </div>
        </div>
        <div className="viewer-footer">
          <p id="viewer-instructions">
            Use Zoom in to see the small photos. Drag or scroll to explore, then
            Close to return.
          </p>
          <div className="viewer-controls">
            <div
              className="viewer-photo-controls"
              role="group"
              aria-label="Change photo"
            >
              <button type="button" onClick={() => changePhoto(-1)}>
                Previous
              </button>
              <button type="button" onClick={() => changePhoto(1)}>
                Next
              </button>
            </div>
            <div
              className="viewer-zoom-controls"
              role="group"
              aria-label="Photo zoom"
            >
              <button
                type="button"
                disabled={zoom === 1}
                onClick={() => changeZoom(-0.5)}
              >
                Zoom out
              </button>
              <output aria-live="polite" aria-label="Zoom level">
                {Math.round(zoom * 100)}%
              </output>
              <button
                type="button"
                disabled={zoom === 4}
                onClick={() => changeZoom(0.5)}
              >
                Zoom in
              </button>
              <button
                type="button"
                disabled={zoom === 1}
                onClick={() => setZoom(1)}
              >
                Reset
              </button>
            </div>
            {document.fullscreenEnabled && (
              <button
                type="button"
                className="viewer-fullscreen"
                onClick={toggleFullscreen}
              >
                {fullscreen ? "Exit full screen" : "Full screen"}
              </button>
            )}
          </div>
          {fullscreenMessage && <p role="status">{fullscreenMessage}</p>}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

export default function DigitalGallery() {
  const track = useRef(null);
  const [position, setPosition] = useState({ start: 0, visible: 1 });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function measureTrack() {
    const element = track.current;
    const slide = element?.firstElementChild;
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(element).gap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.round((element.clientWidth + gap) / step));
    const start = Math.max(
      0,
      Math.min(photos.length - visible, Math.round(element.scrollLeft / step)),
    );
    setPosition({ start, visible });
  }

  useEffect(() => {
    const observer = new ResizeObserver(measureTrack);
    observer.observe(track.current);
    return () => observer.disconnect();
  }, []);

  function goToPhoto(start) {
    const next = Math.max(0, Math.min(photos.length - position.visible, start));
    const slide = track.current.children[next];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.current.scrollTo({
      left: slide.offsetLeft,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <section
      className="digital-gallery wrap"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="digital-gallery-heading">
        <div>
          <p className="eyebrow">The bigger picture, up close</p>
          <h2 id="gallery-title">Every photo has a place.</h2>
        </div>
        <p>
          Swipe or use Next to browse. Select a photo to open it larger and zoom
          into the detail.
        </p>
      </div>
      <div
        ref={track}
        className="digital-gallery-track"
        id="digital-gallery-track"
        role="region"
        aria-label="Mosaic examples"
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={measureTrack}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goToPhoto(position.start + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToPhoto(position.start - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            goToPhoto(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            goToPhoto(photos.length - 1);
          }
        }}
      >
        {photos.map((photo, index) => (
          <button
            type="button"
            className="digital-gallery-photo"
            key={index}
            aria-label={`Open photo ${index + 1} of ${photos.length} in the larger viewer`}
            aria-haspopup="dialog"
            onClick={() => setSelectedPhoto(index)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width="1448"
              height="1086"
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              draggable="false"
            />
          </button>
        ))}
      </div>
      <div className="digital-gallery-controls">
        <button
          type="button"
          className="carousel-step"
          aria-controls="digital-gallery-track"
          disabled={position.start === 0}
          onClick={() => goToPhoto(position.start - position.visible)}
        >
          Previous
        </button>
        <p aria-live="polite">
          {position.start + 1}
          {position.visible > 1
            ? `–${Math.min(photos.length, position.start + position.visible)}`
            : ""}{" "}
          of {photos.length}
        </p>
        <button
          type="button"
          className="carousel-step"
          aria-controls="digital-gallery-track"
          disabled={position.start >= photos.length - position.visible}
          onClick={() => goToPhoto(position.start + position.visible)}
        >
          Next
        </button>
      </div>
      {selectedPhoto !== null && (
        <MosaicViewer
          initialPhoto={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
}
