
function FormSave() {

    var data = new FormData();

    data.append('Name', $('#Name').val());
    data.append('Surname', $('#Surname').val());
    data.append('UserName', $('#UserName').val());
    data.append('Parola', $('#Parola').val());
    data.append('Email', $('#Email').val());
    $.ajax({
        url: "/User/UserDetail",
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
       
    });
    $('#exampleModal1').modal('toggle');

};