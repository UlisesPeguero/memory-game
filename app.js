document.addEventListener('DOMContentLoaded', () => {
    // base cards
    const CARDS = [
        {
            name: 'html',
            url: 'https://s.svgbox.net/files.svg?ic=html'
        },
        {
            name: 'css',
            url: 'https://s.svgbox.net/files.svg?ic=css'
        },
        {
            name: 'js',
            url: 'https://s.svgbox.net/files.svg?ic=js'
        },
        {
            name: 'reactjs',
            url: 'https://s.svgbox.net/files.svg?ic=reactjs'
        },
        {
            name: 'node',
            url: 'https://s.svgbox.net/files.svg?ic=node'
        },
        {
            name: 'mongo',
            url: 'https://s.svgbox.net/files.svg?ic=mongo'
        },
    ];

    const board = document.querySelector('.board'); // board DOM
    const scoreDisplay = document.querySelector('.score'); // score display DOM

    // set onclick event for new game button
    document.querySelector('#newGameButton').onclick = () => {
        let answer = confirm('Do you want to start a new game?');
        if(answer === true) {
            loadBoard();
        }
    };

    // variables
    let pickedCard; // keeps track of the previously picked card from the same turn
    let score = 0; // keep track of the score

    // load random cards on the board for a new game
    function loadBoard() {
        // empty board
        board.innerHTML = '';
        // create an array containing the values 0...CARDS.length twice
        let cards = Array.from(Array(CARDS.length).keys()); // create a sequence of numbers 0...CARDS.length to duplicate
        cards = cards.concat(cards); // duplicate array
        // randomize the array
        cards.sort(() => 0.5 - Math.random());
        // create cards
        cards.forEach((card) => {
            let span = document.createElement('span'); // create span DOM
            span.setAttribute('data-id', card); // add id to know what card we are working with
            span.classList.add('card'); // style for the card display box
            span.classList.add('back'); // style for the back of the card
            span.onclick = clickCard; // controller for the click event
            board.appendChild(span);
        });
        // set pickedCard to null, to know there is not matching to make
        pickedCard = null;
        score = 0; // reset score
    }

    // if the card gets clicked, this function will be triggered
    function clickCard(event) {
        // get the card object from the index that was selected
        let card = CARDS[event.target.getAttribute('data-id')];
        event.target.classList.remove('back'); // remove style for the back of the card
        event.target.style.background = `url(${card.url}) whitesmoke`; // add the proper image to display for the card
        event.target.classList.add('picked'); // add class picked selector       
        // if there was a previous picked card in the same turn
        if(pickedCard){        
            setTimeout( () => {
                checkForMatch(card);   
            }, 500);
        } else { // no pickedCard means this is the first card
            pickedCard = card.name;
        }
    }

    // check for matches
    function checkForMatch(card) {
        let picked = document.querySelectorAll('.card.picked');
        if(pickedCard === card.name) { // we found a match
            alert('Is a match!');
            // remove onclick from  matched cards and add to the score
            picked.forEach(cardDOM => {
                cardDOM.classList.remove('picked');
                cardDOM.onclick = undefined;
            });        
            score++;
            scoreDisplay.textContent = score;
            checkForWin();
        } else { // not a match
            alert('Not a match.');
            picked.forEach(cardDOM => flipBack(cardDOM));
        }
        pickedCard = null;
    }

    function checkForWin() {
        if(score == CARDS.length) {
            alert("Congratulations! You have won.");
        }
    }

    // flip card on its back 
    function flipBack(cardDOM) {
        cardDOM.classList.remove('picked');
        cardDOM.classList.add('back');
        cardDOM.style = undefined;
    }

    loadBoard();
});