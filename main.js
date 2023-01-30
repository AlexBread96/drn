const wrapper = document.querySelector(".wrapper");
const zone = document.querySelector(".zone");
const empty = document.querySelectorAll(".empty");
const card = document.querySelectorAll(".card");
let drag = document.getElementById("drag");
let x;
let y;
let lastItem;
[...card].forEach((el) => {
  el.style.backgroundColor = `${
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  }`;
});
drag.addEventListener("touchmove", dragMove);
drag.addEventListener("touchend", dragDrop);
drag.addEventListener("touchstart", function (e) {
  //   console.log(e);
  //   console.log(e.targetTouches[0]);
  //   console.log(drag.getBoundingClientRect());
  //   console.log(
  //     e.targetTouches[0].pageX -
  //       e.target.offsetLeft -
  //       (drag.getBoundingClientRect().left - e.targetTouches[0].target.offsetLeft)
  //   );
  //   console.log(
  //     e.targetTouches[0].pageY -
  //       e.target.offsetTop -
  //       drag.getBoundingClientRect().top
  //   );
  //   console.log(e.target.getBoundingClientRect());
  //   console.log(e.target.getBoundingClientRect().width);
  //   console.log(e.target.getBoundingClientRect().height);
  x =
    e.targetTouches[0].pageX -
    e.target.offsetLeft -
    (drag.getBoundingClientRect().left - e.targetTouches[0].target.offsetLeft);
  y =
    e.targetTouches[0].pageY -
    e.target.offsetTop -
    (drag.getBoundingClientRect().top - e.targetTouches[0].target.offsetTop);
  //   console.log(x, y);
});
// [...card].forEach((el) => {});
// drag.addEventListener("click", function (e) {
//   console.log(e);
//   console.log(e.offsetX);
//   console.log(e.offsetY);
//   //   x = e.offsetX;
//   //   y = e.offsetY;
// });

function dragMove(e) {
  drag.style.transition = "";
  e.preventDefault();
  let touch = e.targetTouches[0] || e.targetTouches[1] || e.targetTouches[2];
  drag.style.top = `${touch.pageY - wrapper.offsetTop - y}px`;
  drag.style.left = `${touch.pageX - wrapper.offsetLeft - x}px`;
  let rotate = touch.target.offsetLeft - touch.target.parentElement.offsetLeft;
  if (drag.getBoundingClientRect().height / 2 < y) {
    drag.style.transformOrigin = "bottom";
    drag.style.transform = `rotate(${-rotate / 64}deg)`;
  } else {
    drag.style.transformOrigin = "top";
    drag.style.transform = `rotate(${rotate / 64}deg)`;
  }
  // тиндер эмитация
  [...empty].forEach((el) => {
    // el.addEventListener('')
    if (
      drag.getBoundingClientRect().top + drag.offsetHeight / 2 <
        el.getBoundingClientRect().bottom &&
      drag.getBoundingClientRect().right - drag.offsetWidth / 2 >
        el.getBoundingClientRect().left &&
      drag.getBoundingClientRect().bottom - drag.offsetHeight / 2 >
        el.getBoundingClientRect().top &&
      drag.getBoundingClientRect().left + drag.offsetWidth / 2 <
        el.getBoundingClientRect().right
    ) {
      //   el.classList.add("active");

      lastItem = el;
    } else {
      //   el.classList.remove("active");
    }
  });

  //   console.log(drag.getBoundingClientRect());
}

function dragDrop(e) {
  if (
    lastItem.classList.contains("like") ||
    lastItem.classList.contains("none") || lastItem.classList.contains("gold")
  ) {
    this.style.transition = "all .2s linear";
    lastItem.classList.contains("gold") ? this.style.top = `${lastItem.offsetTop}px` : null;
    this.style.left = `${lastItem.offsetLeft}px`;
    drag.style.transform = `rotate(0deg)`;
    setTimeout(() => {
      lastItem.append(this);
      this.remove();
      zone.firstElementChild.setAttribute("id", "drag");
      drag = document.getElementById("drag");
      lastItem = zone;
      drag.addEventListener("touchmove", dragMove);
      drag.addEventListener("touchend", dragDrop);
      drag.addEventListener("touchstart", function (e) {
        x =
          e.targetTouches[0].pageX -
          e.target.offsetLeft -
          (drag.getBoundingClientRect().left -
            e.targetTouches[0].target.offsetLeft);
        y =
          e.targetTouches[0].pageY -
          e.target.offsetTop -
          (drag.getBoundingClientRect().top -
            e.targetTouches[0].target.offsetTop);
        //   console.log(x, y);
        //   console.log(drag.getBoundingClientRect());
      });
    }, 220);
  } else {
    this.style.transition = "all .2s ease";
    this.style.top = `${lastItem.offsetTop}px`;
    this.style.left = `${lastItem.offsetLeft}px`;
    drag.style.transform = `rotate(0deg)`;
  }
}
