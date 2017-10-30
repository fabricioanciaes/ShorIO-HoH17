const forEach = function (array, callback, scope) {
        for (let i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

function switchPlayers() {
    let p1_name   = elements.players.p1_name.value;
    let p1_region = elements.players.p1_region.value;
    let p1_score  = elements.players.p1_score.value;
    let p2_name   = elements.players.p2_name.value;
    let p2_region = elements.players.p2_region.value;
    let p2_score  = elements.players.p2_score.value;

    elements.players.p1_name.value   = p2_name;
    elements.players.p1_region.value = p2_region;
    elements.players.p1_score.value  = p2_score;
    elements.players.p2_name.value   = p1_name;
    elements.players.p2_region.value = p1_region;
    elements.players.p2_score.value  = p1_score;
}

function resetScore() {
    elements.players.p1_score.value = 0;
    elements.players.p2_score.value = 0;
}

function updatePlayers() {
    data.player = [];


    data.player[0] = {
        "name": elements.players.p1_name.value,
        "region": elements.players.p1_region.value,
        "score": elements.players.p1_score.value,
    }

    data.player[1] = {
        "name": elements.players.p2_name.value,
        "region": elements.players.p2_region.value,
        "score": elements.players.p2_score.value,
    }

    if(document.querySelector('#show_region:checked') != null) {
        data.show_region = true;
    } else {
        data.show_region = false;
    }

    if (document.querySelector('#freeplay:checked') != null) {
        data.freeplay = true;
    } else {
        data.freeplay = false;
    }

    socket.emit('update players', data);
    console.log(data);
}

function updateCasters() {
    data.caster = [];
    data.caster.push(elements.casters.caster1_name.value);
    data.caster.push(elements.casters.caster2_name.value);

    socket.emit('update casters', data);
    console.log(data.caster);
}

function switchCasters() {
    temp = [];
    temp.push(elements.casters.caster1_name.value);
    temp.push(elements.casters.caster2_name.value);
    console.log(temp);

    console.log(temp[0]);
    elements.casters.caster1_name.value = temp[1];
    elements.casters.caster2_name.value = temp[0];
    
}

function refreshAll() {
    elements.players.p1_name.value = data
}

var elements = {};


const socket = io();


var data = {
    player:[],
    caster:[]
};


document.addEventListener('DOMContentLoaded', function() {
    elements = {
        "players": {
            "p1_name":     document.querySelector("#p1_name"),
            "p2_name":     document.querySelector("#p2_name"),
            "p1_region":   document.querySelector("#p1_region"),
            "p2_region":   document.querySelector("#p2_region"),
            "p1_score":    document.querySelector("#p1_score"),
            "p2_score":    document.querySelector("#p2_score"),
        },

        "casters": {
            "caster1_name": document.querySelector("#caster1_name"),
            "caster2_name": document.querySelector("#caster2_name"),
        },
    }

    socket.on('return serverData', function(serverData) {
        data = serverData;
        console.log(data);

        console.log('updating...');

        elements.players.p1_name.value = data.player[0].name;
        elements.players.p1_region.value = data.player[0].region;
        elements.players.p1_score.value = data.player[0].score;

        elements.players.p2_name.value = data.player[1].name;
        elements.players.p2_region.value = data.player[1].region;
        elements.players.p2_score.value = data.player[1].score;

        elements.casters.caster1_name.value = data.caster[0];
        elements.casters.caster2_name.value = data.caster[1];
    });


});