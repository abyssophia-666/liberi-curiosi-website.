/* MOBILE MENU */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


/* COPYRIGHT YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton =
      contactForm.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.hidden = true;
        formSuccess.hidden = false;
      } else {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }

        alert(
          "We were unable to send your message. Please try again or contact us by email."
        );
      }
    } catch (error) {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }

      alert(
        "We were unable to send your message. Please try again or contact us by email."
      );
    }
  });
}


/* SHARE BUTTON */

const shareButton = document.getElementById("shareButton");

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: "Liberi Curiosi",
      text: "A place to ask, wonder and create.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        const originalText = shareButton.textContent;

        shareButton.textContent = "✓ LINK COPIED";

        setTimeout(() => {
          shareButton.textContent = originalText;
        }, 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        const originalText = shareButton.textContent;

        shareButton.textContent = "COPY LINK";

        setTimeout(() => {
          shareButton.textContent = originalText;
        }, 2000);
      }
    }
  });
}