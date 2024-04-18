$(document).ready(function () {
  DevExpress.localization.locale('tr');
  $('#Password').attr('type', 'password');
  $('#btnSave').prop('disabled', true);
});
function FormSave() {
  var data = new FormData();

  data.append('Name', $('#Name').val());
  data.append('Surname', $('#Surname').val());
  data.append('UserName', $('#UserName').val());
  data.append('Password', $('#Password').val());
  data.append('Email', $('#Email').val());
  data.append('Id', $('#userID').val());


  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    onHidden: function () {
      location.reload();
    }
  }

  $.ajax({
    url: "/User/UpdateUser",
    type: 'POST',
    data: data,
    cache: false,
    processData: false,
    contentType: false,
    success: function (response) {
      // İşlem başarılı olduğunda toastr bildirimi göster
      toastr.success("Güncelleme Başarılı");
    },
    complete: function () {
    },
    error: function (xhr, status, error) {
      // Hata durumunda toastr bildirimi göster
      toastr.error("Bir hata oluştu: " + error);
    }
  });
};

function EditUserDetail() {
  $('#Name').prop('readonly', false);
  $('#Surname').prop('readonly', false);
  $('#UserName').prop('readonly', false);
  $('#Password').prop('readonly', false);
  $('#Email').prop('readonly', false);
  $('#btnSave').prop('disabled', false);

}