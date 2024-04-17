$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
});

var mode;

function GetList() {
  var grid = $(userGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      keyExpr: "id",
      loadUrl: "/User/GetList",

      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      }
    }),
    onCellPrepared(e) {
      if (e.rowType == "header") {
        e.cellElement.css("text-align", "center");
      }
    },
    onRowPrepared: function (e) {
      if (e.rowType == "header") { e.rowElement.css("background-color", "#b9ceff"); e.rowElement.css('color', '#4f5052'); e.rowElement.css('font-weight', 'bold'); };
    },
    onToolbarPreparing: function (e) {
      var auth = $("#auth").val();

      if (auth == 0) {
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            icon: "plus", text: "Kullanıcı Ekle", onClick: function (e) {
              AddUserModal();
            }
          },
          location: "after",

        });
      }
    },
    rowAlternationEnabled: true,
    grouping: {
      contextMenuEnabled: true
    },
    groupPanel: {
      visible: true   // or "auto"
    },

    columnAutoWidth: true,
    remoteOperations: true,
    allowColumnReordering: true,
    showBorders: true,
    allowColumnResizing: true,
    columnResizingMode: 'widget',
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: 'Ara...',
    },
    headerFilter: {
      visible: true,
    },
    paging: { enabled: true },
    height: "100%",
    pager: {
      visible: true,
      allowedPageSizes: [10, 20, 50],
      showPageSizeSelector: true,
      showInfo: true,
      showNavigationButtons: true,
    },
    onEditingStart: function (e) {
      title = e.data.Date;
    },
    onInitNewRow: function (e) {
      title = "";
    },

    loadPanel: {
      enabled: true,
    },

    onContentReady: function (e) {

      var $refreshButton = $('<div id="refreshButton">').dxButton({
        icon: 'refresh',
        onClick: function () {
          grid.refresh();
        }
      });
      if (e.element.find('#refreshButton').length == 0)
        e.element
          .find('.dx-toolbar-after')
          .prepend($refreshButton);

      var $filterButton = $('<div id="filterButton">').dxButton({
        icon: 'clearformat',
        onClick: function () {
          grid.clearFilter();
        }
      });
      if (e.element.find('#filterButton').length == 0)
        e.element
          .find('.dx-toolbar-after')
          .prepend($filterButton);
    },
    columns: [

      {
        dataField: "name",
        caption: "Adı",
        alignment: 'center',
      },
      {
        dataField: "surname",
        caption: "Soyadı",
        alignment: 'center',
      },
      {
        dataField: "userName",
        caption: "Kullanıcı Adı",
        alignment: 'center',
      },
      {
        dataField: "email",
        caption: "EMail",
        alignment: 'center',
      },
      {
        dataField: "password",
        caption: "Şifre",
        visible: false
      },
      {
        dataField: "authorizationStatus",
        caption: "Kullanıcı Türü",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/User/GetAuthStatus",
            onBeforeSend: function (method, ajaxoptions) {
              ajaxoptions.xhrFields = { withCredentials: true };
            },
          }),
          valueExpr: "Id",
          displayExpr: "Text"
        }
      },
      {
        caption: "İşlemler",
        type: "buttons",
        fixed: true,
        fixedPosition: "right",
        alignment: 'center',
        buttons: [

          {
            hint: "Düzenle",
            icon: "edit",
            visible: function (e) {
              var userID = $("#userID").val();
              var auth = $("#auth").val();
              if (e.row.data.id == userID || auth == 0)
                return true;
              else
                return false;
            },

            onClick: function (e) {
              data = e.row.data;
              OpenEditModal(data);
            }
          },
          {
            hint: "Sil",
            icon: "trash",
            visible: function (e) {
              var auth = $("#auth").val();
              //console.log(auth);
              if (auth == 0)
                return true;
              else
                return false;
            },
            onClick: function (e) {
              //console.log(e.row.data);
              var ID = e.row.data.id;
              DeleteUser(ID);
            }
          },
          {
            hint: "Yetki Değiştir",
            icon: "key",
            visible: function (e) {
              var auth = $("#auth").val();
              if (auth == 0)
                return true;
              else
                return false;
            },
            onClick: function (e) {
              data = e.row.data;
              OpenAuthModal(data);
            }
          },
        ]
      },
    ],

  }).dxDataGrid("instance");

}
function gridRefresh() {
  $("#userGridContainer").dxDataGrid("instance").refresh();
}

//kullanıcı ekle modal
function AddUserModal() {
  ClearModal();
  $("#UserModalLabel").text("Kullanıcı Ekle");
  $("#UserModal").modal("toggle");
  mode = 1;
}

//kullanıcı ekle/düzenle
function SaveUser() {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateForm()) {
    RequiredToastr();
    return;
  }
  if (mode == 1) {
    var formData = new FormData();

    formData.append("name", $("#Name").val());
    formData.append("surname", $("#Surname").val());
    formData.append("username", $("#Username").val());
    formData.append("email", $("#Email").val());
    formData.append("password", $("#Password").val());
    formData.append("authorizationStatus", $("#AuthorizationStatus").val());

    //console.log(formData);

    $.ajax({
      url: "/User/AddUser",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        //console.log(data);
        $("#UserModal").modal("toggle");
        gridRefresh();
      },
      error: function (e) {
        console.log(e);
      },
      complete: function () {
      }
    });
  }
  else {
    var formData = new FormData();

    formData.append("id", $("#ID").val());
    formData.append("name", $("#Name").val());
    formData.append("surname", $("#Surname").val());
    formData.append("username", $("#Username").val());
    formData.append("email", $("#Email").val());
    formData.append("password", $("#Password").val());

    //console.log(formData);

    $.ajax({
      url: "/User/UpdateUser",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        //console.log(data);
        $("#UserModal").modal("toggle");
        gridRefresh();
      },
      error: function (e) {
        console.log(e);
      },
      complete: function () {
      }
    });
  }
}

function ClearModal() {
  $("#UserModalLabel").text("");
  $("#ID").val("");
  $("#Name").val("");
  $("#Surname").val("");
  $("#Username").val("");
  $("#Email").val("");
  $("#Password").val("");
  $("#AuthorizationStatus").val(0);
  $("#hideAuth").removeAttr("hidden");
  mode = 0;
}

function validateForm() {
  var requiredFields;
  if (mode == 1) {
    requiredFields = [
      "Name",
      "Surname",
      "Username",
      "Email",
      "Password",
      "AuthorizationStatus",
    ];
  }
  else {
    requiredFields = [
      "Name",
      "Surname",
      "Username",
      "Email",
      "Password",
    ];
  }

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val().trim();

    if (!fieldValue)
      return false;
  }

  return true;
}

//kullanıcı düzenle modal
function OpenEditModal(data) {
  ClearModal();
  mode = 2;
  $("#UserModalLabel").text("Kullanıcı Düzenle");
  $("#hideAuth").attr("hidden", "hidden");

  $("#ID").val(data.id);
  $("#Name").val(data.name);
  $("#Surname").val(data.surname);
  $("#Username").val(data.userName);
  $("#Email").val(data.email);
  $("#Password").val(data.password);

  $('#UserModal').modal('toggle');
}

//kullanıcı yetkisi değiştir modal
function OpenAuthModal(data) {

  $("#chanceAuthID").val(data.id);
  $("#changeAuthStatus").val(data.authorizationStatus);

  $('#changeAuthorization').modal('toggle');
}

//kullanıcı yetkisi değiştir
function ChangeAuthorization() {
  var formData = new FormData();

  formData.append("id", $("#chanceAuthID").val());
  formData.append("authorizationStatus", $("#changeAuthStatus").val());

  //console.log(formData);

  $.ajax({
    url: "/User/ChangeAuthorization",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $('#changeAuthorization').modal('toggle');
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

//kullanıcı sil
function DeleteUser(ID) {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: "Uyarı",
    text: "Kullanıcı Silinecek Onaylıyor Musunuz?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Evet',
    cancelButtonText: 'Hayır',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      var data = new FormData();

      data.append('id', ID);

      $.ajax({
        url: "/User/DeleteUser/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          //console.log(data);
          swalWithBootstrapButtons(
            'Bilgi',
            'Silme İşlemi Başarılı',
            'success'
          );
          gridRefresh();
        },
        error: function (textStatus) {
          console.log('ERRORS:23 ');
        },
        complete: function () {
        }
      });
    } else if (result.dismiss === swal.DismissReason.cancel) {
      swalWithBootstrapButtons(
        'Bilgi',
        'Silme İşlemi İptal Edildi',
        'info'
      )
    }
  })
}