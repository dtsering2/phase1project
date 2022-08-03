//TODO: Write a function that checks login info
    //let loginstatus = false;
    //add event listener to the login submit, that will check if the username and password exist in our database:
        //if the entered username and password is inside of our db.json, we will: 
                                                                                //1. change the div#initialLoginContainer class from .initialLoginContainer to .hide (basically hides the initial first rendered page)
                                                                                //2. change the div#successfulLoginRender class from .hide to .successfulLoginRender
                                                                                //3. create a variable called currentuserId and set it to that users.id.value (this will be the end point for the individual fetch calls we make later on)
                                                                                //4. grab the specific user's work timer, short break timer, long break timer 
                                                                                        //initial stage is work timer so start with work timer first
                                                                                        //create a var for span#worktimermin and set its inner text to the value of the key startworktimer
                                                                                        //we want to use DOM content loaded to do the same for the short break and long break
                                                                                //5. grab the users tasks from the key task and for each element in the array, render it to the Dom
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

    




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                if (seconds.innerText != 0){
                    seconds.innerText --;
                } else if(minute.innerText != 0 && seconds.innerText == 0){
                    seconds.innerText = 59;
                    minute.innerText --;
                };
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











































