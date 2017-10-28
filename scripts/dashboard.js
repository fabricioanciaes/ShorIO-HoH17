const forEach = function (array, callback, scope) {
        for (let i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

function getValues(panel) {
        const myNodeList = document.querySelectorAll(panel.classes+ ' .value');
        let array = [];

        forEach(myNodeList, function(index,value) {
            array.push(value.value);
        });

        return array;
    } 

const socket = io();

document.addEventListener('DOMContentLoaded', function() {
    elements = {
        "pauta": {
            "classes":"section.pauta",
            "selector":document.querySelector("section.pauta"),
            "buttons":document.querySelectorAll("section.pauta .behave-radio"),
            "update":document.querySelector("section.pauta .update"),
        },

        "casters": {
            "classes":"section.casters",
            "selector":document.querySelector("section.casters"),
            "update":document.querySelector("section.casters .update")
        },
    }

    data = {
        "pauta":[],
        "pautaActiveIndex":0,
        "casters":[],
        "castersCount":0,
    }

    for(let i=0;i < elements.pauta.buttons.length; i++){
        elements.pauta.buttons[i].addEventListener("click", function(e) {
            for(let i=0;i < elements.pauta.buttons.length; i++){
                buttonSetActive(elements.pauta.buttons[i]);
            }
            data.pautaActiveIndex = i;
            buttonToggle(e.currentTarget);
        });
    }

    function buttonToggle(button) {
        if(button.classList.contains("is-success")){
            buttonSetActive(button);    
        } else 
        if(button.classList.contains("is-danger")){
            buttonSetInactive(button);
        }
    }

    function buttonSetActive(button) {
        button.classList.remove("is-success");
        button.classList.add("is-danger");
    }

    function buttonSetInactive(button) {
        button.classList.remove("is-danger");
        button.classList.add("is-success");
    }

    elements.pauta.update.addEventListener("click", function() {
        data.pauta = getValues(elements.pauta);

        console.log(data.pauta);
        console.log(data.pautaActiveIndex);

        socket.emit('update pauta', data);
    });

    elements.casters.update.addEventListener("click", function(){
        data.casters = getValues(elements.casters);
        var count = 0;
        for(let i = 0; i < data.casters.length; i++) {
            if(data.casters[i] != "") {
                count++;
            }
        }
        data.castersCount = count;
        console.log(data.casters);
        console.log(data.castersCount);

        socket.emit('update casters', data);
    })

});