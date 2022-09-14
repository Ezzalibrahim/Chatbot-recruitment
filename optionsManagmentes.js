const URLcondidat = "http://localhost:8000/apiCandidat/candidats";
const URLclient = "http://localhost:8000/apiCandidat/clients";
const URLpartenaire = "http://localhost:8000/apiCandidat/partenaires";
const URLrecruteur = "http://localhost:8000/apiCandidat/recruteurs";
const URLmeeting = "http://localhost:8000/apiCandidat/meetings";
const URLoffre = "http://localhost:8000/apiCandidat/offres";
const chatBotIsTypingDelay = 1200;
let URL = "";
const chatmessage = document.querySelector('.chatbot__messages');
chatmessage.innerHTML += addChatbotOptionForm();

// all option that we have in our app (condidate, recruture, client, partenaire)
const chatbox__options = document.querySelector('.chatbox__options');

//type of Condidate
let condidate__spontane = null;
let condidate__choix_offer = null;

//list of offers 
let offers = []

// services of the society
let consulting = null ;
let portage = null ;
let offshoring = null ;
let formation = null ;
let startupping = null ;

// all Services array
let allServices = [];

//Cv File 
let cvFile = null

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

function getDataFromProfile(){
    if (chatbox.profile != null ) {
        if (chatbox.profile.constructor.name == "Condidate") {
            URL = URLcondidat;
            return {
                Cv : cvFile.files[0]
            }
        } else {
            let data = {
                firstName : chatbox.profile.firstName , 
                LastName : chatbox.profile.LastName , 
                email : chatbox.profile.email , 
                tele : chatbox.profile.tele
            };
            switch(chatbox.profile.constructor.name){
                case "Client" : 
                    URL = URLclient;
                    data.service = chatbox.profile.service;
                    break;
                case "Recruture" :
                    URL = URLrecruteur;
                    data.enteprise = chatbox.profile.enteprise;
                    data.profile = chatbox.profile.profile;
                    data.ExperienceYears = chatbox.profile.ExperienceYears;
                    break;
                case "Partenaire" :
                    URL = URLpartenaire;
                    data.partenaireType = chatbox.profile.partenaireType;
                    break;
            }
            return data
        }
    }
}


function showNextMessage() {
    const currentInfoProfile = chatbox.getMessageInfo();
    const indexOfCurrentFilde = chatbox.profile.getIndexOfCurrentProps(currentInfoProfile);
    const nextFilde = chatbox.profile.allFildes[indexOfCurrentFilde + 1];
    if (indexOfCurrentFilde == chatbox.profile.allFildes.length - 1) {
        showMessage(currentInfoProfile, "thank You  We will Contact  You Soon 😊", nextFilde)
        sendInfo(getDataFromProfile());
    } else {
        showMessage(currentInfoProfile, "Please Enter Your " + nextFilde, nextFilde);
    }
}


//send Info entred by the user to API  
function sendInfo(data){
    fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: data 
    }).then(
      response => response.json() 
    ).then(
      success => console.log(success) 
    ).catch(
      error => console.log(error) 
    );
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

function getServiseSociete(){
    return `
        <div class="chatbox__options">
            <ul>
                <li><a id="consulting" href="#">Consulting IT</a></li>
                <li><a id="portage" href="#">Portage salariale</a></li>
                <li><a id="offshoring" href="#">Offshoring</a></li>
                <li><a id="formation" href="#">Formation</a></li>
                <li><a id="startupping" href="#">Startupping</a></li>
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
    let offersListContainer = `
        <div class="condidate__offer__type"> 
            <ul class="chatbox__options ">
    `;

    offers.forEach(offer => {
        offersListContainer += `
            <li>
                <a id="${offer.name}" href="#">
                    ${offer.name}
                </a>
            </li>    
            `
    });
    

    offersListContainer += `
            </ul>
        </div>
    `
    return offersListContainer;
}

function getOffers(){
    fetch(URLoffre).then(response => {
        offers = response;
    });;
}

function togglechatBotIsTyping() {
    chatmessage.innerHTML += addchatBotIsTyping();
    chatBotIsTyping = document.querySelector('.typing');
    setTimeout(() => {
        chatBotIsTyping.remove();
    }, chatBotIsTypingDelay);
}

function showMessage(propUpdate, messageToShow, nextpropsToUpdate) {
    let message = messageText.value.trim();
    if ( message != "") {
        chatbox.profile[propUpdate] = message;
        chatbox.addmessage(message, "Sam")
        messageText.value = "";
        showChatbotTypingAndMessage(messageToShow , nextpropsToUpdate);
    }
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
    getOffers();
    chatbox.profile = new Condidate();
    showChatbotTypingAndMessage('Please choose your type of Condidatur','Cv');
    setTimeout(() => {
        chatmessage.innerHTML += addCondidateTypeForm();
        condidate__spontane = document.getElementById('spontane');
        condidate__choix_offer = document.getElementById('choix_offer');
        condidate__spontane.addEventListener('click', () => {
        showChatbotTypingAndMessage('Please Upload Your Cv',"Cv");
        setTimeout(() => {
            chatmessage.innerHTML += addUploadCvForm();
            cvFile = document.getElementById('upload_cv');
            chatmessage.scrollTop = chatmessage.scrollHeight;
            }, chatBotIsTypingDelay + 500);
        })

        condidate__choix_offer.addEventListener('click', () => {
            showChatbotTypingAndMessage('Please Choisir Votre Domaine ',"Cv");
            setTimeout(() => {
                chatmessage.innerHTML += addOffersList();
                chatmessage.scrollTop = chatmessage.scrollHeight;
            }, chatBotIsTypingDelay + 500);
        })
        chatmessage.scrollTop = chatmessage.scrollHeight;
    }, chatBotIsTypingDelay + 300);
})




client.addEventListener('click', () => {
    chatbox.profile = new Client();
    showChatbotTypingAndMessage('Please Shoose One of Our Servise',"service");
    setTimeout(() => {
        chatmessage.innerHTML += getServiseSociete();
        consulting = document.getElementById('consulting');
        portage = document.getElementById('portage');
        offshoring = document.getElementById('offshoring');
        formation = document.getElementById('formation');
        startupping = document.getElementById('startupping');
        allServices = [ consulting , portage , offshoring , formation , startupping ];
        allServices.forEach(service => {
            console.log(service);
            service.addEventListener('click' , (event)=>{
                addServiceToClientProfile(event);
            }) 
        });
        chatmessage.scrollTop = chatmessage.scrollHeight;
    }, chatBotIsTypingDelay + 200);
})

function addServiceToClientProfile(value){
    showChatbotTypingAndMessage('Please Enter Your first Name','firstName');
    chatbox.profile.service = value.target.text ;
}

partenaire.addEventListener('click', () => {
    chatbox.profile = new Partenaire();
    showChatbotTypingAndMessage('Please Enter Your first Name',"firstName");
})
