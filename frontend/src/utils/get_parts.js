BioBLESS.utils.counts = 0;
BioBLESS.utils.get_parts = function(data, func) {
    var counts = ++BioBLESS.utils.counts;
    $.ajax({
        type: 'POST',
        url: '/parts/',
        contentType: 'application/json',
        data: JSON.stringify([data]),
        success: function(data) {
            if(data.status === 'SUCCESS' && counts === BioBLESS.utils.counts)
                func(data.data);
        }
    });
};
