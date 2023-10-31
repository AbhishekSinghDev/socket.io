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
