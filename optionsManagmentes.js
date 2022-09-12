const chatBotIsTypingDelay = 1200;
const chatmessage = document.querySelector('.chatbot__messages');
chatmessage.innerHTML += addChatbotOptionForm();

// all option that we have in our app (condidate, recruture, client, partenaire)
const chatbox__options = document.querySelector('.chatbox__options');

//type of Condidate
let condidate__spontane = null;
let condidate__choix_offer = null;

// Chatbot Is typing
let chatBotIsTyping = null;

// all the type of users in our applications
const condidate = document.querySelector('#condidate');
const client = document.querySelector('#client');
const partenaire = document.querySelector('#partenaire');
const recruture = document.getElementById('recruture');


// Send Logic
const sendButton = document.querySelector('.send__button');
const messageText = document.querySelector('.messageSended');

messageText.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        showNextMessage();
    }
})

sendButton.addEventListener('click', () => {
    showNextMessage();
})


function showNextMessage() {
    const currentInfoProfile = chatbox.getMessageInfo();
    const indexOfCurrentFilde = chatbox.profile.getIndexOfCurrentProps(currentInfoProfile);
    const nextFilde = chatbox.profile.allFildes[indexOfCurrentFilde + 1];
    if (indexOfCurrentFilde == chatbox.profile.allFildes.length - 1) {
        showMessage(currentInfoProfile, "thank You  We will Contact  You Soon 😊", nextFilde)
    } else {
        showMessage(currentInfoProfile, "Please Enter Your " + nextFilde, nextFilde);
    }

}


function addChatbotOptionForm() {
    return `
        <div class="chatbox__options">
            <ul>
                <li><a id="condidate" href="#">Condidate</a></li>
                <li><a id="recruture" href="#">Recruture</a></li>
                <li><a id="client" href="#">Client</a></li>
                <li><a id="partenaire" href="#">Partenaire</a></li>
            </ul>
        </div>
    `
}


function addUploadCvForm() {
    return `
        <div class="condidate__upload__cv">
            <label for="upload_cv" class="condidate__cv">
                Upload You Cv
            </label>
            <input id="upload_cv" type="file" />
        </div>
    `
}


function addchatBotIsTyping() {
    return `
        <div class="messages__item messages__item--operator typing">
                <div class="typing__dot"></div>
                <div class="typing__dot"></div>
                <div class="typing__dot"></div>
        </div>
    `
}

function addCondidateTypeForm() {
    return `
        <div class="condidate__type">
            <ul class="chatbox__options">    
                <li><a id="choix_offer" href="#">Choix d'offer</a></li>
                <li><a id="spontane" href="#">Spantaner</a></li>
            </ul>
        </div>
    `
}


function addOffersList() {
    return `
        <div class="condidate__offer__type">
            <ul class="chatbox__options ">
                <li><a id="front__end" href="#">Front-End</a></li>
                <li><a id="back_end" href="#">Back-End</a></li>
                <li><a id="dev__ops" href="#">DevOps</a></li>
            </ul>
        </div>
    `
}


function togglechatBotIsTyping() {
    chatmessage.innerHTML += addchatBotIsTyping();
    chatBotIsTyping = document.querySelector('.typing');
    setTimeout(() => {
        chatBotIsTyping.remove();
    }, chatBotIsTypingDelay);
}

function showMessage(propUpdate, messageToShow, nextpropsToUpdate) {
    chatbox.profile[propUpdate] = messageText.value;
    chatbox.addmessage(messageText.value, "Sam")
    messageText.value = "";
    showChatbotTypingAndMessage(messageToShow , nextpropsToUpdate);
}

function showChatbotTypingAndMessage(messageToShow , nextpropsToUpdate){
    togglechatBotIsTyping();
    setTimeout(() => {
        chatbox.addmessage(messageToShow, "User", nextpropsToUpdate);
    }, chatBotIsTypingDelay);
    chatmessage.scrollTop = chatmessage.scrollHeight;
}

recruture.addEventListener('click', () => {
    chatbox.profile = new Recruture();
    showChatbotTypingAndMessage('Please Enter Your first Name',"firstName");
})

condidate.addEventListener('click', () => {
    chatbox.profile = new Condidate();
    chatmessage.innerHTML += addCondidateTypeForm();
    condidate__spontane = document.getElementById('spontane');
    condidate__choix_offer = document.getElementById('choix_offer');
    condidate__spontane.addEventListener('click', () => {
        showChatbotTypingAndMessage('Please Upload Your Cv',"Cv");
        setTimeout(() => {
            chatmessage.innerHTML += addUploadCvForm();
        }, chatBotIsTypingDelay + 100);
    })

    condidate__choix_offer.addEventListener('click', () => {
        showChatbotTypingAndMessage('Please Upload Your Cv',"Cv");
        setTimeout(() => {
            chatmessage.innerHTML += addOffersList();
        }, chatBotIsTypingDelay + 100);
    })
})




client.addEventListener('click', () => {
    chatbox.profile = new Client();
    showChatbotTypingAndMessage('Please Enter Your first Name',"firstName");
})


partenaire.addEventListener('click', () => {
    chatbox.profile = new Partenaire();
    showChatbotTypingAndMessage('Please Enter Your first Name',"firstName");
})
