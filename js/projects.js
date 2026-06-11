let isSigned = true;

let projects = JSON.parse(
    localStorage.getItem("projects")
) || [];

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

let currentProject =
    null;

function setupProjectSystem(){

    const modal =
        document.getElementById(
            "projectModal"
        );

    const createBtn =
        document.getElementById(
            "createProjectBtn"
        );

    const createBtn2 =
        document.querySelector(
            ".create-btn"
        );

    const cancelBtn =
        document.getElementById(
            "cancelProject"
        );

    const saveBtn =
        document.getElementById(
            "saveProject"
        );

    createBtn.addEventListener(
        "click",
        () => {

            modal.classList.add(
                "show"
            );

        }
    );

    if(createBtn2){

        createBtn2.addEventListener(
            "click",
            () => {

                modal.classList.add(
                    "show"
                );

            }
        );

    }

    cancelBtn.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "show"
            );

        }
    );

    saveBtn.addEventListener(
        "click",
        createProject
    );

}

function createProject(){

    const name =
        document
        .getElementById(
            "projectName"
        )
        .value
        .trim();

    const category =
        document
        .getElementById(
            "projectCategory"
        )
        .value;

    if(!name)
        return;

    const project = {

        id:
            Date.now(),

        name,

        category,

        status:
            "In Progress"

    };

    projects.push(
        project
    );

    localStorage.setItem(

        "projects",

        JSON.stringify(
            projects
        )

    );

    document
        .getElementById(
            "projectModal"
        )
        .classList
        .remove(
            "show"
        );

    document
        .getElementById(
            "projectName"
        )
        .value = "";

    renderProjects();

}

function renderProjects(){

    const grid =
        document.getElementById(
            "projectsGrid"
        );

    const empty =
        document.getElementById(
            "emptyProjects"
        );

    grid.innerHTML = "";

    if(
        projects.length === 0
    ){

        empty.style.display =
            "block";

        return;

    }

    empty.style.display =
        "none";

    projects.forEach(
        project => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "project-card";

            card.innerHTML = `

                <h3>
                    ${project.name}
                </h3>

                <p>
                    ${project.category}
                </p>

                <span
                    class="project-status">

                    ${project.status}

                </span>

            `;

            card.addEventListener(
                "click",
                () => {

                    openProject(
                        project
                    );

                }
            );

            grid.appendChild(
                card
            );

        }
    );

}

function openProject(
    project
){

    currentProject =
        project;

    document
        .getElementById(
            "projectWorkspace"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "workspaceTitle"
        )
        .innerText =
        project.name;

    document
        .getElementById(
            "workspaceCategory"
        )
        .innerText =
        project.category;

    const web =
        document.getElementById(
            "webDevWorkspace"
        );

    const other =
        document.getElementById(
            "otherWorkspace"
        );

    if(
        project.category ===
        "Web Development"
    ){

        web.style.display =
            "block";

        other.style.display =
            "none";

    }

    else{

        web.style.display =
            "none";

        other.style.display =
            "block";

    }

    loadProjectChat();

    window.scrollTo({

        top:
            document
            .getElementById(
                "projectWorkspace"
            )
            .offsetTop,

        behavior:
            "smooth"

    });

}

function setupChat(){

    const sendBtn =
        document.getElementById(
            "sendQuestion"
        );

    const input =
        document.getElementById(
            "questionInput"
        );

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

}

function loadProjectChat(){

    if(
        !currentProject
    ) return;

    const chat =
        document.getElementById(
            "chatMessages"
        );

    const messages =
        JSON.parse(

            localStorage.getItem(

                `projectChat_${currentProject.id}`

            )

        ) || [];

    chat.innerHTML = "";

    messages.forEach(
        msg => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                msg.type;

            div.innerText =
                msg.text;

            chat.appendChild(
                div
            );

        }
    );

}

function sendMessage(){

    if(
        !currentProject
    ) return;

    const input =
        document.getElementById(
            "questionInput"
        );

    const chat =
        document.getElementById(
            "chatMessages"
        );

    const text =
        input.value.trim();

    if(!text)
        return;

    const storageKey =
        `projectChat_${currentProject.id}`;

    const messages =
        JSON.parse(

            localStorage.getItem(
                storageKey
            )

        ) || [];

    messages.push({

        type:
            "user-message",

        text

    });

    localStorage.setItem(

        storageKey,

        JSON.stringify(
            messages
        )

    );

    loadProjectChat();

    input.value = "";

    const thinking =
        document.createElement(
            "div"
        );

    thinking.className =
        "ai-message thinking";

    thinking.innerText =
        "Lift AI is thinking...";

    chat.appendChild(
        thinking
    );

    chat.scrollTop =
        chat.scrollHeight;

}

function runProjects(){
    setupProjectSystem();
    renderProjects();
    setupChat();
}

document.addEventListener("DOMContentLoaded", () => {
    runProjects();
});