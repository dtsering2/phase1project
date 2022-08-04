////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
//Event Listener to open the sign up form and create new account
    //grabbing elements to open sign up form
    const openSignupForm = document.querySelector("button#openSignUpForm")
    const signupForm = document.querySelector("div#signupContainer")
    const loginForm = document.querySelector("div#loginContainer")
    //event listener added to signup button
    openSignupForm.addEventListener('click', ()=>{
        loginForm.setAttribute("class", "hide")
        signupForm.setAttribute("class" , "signupContainer")
    })
    //event listener to create an account
    const createAccountBtn = document.querySelector("input#submitCreate")
        createAccountBtn.addEventListener("click", (e) => {
        e.preventDefault()
        createAnAccount()
    })
    
    async function createAnAccount() {
        const usernameSubmitForm = document.querySelector('#signupUsername');
        const passwordSubmitForm = document.querySelector('#signupPass');
        const confirmPasswordSubmitForm = document.querySelector('#signupConfirmPass');
        objNewInfoSingUp = {
            username: usernameSubmitForm.value,
            password: passwordSubmitForm.value,
            startWorkTimer: 25,
            shortBreakTimer: 5,
            longBreakTimer: 10,
            cycleCompleted: 0,
            Tasks: []
        }
    
        if (passwordSubmitForm.value === confirmPasswordSubmitForm.value ) {
            updateYourPasswordAndName(objNewInfoSingUp);
            alert('Successfully created an account! Please log in!')
        } else {
            document.querySelector('#signupForm').reset();
            alert('Your passwords do not match. Please try again.')
        }
    }
    
    async function updateYourPasswordAndName(objNewInfoSingUp) {
        let res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objNewInfoSingUp)
        });
        let data = await res.json() ;
        console.log(data);
    }
    //event listener to go back to log in form
    const goBackToLogin = document.querySelector("button#goBackLoginBtn")
    goBackToLogin.addEventListener('click', ()=>{
        loginForm.setAttribute("class", "loginContainer")
        signupForm.setAttribute("class" , "hide")
    })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//event listener to log in
//elements to render 
const successLoginRender = document.querySelector("div#successfulLoginRender")
const initialLoginPage = document.querySelector('div#initialLoginContainer')
//const signupForm = document.querySelector("div#signupContainer") //just for reference
//const loginForm = document.querySelector("div#loginContainer") // just for reference


document.querySelector('#submitLogin').addEventListener("click", (e) => {
    e.preventDefault()
    getDataFromOurServer()
})

//variables for getDataFromOurServer
    let idName = 'None';
    let IdPassword = 'None';

async function getDataFromOurServer() {
    let res = await fetch('http://localhost:3000/users');
    let dataFromServer = await res.json() ;
    //let valuesOfNames = Object.keys(dataFromServer);
    //console.log(valuesOfNames) 
    const usernameLoginForm = document.querySelector('#loginUsername');
    const passwordLoginForm = document.querySelector('#loginPassword');
    
    dataFromServer.forEach((oneObj) => {
        if (oneObj.username == usernameLoginForm.value) {
            idName = oneObj.id;
        } else {
            console.log('not match')
        }
    })

    dataFromServer.forEach((oneObj) => {
        if (oneObj.password == passwordLoginForm.value) {
            IdPassword = oneObj.id;
        } else {
            console.log('not match')
        }
    })

    if(idName == IdPassword && idName != 'None' && IdPassword != 'None') {
        alert('you are logged in')
        loginForm.setAttribute("class", "hide")
        signupForm.setAttribute("class", "hide")
        initialLoginPage.setAttribute("class", "hide")
        successLoginRender.setAttribute("class", "successfulLoginRender")
        async function getdataForUser() {
        let res = await fetch(`http://localhost:3000/users/${idName}`);
        let dataForUser = await res.json() ;
        userData = await dataForUser;
        dataForUser.Tasks.forEach(oneValueOfTHeArray => renderOneToDo(oneValueOfTHeArray));
        document.querySelector('span#workTimerMin').innerText=userData.startWorkTimer;
    }
    getdataForUser()
    } else {
        alert('Your username or password is incorrect. Please try again.')
    }
}


// async function getDataForUser(id){
//     let response = await fetch(`http://localhost:3000/users/${id}`);
//     let data = await response.json()
//     return data
// }
// async function storeDataForUser(){
//     userData = await getDataForUser(idName)
// }
// storeDataForUser
// console.log(userData)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FIXME: 
//Settings event listeners
    //grabbing elements for settings
    let settingsbtn = document.querySelector('button#settingsbtn')
    let settingsForm = document.querySelector("div#settingContainer")
    let everythingUnderHeader = document.querySelector("div#hideAfterSettings")
    let logoutbtn = document.querySelector('button#logoutbtn')
    let settingsCancelBtn = document.querySelector('button#settingCancelBtn')

    settingsbtn.addEventListener('mouseover', ()=>{
        settingsbtn.style.color = "grey"
    });
    settingsbtn.addEventListener('mouseout', ()=>{
        settingsbtn.style.color = "white"
    });

    logoutbtn.addEventListener('mouseover', ()=>{
        logoutbtn.style.color = "grey"
    });
    logoutbtn.addEventListener('mouseout', ()=>{
        logoutbtn.style.color = "white"
    });

    settingsbtn.addEventListener('click', ()=>{
        settingsForm.setAttribute("class", "settingContainer")
    })
    settingsCancelBtn.addEventListener('click', ()=>{
        settingsForm.setAttribute("class", "hide")
    })

    logoutbtn.addEventListener('click', ()=>{
        window.location.reload()
    })
    //settings form
    document.querySelector('#submitSetting').addEventListener("click", (e) => {
        e.preventDefault()
        changeSettings()
    })
    
    async function changeSettings() {
        const workTimerForm = document.querySelector('#workTimerForm');
        const shortBreakTimerForm = document.querySelector('#shortBreakTimerForm');
        const longBreakTimerForm = document.querySelector('#longBreakTimerForm');
        
        let objYourSettings = {
            startWorkTimer: workTimerForm.value,
            shortBreakTimer: shortBreakTimerForm.value,
            longBreakTimer: longBreakTimerForm.value
            }
        document.querySelector('#workTimerMin').innerText = workTimerForm.value;
        alert('Wow! You changed your settings!')
        updateYourSettings(objYourSettings,idName)
    }
    async function updateYourSettings(patchSettings, yourId) {
        let res = await fetch(`http://localhost:3000/users/${yourId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchSettings)
        });
        let data = await res.json() ;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Timer header 
//necessary elements
    const workHeader = document.querySelector("#workHeader")
    const shortHeader = document.querySelector("#shortHeader")
    const longHeader = document.querySelector("#longHeader")
    //mouseover event for spans
    workHeader.addEventListener('mouseover', ()=>{
        workHeader.style.color = "grey"
    });
    workHeader.addEventListener('mouseout', ()=>{
        workHeader.style.color = "white"
    });
    shortHeader.addEventListener('mouseover', ()=>{
        shortHeader.style.color = "grey"
    });
    shortHeader.addEventListener('mouseout', ()=>{
        shortHeader.style.color = "white"
    });
    longHeader.addEventListener('mouseover', ()=>{
        longHeader.style.color = "grey"
    });
    longHeader.addEventListener('mouseout', ()=>{
        longHeader.style.color = "white"
    });

    //Timer min element
    timerContainer = document.querySelector("div#timerContainer")
    minTime = document.querySelector('span#workTimerMin');
    secTime = document.querySelector('span#workTimerSec')
    const url = "http://localhost:3000/users"
//FIXME: 
    //defining function to grab data
    function getDataById(urlPlaceHolder,justId){
        return fetch(`${urlPlaceHolder}/${justId}`)
        .then(res => res.json())
    }
    //defining function render data
    function renderWorkTime(currentData){
        minTime.innerText = currentData.startWorkTimer
        secTime.innerText = 00;
    }
    function renderShortBreak(currentData){
        minTime.innerText = currentData.shortBreakTimer
        secTime.innerText = 00;
    }
    function renderLongBreak(currentData){
        minTime.innerText = currentData.longBreakTimer
        secTime.innerText = 00;
    }

    //event listener to populate the timer
    workHeader.addEventListener('click', ()=>{
        getDataById(url,idName)
        .then (individualData => renderWorkTime(individualData))
    })
    shortHeader.addEventListener('click', ()=>{
        getDataById(url,idName)
        .then (individualData => renderShortBreak(individualData))
    })
    longHeader.addEventListener('click', ()=>{
        getDataById(url,idName)
        .then (individualData => renderLongBreak(individualData))
    })


    //STARTING AND PAUSING TIMER
        document.addEventListener("DOMContentLoaded", ()=>{
            //grabbing button elements and the timer
            let startBtn = document.querySelector('button#startTimer');
            let pauseBtn = document.querySelector('button#pauseTimer');
            let minute = document.querySelector('span#workTimerMin');
            let seconds = document.querySelector('span#workTimerSec');
            let startTimer;

            //adding event listener to start and pause timer
            startBtn.addEventListener('click', ()=>{
                if (startTimer === undefined){
                    startTimer = setInterval(timer,1000);
                }
            });
            pauseBtn.addEventListener('click', ()=>{
                stopTimer();
                startTimer = undefined;
            });

            //function to start timer count down
            const timer = function () {
                if (seconds.innerText != 00){
                    seconds.innerText --;
                } else if(minute.innerText != 0 && seconds.innerText == 00){
                    seconds.innerText = 59;
                    minute.innerText --;
                } 
            };
            //function to pause timer
            const stopTimer = function(){
                clearInterval(startTimer)
            }
        });

//Random quote generator
document.addEventListener("DOMContentLoaded", ()=>{
    async function getAllQuotes() {
        let res = await fetch('https://type.fit/api/quotes');
        let data = await res.json() ;
        allQuotes = data;
        renderOneQuote(data)
    }
    
    function renderOneQuote() {
        let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        let textOfQuote = document.querySelector('#quoteText');
        let authorOfQuote = document.querySelector('#quoteAuthor');
        textOfQuote.innerText = `"${randomQuote.text}"`;
        if (randomQuote.author != null ){
            authorOfQuote.innerText = ` - ${randomQuote.author}`
        } else {
            authorOfQuote.innerText = ``
        };
        setTimeout(renderOneQuote, 10000);
    }
    getAllQuotes()
})

//TODO: start the todo button
const todoFormContainer = document.querySelector("div#todoFormContainer") //want to change its class to hide/show based on if button add task is clicked
const todoFormSubmission = document.querySelector('input#submitTodo') //submit button for add task
const todoFormCancelBtn = document.querySelector("button#todoCancelBtn") //to exit to do form
const openTaskFormBtn = document.querySelector("button#openAddTaskFormBtn") //If pressed opens the form and hides the button itself

//Event listener to open and close todo form
    openTaskFormBtn.addEventListener('click', ()=> {
        todoFormContainer.setAttribute("class", "show")
        openTaskFormBtn.setAttribute("class", "hide")
    })

    todoFormCancelBtn.addEventListener('click', ()=> {
        todoFormContainer.setAttribute("class", "hide")
        openTaskFormBtn.setAttribute("class", "show")
    })


   
    // Karl's ToDo Form JS ///////////////////////////////////////////////////////////////////////////////////

//My global variables
let newArray;

let newArrayForDeleteButton;


document.querySelector("#submitTodo").addEventListener('click', (e) => {
    e.preventDefault()
    let textToPrintInToDO = document.querySelector('#todoInput').value;
    renderOneToDo(textToPrintInToDO)
})


async function renderOneToDo(a) {
    let card = document.createElement('li');

    
    card.className = "singleParentTaskContainer";
    card.innerHTML = `
            <div id = "singleTask" class = "singleTask">
                <span class="spansValue">${a}</span>         
            </div> 
            <div class = "taskDone">
                <button class ="taskDoneBtn" id="deleteToDo" >✓</button>
            </div>
        `
   

        // <div id = "todoContainer">
        //             <div id="mytodos">
        //                 <div class ="singleParentTaskContainer">
        //                     <div class = "singleTask">
        //                         <span class = "addedTask">- textsome textsome text </span>
        //                     </div> 
        //                     <div class = "taskDone">
        //                         <button class ="taskDoneBtn">✓</button>
        //                     </div>
        //                 </div>
        //             </div>
   
   
        //delete button
    card.querySelector('#deleteToDo').addEventListener('click', (e) => {


        getdataForUserThree()
        //Get the array from the server
        async function getdataForUserThree() {
            let res = await fetch(`http://localhost:3000/users/${idName}`);
            let dataForUserTwo = await res.json();
            newArrayForDeleteButton = await dataForUserTwo.Tasks

            
            //CHange the array
            let myTextToDelete = e.target.parentNode.parentNode.querySelector('span').textContent

           
            let newArrayForDeleteButtonWow = newArrayForDeleteButton.filter(item => {
                
                return item != myTextToDelete;
            }
            );
            
                    let tasksObjTwo = {
                        Tasks: newArrayForDeleteButtonWow
                    };
            //Patch the array
                   addTheTextInTheTaskBarDeleteButton(tasksObjTwo);
                   document.querySelector('#todoForm').reset()
        }

            async function addTheTextInTheTaskBarDeleteButton(tasksObjTwo) {
            let res = await fetch(`http://localhost:3000/users/${idName}`, {
               method: 'PATCH',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(tasksObjTwo)
           });
           let data = await res.json() ;

          }   

          card.remove();
    })


    document.querySelector('#mytodos').appendChild(card);


    getdataForUserTwo()
    //Get the array from the server
    async function getdataForUserTwo() {
        let res = await fetch(`http://localhost:3000/users/${idName}`);
        let dataForUser = await res.json();



        // Change the array!
        newArray = dataForUser.Tasks
        newArray.push(`${document.querySelector('#todoInput').value}`);
        let tasksObj = {
            Tasks: newArray
        };

        //Patch the array!!
        addTheTextInTheTaskBar(tasksObj);
        document.querySelector('#todoForm').reset()
    }

}

async function addTheTextInTheTaskBar(tasksObj) {
    let res = await fetch(`http://localhost:3000/users/${idName}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasksObj)
    });
    let data = await res.json();
    
}