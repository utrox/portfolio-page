const animatedElements = document.querySelectorAll(".animate-on-scroll");
const animationScreenProportion = 0.95;
const skills = document.querySelectorAll(".single-skill");
const skillsTransitionDelay = 0.15;
const projectGifs = document.querySelectorAll(".project-gif");

const navItems = document.querySelectorAll(".nav-item");
const mainSections = document.querySelectorAll(".main-section");

skills.forEach((element, index) => {
  element.style.transitionDelay = `${index * skillsTransitionDelay}s`;
});

function handleScroll() {
  animatedElements.forEach((element) => {
    const distanceFromTop = element.getBoundingClientRect().top;
    if (distanceFromTop - window.innerHeight * animationScreenProportion < 0) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
  var currentSection = "";
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

function toggleActive() {
  skills.forEach((element) => {
    element.classList.toggle("active");
  });
}

document.addEventListener("scroll", handleScroll);

// fix animations don't run when reloading page before scrolling
window.onload = handleScroll;

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

function copyEmailAdress(e) {
  const copyEmailBtn = e.currentTarget;
  const emailIcons = copyEmailBtn.querySelectorAll("i");
  emailIcons.forEach((icon) => {
    icon.classList.remove("icon-envelope-solid");
    icon.classList.add("icon-envelope-circle-check-solid");
  });
  navigator.clipboard.writeText("hunyadi.bence1@gmail.com");
}
