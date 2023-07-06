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

let dots = document.querySelectorAll(".dot");

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

function dotClickCallback (index) {
    currentDot.classList.remove("dot-active");

    // Add active class to new dot
    currentDot = dots[index];
    currentDot.classList.add("dot-active");

    // Go to the corresponding
    emblaNode.scrollTo(index);
};


// When clicking on a dot, go to the corresponding slide
dots.forEach((dot, index) => {
    dot.addEventListener("click", dotClickCallback.bind(null, index));
});

// Make carousel contain three slides on desktop (768px and above)

const mediaQuery = window.matchMedia("(min-width: 768px)");

const paginationsDots = document.querySelector(".pagination-dots");

function handleTabletChange(e) {
    // Check if the media query is true to change the number of slides to scroll to 3
    if (e.matches) {
        emblaNode.reInit({
            slidesToScroll: 3,
        });

        // Remove the third and fourth dot
        dots[2].remove();
        dots[3].remove();

    } else {
        emblaNode.reInit({
            slidesToScroll: 1,
        });

        if(paginationsDots.childElementCount === 2) {
            // Add the third and fourth dot
            const newDots = `
                <button class="dot" id="dot-3"></button>
                <button class="dot" id="dot-4"></button>
            `;

            // Add the new dots to the DOM and update the dots variable

            paginationsDots.insertAdjacentHTML("beforeend", newDots);

            dots = document.querySelectorAll(".dot");

            // Add event listeners to the new dots

            dots[2].addEventListener("click", dotClickCallback.bind(null, 2));
            dots[3].addEventListener("click", dotClickCallback.bind(null, 3));
        }
    }
}

// Register event listener

mediaQuery.addEventListener("change",handleTabletChange);

// Initial check

handleTabletChange(mediaQuery);