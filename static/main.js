// to GET and POST messages, we use javascript's built-in function "fetch"
// fetch returns a "promise", which is a fancy object representing an asynchronous computation
// We call ".then" and ".catch" on the promise object where we can register success and error callbacks respectively.
const yo = require('yo-yo')
const generate_display = require('./get_messages').generate_display


let text_input = document.querySelector('#textEntry')
let btn_submit = document.querySelector('#submitButton')
let form_input = document.querySelector('#formInput')
let all_messages = document.querySelector('#allMessages')
let room_selection = document.querySelector('#roomSelection')

var nick = null

  
  while (nick === null || nick === '') {
    nick = prompt("Please enter your username for the chatroom: ")
  }
  
  function postMessage(text, filter) {
    console.log('posting message')
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text, date: new Date(), username: nick, room: room_selection.value })
    })
    .then(data => {
      console.log('Success:', data)
      getMessages(filter)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }
  

  
  room_selection.addEventListener("change", (event) => {
    // alert("changed")
    console.log(room_array)
    console.log(event.target.value)
    room = room_array[event.target.value-1]
    getMessages(room)
  })

  const roomOne = message => message.room == 1
  const roomTwo = message => message.room == 2
  const roomThree = message => message.room == 3

  const room_array = [roomOne, roomTwo, roomThree]
  
  var room = roomOne
  
  let el = generate_display([], room)
  all_messages.appendChild(el)
  
function update(messages, room) {
  let new_yo = generate_display(messages, room)
  yo.update(el, new_yo)
}

form_input.onsubmit = event => {
  event.preventDefault()
  //take the inner html from the text_input
  let user_input = text_input.value
  postMessage(user_input, room)

  //use it for the post request
}

function getMessages(filter) {
  fetch('/messages')
  .then(response => response.json())
  .then(data => update(data, filter))
  // .then (data => update(data))
  
}


// let myInt = 0
// function myfunc() {
//   console.log(myInt++)
// }

let myinterval = setInterval(function () {
  getMessages(room)
}, 750)





// here is an example of how to send a POST request using the postMessage function:
// postMessage('hello')

// here we call getMessages because the first thing we want to do when loading the page is get all previous messages.
getMessages(room)
