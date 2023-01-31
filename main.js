"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const zone = document.querySelector(".zone");
  const gold = document.querySelector(".gold");
  const none = document.querySelector(".none");
  const like = document.querySelector(".like");
  const empty = document.querySelectorAll(".empty");
  let card = document.querySelectorAll(".card");
  let drag = document.getElementById("drag");
  const left = document.querySelector(".left");
  const up = document.querySelector(".up");
  const right = document.querySelector(".right");
  let x;
  let y;
  let lastItem = zone;
  card = [...card].reverse();
  card.forEach((el, i) => {
    el.innerHTML = "<div></div>";
    el.firstChild.style.backgroundColor = `${
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    }`;
    el.firstChild.textContent = `${i + 1}`;
  });

  up.addEventListener("click", (e) => {
    e.preventDefault();

    // console.log(e);
    drag.style.transitionProperty = "all";
    drag.style.top = `${gold.offsetTop - 100}px`;
    drag.style.left = `${gold.offsetLeft}px`;
    setTimeout(() => {
      gold.append(drag);
      drag.remove();
      zone.lastElementChild.setAttribute("id", "drag");
      drag = document.getElementById("drag");
      lastItem = zone;
      drag.addEventListener("touchmove", dragMove);
      drag.addEventListener("touchend", dragDrop);
      drag.addEventListener("touchstart", function (e) {
        e.preventDefault();

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
    }, 300);
  });
  left.addEventListener("click", (e) => {
    e.preventDefault();

    // console.log(e);
    drag.style.transitionProperty = "all";
    drag.style.top = `${none.offsetTop}px`;
    drag.style.left = `${none.offsetLeft - 100}px`;
    drag.style.transform = `rotate(${10}deg)`;
    setTimeout(() => {
      none.append(drag);
      drag.remove();
      zone.lastElementChild.setAttribute("id", "drag");
      drag = document.getElementById("drag");
      lastItem = zone;
      drag.addEventListener("touchmove", dragMove);
      drag.addEventListener("touchend", dragDrop);
      drag.addEventListener("touchstart", function (e) {
        e.preventDefault();

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
    }, 300);
  });
  right.addEventListener("click", (e) => {
    e.preventDefault();

    // console.log(e);
    drag.style.transitionProperty = "all";
    drag.style.top = `${like.offsetTop}px`;
    drag.style.left = `${like.offsetLeft + 100}px`;
    drag.style.transform = `rotate(${-10}deg)`;
    setTimeout(() => {
      like.append(drag);
      drag.remove();
      zone.lastElementChild.setAttribute("id", "drag");
      drag = document.getElementById("drag");
      lastItem = zone;
      drag.addEventListener("touchmove", dragMove);
      drag.addEventListener("touchend", dragDrop);
      drag.addEventListener("touchstart", function (e) {
        e.preventDefault();

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
    }, 300);
  });
  drag.addEventListener("touchmove", dragMove);
  drag.addEventListener("touchend", dragDrop);
  drag.addEventListener("touchstart", function (e) {
    e.preventDefault();
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
      (drag.getBoundingClientRect().left -
        e.targetTouches[0].target.offsetLeft);
    y =
      e.targetTouches[0].pageY -
      e.target.offsetTop -
      (drag.getBoundingClientRect().top - e.targetTouches[0].target.offsetTop);
    //   console.log(x, y);
  });
  [...card].forEach((el) => {});
  //   drag.addEventListener("click", function (e) {
  //     console.log(e);
  //     console.log(e.offsetX);
  //     console.log(e.offsetY);
  //     //   x = e.offsetX;
  //     //   y = e.offsetY;
  //   });

  function dragMove(e) {
    drag.style.transitionProperty = "none";
    e.preventDefault();
    let touch = e.targetTouches[0];
    drag.style.top = `${touch.pageY - wrapper.offsetTop - y}px`;
    drag.style.left = `${touch.pageX - wrapper.offsetLeft - x}px`;
    let rotate =
      touch.target.offsetLeft - touch.target.parentElement.offsetLeft;
    if (drag.getBoundingClientRect().height / 2 < y) {
      drag.firstChild.style.transformOrigin = "bottom";
      drag.firstChild.style.transform = `rotate(${rotate / 32}deg)`;
    } else {
      drag.firstChild.style.transformOrigin = "top";
      drag.firstChild.style.transform = `rotate(${-rotate / 32}deg)`;
    }
    // тиндер эмитация
    [...empty].forEach((el) => {
      // el.addEventListener('')
      // console.log(none.getBoundingClientRect());
      // console.log(drag.getBoundingClientRect());
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
    e.preventDefault();
    if (
      lastItem.classList.contains("like") ||
      lastItem.classList.contains("none") ||
      lastItem.classList.contains("gold")
    ) {
      this.style.transitionProperty = "all";
 
      lastItem.classList.contains("like") ? this.style.left = `${like.offsetLeft + 100}px` : this.style.left = `${none.offsetLeft - 100}px`;

      lastItem.classList.contains("gold")
      ? (this.style.top = `${gold.offsetTop - 100}px`, this.style.left = `${lastItem.offsetLeft}px`)
      : null;
      // this.style.left = `${lastItem.offsetLeft + 100}px`;
      //   drag.firstChild.style.transform = `rotate(0deg)`;
      setTimeout(() => {
        lastItem.append(this);
        this.remove();
        zone.lastElementChild.setAttribute("id", "drag");
        drag = document.getElementById("drag");
        lastItem = zone;
        drag.addEventListener("touchmove", dragMove);
        drag.addEventListener("touchend", dragDrop);
        drag.addEventListener("touchstart", function (e) {
          e.preventDefault();

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
      }, 100);
    } else {
      this.style.transitionProperty = "all";
      this.style.top = `${zone.offsetTop}px`;
      this.style.left = `${zone.offsetLeft}px`;
      drag.firstChild.style.transform = `rotate(0deg)`;
    }
  }
});
