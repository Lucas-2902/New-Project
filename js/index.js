let isSigned = false;

async function loadComponents() {

    const header =
        await fetch("components/header.html");

    document
        .getElementById("header-container")
        .innerHTML =
        await header.text();

    initializeHeader();

    const footer =
        await fetch("components/footer.html");

    document
        .getElementById("footer-container")
        .innerHTML =
        await footer.text();

    initializePage();
}

loadComponents();

function initializePage() {

    const signupSection =
        document.getElementById(
            "signup-section"
        );

    const actionButtons =
        document.querySelectorAll(
            ".action-btn, a"
        );

    const logBtn = 
        document.getElementById(
            "log"
        );

    if (isSigned) {

        signupSection.style.display =
            "none";

        logBtn.addEventListener(
            "click",
            function (e) {
                isSigned = false;
                location.reload;
            }
        );

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

    }

    const form =
        document.getElementById(
            "signupForm"
        );

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            // TEMP SIGNUP

            isSigned = true;

            signupSection.style.display =
                "none";

            location.reload();

        }
    );
}