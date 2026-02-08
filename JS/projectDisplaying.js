import { Octokit, App } from "https://esm.sh/octokit";

let timerAttribution = 1000;
let objCounter = 0;

async function htmlElementCreation(project) {
    let mainContainer = document.getElementById("mainContainer");

    //create elements
    let containerDiv = document.createElement("div");

    //creating attirbues / content
    containerDiv.classList.add("containerExample");
    containerDiv.setAttribute("data-aos", "fade-zoom-in");
    containerDiv.setAttribute("data-aos-duration", timerAttribution);
    timerAttribution += 250;

    //assemble and I do this for all elements
    mainContainer.appendChild(containerDiv);

    let titleDiv = document.createElement("div");
    containerDiv.appendChild(titleDiv);

    let h1Title = document.createElement("h1");
    //making titles better without the -
    if (project.name.includes("-")) {
        project.name = project.name.replace("-", " ");
    }
    h1Title.textContent = project.name;
    titleDiv.appendChild(h1Title);

    let aGithubLogo = document.createElement("a");
    aGithubLogo.href = project.html_url;

    let GithubLogo = document.createElement("img");
    GithubLogo.classList.add("GithubLogo");
    GithubLogo.src = "../Images/GithubLogo.png";
    GithubLogo.alt = "GithubRepoLink";

    aGithubLogo.appendChild(GithubLogo);
    titleDiv.appendChild(aGithubLogo);

    // Fetch all languages for this repository
    const languages = await getRepoLanguages(project.languages_url);

    let languageText = document.createElement("p");
    if (languages.length > 0) {
        languageText.textContent = "Languages: " + languages.join(", ");
    } else {
        languageText.textContent = "Languages: None detected";
    }
    containerDiv.appendChild(languageText);
}

//Correclty gets all languages for the repository
async function getRepoLanguages(languagesUrl) {
    try {
        const response = await fetch(languagesUrl);

        if (!response.ok) {
            return [];
        }

        const languagesData = await response.json();

        // languagesData is an object like: { "JavaScript": 12345, "HTML": 6789, "CSS": 3456 }
        // Extract just the language names
        return Object.keys(languagesData);
    } catch (error) {
        console.error("Error fetching languages:", error);
        return [];
    }
}


//get the repos to a username using octokit plugin
async function getRepos() {
    try {
        const octokitConst = new Octokit();

        const response = await octokitConst.request('GET /users/{username}/repos', {
            username: 'Agera63'
        });

        response.data.forEach(element => {
            htmlElementCreation(element);
        });
    } catch (error) {
        console.error("Error fetching repositories:", error);
        document.getElementById("mainContainer").innerHTML =
            "<p>Failed to load repositories. Please try again later.</p>";
    }
}

//starts all the processes
getRepos();