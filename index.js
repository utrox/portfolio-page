const animatedElements = document.querySelectorAll(".animate-on-scroll");
const animationScreenProportion = 0.95;
const navItems = document.querySelectorAll(".nav-item");
const mainSections = document.querySelectorAll(".main-section");

const setAnimatedElementsVisibility = () => {
  // Add the ˙active` class to elements that should be animated when scrolling.
  animatedElements.forEach((element) => {
    const distanceFromTop = element.getBoundingClientRect().top;

    if (distanceFromTop - window.innerHeight * animationScreenProportion < 0) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
};

const highlightCurrentSectionInHeader = () => {
  let current;
  // Highlight the currently active main section in the header.
  mainSections.forEach((section) => {
    if (window.pageYOffset >= section.offsetTop - window.innerHeight * 0.45) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.classList.contains(current)) {
      item.classList.add("active");
    }
  });
};

function handleScroll() {
  setAnimatedElementsVisibility();
  highlightCurrentSectionInHeader();
}

// Add correct animation when reloading the page.
window.onload = handleScroll;
document.addEventListener("scroll", handleScroll);

const projectGifs = document.querySelectorAll(".project-gif");
projectGifs.forEach((gif) => {
  // When mouse hovers over project image, start the GIF.
  if (gif.dataset.gifPath) {
    gif.addEventListener("mouseenter", () => {
      gif.src = gif.dataset.gifPath;
    });

    // When mouse leaves a project image, stop the GIF.
    gif.addEventListener("mouseleave", () => {
      gif.src = gif.dataset.thumbnailPath;
    });
  }
});

// Add an increasing transition delay to each skill icon.
const skills = document.querySelectorAll(".single-skill");
const skillsTransitionDelay = 0.15;
skills.forEach((element, index) => {
  element.style.transitionDelay = `${index * skillsTransitionDelay}s`;
});

// Change icon of button, and copy email adress to clipboard
function copyEmailAdress(e) {
  const copyEmailBtn = e.currentTarget;
  const emailIcons = copyEmailBtn.querySelectorAll("i");
  emailIcons.forEach((icon) => {
    icon.classList.remove("icon-envelope-solid");
    icon.classList.add("icon-envelope-circle-check-solid");
  });
  navigator.clipboard.writeText("hunyadi.bence1@gmail.com");
}
