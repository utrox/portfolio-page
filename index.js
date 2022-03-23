const animatedElements = document.querySelectorAll(".animate-on-scroll");
const animationScreenProportion = 0.95;
const navItems = document.querySelectorAll(".nav-item");
const mainSections = document.querySelectorAll(".main-section");

function handleScroll() {
  // animate the elements that should be animated when scrolling. 
  animatedElements.forEach((element) => {
    const distanceFromTop = element.getBoundingClientRect().top;
    // if the element is above a given point of the window...
    if (distanceFromTop - window.innerHeight * animationScreenProportion < 0) {
      // ...add the '.active' class.
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });

  // highlight the currently active main section
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
}

// fix animations not running when reloading page before scrolling
window.onload = handleScroll;
document.addEventListener("scroll", handleScroll);

const projectGifs = document.querySelectorAll(".project-gif");
projectGifs.forEach((gif) => {
  // when mouse enters a project image, start the gif.
  if (gif.dataset.gifPath) {
    gif.addEventListener("mouseenter", () => {
      gif.src = gif.dataset.gifPath;
    });

    // when mouse leaves a project image, stop the gif.
    gif.addEventListener("mouseleave", () => {
      gif.src = gif.dataset.thumbnailPath;
    });
  }
});

// add an increasing transition delay to each skill icon.
const skills = document.querySelectorAll(".single-skill");
const skillsTransitionDelay = 0.15;
skills.forEach((element, index) => {
  element.style.transitionDelay = `${index * skillsTransitionDelay}s`;
});

// change icon of button, and copy email adress to clipboard
function copyEmailAdress(e) {
  const copyEmailBtn = e.currentTarget;
  const emailIcons = copyEmailBtn.querySelectorAll("i");
  emailIcons.forEach((icon) => {
    icon.classList.remove("icon-envelope-solid");
    icon.classList.add("icon-envelope-circle-check-solid");
  });
  navigator.clipboard.writeText("hunyadi.bence1@gmail.com");
}
