const game = document.getElementById('game');
const answers = document.getElementById('answers');
const image = document.getElementById('game-image');

const questions = [
    {
        image: 'https://unknownworlds.com/subnautica/wp-content/themes/subnautica/assets/release/img/screenshots/env/shallows_01.jpg',
        answers: [
            "Barotrauma",
            "Subnautica",
            "Abzu",
            "Iron Lung"
        ],
        correct: 1
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002347.1920x1080.jpg?t=1700269108',
        answers: [
            "Doom",
            "Quake",
            "Half-Life",
            "Wolfenstein"
        ],
        correct: 2
    },
    {
        image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/02/cac-lenh-trong-minecraft.jpg',
        answers: [
            "Digger Online",
            "Terraria",
            "Roblox",
            "Minecraft"
        ],
        correct: 3
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/ss_ff27d52a103d1685e4981673c4f700b860cb23de.1920x1080.jpg?t=1710347075',
        answers: [
            "Half-Life 2",
            "Garry's Mod",
            "Sandbox",
            "Roblox"
        ],
        correct: 1
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/924220/ss_a19efaf5f0a6279be0e64815b8dd4534b76bb334.1920x1080.jpg?t=1669390703',
        answers: [
            "Metro: Exodus",
            "Stalker: Heart of Chernobyl",
            "Fallout 4",
            "Days Gone"
        ],
        correct: 0
    },
    {
        image: 'https://variety.com/wp-content/uploads/2018/08/dayz-field.jpg?w=1000&h=563&crop=1',
        answers: [
            "Days Gone",
            "7 Days to Die",
            "DayZ",
            "Project Zomboid"
        ],
        correct: 2
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_ef98db5d5a4d877531a5567df082b0fb62d75c80.1920x1080.jpg?t=1716504320',
        answers: [
            "Counter-Strike 2",
            "PUBG",
            "Fortnite",
            "Battlefield V"
        ],
        correct: 0
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002587.1920x1080.jpg?t=1718217726',
        answers: [
            "The Witness",
            "The Stanley Parable",
            "The Talos Principle",
            "Portal"
        ],
        correct: 3
    },
    {
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2399830/ss_7ff0f04cfc0eec97907eb5197c748576b15793ce.1920x1080.jpg?t=1718657685',
        answers: [
            "ARK: Survival Evolved",
            "ARK: Survival Ascended",
            "The Isle",
            "Jurassic World Evolution 2"
        ],
        correct: 1
    },
    {
        image: 'https://i.redd.it/2ca4juxcmfma1.jpg',
        answers: [
            "Clash Of Clans",
            "Clash Royale",
            "Happy Farm",
            "Brawl Stars"
        ],
        correct: 0
    }
]

const status = [
    "You know nothing about games, aren't you?",
    "Have you even played games?",
    "I see you know something..",
    "Pretty good.. I guess?",
    "Haha, you are a truly gamer!"
]

let currentQuestion = 0;
let score = 0;
let active = true;

// End the game and show the result
function endGame() {
    active = false;
    game.style.opacity = "1";
    document.getElementById('bar').style.opacity = '0';
    document.getElementById('main').style.display = 'none';
    document.getElementById('endgame').style.display = 'flex';
    document.getElementById('won-score').textContent = score.toString();

    let title = document.getElementById('endgame-title');
    if (score < 2) {
        title.textContent = status[0];
    } else if (score < 4) {
        title.textContent = status[1];
    } else if (score < 6) {
        title.textContent = status[2];
    } else if (score < 8) {
        title.textContent = status[3];
    } else {
        title.textContent = status[4];
    }
}

// Load a specific question
function loadQuestion(id) {
    answers.replaceChildren();

    currentQuestion = id;
    document.getElementById('score').textContent = score.toString();

    let question = questions[id];

    image.src = question.image;

    const buttons = question.answers.map((answer, i) => {
        const button = document.createElement("button");
        button.id = i.toString();
        button.textContent = answer;
        button.onclick = () => clickedAnswer(button);
        return button;
    })

    shuffle(buttons).forEach(button => {answers.appendChild(button)});
}

// Shuffle an array
function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Handle answer click
function clickedAnswer(button) {
    if (!active)
        return;

    let question = questions[currentQuestion];
    let correct = question.correct.toString() === button.id;

    currentQuestion++;

    button.style.backgroundColor = correct ? "green" : "darkred";
    button.textContent = correct ? "Correct!" : "Incorrect :(";

    if (correct) {
        score++;
    }

    document.getElementById('score').textContent = score.toString();

    active = false;
    setTimeout(() => {
        game.style.opacity = "0";
    }, 1000)
    setTimeout(() => {
        if (currentQuestion > questions.length - 1) {
            endGame();
            return;
        }

        loadQuestion(currentQuestion);

        game.style.opacity = "1";
        active = true;
    }, 2000)
}

// Restart the game
function refresh() {
    active = false;
    score = 0;
    game.style.opacity = "0";

    setTimeout(() => {
        loadQuestion(0);

        game.style.opacity = "1";
        document.getElementById('main').style.display = 'flex';
        document.getElementById('endgame').style.display = 'none';
        document.getElementById('bar').style.opacity = '1';

        active = true;
    }, 1000)
}

// Load the first question
loadQuestion(0);