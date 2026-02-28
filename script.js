// Prevent auto-scroll on page load
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Scroll to top on page load/refresh
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Force scroll to top when page loads
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Mouse tracker cursor
const cursor = document.createElement("div");
const cursorDot = document.createElement("div");
cursor.classList.add("cursor-ring");
cursorDot.classList.add("cursor-dot");
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smooth following effect for ring (slower)
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  // Faster following for dot
  dotX += (mouseX - dotX) * 0.3;
  dotY += (mouseY - dotY) * 0.3;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale up cursor on interactive elements
const interactiveElements = document.querySelectorAll(
  "a, button, .service-card, .game-card",
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
    cursorDot.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
    cursorDot.classList.remove("cursor-hover");
  });
});

// Scroll indicator click handler
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    document.querySelector(".strip").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
