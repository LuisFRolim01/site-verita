document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SCROLL SUAVE
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = document.querySelector(".header").offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
        // Fechar menu mobile
        mobileMenu.classList.remove("open");
      }
    });
  });

  /* =========================
     HEADER AO SCROLL
  ========================== */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* =========================
     MENU MOBILE
  ========================== */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  /* =========================
     REVEAL
  ========================== */
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  /* =========================
     CARROSSEL
  ========================== */
  const slides = document.querySelectorAll(".carousel-item");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;
  let autoSlide = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => { showSlide(index); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    currentIndex = index;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() { showSlide(currentIndex + 1); }
  function prevSlide() { showSlide(currentIndex - 1); }

  function startAuto() {
    stopAuto();
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoSlide) { clearInterval(autoSlide); autoSlide = null; }
  }

  function resetAuto() { startAuto(); }

  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAuto(); });

  startAuto();

});
