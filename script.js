(function () {
  "use strict";

  var menuToggle = document.querySelector(".st-menu-toggle");
  var mainNav = document.querySelector(".st-main-nav");
  var navLinks = document.querySelectorAll(".st-main-nav a");
  var contactForm = document.querySelector("#contact-form");
  var successBanner = document.querySelector(".st-form-success");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("st-open");
      menuToggle.classList.toggle("st-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("st-open");
        menuToggle.classList.remove("st-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("st-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  if (contactForm && successBanner) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = Object.fromEntries(new FormData(contactForm).entries());
      console.log("Shule-Tech contact inquiry:", formData);
      contactForm.reset();
      successBanner.hidden = false;
      window.setTimeout(function () { successBanner.hidden = true; }, 7000);
    });
  }
}());