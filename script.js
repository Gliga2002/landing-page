const nav = document.querySelector('.header-nav');

// Menu fade animation
const handleHover = function (opacity, e) {
  if (e.target.classList.contains('item--link')) {
    const itemLinks = e.target
      .closest('.header')
      .querySelectorAll('.item--link');
    const logo = e.target.closest('.header').querySelector('.logo-link');
    console.log(logo);

    console.log(itemLinks);
    console.log(opacity);
    itemLinks.forEach((link) => {
      if (link !== e.target) link.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(null, 0.5));
nav.addEventListener('mouseout', handleHover.bind(null, 1));

// Smooth scroling

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('item--link')) {
    const id = e.target.getAttribute('href');
    console.log(document.querySelector(id));
    const section = document.querySelector(id);

    const sectionCoords = section.getBoundingClientRect();

    window.scrollTo({
      left: sectionCoords.left + window.pageXOffset,
      top: sectionCoords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }
});

// Intersection Observer (sticky nav)

const sectionFeature = document.querySelector('.section-hero');
const header = document.querySelector('.header');
const navHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) header.classList.add('sticky');
  else header.classList.remove('sticky');
};

const SectionFeatureObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

SectionFeatureObserver.observe(sectionFeature);

// Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading

window.addEventListener('load', () => {
    const heroImg = document.querySelector('.hero-img');
    const loadText = document.querySelector('.loading-text')
  
    // Replace src with data-src
    heroImg.src = heroImg.dataset.src;
  
    heroImg.addEventListener('load', () => {
      let load = 0;
  
      let int = setInterval(blurring, 30);
  
      function blurring() {
      load++;
  
      if (load > 99) {
      clearInterval(int);
      }
  
      loadText.textContent = `${load}%`;
      loadText.style.opacity = scale(load, 0, 100, 1, 0);
      heroImg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
      }
  
      const scale = (num, in_min, in_max, out_min, out_max) => {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      }
    })
  })

// Slider

// const slider = function () {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = `scale(0.4)`;
// slider.style.overflow = `visible`;

//   // Functions
const createDots = function () {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

//   // 0, 100, 200, 300

//   // Next Slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

//   // Event Handlers
btnRight.addEventListener('click', nextSlide);
// -100, 0, 100, 200
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  // Short circuiting
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    console.log('DOT');
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
// }
// slider();

// Tab
const buttonsDivEl = document.querySelector('.tab-container-buttons');
const buttonNodeLlist = document.querySelectorAll('.tab-container-button');
const tabContainerNodeList = document.querySelectorAll(
  '.tab-container-content'
);

buttonsDivEl.addEventListener('click', (e) => {
  const buttonEl = e.target.closest('.tab-container-button');
  if (!buttonEl) return;

  buttonEl.classList.add('tab-container-button--active');
  const id = buttonEl.dataset.id;

  console.log(id);

  buttonNodeLlist.forEach((button) => {
    if (button !== buttonEl)
      button.classList.remove('tab-container-button--active');
  });
  tabContainerNodeList.forEach((tab) =>
    tab.classList.remove('tab-container-content--active')
  );

  document
    .querySelector(`.tab-container-content--${id}`)
    .classList.add('tab-container-content--active');
});
