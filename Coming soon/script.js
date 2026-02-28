// Smooth scroll animation for carousel rows
document.addEventListener("DOMContentLoaded", () => {
  // Email form submission
  const emailForm = document.querySelector(".email-form");
  const emailInput = document.querySelector(".email-input");
  const joinBtn = document.querySelector(".join-btn");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (joinBtn) {
    joinBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Blur input to close keyboard immediately
      emailInput.blur();

      // Small delay to allow keyboard to close smoothly
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Validate email format
      if (!email) {
        showError("Please enter an email address");
        return;
      }

      if (!emailRegex.test(email)) {
        showError("Please enter a valid email address");
        return;
      }

      // Show loading state
      joinBtn.disabled = true;
      joinBtn.classList.add("loading");
      const originalText = joinBtn.textContent;
      joinBtn.innerHTML = '<span class="spinner"></span>Submitting...';

      try {
        // Simulate API call (replace with your actual backend call)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Success state
        joinBtn.classList.remove("loading");
        joinBtn.classList.add("success");
        joinBtn.innerHTML = "✓ Added to waitlist!";
        emailInput.value = "";

        // Reset after 3 seconds
        setTimeout(() => {
          joinBtn.classList.remove("success");
          joinBtn.disabled = false;
          joinBtn.textContent = originalText;
        }, 3000);
      } catch (error) {
        // Error state
        joinBtn.classList.remove("loading");
        joinBtn.disabled = false;
        joinBtn.textContent = originalText;
        showError("Something went wrong. Please try again.");
      }
    });
  }

  // Show error styling
  function showError(message) {
    emailInput.classList.add("error");
    emailInput.placeholder = message;

    setTimeout(() => {
      emailInput.classList.remove("error");
      emailInput.placeholder = "Enter email address";
    }, 3000);
  }

  // Allow Enter key to submit
  if (emailInput) {
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        joinBtn.click();
      }
    });

    // Remove error on input
    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("error");
    });
  }
});
