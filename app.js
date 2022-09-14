class Recruture {
    constructor(){
        this.firstName = "" ;
        this.lastName = "" ;
        this.enteprise = "" ;
        this.profile = "" ;
        this.email = "" ;
        this.tele = "" ;
        this.ExperienceYears = 0 ;

        this.allFildes = [
            "firstName",
            "LastName",
            "enteprise",
            "profile",
            "email",
            "tele",
            "ExperienceYears"
        ]


    }

    getIndexOfCurrentProps(prop){
        return this.allFildes.indexOf(prop);
    }

}


class Client {
    constructor(){
        this.service = "" ;
        this.firstName = "" ;
        this.lastName = "" ;
        this.email = "" ;
        this.tele = "" ;

        this.allFildes = [
            "service",
            "firstName",
            "LastName",
            "email",
            "tele"
        ]


    }

    getIndexOfCurrentProps(prop){
        return this.allFildes.indexOf(prop);
    }

}


class Partenaire {
    constructor(){
        this.firstName = "" ;
        this.lastName = "" ;
        this.partenaireType = "" ;
        this.email = "" ;
        this.tele = "" ;

        this.allFildes = [
            "firstName",
            "LastName",
            "partenaireType",
            "email",
            "tele"
        ]


    }

    getIndexOfCurrentProps(prop){
        return this.allFildes.indexOf(prop);
    }

}


class Condidate {
    constructor(){
        this.Cv = "" ;

        this.allFildes = [
            "Cv"
        ]


    }

    getIndexOfCurrentProps(prop){
        return this.allFildes.indexOf(prop);
    }

}



class Chatbox{
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support')
        }

        this.state = false;
        this.messageInfo = "";
        this.profile = null

        this.messages = [
            { name: "User", message: "Bonjour ELHASSANE, Je suis le winbot 👋🏻 😊" },
            { name: "User", message: "Allons-y ! Voici quelques options pour commencer 👇🏻" }        
        ];
    }

    addmessage(message , type , messageInfo = this.messageInfo){
        let msg1 = { name: type, message: message }
        this.messages.push(msg1);
        this.messageInfo = messageInfo;
        this.updateChatText(this.args.chatBox);

    }

    getLastMessage(){
        return this.messages[this.messages.length - 1]
    }

    getMessageInfo() {
        return this.messageInfo;
    }

    display() {
        const {openButton, chatBox} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))
    }

    toggleState(chatbox = this.args.chatBox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }


    updateChatText(chatbox) {
        var html = '';
        if (this.messages[this.messages.length - 1].name === "Sam")
            html += '<div class="messages__item messages__item--visitor">' + this.messages[this.messages.length - 1].message + '</div>'
        else
            html += '<div class="messages__item messages__item--operator">' + this.messages[this.messages.length - 1].message + '</div>'
        

        const chatmessage = chatbox.querySelector('.chatbot__messages');
        chatmessage.innerHTML += html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

chatbox.toggleState(document.querySelector('.chatbox__support'));
chatbox.updateChatText(document.querySelector('.chatbox__support'));
