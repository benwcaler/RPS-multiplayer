window.onload = function () {
    // variables
    var player1 = null;
    var player2 = null;
    var p1wins = 0;
    var p2wins = 0;
    var p1losses = 0;
    var p2losses = 0;
    var player;
    var turn = 1;
    var p1choice;
    var p2choice;

    firebase.initializeApp({
        apiKey: "AIzaSyA9G4iGYLiJLZ1yyAwVi9qUCt2503oGsrE",
        authDomain: "scw-multiplayer.firebaseapp.com",
        databaseURL: "https://scw-multiplayer.firebaseio.com",
        projectId: "scw-multiplayer",
        storageBucket: "scw-multiplayer.appspot.com",
        messagingSenderId: "879503526930"
    });
    var database = firebase.database();

    database.ref("players").on("value", function (snapshot) {
        if (snapshot.child("p1").exists()) {
            player1 = snapshot.val().p1.name;
        } else {
            player1 = null;
        }
        if (snapshot.child("p2").exists()) {
            player2 = snapshot.val().p2.name;
        } else {
            player2 = null;
        }
        if (player1 && player2) {
            database.ref().update({
                turn: turn
            });
        }
        if (p1choice && p2choice) {
            winner()
        }
    });

    //enter name and set fb objects for name wins, losses, choice
    $("#strtbtn").on("click", function () {
        event.preventDefault();
        //Determines if the is already a player or not and sets flags. 
        if ($("#name").val() !== "" && !(player1 && player2)) {
            if (player1 === null) {
                database.ref("players/p1").set({
                    name: $("#name").val(),
                    wins: p1wins,
                    losses: p1losses
                });
                player = "p1";
                database.ref("players/p1").onDisconnect().remove()
            } else if (player1 !== null && player2 === null) {
                database.ref("players/p2").set({
                    name: $("#name").val(),
                    wins: p2wins,
                    losses: p2losses
                });
                player = "p2";
                database.ref("players/p2").onDisconnect().remove()
            }
        }
        $("#name").val("");
    })


    // player one makes Selection display their selection on their screen only
    $(".choice").on("click", function () {
        if (turn === 1 && player === "p1") {
            database.ref("players/" + player).update({
                choice: $(this).text().toLowerCase()
            });
            p1choice = $(this).text().toLowerCase();
            //display choice in pane 1
            //display "waiting" in pane 2
        } else if (turn === 2 && player === "p2") {
            database.ref("players/" + player).update({
                choice: $(this).text().toLowerCase()
            });
            p2choice = $(this).text().toLowerCase();
            //display choice in pane 1 and 2
            //run comparing function
        }
    })
}
//player two makes selection display their selection on their screen only

//compare results and post winner in results pane
function winner() {
    alert("You made it to the winner function!!!")
}
    //sumbit message to server

    //return message from server and append to chat pane

    //
