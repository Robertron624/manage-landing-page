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
