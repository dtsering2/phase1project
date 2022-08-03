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
                                                                                //5. 
                                                                                

// //elements for settings button/login button
// const formContainer = document.querySelector('div.formContainer')
//     //specific for setting
//     const settingContainer = document.querySelector('div.settingContainer')
//     const settingsbtn = document.querySelector("button#settings")
//     const settingCancel = document.querySelector('button.settingCancelBtn')
//     const settingFormSubmit= document.querySelector('form#settingForm')
//     //specific for login
//     const loginContainer = document.querySelector('div.loginContainer')
//     const loginbtn = document.querySelector('button#login')
//     const loginCancel = document.querySelector("button.loginCancelBtn")
//     const loginFormSubmit = document.querySelector('form#loginForm')
//     const signupbtn = document.querySelector('button#signUp')
//     //specific for signup
//     const signupContainer = document.querySelector('div.signupContainer')
//     const timerparentContainer = document.querySelector('div.timerParentContainer')
//     const signupCancel = document.querySelector('div.signinCancelBtn')

// ////////////////////////////////////////////////////////////////////////////////////////////
// //Event listeners for setting button
//     //mouse over event to change text color
//     settingsbtn.addEventListener('mouseover', ()=>{
//         settingsbtn.style.color = "grey"
//     });
//     settingsbtn.addEventListener('mouseout', ()=>{
//         settingsbtn.style.color = "white"
//     });
//     //opening up the settings menu
//     settingsbtn.addEventListener('click', ()=>{
//         formContainer.setAttribute('id','formContainer')
//         settingContainer.setAttribute('id','settingContainer')
//         loginContainer.setAttribute("id", "formHidden")
//         signupContainer.setAttribute("id", "formHidden")
//         timerparentContainer.setAttribute("id", "formHidden")
//         //add event listener to submit settings form

//         //want to add event listeners after the form is rendered
//         document.addEventListener("DOMContentLoaded",()=>{
//             //event listener for close the settings form
//             settingCancel.addEventListener('click', ()=>{
//                 formContainer.setAttribute('id','formHidden')
//                 settingContainer.setAttribute('id','formHidden')
//                 timerparentContainer.setAttribute('id', "timerParentContainer")
//             });
//         });
//     });
// ////////////////////////////////////////////////////////////////////////////////////////////
// //Event listeners for login
//     //mouse over event to change text color
//     loginbtn.addEventListener('mouseover', ()=>{
//         loginbtn.style.color = "grey"
//     });
//     loginbtn.addEventListener('mouseout', ()=>{
//         loginbtn.style.color = "white"
//     });

//     //opening up the login form
//     loginbtn.addEventListener('click', ()=>{
//         formContainer.setAttribute('id','formContainer')
//         loginContainer.setAttribute('id','loginContainer')
//         settingContainer.setAttribute("id", "formHidden")
//         signupContainer.setAttribute("id", "formHidden")
//         timerparentContainer.setAttribute("id", "formHidden")
//         //add event listener to submit log in form

//         //want to access log in cancel after its loaded
//         document.addEventListener("DOMContentLoaded", ()=>{
//             //event listener to exit log in form
//             loginCancel.addEventListener('click',()=>{
//                 formContainer.setAttribute('id','formHidden')
//                 loginContainer.setAttribute('id','formHidden')
//                 timerparentContainer.setAttribute('id', "timerParentContainer")
//             });
//         });
//     });

// ////////////////////////////////////////////////////////////////////////////////////////////
// //Event Listeners for sign up
//     //mouseover event to change text color
//     signupbtn.addEventListener("mouseover",()=>{
//         signupbtn.style.color = "grey"
//     })
//     signupbtn.addEventListener('mouseout', ()=>{
//         signupbtn.style.color = "white"
//     });

//     //opening up sign up form
//     signupbtn.addEventListener('click', ()=>{
//         formContainer.setAttribute('id','formContainer')
//         signupContainer.setAttribute('id','signupContainer')
//         timerparentContainer.setAttribute("id", "formHidden")
//         settingContainer.setAttribute("id", "formHidden")
//         loginContainer.setAttribute("id", "formHidden")

//         //add event listner to submit sign up form
//             //sumbit-> boolean if pass & confirm pass match => true
//                             //post new user into index.json
//                             //send a new alert "Welcome to myPOMODORO!"
//                   //-> boolean if pass & confirm pass no match => false
//                             //send a alert "Password doesn't match"
//                             //reset form 

//         //cant access this element unless its loaded after button clicked
//         document.addEventListener("DOMContentLoaded", ()=>{
//             //event listener to exit log in form
//             loginCancel.addEventListener('click',()=>{
//                 formContainer.setAttribute('id','formHidden')
//                 signupContainer.setAttribute('id','formHidden')
//                 timerparentContainer.setAttribute('id', "timerParentContainer")
//             });
//         });
//     })
// ////////////////////////////////////////////////////////////////////////////////////////////
// //Elements for all timer events

// ////////////////////////////////////////////////////////////////////////////////////////////
// //Event Listeners for timer




////////////////////////////////////////////////////////////////////////////////////////////
//Random quote generator
async function getAllQuotes() {
    let res = await fetch('https://type.fit/api/quotes');
    let data = await res.json() ;
    allQuotes = data;
    renderOneQuote(data)
}

function renderOneQuote() {
    let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    console.log(randomQuote)
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
////////////////////////////////////////////////////////////////////////////////////////////
//Elements for todo events

////////////////////////////////////////////////////////////////////////////////////////////
//event listeners for todo submissions

////////////////////////////////////////////////////////////////////////////////////////////

