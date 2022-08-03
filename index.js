//elements for settings button/login button
const formContainer = document.querySelector('div.formContainer')
    //specific for setting
    const settingContainer = document.querySelector('div.settingContainer')
    const settingsbtn = document.querySelector("button#settings")
    const settingCancel = document.querySelector('button.settingCancelBtn')
    const settingFormSubmit= document.querySelector('form#settingForm')
    //specific for login
    const loginContainer = document.querySelector('div.loginContainer')
    const loginbtn = document.querySelector('button#login')
    const loginCancel = document.querySelector("button.loginCancelBtn")
    const loginFormSubmit = document.querySelector('form#loginForm')
    const signupbtn = document.querySelector('button#signUp')
    //specific for signup
    const signupContainer = document.querySelector('div.signupContainer')
    const timerparentContainer = document.querySelector('div.timerParentContainer')
    const signupCancel = document.querySelector('div.signinCancelBtn')

//Event listeners for setting button
    //mouse over event to change text color
    settingsbtn.addEventListener('mouseover', ()=>{
        settingsbtn.style.color = "grey"
    });
    settingsbtn.addEventListener('mouseout', ()=>{
        settingsbtn.style.color = "white"
    });
    //opening up the settings menu
    settingsbtn.addEventListener('click', ()=>{
        formContainer.setAttribute('id','formContainer')
        settingContainer.setAttribute('id','settingContainer')
        timerparentContainer.setAttribute("id", "formHidden")
        //add event listener to submit settings form

        //want to add event listeners after the form is rendered
        document.addEventListener("DOMContentLoaded",()=>{
            //event listener for exiting the settings form
            settingCancel.addEventListener('click', ()=>{
                formContainer.setAttribute('id','formHidden')
                settingContainer.setAttribute('id','formHidden')
                timerparentContainer.setAttribute('id', "timerParentContainer")
            });
        });
    });

//Event listeners for login
    //mouse over event to change text color
    loginbtn.addEventListener('mouseover', ()=>{
        loginbtn.style.color = "grey"
    });
    loginbtn.addEventListener('mouseout', ()=>{
        loginbtn.style.color = "white"
    });

    //opening up the login form
    loginbtn.addEventListener('click', ()=>{
        formContainer.setAttribute('id','formContainer')
        loginContainer.setAttribute('id','loginContainer')
        timerparentContainer.setAttribute("id", "formHidden")
        //add event listener to submit log in form

        //want to access log in cancel after its loaded
        document.addEventListener("DOMContentLoaded", ()=>{
            //event listener to exit log in form
            loginCancel.addEventListener('click',()=>{
                formContainer.setAttribute('id','formHidden')
                loginContainer.setAttribute('id','formHidden')
                timerparentContainer.setAttribute('id', "timerParentContainer")
            });
        });
    });

//Event Listeners for sign up
    //mouseover event to change text color
    signupbtn.addEventListener("mouseover",()=>{
        signupbtn.style.color = "grey"
    })
    signupbtn.addEventListener('mouseout', ()=>{
        signupbtn.style.color = "white"
    });

    //opening up sign up form
    signupbtn.addEventListener('click', ()=>{
        formContainer.setAttribute('id','formContainer')
        signupContainer.setAttribute('id','signupContainer')
        timerparentContainer.setAttribute("id", "formHidden")
        //add event listner to submit sign up form
            //sumbit-> boolean if pass & confirm pass match => true
                            //post new user into index.json
                            //send a new alert "Welcome to myPOMODORO!"
                  //-> boolean if pass & confirm pass no match => false
                            //send a alert "Password doesn't match"
                            //reset form 

        //cant access this element unless its loaded after button clicked
        document.addEventListener("DOMContentLoaded", ()=>{
            //event listener to exit log in form
            loginCancel.addEventListener('click',()=>{
                formContainer.setAttribute('id','formHidden')
                signupContainer.setAttribute('id','formHidden')
                timerparentContainer.setAttribute('id', "timerParentContainer")
            });
        });
    })

//Random quote generator
async function getAllQuotes() {
    let res = await fetch('https://type.fit/api/quotes');
    let data = await res.json() ;
    allQuotes = data;
    renderOneQuote(data)
}

function renderOneQuote() {
    let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    console.log(randomQuote);
    let textOfQuote = document.querySelector('#quoteText');
    let authorOfQuote = document.querySelector('#quoteAuthor');
    textOfQuote.innerText = `"${randomQuote.text}"`;
    if (randomQuote.author != null ) {authorOfQuote.innerText = ` - ${randomQuote.author}`}
    else {authorOfQuote.innerText = ``};
    setTimeout(renderOneQuote, 120000);
}
getAllQuotes()




// Karl's code sign up form
document.querySelector('#submitCreate').addEventListener("click", (e) => {
    e.preventDefault()
    createAnAccount()})

async function createAnAccount() {
    const usernameSubmitForm = document.querySelector('#usernameSubmitForm');
    const passwordSubmitForm = document.querySelector('#passwordSubmitForm');
    const confirmPasswordSubmitForm = document.querySelector('#confirmPasswordSubmitForm');

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
        formContainer.setAttribute('id','formHidden');
        signupContainer.setAttribute('id','formHidden');
        timerparentContainer.setAttribute('id', "timerParentContainer");
        alert('Successfully sign up! Please log in!')

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

/* I did the button again, we don't need it; 
const cancelButtonSignUp = document.querySelector('#cancelSignUpButton')
cancelButtonSignUp.addEventListener('click',(e) => hideTheForm())

function hideTheForm() {
    formContainer.setAttribute('id','formHidden');
    signupContainer.setAttribute('id','formHidden');
    timerparentContainer.setAttribute('id', "timerParentContainer");
}
*/
//Karl's settings

document.querySelector('#submitSetting').addEventListener("click", (e) => {
    e.preventDefault()
    changeSettings()})

async function changeSettings() {
        const workTimerForm = document.querySelector('#workTimerForm');
        const shortBreakTimerForm = document.querySelector('#shortBreakTimerForm');
        const longBreakTimerForm = document.querySelector('#longBreakTimerForm');
    
        objYourSettings = {
            startWorkTimer: workTimerForm.value,
            shortBreakTimer: shortBreakTimerForm.value,
            longBreakTimer: longBreakTimerForm.value
        }
        document.querySelector('#timerMin').innerText = workTimerForm.value;
        //shortBreak.innerText = shortBreakTimerForm.value;
        //longBreak.innerHTML = longBreakTimerForm.value
        formContainer.setAttribute('id','formHidden');
        signupContainer.setAttribute('id','formHidden');
        timerparentContainer.setAttribute('id', "timerParentContainer");
        alert('Wow! You changed your settings!')
            /* (////you are loged in; needs to be changed //// workTimerForm.value == "wow") {
            updateYourSettings(objYourSettings, yourId);
            alert('Wow! You changed your settings!')
            } else {
            document.querySelector('#timerMin').innerText = workTimerForm.value;
            //shortBreak.innerText = shortBreakTimerForm.value;
            //longBreak.innerHTML = longBreakTimerForm.value
            formContainer.setAttribute('id','formHidden');
            signupContainer.setAttribute('id','formHidden');
            timerparentContainer.setAttribute('id', "timerParentContainer");
            alert('Wow! You changed your settings!')
        }
        */
        
}
    
async function updateYourSettings(objYourSettings, yourId) {
         let res = await fetch(`http://localhost:3000/users/ ${yourId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objYourSettings)
        });
        let data = await res.json() ;
        console.log(data);
}
    
//Karl's Log in


document.querySelector('#submitLogin').addEventListener("click", (e) => {
    e.preventDefault()
    getDataFromOurServer()})


async function getDataFromOurServer() {
    let res = await fetch('http://localhost:3000/users');
    let dataFromServer = await res.json() ;
    //let valuesOfNames = Object.keys(dataFromServer);
    //console.log(valuesOfNames) 
    const usernameLoginForm = document.querySelector('#usernameLoginForm');
    const passwordLoginForm = document.querySelector('#passwordLoginForm');
    let idName = 'None';
    let IdPasword = 'None';
    dataFromServer.forEach((oneObj) => {
        if (oneObj.username == usernameLoginForm.value) {
            idName = oneObj.id;
        } else {console.log('not match')}
        }
    )
    dataFromServer.forEach((oneObj) => {
        if (oneObj.password == passwordLoginForm.value) {
            IdPasword = oneObj.id;
        } else {console.log('not match')}
    })

    if(idName == IdPasword && idName != 'None' && IdPasword != 'None') {alert('you are loged in')
    async function getdataForUser() {
        let res = await fetch(`http://localhost:3000/users/${idName}`);
        let dataForUser = await res.json() ;
        console.log(dataForUser);
    }
    getdataForUser()
    }
     else {
        alert('your password or name is incorect')
    }


    //console.log( dataFromServer)
   // checkIfYouAreSignedUp(dataFromServer);
}

// async function checkIfYouAreSignedUp(dataFromServer) {
//     const usernameLoginForm = document.querySelector('#usernameLoginForm');
//     const passwordLoginForm = document.querySelector('#passwordLoginForm');
//     if(dataFromServer.forEach((oneObj) => {
//      oneObj.username == usernameLoginForm.value
        
//     }) &&  dataFromServer.forEach((oneObj) => {
//      oneObj.password == passwordLoginForm.value
//     })) {
//         console.log('wow')
//     } else {

//     console.log('not wow')
//     }
// }
   


// Karl's ToDo Form JS
document.querySelector("#submitTodo").addEventListener('click',  (e) => {
    e.preventDefault()
    renderOneToDo()})

let arrayOfAllTasks = [];
    async function renderOneToDo() {
        let card = document.createElement('li');
        let textToPrintInToDO = document.querySelector('#textToBePrintedInToDo');
        card.className = "singleParentTaskContainer";
        card.innerHTML = `
            <div class = "singleTask">
                <span>"${textToPrintInToDO.value}"</span>
            </div> 
            <div class = "taskDoneBtn">
                <button id="deleteToDo" >x</button>
            </div>
        `
        card.querySelector('#deleteToDo').addEventListener('click', () => {
            card.remove()
            arrayOfAllTasks = arrayOfAllTasks.filter((e) => { 
                console.log(arrayOfAllTasks, textToPrintInToDO.value, e);
                return e !== `${textToPrintInToDO.value}`; 
        })
         
            //deleteRamen(ramen.id)
        })
        document.querySelector('#mytodos').appendChild(card);
        arrayOfAllTasks.push(`${textToPrintInToDO.value}`);
        //console.log(arrayOfAllTasks);
        document.querySelector('#todoForm').reset()

    }


    