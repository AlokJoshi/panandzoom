//code from https://medium.com/better-programming/implementation-of-zoom-and-pan-in-69-lines-of-javascript-8b0cb5f221c1

import renderer from "./renderer.js";
(() => {
  const container = document.getElementById("container");
  const instance = renderer({ minScale: .1, maxScale: 30, element: container.children[0], scaleSensitivity: 50 });
  container.addEventListener("wheel", (event) => {
      if (!event.ctrlKey) {
          return;
      }
      event.preventDefault();
      instance.zoom({
          deltaScale: Math.sign(event.deltaY) > 0 ? 1 : -1,
          x: event.pageX,
          y: event.pageY
      });
  });
  container.addEventListener("dblclick", () => {
      instance.panTo({
          originX: 0,
          originY: 0,
          scale: 1,
      });
  });
  container.addEventListener("mousemove", (event) => {
      if (!event.shiftKey) {
          return;
      }
      event.preventDefault();
      instance.panBy({
          originX: event.movementX,
          originY: event.movementY
      });
  })
})();