// to GET and POST messages, we use javascript's built-in function "fetch"
// fetch returns a "promise", which is a fancy object representing an asynchronous computation
// We call ".then" and ".catch" on the promise object where we can register success and error callbacks respectively.
let text_input = document.querySelector('#textEntry')
let btn_submit = document.querySelector('#submitButton')
let form_input = document.querySelector('#formInput')


function postMessage (text) {
  console.log('posting message')
  fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text, date: new Date() })
  })
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function getMessages () {
  fetch('/messages')
    .then(response => response.json())
    .then(data => console.log(data))
}


form_input.onsubmit = event => {
  event.preventDefault()
  //take the inner html from the text_input
  let user_input = text_input.value
  postMessage(user_input)
  //use it for the post request
}

// here is an example of how to send a POST request using the postMessage function:
// postMessage('hello')

// here we call getMessages because the first thing we want to do when loading the page is get all previous messages.
getMessages()
