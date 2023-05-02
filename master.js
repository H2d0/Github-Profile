
let search = document.getElementById("search");
let form = document.getElementById("form");
let submit = document.getElementById("submit");

async function getUser(userName) {
        let date = await fetch(`https://api.github.com/users/${userName}`);
        let repsdate = await date.json()
        createUserCard(repsdate);
        getRepos(userName);
    }
async function getRepos(userName) {
    const resp = await fetch(`https://api.github.com/users/${userName}/repos`);
    const respData = await resp.json();
    addReposToCard(respData);
}
function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
    let reposEl = document.getElementById("repos");
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});
