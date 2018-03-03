window.onload = function () {
    // variables
    var player = "p1";
    var p1wins = 0;
    var p2wins = 0;
    var p1losses = 0;
    var p2losses = 0;

    firebase.initializeApp({
        apiKey: "AIzaSyA9G4iGYLiJLZ1yyAwVi9qUCt2503oGsrE",
        authDomain: "scw-multiplayer.firebaseapp.com",
        databaseURL: "https://scw-multiplayer.firebaseio.com",
        projectId: "scw-multiplayer",
        storageBucket: "scw-multiplayer.appspot.com",
        messagingSenderId: "879503526930"
    });
    var database = firebase.database();

    database.ref().once("child_added", function (snapshot) {
        if (snapshot.hasChild("p1") && !snapshot.hasChild("p2")) {
            player = "p2";
        }
        console.log(player)
    });

    //enter name and set fb objects for name wins, losses, choice
    $("#strtbtn").on("click", function () {
        event.preventDefault();
        //Determines if the is already a player or not and sets flags. 

        if (player === "p1") {
            database.ref("players/" + player).set({
                name: $("#name").val(),
                wins: p1wins,
                losses: p1losses
            });
        } else if (player === "p2") {
            database.ref("players/" + player).set({
                name: $("#name").val(),
                wins: p2wins,
                losses: p2losses
            });
        }
        
        $("#name").val("");
    })
    // player one makes Selection display their selection on their screen only
    $(".choice").on("click", function () {
        database.ref("players/" + player).update({
            choice: $(this).text().toLowerCase()
        })
        
    })
}
    // player two makes selection display their selection on their screen only

    //compare results and post winner in results pane

    //sumbit message to server

    //return message from server and append to chat pane

    //
