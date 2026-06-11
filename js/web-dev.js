let isSigned = true;

async function loadComponents() {

    const header =
        await fetch("header.html");

    document
        .getElementById("header-container")
        .innerHTML =
        await header.text();

    initializeHeader();

    const footer =
        await fetch("footer.html");

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

function setupChat(){

    const sendBtn =
        document.getElementById(
            "sendQuestion"
        );

    const input =
        document.getElementById(
            "questionInput"
        );

    const chat =
        document.getElementById(
            "chatMessages"
        );

    if(
        !sendBtn ||
        !input ||
        !chat
    ){
        console.error(
            "Chat elements not found"
        );
        return;
    }

    let messages =
        JSON.parse(
            localStorage.getItem(
                "webDevChat"
            )
        ) || [];

    function saveMessages(){

        localStorage.setItem(

            "webDevChat",

            JSON.stringify(
                messages
            )

        );

    }

    function renderMessages(){

        chat.innerHTML = "";

        messages.forEach(msg => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                msg.type;

            div.textContent =
                msg.text;

            chat.appendChild(
                div
            );

        });

        chat.scrollTop =
            chat.scrollHeight;

    }

    function sendMessage(){

        const text =
            input.value.trim();

        if(!text)
            return;

        messages.push({

            type:
                "user-message",

            text:
                text

        });

        saveMessages();

        renderMessages();

        input.value = "";

        const thinking =
            document.createElement(
                "div"
            );

        thinking.className =
            "ai-message thinking";

        thinking.id =
            "thinking-message";

        thinking.textContent =
            "Lift AI is thinking...";

        chat.appendChild(
            thinking
        );

        chat.scrollTop =
            chat.scrollHeight;

        /*
        BACKEND WILL GO HERE

        fetch(...)
        */

    }

    sendBtn.addEventListener(
        "click",
        sendMessage
    );

    input.addEventListener(
        "keydown",
        e => {

            if(
                e.key === "Enter"
                &&
                !e.shiftKey
            ){

                e.preventDefault();

                sendMessage();

            }

        }
    );

    renderMessages();

}

document.addEventListener(
    "DOMContentLoaded",
    setupChat
);