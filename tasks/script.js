class Card {
    constructor(uuid, label, color, desc) {
        this.uuid = uuid;
        this.label = label;
        this.color = color;
        this.desc = desc;
        this.card = this.createCard();
    }

    write(list) {
        let map = new Map();
        map.set("uuid", this.uuid);
        map.set("label", this.label);
        map.set("color", this.color);
        map.set("desc", this.desc);
        list.push(JSON.stringify(map, replacer));
    }

    createCard() {
        let card = document.createElement("button");
        card.className = "card";
        card.style.color = getTextColor(this.color);
        card.style.backgroundColor = getCardColor(this.color);
        card.onclick = () => onCardSelect(this);

        let text = document.createElement("span");
        text.textContent = this.label;
        text.className = "card-title";
        card.appendChild(text);

        return card;
    }
}

const exampleCard = document.getElementById('example-card');
const exampleCardTitle = document.getElementById('example-card-title');
const cardLabel = document.getElementById('card-label');
const cardColor = document.getElementById('color');
const cardDesc = document.getElementById('desc');
const mainWindow = document.getElementById('main-window');
const taskInfo = document.getElementById('task-info-window');

const cards = [];

let currentCard;

function onLabelTextChange(e) {
    exampleCardTitle.textContent = e.value;
}

function onColorChange(e) {
    exampleCardTitle.style.color = getTextColor(e.value);
    exampleCard.style.backgroundColor = getCardColor(e.value);
}

function onCardSelect(card) {
    currentCard = card;

    taskInfo.style.opacity = "1";

    document.getElementById("title").textContent = card.label;
    document.getElementById("description").value = card.desc;
}

function resetExampleCard() {
    cardLabel.value = ""
    cardColor.value = "White";
    cardDesc.value = "Example description";

    exampleCardTitle.textContent = "New task";
    exampleCardTitle.style.color = getTextColor(cardColor.value);
    exampleCard.style.backgroundColor = getCardColor(cardColor.value);
}

function createCard() {
    if (cardLabel.value === "")
        return;

    let card = new Card(uuidv4(), cardLabel.value, cardColor.value, cardDesc.value);
    cards.push(card);
    mainWindow.appendChild(card.card);
    saveTasks();
    resetExampleCard();
}

function deleteCard() {
    const index = cards.indexOf(currentCard);
    if (index > -1) { // only splice array when item is found
        cards.splice(index, 1); // 2nd parameter means remove one item only
    }
    mainWindow.removeChild(currentCard.card);
    currentCard = null;
    taskInfo.style.opacity = "0";
    saveTasks();
}

function getCardColor(color) {
    switch (color) {
        case "White":
            return "var(--bs-white)";
        case "Red":
            return "var(--bs-red)";
        case "Green":
            return "var(--bs-green)";
        case "Blue":
            return "var(--bs-blue)";
        case "Yellow":
            return "var(--bs-yellow)";
        case "Black":
            return "var(--bs-dark)";
    }
}

function getTextColor(color) {
    switch (color) {
        case "Yellow":
        case "White":
            return "black";
        case "Red":
        case "Green":
        case "Blue":
        case "Black":
            return "white";
    }
}

// UUID random generation
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

function loadTasks() {
    if (localStorage.getItem("tasks") === null)
        return;

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(str => {
        let map = JSON.parse(str, reviver);
        let card = new Card(map.get("uuid"), map.get("label"), map.get("color"), map.get("desc"));
        cards.push(card);
        mainWindow.appendChild(card.card);
    });
}

function saveTasks() {
    let tasks= [];
    cards.forEach(card => card.write(tasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Json stringify map
function replacer(key, value) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

// Json parse map
function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        loadTasks();

        exampleCardTitle.textContent = cardLabel.value;
        exampleCardTitle.style.color = getTextColor(cardColor.value);
        exampleCard.style.backgroundColor = getCardColor(cardColor.value);

        if (currentCard == null)
            taskInfo.style.opacity = "0";

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();