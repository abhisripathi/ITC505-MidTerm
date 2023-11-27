let currentStageKey = 'start';

const gameStages = {
    start: {
        text: "You wake up in a mysterious room. What do you do?",
        choices: [
            { text: "Explore the room", consequence: "exploreRoom" },
            { text: "Stay still and wait", consequence: "stayStill" }
        ]
    },
    exploreRoom: {
        text: "You find a hidden door. Do you open it?",
        choices: [
            { text: "Yes, open the door", consequence: "openDoor" },
            { text: "No, look for another way", consequence: "lookAnotherWay" }
        ]
    },
    stayStill: {
        text: "You decide to wait. Suddenly, the floor collapses!",
        choices: [
            { text: "Try to grab something", consequence: "ending1" },
            { text: "Brace for impact", consequence: "ending5" }
        ]
    },
    openDoor: {
        text: "The door creaks open, revealing a dimly lit hallway.",
        choices: [
            { text: "Walk down the hallway", consequence: "ending2" },
            { text: "Go back", consequence: "ending7" },  // Changed to lead to ending7
            {text: "Go to mysterious place", consequence:"mysteriousEncounter"}
        ]
    },
    lookAnotherWay: {
        text: "You start looking for another way and find a mysterious book.",
        choices: [
            { text: "Read the book", consequence: "ending4" },
            { text: "Ignore the book", consequence: "ending6" }
        ]
    },
    mysteriousEncounter: {
        text: "In the room, you encounter a mysterious figure offering you a choice.",
        choices: [
            { text: "Follow the figure", consequence: "ending8" },
            { text: "Refuse the offer", consequence: "ending7" },
            { text: "Ask for a different path", consequence: "ending3" }
        ]
    },
    // Endings
    ending1: {
        text: "Ending:1 You've managed to escape through a window...",
        image: "images/escape_window.jpg",
        choices: [],
        type: 'escape',
        isEnd: true
    },
    ending2: {
        text: "Ending:2 You fell into a secret room filled with treasures...",
        image:"images/room_with_treasure1.jpg",
        choices: [],
        isEnd: true
    },
    ending3: {
        text: "Ending:3 The hallway leads you to a hidden exit...",
        image: "images/hidden_exit.jpeg",
        choices: [],
        isEnd: true
    },
    ending4: {
        text: "Ending:4 The book teleports you to another dimension...",
        image: "images/teleports.jpg",
        choices: [],
        isEnd: true
    },
    ending5: {
        text: "Ending:5 As you read the book, it bursts into flames, revealing a hidden message...",
        image: "images/hidden_msg.jpg",
        choices: [],
        isEnd: true
    },
    ending6: {
        text: "Ending:6 You find a hidden passage leading to a mysterious forest...",
        image: "images/mysterious_forest.jpg",
        choices: [],
        isEnd: true
    },
    ending7: {
        text: "Ending:7 A secret panel opens, revealing a high-tech control room...",
        image: "images/high_tech_room.jpg",
        choices: [],
        isEnd: true
    },
    ending8: {
        text: "Ending:8 You trigger a trap, but it leads to an ancient underground city...",
        image: "images/underground_city.jpg",
        choices: [],
        isEnd: true
    }
    // Additional endings (ending5, ending6, ending7, ending8) with their respective texts and images...
};

document.getElementById('restartButton').addEventListener('click', startGame);

/* Step 5. Create function to update page:  This function should replace the text in the story part of 
your web-page with current part of the story, as well as create buttons for each available choice along 
with event listeners that will continue the story when clicked.*/
function updatePage(stageKey) {
    const stage = gameStages[stageKey];
    
    const storyElement = document.getElementById('story');
    storyElement.innerHTML = stage.text;

    const existingImage = document.getElementById('storyImage');
    if (existingImage) {
        storyElement.removeChild(existingImage);
    }
    
    if (stage.image) {
        const imgElement = document.createElement('img');
        imgElement.src = stage.image;
        imgElement.alt = "Story image";
        imgElement.id = 'storyImage';
        storyElement.appendChild(imgElement);
    }

    const choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';
    
    stage.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => updatePage(choice.consequence));
        choicesElement.appendChild(button);
    });

    if (stage.type) {
        lastMajorDecision = stage.type;
    }
}
function endGame() {
    // Determine the ending based on lastMajorDecision
    let endingStageKey;
    switch (lastMajorDecision) {
        case 'escape':
            endingStageKey = 'ending1';
            break;
        // Add cases for other types of decisions
        default:
            endingStageKey = 'ending1'; // Default ending if no major decision was made
    }

    const stage = gameStages[endingStageKey];

    // Update the story text
    const storyElement = document.getElementById('story');
    storyElement.innerHTML = stage.text;

    // Clear existing image if any
    const existingImage = document.getElementById('storyImage');
    if (existingImage) {
        storyElement.removeChild(existingImage);
    }
    
    // Add new image for the ending
    if (stage.image) {
        const imgElement = document.createElement('img');
        imgElement.src = stage.image;
        imgElement.alt = "Ending image";
        imgElement.id = 'storyImage';
        storyElement.appendChild(imgElement);
    }

    // Remove any choices
    const choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';
}


function startGame() {
    currentStageKey = 'start';
    updatePage(currentStageKey);
}

startGame();

document.getElementById('endGameButton').addEventListener('click', endGame);