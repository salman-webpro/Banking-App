"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// open Modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// close Modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth Scrolling
learnMoreBtn.addEventListener("click", () =>
  section1.scrollIntoView({ behavior: "smooth" })
);

// Navigation scroll
document.querySelector(".nav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id.includes("section"))
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabs
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  // removing classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  // adding classes
  clicked.classList.add("operations__tab--active");
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// mouseHover effect handler function
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseHover effect on
nav.addEventListener("mouseover", handleHover.bind(0.5));
// mouseHover effect off
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky nav
const navheight = nav.getBoundingClientRect().height;
const obsCallback = function (entries) {
  entries.at(0).isIntersecting
    ? nav.classList.remove("sticky")
    : nav.classList.add("sticky");
};
const headerObs = new IntersectionObserver(obsCallback, {
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
headerObs.observe(header);

// scroll sections reveal animation
const sections = document.querySelectorAll(".section");

const revealObsCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
  else entry.target.classList.remove("section--hidden");
};

const revealObs = new IntersectionObserver(revealObsCallback, {
  threshold: 0.15,
});

sections.forEach((section) => {
  revealObs.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading images
const images = document.querySelectorAll("img[data-src]");

const imagesObsCallback = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () =>
    entry.target.classList.remove("lazy-img")
  );
  observer.unobserve(entry.target);
};

const imagesObs = new IntersectionObserver(imagesObsCallback, {
  threshold: 0,
  rootMargin: "300px",
});

images.forEach((img) => imagesObs.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
let currSlide = 0;

const changeSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const dotsChanging = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((s) => s.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const nextSlide = function () {
  currSlide === slides.length - 1 ? (currSlide = 0) : currSlide++;
  changeSlide(currSlide);
  dotsChanging(currSlide);
};

const previousSlide = function () {
  currSlide === 0 ? (currSlide = slides.length - 1) : currSlide--;
  changeSlide(currSlide);
  dotsChanging(currSlide);
};
// slider button actions
slider.addEventListener("click", function (e) {
  // next button click
  if (e.target.classList.contains("slider__btn--right")) nextSlide();
  // previous button click
  if (e.target.classList.contains("slider__btn--left")) previousSlide();
});

// slider change on keypress
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && previousSlide();
  e.key === "ArrowRight" && nextSlide();
});

// slider change pagination dots
const dots = document.querySelector(".dots");
const createDots = function () {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide="${i}"></button>`
    );
  });
};

// default behavior
const init = function () {
  createDots();
  changeSlide(0);
  dotsChanging(0);
};
init();

slider.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const clickedDot = e.target.dataset.slide;
    changeSlide(clickedDot);
    dotsChanging(clickedDot);
  }
});
