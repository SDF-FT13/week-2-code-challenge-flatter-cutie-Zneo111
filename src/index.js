document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const voteForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");
    let currentCharacter = null;


    fetch(baseUrl)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => showCharacterDetails(character));
                characterBar.appendChild(span);
            });
        });

    function showCharacterDetails(character) {
        currentCharacter = character;
        document.getElementById("name").textContent = character.name;
        document.getElementById("image").src = character.image;
        document.getElementById("image").alt = character.name;
        document.getElementById("vote-count").textContent = character.votes;
    }

    voteForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!currentCharacter) return;

        const voteInput = document.getElementById("votes");
        let votesToAdd = parseInt(voteInput.value);

        if (isNaN(votesToAdd)) {
            alert("Please enter a valid number.");
            return;
        }

        currentCharacter.votes += votesToAdd;
        document.getElementById("vote-count").textContent = currentCharacter.votes;
        voteInput.value = "";
    });

    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        currentCharacter.votes = 0;
        document.getElementById("vote-count").textContent = 0;
    });
});

