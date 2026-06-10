let isSigned = true;

async function loadComponents() {

    const header =
        await fetch("../components/header.html");

    document
        .getElementById("header-container")
        .innerHTML =
        await header.text();

    initializeHeader();

    const footer =
        await fetch("../components/footer.html");

    document
        .getElementById("footer-container")
        .innerHTML =
        await footer.text();

    initializePage();
}

function initializePage() {

    const actionButtons =
        document.querySelectorAll(
            ".action-btn, a"
        );

    const logBtn = 
        document.getElementById(
            "log"
        );

    const signupBtn =
        document.getElementById(
            "signin"
        );
    
    const getStartedBtn =
        document.getElementById(
            "get-started"
        );

    const profile =
        document.getElementById(
            "profile"
        );

    if (isSigned) {

        logBtn.innerText = "Log Out"

        signupBtn.style.display =
            "none";

        getStartedBtn.style.display =
            "none";

        profile.style.display =
            "visible";

    } else {

        logBtn.innerText = "Sign Up"

        actionButtons.forEach(btn => {

            btn.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    signupSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });

        profile.style.display =
            "none";

    }

}

loadComponents();