# Methods

    ## on
        => to catch any event coming from maybe backend or client.
    ## emit
        => to create a event or custom event on both server and client side.

# Inbuilt events in Socket.io

    ## connection
    ## disconnect
    ## message (send function)
    ## ping
    ## ...more

# Custom events can also be created

    ## 2 Ways to do that
        => 1. create event on server side and catch it on client side.
            Eg:
                server.js
                socket.emit("custom_event_name", `${data or object}`)

                client.html
                socket.on("custom_event_name", (data) => {
                    do whatever with data
                })

        => 2. create event on client side and catch it on server side.

# Global broadcast

    ## io.sockets.emit()
        server.js
        io.sockets.emit("broadcast", {});

        index.html
        socket.on("broadcast", () => {});

# Broadcast within already connected users

    ## socket.broadcast.emit()
        user.broadcast.emit("newuserconnect", {
            message: `${users} users connected`,
        });

# Defualt namespace

    ## "/"
    ## Defining custom namespace
        const cnsp = io.of("/custom-namespace");

# Rooms

    ## What is Rooms
        => We can create multiple channels inside our namespace according to us those channel known as rooms.

    ## Why we use rooms
        => App like whatsapp their groupchat feature there the room comes in. also we can limit number of users.

    ## Creating rooms
        // creating channel or room
        maxuser++;
        user.join(`room ${roomno}`);
        // firing an event inside the room
        io.sockets
            .in(`room ${roomno}`)
            .emit("new connection", `You are connected to room no ${roomno}`);
