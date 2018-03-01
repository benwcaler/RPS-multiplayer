window.onload = function () {
    // variables
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
    //enter name and set fb objects for name wins, losses, choice
    $("#strtbtn").on("click", function () {
        event.preventDefault();
        database.ref().child("players")
        // database.ref("players").child("player1")
        database.ref("player1").update({
            name: $("#name").val(),
            wins: 0,
            losses: 0
        })
        $("#name").val("")
    })
    // player one makes Selection display their selection on their screen only
    $(".choice").on("click", function () {
        database.ref("player1").child("choice")
        database.ref("choice").update({
        choice: $(this).text()
        })
    })
}
    // player two makes selection display their selection on their screen only

    //compare results and post winner in results pane

    //sumbit message to server

    //return message from server and append to chat pane

    //
