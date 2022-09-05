export const myPopupOverlay = new popupOverlay();
export const myGallery = new gallery();
export const mySetAnchorsEvents = new setAnchorsEvents();

export function addClassOnClick(itemClick, classToItem, nameOfClass) {
  document.querySelector(itemClick).addEventListener("click", () => {
    document.querySelectorAll(classToItem).forEach((item) => {
      item.classList.toggle(nameOfClass);
    });
  });
}

export function addClassOnScroll(item, topOffset, nameOfClass) {
  window.addEventListener("scroll", function () {
    if (scrollY > topOffset) {
      document.querySelector(item).classList.add(nameOfClass);
    } else {
      document.querySelector(item).classList.remove(nameOfClass);
    }
  });
  if (scrollY > topOffset) {
    document.querySelector(item).classList.add(nameOfClass);
  }
}

function setAnchorsEvents() {
  let scrollElements = document.querySelectorAll("a[href^='#']");

  scrollElements.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault();

      const link =
        event.target.getAttribute("href") ||
        event.target.parentElement.getAttribute("href") ||
        event.target.firstElementChild.getAttribute("href");
      if (link === "#") return;

      const linkTarget = document.getElementById(link.substring(1));
      if (!linkTarget) return;

      const currentScrollTop = window.scrollY,
        targetScrollTop = linkTarget.offsetTop - 50;

      const burgerElem = document.querySelector("._menu-opened");
      if (burgerElem) burgerElem.classList.remove("_menu-opened");

      animate({
        duration: 600,
        timing: easeOut,
        draw: function (progress) {
          window.scrollTo(
            0,
            currentScrollTop - (currentScrollTop - targetScrollTop) * progress
          );
        },
      });
    });
  });
}

function animate({ timing, draw, duration }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction < 0) timeFraction = 0;
    if (timeFraction > 1) timeFraction = 1;
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    draw(progress); // отрисовать её
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// eslint-disable-next-line no-unused-vars
function linear(timeFraction) {
  return timeFraction;
}
// eslint-disable-next-line no-unused-vars
function easeOut(timeFraction) {
  return Math.sqrt(timeFraction);
}

export function myLazyLoad() {
  const lazyObjects = document.querySelectorAll("[data-lazyload]");

  if (!lazyObjects.length) return;

  if ("IntersectionObserver" in window) {
    const options = {
      // root: document.querySelector( '#viewport' ),
      rootMargin: "50px",
      threshold: [0, 0.5],
    };

    lazyObjects.forEach((item) => {
      const observer = new IntersectionObserver(manageIntersection, options);
      observer.observe(item);

      function manageIntersection(entries, observer) {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            replaceAttributes(item.target);
            observer.disconnect();
          }
          return;
        });
      }
    });

    return true;
  } else {
    lazyObjects.forEach((item) => replaceAttributes(item));
    return true;
  }

  function replaceAttributes(item) {
    if (item.hasAttribute("data-src")) {
      item.setAttribute("src", item.getAttribute("data-src"));
      item.removeAttribute("data-src");
    }
  }
}

function gallery() {
  const galleryObjects = document.querySelectorAll("[data-gallery]");

  if (!galleryObjects.length) return;

  // init
  const galleryWrapper = document.createElement("div");
  const closeButton = document.createElement("button");
  const galleryClassActive = "my-gallery_active";

  galleryWrapper.className = "my-gallery";
  closeButton.type = "button";
  closeButton.className = "my-gallery__close";
  closeButton.innerHTML = "<span class='sr-only'>Закрыть</span>";

  document.body.appendChild(galleryWrapper);
  galleryWrapper.appendChild(closeButton);
  const galleryImage = new Image();

  this.show = () => galleryWrapper.classList.add(galleryClassActive);
  this.hide = () => galleryWrapper.classList.remove(galleryClassActive);

  closeButton.addEventListener("click", () => {
    myPopupOverlay.hide();
    this.hide();
  });
  galleryWrapper.addEventListener("click", () => {
    myPopupOverlay.hide();
    this.hide();
  });

  galleryObjects.forEach((elem) => {
    const imageLink =
      elem.firstElementChild.getAttribute("data-src") ||
      elem.firstElementChild.getAttribute("src") ||
      "images/placeholder.svg";
    const imageSource = imageLink.replace("/thumbnails", "");

    elem.addEventListener("click", (event) => {
      event.preventDefault();
      myPopupOverlay.show();

      galleryImage.onload = () => galleryWrapper.appendChild(galleryImage);
      galleryImage.src = imageSource;
      galleryImage.alt = event.target.alt;
      this.show();
    });
  });
}

function popupOverlay() {
  const name = "popup-overlay";
  this.element = document.querySelector(`.${name}`);
  const elementClassActive = `${name}_active`;

  this.show = () => {
    this.element.classList.add(elementClassActive);
    document.body.style = `overflow: hidden; margin-right: ${
      window.innerWidth - document.body.clientWidth
    }px`;
  };
  this.hide = () => {
    this.element.classList.remove(elementClassActive);
    document.body.style = "";
  };
}
