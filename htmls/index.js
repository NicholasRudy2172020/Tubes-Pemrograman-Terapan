
$(document).ready(function() {
    $.get("http://localhost:5000/games", function(data) {
        data.forEach(function(game) {
            $("#gamesTableBody").append(
                `<tr>
                    <td>${game.id}</td>
                    <td>${game.title}</td>
                    <td>${game.dev_studio}</td>
                    <td>${game.publisher_name}</td>
                </tr>`
            );
        });
    });


    $.get("http://localhost:5000/publishers", function(data) {
        data.forEach(function(publisher) {
            $("#publishersTableBody").append(
                `<tr>
                    <td>${publisher.publisher_id}</td>
                    <td>${publisher.name}</td>
                </tr>`
            );
        });
    });
});