
function update() {
    localStorage.clear();
}

window.addEventListener("load", () => {
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("show");
        }, i * 150);
    });
});

let questionnum = 0;

// Make Flashcard
let newflashcard;
let question, answer, paragraphs, theme;
let group = {}

let para1, para2, flashcard, button; 
const container = document.getElementsByClassName('group-selected');
const fclist = container.lastChild;
const form = document.getElementById('create-container')
// nu uh reload
form.addEventListener('submit', function(e){
    e.preventDefault();
    CreateFlashcard();
})
function CreateFlashcard() {

    //creating a new flashcard
    para1 = document.createElement('p')
    para2 = document.createElement('p')
    para2.style = "opacity: 0";

    flashcard = document.createElement('div')
    flashcard.classList.add('flashcard');

    button = document.createElement('button')
    button.innerText = 'Reveal Answer';
    button.onclick = 'RevealAnswer()'
    
    //update counter
    questionnum++;

    // assign variables
    newflashcard = document.getElementById('plus')
    question = document.getElementById('Question')
    answer = document.getElementById('Answer')
    
    flashcard.id = question.value;
    flashcard.appendChild(para1); //adds question
    flashcard.appendChild(para2); //adds answer

    paragraphs = flashcard.children;

    paragraphs[0].innerText = question.value;
    paragraphs[1].innerText = answer.value;

    flashcard.appendChild(button) // adds revealanswer button

    //change theme
    if (document.getElementById('card-theme')) {
        theme = document.getElementById('card-theme')
        flashcard.classList.add(theme.value)
    }

    // if the group isn't new:
    if (localStorage.getItem(container[0].id)) {
       group = JSON.parse(localStorage.getItem(container[0].id))
       if (!group[question.value]) {
        console.log('a')
        group[question.value] = flashcard;
        localStorage.setItem(container[0].id, JSON.stringify(group))
        container[0].appendChild(flashcard)
       }
       else {
        window.alert('You already have this flashcard!')
        return; //if flashcard already exists
       }
    }
    else {
        group[question.value] = flashcard;
        localStorage.setItem(container[0].id, JSON.stringify(group))
        container[0].appendChild(flashcard)
    }
    
// so so sorry for this being unfinished ill finish it within the next 2-5 days

}

function RevealAnswer(xyz) {
   flashcard = xyz.parentNode;
   
   paragraphs = flashcard.children;
   para2 = paragraphs[1];
   button = paragraphs[2];

   para2.style = "opacity: 100";
   button.innerText = "Hide Answer"
   button.onclick = "HideAnswer(this)"
}

function HideAnswer(xyz) {
    flashcard = xyz.parentNode;
   
   paragraphs = flashcard.children;
   para2 = paragraphs[1];
   button = paragraphs[2];

   para2.style = "opacity: 0";
   button.innerText = "Reveal Answer"
   button.onclick = "RevealAnswer(this)"
}

