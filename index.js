const animatedElements = document.querySelectorAll(".animate-on-scroll");
const animationScreenProportion = 0.95;
const skills = document.querySelectorAll(".single-skill");
const skillsTransitionDelay = 0.15;
const projectGifs = document.querySelectorAll(".project-gif");

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
}

function toggleActive() {
  skills.forEach((element) => {
    element.classList.toggle("active");
  });
}

document.addEventListener("scroll", handleScroll);

projectGifs.forEach((gif) => {
  gif.addEventListener("mouseenter", () => {
    gif.src = gif.dataset.gifPath;
  });

  gif.addEventListener("mouseleave", () => {
    gif.src = gif.dataset.thumbnailPath;
  });
});


function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

function onClick(e) {
  e.preventDefault();
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LcjYNIeAAAAAHDsQJPonfkYQhrQxaxTBIRjPVW7", { action: "submit" })
      .then(function (token) {
        // Add your logic to submit to your backend server here.
      });
  });
}

