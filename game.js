/**
 * Author:  Huy Mac - 000775402 
 * Date: October 9, 2019
 * Statement of authorship: This is my own work
 * Pupose: Displaying the memory pokemon card game, it helps players improve their memory ability.
 */

window.addEventListener("load", function () {
    /**
     * This class contain the player object.
     */
    class Player {

        /**
         * The contructor of player class
         * @param {*} name The name of player
         * @param {*} age The age of player
         * @param {*} chooseColor The color of player chooses
         * @param {*} level The level of player chooses
         */
        constructor(name, age, chooseColor, level) {
            this.name = name;
            this.age = age;
            this.color = chooseColor;
            this.level = level;
            this.numberOfMatchedCards = 0;
        }
    }
    
    let player1; // Declare the player object 
    let playerName; // Declare the player name
    let playerAge; // Declare the player age
    let playerColor; // Declare the player color
    let playerLevel; // Declare the player level

    // Declare game box from HTML pokemonGame1 (id)
    let gameBox1 = document.getElementById("pokemonGame1");
    gameBox1.style.display = "none"; // Display none at the beginning

    // Declare game box 2 from HTML pokemonGame2 (id)
    let gameBox2 = document.getElementById("pokemonGame2");
    gameBox2.style.display = "none"; // Display none at the beginning

    // Declare game box 3 from HTML pokemonGame3 (id)
    let gameBox3 = document.getElementById("pokemonGame3");
    gameBox3.style.display = "none"; // Display none at the beginning

    // Declare Help label from HTML help-label (id)
    let helpLabel = document.getElementById("help-label");
    helpLabel.style.display = "none"; // Display none at the beginning

    // Declare the game box from HTML pokemonGame (id)
    let help = document.getElementById("help");

    let playeAgainButton = document.getElementById("playagain");
    playeAgainButton.style.display = "none";

    let message = document.getElementById("message");
    message.style.display = "block";
    
    // Apply Submit event  
    document.forms.infoform.addEventListener("submit", function (event) {

        event.preventDefault();
        // Process the form input
        playerName = document.forms.infoform.playerName.value;
        playerAge = document.forms.infoform.playerAge.value;
        playerColor = document.forms.infoform.playerColor.value;
        playerLevel = document.forms.infoform.playerLevel.value;

        // Avoiding player name and player age
        if (playerName === "" || playerAge === "") {
            message.innerHTML = "MISSING INFORMATION";
            message.style.color = "Red";
            message.style.textAlign = "center";
            return;
        }
        // Disappear the ERROR message
        message.style.display = "none";

        // InfoForm retrieve infoform (id) from HTML
        let InfoForm = document.getElementById("infoform");

        // Display welcome label (id) is none
        document.getElementById("welcome").style.display = "none";
        // InfoForm display none
        InfoForm.style.display = "none";
        // Show the help label
        helpLabel.style.display = "block";
        // Create the new player object
        player1 = new Player(playerName, playerAge, playerColor, playerLevel);
        // Retrieve the player label from playname1 (id)
        let player1Label = document.getElementById("playername1");
        // Show the player label in HTML page
        player1Label.innerHTML = "Hello " + player1.name + " ! Let's play Pokemon Game.";
        // Set the backgroundColor for game box 1 from color in form
        gameBox1.style.backgroundColor = player1.color;
        // Set the backgroundColor for game box 2 from color in form
        gameBox2.style.backgroundColor = player1.color;
        // Set the backgroundColor for game box 3 from color in form
        gameBox3.style.backgroundColor = player1.color;

        // Useing to display the game box depend on level 
        if (player1.level == 1) {
            gameBox1.style.display = "flex";
        } else if (player1.level == 2) {
            gameBox2.style.display = "flex";
        } else
            gameBox3.style.display = "flex";

        // Mouse overs the help label, the instruction will appear
        helpLabel.addEventListener("mouseover", function () {
            help.style.display = "block";
        });
        // Mouse out the help label, the instruction will disappear
        helpLabel.addEventListener("mouseout", function () {
            help.style.display = "none";
        });
        
    });

    // Execute the play again button
    playeAgainButton.addEventListener("click", function() {
        window.location.reload();
    });

    // Access to multiple element from 3 pokemonCards
    const cards = document.querySelectorAll(".pokemonCard");
    const cards2 = document.querySelectorAll(".pokemonCard2");
    const cards3 = document.querySelectorAll(".pokemonCard3");

    let flippedCard = false; // Declare flippedCard variable to false
    let lockBoard = false; // Declare lockBoard (use to lock the card) variable to false
    let firstCard, secondCard; // Declare two cards
    let win = document.getElementById("win"); // Retreve win variable from win (id)

    /**
     * This function uses to flip each card
     */
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flip");

        if (!flippedCard) {
            // first Click
            flippedCard = true;
            firstCard = this;

            return;
        }
        // second Click
        secondCard = this;

        checkForMatch();
    }

    /**
     * This function uses to check two cards match or not
     */
    function checkForMatch() { 

        let match;
        // Check null of two cards?
        if (firstCard != null && secondCard != null) {
            match = firstCard.dataset.img === secondCard.dataset.img;
        } else {
            return;
        }

        // If number of matched cards = number of cards / 2, it will show up the message at the end and finsih the game
        if (match) {
            disableCards()
            player1.numberOfMatchedCards++;

            if (playerLevel == 1 && player1.numberOfMatchedCards == cards.length / 2) {
                win.innerHTML = player1.name + " is The Winner! Press button to play again!";
                // Show the play again button 
                playeAgainButton.style.display = "block";
            } else if (playerLevel == 2 && player1.numberOfMatchedCards == cards2.length / 2){
                win.innerHTML = player1.name + " is The Winner! Press button to play again!";
                // Show the play again button 
                playeAgainButton.style.display = "block";
            } else if (playerLevel == 3 && player1.numberOfMatchedCards == cards3.length / 2) {
                win.innerHTML = player1.name + " is The Winner! Press button to play again!";
                // Show the play again button 
                playeAgainButton.style.display = "block";
            }
            return;
        }
        unflipCards();
    }

    /**
     * Keep the card flip if they match
     */
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
    }

    /**
     * Flip the cards again if they do not match
     */
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetBoard();
        }, 1500);
    }

    /**
     * This method uses to llip only two cards and block the third card
     */
    function resetBoard() {
        [flippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    /**
     * Shuffle card in random position will be executed right after its definition
     */
    (function shuffle() {
        cards.forEach(card => {
            let randomPosition = Math.floor(Math.random() * 30);
            card.style.order = randomPosition;
        });
    })();

    
    (function shuffle() {
        cards2.forEach(card2 => {
            let randomPosition = Math.floor(Math.random() * 30);
            card2.style.order = randomPosition;
        });
    })();

    (function shuffle() {
        cards3.forEach(card3 => {
            let randomPosition = Math.floor(Math.random() * 30);
            card3.style.order = randomPosition;
        });
    })();

    // Apply Click Event to flipCard function
    cards.forEach(card => card.addEventListener("click", flipCard));
    cards2.forEach(card2 => card2.addEventListener("click", flipCard));
    cards3.forEach(card3 => card3.addEventListener("click", flipCard));
});