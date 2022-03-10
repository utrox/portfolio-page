const animatedElements = document.querySelectorAll(".animate-on-scroll");
const animationScreenProportion = window.innerHeight * 0.8
const skills = document.querySelectorAll(".single-skill")
const skillsTransitionDelay = 0.1
const projectGifs = document.querySelectorAll(".project-gif"); 



skills.forEach((element, index) => {
  element.style.transitionDelay = `${index * skillsTransitionDelay}s`;
})

function handleScroll() {
  animatedElements.forEach((element) => {
    const distanceFromTop = element.getBoundingClientRect().top;
    if (distanceFromTop - animationScreenProportion < 0) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

function toggleActive() {
  skills.forEach(element => {
    element.classList.toggle("active")
  })
}

document.addEventListener("scroll", handleScroll);


projectGifs.forEach((gif) => {
  gif.addEventListener("mouseenter", () => {
    gif.src = gif.dataset.gifPath
  })

  gif.addEventListener("mouseleave", () => {
    gif.src = gif.dataset.thumbnailPath;
  });
})