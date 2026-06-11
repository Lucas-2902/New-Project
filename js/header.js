function initializeHeader() {

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if(menuBtn && mobileMenu){

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

        });

    }

}

console.log("Header Loaded");