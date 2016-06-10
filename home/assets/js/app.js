function disableForm() {
    var form = document.forms['ajax_form'];
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;

    }
}

function enableForm() {
    var form = document.forms['ajax_form'];
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = false;

    }
}

function subscribe(element) {
    disableForm();
    $('#alertError').hide().fadeOut('slow');
    $("#alertSuccess").fadeIn("slow", function() {
        //
    });

    enableForm();
    
}
