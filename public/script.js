const socket = io();
$('#msg-section').hide();
$('#login-btn').click(() =>{
    socket.emit('login', {
        name: $("#login-inp").val()
    })
    $('#login-section').hide();
    $('#msg-section').show();
});

$('#msg-btn').click(() => {
    socket.emit('message', {
        msg:  $("#msg-inp").val()
    })
    $("#msg-inp").val("");
});

socket.on('received_msg', (data) => {
    $('#chat').append(`<li> <strong>${data.name}</strong> : ${data.msg}</li>`)
});