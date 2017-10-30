$(document).ready(function () {
    $('select').material_select();

    $('input.autocomplete.player').autocomplete({
        data: {
            "Rui chapéu na grosseria": null,
            "Minha vítima não me ganha": null,
            "Mia Naomi": null,
        },
        limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            // Callback function when value is autcompleted.
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

});