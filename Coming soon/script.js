// Custom cursor with enhanced interactions
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Enhanced cursor interactions
document
  .querySelectorAll("a, button, .game-thumb, .pillar, .stat-cell")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(179, 255, 87, 0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(179, 255, 87, 0.6)";
    });
  });

// Click ripple effect
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "0px";
  ripple.style.height = "0px";
  ripple.style.borderRadius = "50%";
  ripple.style.border = "2px solid rgba(179, 255, 87, 0.6)";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "10000";
  ripple.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(ripple);

  ripple.animate(
    [
      { width: "0px", height: "0px", opacity: 1 },
      { width: "100px", height: "100px", opacity: 0 },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  );

  setTimeout(() => ripple.remove(), 600);
});

// Scroll reveals with stagger
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, index) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
        }, index * 100);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Parallax effect for game thumbnails
document.addEventListener("mousemove", (e) => {
  const thumbnails = document.querySelectorAll(".game-thumb");
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  thumbnails.forEach((thumb, index) => {
    const speed = (index + 1) * 0.5;
    const x = mouseX * 20 * speed;
    const y = mouseY * 20 * speed;
    thumb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Trigger counter animation on scroll
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const statNum = entry.target.querySelector(".stat-num");
        const text = statNum.textContent;
        const match = text.match(/\d+/);

        if (match) {
          const number = parseInt(match[0]);
          const tempText = statNum.innerHTML;
          statNum.innerHTML = "0" + tempText.replace(/\d+/, "");

          setTimeout(() => {
            animateCounter(statNum.firstChild, number);
            entry.target.dataset.animated = "true";
          }, 200);
        }
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat-cell")
  .forEach((el) => statsObserver.observe(el));

// Make game thumbnails clickable with tooltip
document.querySelectorAll(".game-thumb").forEach((thumb, index) => {
  const gameNames = [
    "Target Blitz",
    "Speed Runner",
    "Puzzle Master",
    "Sword Battle",
    "Arcade Hero",
    "Space Quest",
    "Dunk Challenge",
    "Dice Legends",
  ];

  thumb.style.cursor = "pointer";
  thumb.setAttribute("title", gameNames[index]);

  thumb.addEventListener("click", () => {
    // Add a pulsing animation on click
    thumb.style.animation = "none";
    setTimeout(() => {
      thumb.style.animation = "";
    }, 10);
  });
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add floating animation to orbs
const orbs = document.querySelectorAll(".orb");
orbs.forEach((orb, index) => {
  let x = 0,
    y = 0;

  setInterval(() => {
    x += Math.sin(Date.now() / 1000 + index) * 0.5;
    y += Math.cos(Date.now() / 1000 + index) * 0.5;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  }, 50);
});
