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
            // change display to reflect p1's turn. 
        }
        if (!player1 && !player2) {
            //reset all database stuff to be ready for the next time the game is started
            database.ref().remove()
        }
        if (p1choice && p2choice) {
            winner()
        }
    });
database.ref("players").on("child_removed", function (snapshot) {
    database.ref("chat").remove();
})
    //Listens to the turn key to change them locally
    database.ref("turn").on("value", function (snapshot) {
        if (snapshot.val() === 1) {
            turn = 1;
        } else if (snapshot.val() === 2) {
            turn = 2;
        }
    });

    database.ref("players/p1/choice").on("value", function (snapshot) {
        p1choice = snapshot.val()
        $("#p1").empty();
    });

    database.ref("players/p2/choice").on("value", function (snapshot) {
        p2choice = snapshot.val()
    });

    database.ref("/chat/").on("child_added", function (snapshot) {
        var msg = $("<div>").html("[" + moment().format("hh:mm:ss") + "] " + snapshot.val());
        $("#chatbox").append(msg);
        // $("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
    });

    //enter name and set firebase objects for name wins, losses, choice
    $("#strtbtn").on("click", function () {
        event.preventDefault();
        //Determines if there is already a player or not and sets flags. 
        if ($("#name").val() !== "" && !(player1 && player2)) {
            if (player1 === null) {
                database.ref("players/p1").set({
                    name: $("#name").val(),
                    wins: p1wins,
                    losses: p1losses
                });
                player = $("#name").val();
                database.ref("players/p1").onDisconnect().remove()
            } else if (player1 !== null && player2 === null) {
                database.ref("players/p2").set({
                    name: $("#name").val(),
                    wins: p2wins,
                    losses: p2losses
                });
                player = $("#name").val();
                database.ref().child("turn").set(1);
                database.ref("players/p2").onDisconnect().remove();
                $("#p1").text("Waiting on " + player1)
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
            database.ref().child("/turn").set(2);
            $("#p1").text(player1 + " chooses " + p1choice)
            $("#p2").text("Waiting for " + player2)
        } else if (turn === 2 && player === "p2") {
            database.ref("players/" + player).update({
                choice: $(this).text().toLowerCase()
            });
            database.ref().child("/turn").set(1);
        }
    })

    //player two makes selection display their selection on their screen only

    //compare results and post winner in results pane
    function winner() {
        if (p1choice === "stone" && p2choice === "wand") {
            //Display rock/p1 wins
            $("#winner").text("P1 wins");
            p1wins++
            p2losses++
        } else if (p1choice === "stone" && p2choice === "cloak") {
            //display cloak/p2 wins
            $("#winner").text("P2 wins");
            p1losses++
            p2wins++
        } else if (p1choice === "wand" && p2choice === "cloak") {
            //display wand/p1 wins
            $("#winner").text("P1 wins");
            p1wins++
            p2losses++
        } else if (p1choice === "wand" && p2choice === "stone") {
            //display stone/p2 wins
            $("#winner").text("P2 wins");
            p1losses++
            p2wins++
        } else if (p1choice === "cloak" && p2choice === "wand") {
            //display wand/p2 wins
            $("#winner").text("P2 wins");
            p1losses++
            p2wins++
        } else if (p1choice === "cloak" && p2choice === "stone") {
            //display stone/p1 wins
            $("#winner").text("P1 wins");
            p1wins++
            p2losses++
        } else {
            //display tie
            $("#winner").text("Tie");
        }
        $("#p1wins").text("Player one wins: " + p1wins);
        $("#p1losses").text("Player one losses: " + p1losses);
        $("#p2wins").text("Player two wins: " + p2wins);
        $("#p2losses").text("Player two losses: " + p2losses);
        p1choice;
        p2choice;
        database.ref("players/p1/choice").remove();
        database.ref("players/p2/choice").remove();
        $("#p1").empty();
        $("#p2").empty();
        $("#p1").text("Waiting on " + player1)
    }
    //sumbit message to server
    $("#submit").on("click", function () {
        event.preventDefault()
        if ((player !== "") && ($("#msg").val().trim() !== "")) {
            var msg = player + ": " + $("#msg").val().trim();
            $("#msg").val("");
            var chatKey = database.ref().child("/chat/").push().key;
            database.ref("/chat/" + chatKey).set(msg);
        }
    })
    //
}