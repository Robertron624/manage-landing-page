const headerHamburger = document.querySelector("header .hamburger");

const headerHamburgerIcon = document.querySelector("header .hamburger img");

const mobileMenu = document.querySelector("header dialog");

headerHamburger.addEventListener("click", () => {
    mobileMenu.showModal();
    // Change the hamburger icon to a cross
    headerHamburgerIcon.src = "images/icon-close.svg";
});

// Close dialog when clicking outside of it
mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "DIALOG") {
        mobileMenu.close();
        // Change the cross icon to a hamburger
        headerHamburgerIcon.src = "images/icon-hamburger.svg";
    }
});

// Close dialog when pressing escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        mobileMenu.close();
        // Change the cross icon to a hamburger
        headerHamburgerIcon.src = "images/icon-hamburger.svg";
    }
});

// carousel logic

const emblaNode = EmblaCarousel(document.getElementById("embla"), {
    active: true,
    align: "center",
    axis: "x",
    slidesToScroll: 1,
    dragFree: false,
    draggable: true,
    loop: false,
    autoResisze: false,
    startIndex: 0,
    selectedClass: "is-selected",
    draggableClass: "is-draggable",
    draggingClass: "is-dragging",
});

// Start the carousel
emblaNode.on("init", () => {
    console.log("Embla Carousel initialized");
});

// Get all pagination dots

const dots = document.querySelectorAll(".dot");

// _By default, the first dot is active
let currentDot = dots[0];
currentDot.classList.add("dot-active");

emblaNode.on("pointerUp", function (e) {
    const currentSlide = emblaNode.selectedScrollSnap();

    // Remove active class from current dot
    currentDot.classList.remove("dot-active");

    // Add active class to new dot
    currentDot = dots[currentSlide];
    currentDot.classList.add("dot-active");
});

// When clicking on a dot, go to the corresponding slide
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {

        // Remove active class from current dot
        currentDot.classList.remove("dot-active");

        // Add active class to new dot
        currentDot = dots[index];
        currentDot.classList.add("dot-active");

        // Go to the corresponding slide
        emblaNode.scrollTo(index);
    });
});
