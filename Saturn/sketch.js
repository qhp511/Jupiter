const buildBtn = document.getElementById("buildBtn");
const materials = document.getElementById("materials");
const ringSystem = document.getElementById("ringSystem");
const frontRing = document.querySelector(".front-ring");
const message = document.getElementById("message");

let isBuilding = false;

createFloatingMaterials();

// click events
buildBtn.addEventListener("click", () => {
  if (isBuilding) return;

  isBuilding = true;

  message.classList.remove("show");
  ringSystem.classList.remove("show");
  frontRing.classList.remove("show");

  // change text
  buildBtn.textContent = "Building Saturn's rings...";

  // clear
  materials.innerHTML = "";
  createFlyingParticles();

  // ring appears after time
  setTimeout(() => {
    ringSystem.classList.add("show");
    frontRing.classList.add("show");
  }, 1400);

  setTimeout(() => {
    message.classList.add("show");
    buildBtn.textContent = "🧊 Build Saturn's rings again";
    isBuilding = false;
  }, 2500);
});

function createFloatingMaterials() {
  // clear
  materials.innerHTML = "";

  // create elemets
  for (let i = 0; i < 45; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // decide the type of particle randomly
    addParticleType(particle);

    // set the horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    // set the vertical position
    particle.style.top = `${Math.random() * 100}%`;

    // set the size ratio
    const size = 0.6 + Math.random() * 1.2;
    const baseTransform = `scale(${size})`;

    particle.style.transform = baseTransform;

    // animation keyframe
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
    particle.animate(
      [
        {
          transform: `${baseTransform} translateY(0px) rotate(0deg)`
        },
        {
          transform: `${baseTransform} translateY(-22px) rotate(25deg)`
        }
      ],
      // animation settings
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
      {
        duration: 1600 + Math.random() * 1800,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
      }
    );

    materials.appendChild(particle);
  }
}

function createFlyingParticles() {
  // obtain the information of the upper part
  const topHalf = document.querySelector(".top-half");
  const topRect = topHalf.getBoundingClientRect();

  // the center point of the screen in the horizontal direction
  const centerX = window.innerWidth / 2;

  // the longitudinal center point of Saturn
  const centerY = topRect.height * 0.48;

  for (let i = 0; i < 90; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // random assortment
    addParticleType(particle);

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * topRect.height;

    // set the initial position of the particle to the page
    // https://www.w3schools.com/jsref/prop_style_left.asp
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // show the particle
    materials.appendChild(particle);

    // random angle
    const angle = Math.random() * Math.PI * 2;
    // the lateral radius of the star ring
    const radiusX = 225 + Math.random() * 55;
    // the longitudinal radius of the star ring
    const radiusY = 52 + Math.random() * 25;

    // calculate the flight target of particles
    const targetX = centerX + Math.cos(angle) * radiusX;
    const targetY = centerY + Math.sin(angle) * radiusY;

    // particle flight animation
    particle.animate(
      [
        // animation start state
        {
          left: `${startX}px`,
          top: `${startY}px`,
          transform: "scale(1) rotate(0deg)",
          opacity: 1
        },
        // animation end state
        {
          left: `${targetX}px`,
          top: `${targetY}px`,
          transform: "scale(0.8) rotate(360deg)",
          opacity: 0.95
        }
      ],
      // flight animation settings
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/cubic-bezier
      {
        duration: 900 + Math.random() * 900,
        delay: Math.random() * 500,
        easing: "cubic-bezier(.22,.9,.3,1)",
        fill: "forwards"
      }
    );

    // set for delayed execution
    setTimeout(() => {
      const orbitDuration = 2600 + Math.random() * 1800;

      // the particles keep rotating
      particle.animate(
        [
          {
            transform: "scale(0.8) rotate(0deg)"
          },
          {
            transform: "scale(0.8) rotate(360deg)"
          }
        ],
        {
          duration: orbitDuration,
          iterations: Infinity,
          easing: "linear"
        }
      );
    }, 1800);
  }
}

function addParticleType(particle) {
  const type = Math.random();

  if (type > 0.72) {
    particle.classList.add("rock");
  } else if (type > 0.45) {
    particle.classList.add("dust");
  }
}