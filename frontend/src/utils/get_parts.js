BioBLESS.utils.get_parts = function(data, func) {
    $.ajax({
        type: 'POST',
        url: BioBLESS.host + '/parts/',
        contentType: 'application/json',
        data: JSON.stringify([data]),
        success: func
    });
}
