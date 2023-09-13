function SaveRequest() {
    var data = new FormData();
    data.append('NotificationTypeID', $('#NotificationTypeID').val());
    data.append('CategoryID', $('#CategoryID').val());
    data.append('ProjectID', $('#ProjectID').val());
    data.append('ModuleID', $('#ModuleID').val());
    data.append('VersionID', $('#VersionID').val());
    data.append('RequestSubject', $('#RequestSubject').val());
    data.append('Description', $('#Description').val());
    data.append('PageUrl', $('#PageUrl').val());

    $.ajax({
        url: "/Request/Create",
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data == '1') {
                console.log(data);
                window.location.href = "/Request/Index";
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
}

function GetModuleList() {
    var data = new FormData();
    data.append('ID', $('#ProjectID').val());

    $.ajax({
        url: "/Request/GetModuleList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (data == "1") {
                return;
            }
            $("#ModuleID").empty();
            var object = JSON.parse(data);
            var s = '<option value="-1">Lütfen Seçiniz</option>';
            for (var i = 0; i < object.length; i++) {
                s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
            }

            $("#ModuleID").html(s);
        }
    })
}