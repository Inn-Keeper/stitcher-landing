const walkthrough = document.querySelector("[data-walkthrough]");
const steps = [...document.querySelectorAll(".walkthrough-step")];
const stages = ["gallery", "editor", "preview", "export"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setStage(stage) {
  walkthrough.dataset.stage = stage;
  steps.forEach((step) => {
    const active = step.dataset.stage === stage;
    step.setAttribute("aria-current", active ? "step" : "false");
  });
}

steps.forEach((step) => step.addEventListener("click", () => setStage(step.dataset.stage)));

if (!reduceMotion) {
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % stages.length;
    setStage(stages[index]);
  }, 2800);
}
