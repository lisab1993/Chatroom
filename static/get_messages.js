const yo = require('yo-yo')


function generate_message(message) {
    return yo`<div>
    <div class="row">${message.date}</div>
    <div class="row">${message.text}</div>
    <div class="row">${message.username}</div>
    <hr>
    </div>`
}

function generate_display(messages, room_filter) {
    // console.log(messages)
    return yo`<div class="row">
    ${messages.filter(room_filter).map(message => generate_message(message))}
    </div>`
}

module.exports = {
    generate_display,
    generate_message
}
