const target1 = document.getElementById("target-1");
const target2 = document.querySelector(".target-2");
const target3 = document.getElementById("target-3");
const target4 = document.getElementById("target-4");

target1.classList.remove("border");
target1.style.left = "250px";

target2.classList.remove("border");
target2.classList.add("blue");
target2.style.left = "50px";
target2.style.marginTop = "-15px";


// fadeOut의 첫번째 방법
let intervalID = null;

target3.style.opacity = 1;
intervalID = setInterval(fadeOut, 40);

function fadeOut() {
  let opacity = parseFloat(target3.style.opacity);

  if (opacity > 0) {
    target3.style.opacity -= 0.1;
  } else {
    clearInterval(intervalID);
    target3.style.removeProperty("opacity");
    target3.style.display = "none";
    target4.classList.add("green");
  }
}

// fadeOut의 두번째 방법
target3.animate([{ opacity: 1 }, { opacity: 0 }], {
  duration: 400,
  fill: "forwards",
}).onfinish = () => {
  target3.style.display = "none";
  target4.classList.add("green");
};
