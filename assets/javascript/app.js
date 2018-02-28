window.onload = function () {
    // variables
    var p1;
    var p2;
    var config = {
        apiKey: "AIzaSyA9G4iGYLiJLZ1yyAwVi9qUCt2503oGsrE",
        authDomain: "scw-multiplayer.firebaseapp.com",
        databaseURL: "https://scw-multiplayer.firebaseio.com",
        projectId: "scw-multiplayer",
        storageBucket: "scw-multiplayer.appspot.com",
        messagingSenderId: "879503526930"
    };
    firebase.initializeApp(config);
    var database = firebase.database()
    // player one makes Selection display their selection on their screen only
    $(".choice").on("click", function () {
        p1 = $(this).text();
        console.log($(this).text())
        database.ref().set({
            player1: p1,
        })

    })
    // player two makes selection display their selection on their screen only

    //compare results and post winner in results pane

    //sumbit message to server

    //return message from server and append to chat pane

    //
}