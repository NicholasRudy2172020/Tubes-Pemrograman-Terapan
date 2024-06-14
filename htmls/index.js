$(document).ready(function() {
    fetchGames();
    fetchPublishers();

    $('#gameModal').on('show.bs.modal', function() {
        populatePublisherDropdown();
    });

    // Form submission handlers
    $('#gameForm').on('submit', function(event) {
        event.preventDefault();
        console.log("Game form submitted");
        const gameId = $('#gameId').val();
        if (gameId) {
            updateGame(event);
        } else {
            saveGame(event);
        }
    });

    $('#publisherForm').on('submit', function(event) {
        event.preventDefault();
        console.log("Publisher form submitted");
        const publisherId = $('#publisherId').val();
        if (publisherId) {
            updatePublisher(event);
        } else {
            savePublisher(event);
        }
    });
});

function fetchGames() {
    $.get("http://127.0.0.1:5000/games", function(data) {
        $("#gamesTableBody").empty();
        data.forEach(function(game) {
            $("#gamesTableBody").append(
                `<tr>
                    <td>${game.id}</td>
                    <td>${game.title}</td>
                    <td>${game.dev_studio}</td>
                    <td>${game.publisher_name}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" onclick="openEditGameModal(${game.id})">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteGame(${game.id})">Delete</button>
                    </td>
                </tr>`
            );
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching games:", textStatus, errorThrown);
    });
}

function fetchPublishers() {
    $.get("http://127.0.0.1:5000/publishers", function(data) {
        $("#publishersTableBody").empty();
        data.forEach(function(publisher) {
            $("#publishersTableBody").append(
                `<tr>
                    <td>${publisher.publisher_id}</td>
                    <td>${publisher.name}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" onclick="openEditPublisherModal(${publisher.publisher_id})">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deletePublisher(${publisher.publisher_id})">Delete</button>
                    </td>
                </tr>`
            );
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching publishers:", textStatus, errorThrown);
    });
}

function populatePublisherDropdown() {
    $.get("http://127.0.0.1:5000/publishers", function(data) {
        $("#gamePublisher").empty();
        data.forEach(function(publisher) {
            $("#gamePublisher").append(
                `<option value="${publisher.publisher_id}">${publisher.name}</option>`
            );
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching publishers:", textStatus, errorThrown);
    });
}

function openEditGameModal(gameId) {
    fetch(`http://127.0.0.1:5000/games/${gameId}`)
        .then(response => response.json())
        .then(game => {
            $('#gameModal').modal('show');
            document.getElementById('gameId').value = game.id;
            document.getElementById('gameTitle').value = game.title;
            document.getElementById('gameDevStudio').value = game.dev_studio;
            document.getElementById('gamePublisher').value = game.publisher_id;
        })
        .catch(error => console.error('Error fetching game details:', error));
}

function openAddGameModal() {
    $('#gameModal').modal('show');
    document.getElementById('gameForm').reset();
}

function saveGame(event) {
    event.preventDefault();
    console.log("Saving game...");
    const form = document.getElementById('gameForm');
    const formData = new FormData(form);
    const gameData = {
        title: formData.get('title'),
        dev_studio: formData.get('dev_studio'),
        publisher_id: formData.get('publisher_id')
    };
    console.log("Game data:", gameData);

    fetch('http://127.0.0.1:5000/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add game');
        }
        $('#gameModal').modal('hide');
        fetchGames();
    })
    .catch(error => console.error('Error adding game:', error));
}

function updateGame(event) {
    event.preventDefault();
    console.log("Updating game...");
    const form = document.getElementById('gameForm');
    const formData = new FormData(form);
    const gameData = {
        id: formData.get('id'),
        title: formData.get('title'),
        dev_studio: formData.get('dev_studio'),
        publisher_id: formData.get('publisher_id')
    };
    console.log("Game data:", gameData);

    fetch(`http://127.0.0.1:5000/games/${gameData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update game');
        }
        $('#gameModal').modal('hide');
        fetchGames();
    })
    .catch(error => console.error('Error updating game:', error));
}

function openEditPublisherModal(publisherId) {
    fetch(`http://127.0.0.1:5000/publishers/${publisherId}`)
        .then(response => response.json())
        .then(publisher => {
            $('#publisherModal').modal('show');
            document.getElementById('publisherId').value = publisher.publisher_id;
            document.getElementById('publisherName').value = publisher.name;
        })
        .catch(error => console.error('Error fetching publisher details:', error));
}

function openAddPublisherModal() {
    $('#publisherModal').modal('show');
    document.getElementById('publisherForm').reset();
}

function savePublisher(event) {
    event.preventDefault();
    console.log("Saving publisher...");
    const form = document.getElementById('publisherForm');
    const formData = new FormData(form);
    const publisherData = {
        name: formData.get('name')
    };
    console.log("Publisher data:", publisherData);

    fetch('http://127.0.0.1:5000/publishers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisherData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add publisher');
        }
        $('#publisherModal').modal('hide');
        fetchPublishers();
    })
    .catch(error => console.error('Error adding publisher:', error));
}

function updatePublisher(event) {
    event.preventDefault();
    console.log("Updating publisher...");
    const form = document.getElementById('publisherForm');
    const formData = new FormData(form);
    const publisherData = {
        publisher_id: formData.get('publisher_id'),
        name: formData.get('name')
    };
    console.log("Publisher data:", publisherData);

    fetch(`http://127.0.0.1:5000/publishers/${publisherData.publisher_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisherData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update publisher');
        }
        $('#publisherModal').modal('hide');
        fetchPublishers();
    })
    .catch(error => console.error('Error updating publisher:', error));
}

function deleteGame(gameId) {
    fetch(`http://127.0.0.1:5000/games/${gameId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete game');
        }
        fetchGames();
    })
    .catch(error => console.error('Error deleting game:', error));
}

function deletePublisher(publisherId) {
    fetch(`http://127.0.0.1:5000/publishers/${publisherId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete publisher');
        }
        fetchPublishers();
    })
    .catch(error => console.error('Error deleting publisher:', error));
}