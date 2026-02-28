document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SCROLL SUAVE
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });


  /* =========================
     REVEAL
  ========================== */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(r => observer.observe(r));


  /* =========================
     CARROSSEL ESTÁVEL
  ========================== */

  const slides = document.querySelectorAll(".carousel-item");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;
  let autoSlide = null;

  // Criar dots dinamicamente
  slides.forEach((_, index) => {
    const dot = document.createElement("span");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showSlide(index);
      resetAuto();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function showSlide(index) {

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function startAuto() {
    stopAuto(); // evita duplicação
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function resetAuto() {
    startAuto();
  }

  startAuto();

});