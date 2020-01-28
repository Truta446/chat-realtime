const socket = io("http://localhost:3000");

const renderMessage = request => {
    $(".messages").append(
        `<div class="message"><strong>${request.author}</strong>: ${request.message}</div>`
    );
};

socket.on("previousMessages", messages => {
    messages.forEach(message => {
        renderMessage(message);
    });
});

socket.on("receivedMessage", message => {
    renderMessage(message);
});

$("#chat").submit(event => {
    event.preventDefault();

    const author = $("input[name=username").val();
    const message = $("input[name=message]").val();

    if (author.length && message.length) {
        const payload = {
            author,
            message,
        };

        renderMessage(payload);

        socket.emit("sendMessage", payload);

        $("input[name=message]").val("");
    }
});
