$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();

});

function GetList() {
  var grid = $(projectGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Project/GetList",
      insertUrl: "/Project/AddProject",
      updateUrl: "/Project/ProjectEdit",
      deleteUrl: "/Project/DeleteProject",
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

    rowAlternationEnabled: true,
    grouping: {
      contextMenuEnabled: true
    },
    groupPanel: {
      visible: true
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
    onToolbarPreparing: function (e) {
      var auth = $("#auth").val();
      if (auth == 0) {
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            icon: "plus", text: "Proje Ekle", onClick: function (e) {
              $('#ProjectModalLabel').text('Proje Ekle');

              $('#ProjectModal').modal('toggle');
            }
          },
          location: "after",

        });
      }
    },
    loadPanel: {
      enabled: true,
    },
    //editing: {
    //   mode: 'popup',
    //   allowAdding: true,
    //   popup: {
    //      title: 'Yeni Proje Ekle',
    //      showTitle: true,
    //      width: 500,
    //      height: 325,
    //   },
    //   form: {
    //      items: [{
    //         itemType: 'group',
    //         colCount: 2,
    //         colSpan: 2,
    //         items: [
    //            {
    //               dataField: "projectName",
    //               caption: "Proje Adı",
    //               colSpan: 2,
    //               validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
    //            },
    //            {
    //               dataField: "projectDescription",
    //               caption: "Proje Açıklaması",
    //               editorType: "dxTextArea",
    //               editorOptions: {
    //                  height: 100
    //               },
    //               colSpan: 2

    //            },
    //         ],
    //      }],

    //   },

    //},
    columns: [

      {
        dataField: "projectName",
        caption: "Proje Adı",
        alignment: 'center',

      },
      {
        dataField: "projectDescription",
        caption: "Proje Açıklaması",
        alignment: 'center',
      },
      {
        caption: "İşlemler",
        type: "buttons",
        fixed: true,
        fixedPosition: "right",
        buttons: [
          {
            hint: "Düzenle",
            icon: "edit",
            visible: function (e) {
              var auth = $("#auth").val();
              if (auth == 0) //projeyi yalnızca admin düzenleyebilir
                return true;
            },
            onClick: function (e) {
              data = e.row.data;
              OpenProjectEditModal(data);
            }
          },
          {
            hint: "Sil",
            icon: "trash",
            visible: function (e) {
              var auth = $("#auth").val();
              if (auth == 0) //projeyi yalnızca admin silebilir
                return true;
            },
            onClick: function (e) {
              CheckRequest(e.row.data.id);
            }
          },
          {
            hint: "Not Ekle",
            icon: "add",
            onClick: function (e) {
              AddProjectNoteModal(e.row.data.id);
            }
          },
        ]
      },
    ],
    masterDetail: {
      enabled: true,
      template: function (container, options) {
        return $("<div>")
          .dxDataGrid({
            columnAutoWidth: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            onRowPrepared: function (e) {
              if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };
            },
            onEditingStart(e) {
              title = e.data.ElementDescription;
            },
            onInitNewRow: function (e) {
              title = "";
            },
            onInitialized: function (e) {
              actionGridContainer = e.component;
            },

            columns: [
              {
                dataField: "ID",
                caption: "Proje Not No",
                alignment: 'center',
                visible: false
              },
              {
                dataField: "NoteType",
                caption: "Not Konusu",
                alignment: 'center',
              },
              {
                dataField: "Description",
                caption: "Not Açıklaması",
                alignment: 'center',
                visible: false
              },
              {
                dataField: "AddUserNote",
                caption: "Notu Ekleyen Kullanıcı",
                alignment: 'center',
              },
              {
                dataField: "Date",
                caption: "Eklenme Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
              },
              {
                caption: "İşlemler",
                type: "buttons",
                fixed: true,
                fixedPosition: "right",
                buttons: [
                  {
                    hint: "Sil",
                    icon: "trash",
                    visible: function (e) {
                      var auth = $("#auth").val();
                      var id = $("#ID").val();
                      if (auth == 0 || id == e.row.data.CreatedBy)//not admin veya oluşturan tarafından silinebilir
                        return true;
                    },
                    onClick: function (e) {
                      DeleteProjectNote(e.row.data.ID);
                    }
                  },
                  {
                    hint: "Detay",
                    icon: "textdocument",
                    onClick: function (e) {
                      ProjectNoteDetailModal(e.row.data);
                    }
                  },
                ]
              },

            ],
            dataSource: DevExpress.data.AspNet.createStore({
              key: "ID",
              loadUrl: "/Project/GetProjectNotes/",
              loadParams: { ID: options.data.id },
              updateUrl: "/Project/EditProjectNote",
              deleteUrl: "/Project/DeleteProjectNote",

              onBeforeSend: function (method, ajaxoptions) {
                ajaxoptions.data.id = options.data.id;
                ajaxoptions.xhrFields = { withCredentials: true };
              }
            })
          })
      }
    }

  }).dxDataGrid("instance");

}

function gridRefresh() {
  $("#projectGridContainer").dxDataGrid("instance").refresh();
}

//modal temizlemek için ortak fonkiyon
function ClearModal() {
  $('#clear input').val("");
  $('#clear textarea').val("");
}

//proje ekle
function SaveProject() {
  if ($('#ProjectID').val() == 0) {
    var formData = new FormData();
    formData.append('ProjectName', $('#ProjectName').val());
    formData.append('ProjectDescription', $('#ProjectDescription').val());

    $.ajax({
      url: "/Project/AddProject",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {

        $('#ProjectModal').modal('toggle');
        gridRefresh();
        ClearModal();
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
    formData.append('ID', $('#ProjectID').val());
    formData.append('ProjectName', $('#ProjectName').val());
    formData.append('ProjectDescription', $('#ProjectDescription').val());

    $.ajax({
      url: "/Project/ProjectEdit",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {

        $('#ProjectModal').modal('toggle');
        gridRefresh();
        ClearModal();
      },
      error: function (e) {
        console.log(e);
      },
      complete: function () {
      }
    });
  }
}

//proje düzenle modal
function OpenProjectEditModal(data) {
  $('#ProjectModalLabel').text('Proje Düzenle');
  $("#ProjectID").val(data.id);
  $("#ProjectName").val(data.projectName);
  $("#ProjectDescription").val(data.projectDescription);

  $("#ProjectModal").modal("toggle");
}

//proje silme işleminde projeye ait tammalanmamış talep kontrolü
function CheckRequest(ID) {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: "Uyarı",
    text: "Silme İşlemini Onaylıyor Musunuz?",
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
        url: "/Project/CheckRequest/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data == "-1") {
            swalWithBootstrapButtons(
              'Hata',
              'Projeye Ait Tamamlanmamış Talepler Bulunmaktadır Bulunmaktadır, Silme İşlemi Başarız.',
              'error'
            )
          }
          else if (data == "1") {
            DeleteProject(ID)
          }
        },
        error: function (textStatus) {
          console.log('ERRORS:23 ');
        },
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

//proje sil
function DeleteProject(ID) {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  var data = new FormData();
  data.append('id', ID);

  $.ajax({
    url: "/Project/DeleteProject/",
    type: 'POST',
    async: false,
    data: data,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
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
  });

}

//proje notu ekle modal
function AddProjectNoteModal(ID) {
  $("#addProjectID").val(ID);
  $("#AddProjectNote").modal("toggle");
}

//proje notu ekle
function SaveProjectNote() {
  var formData = new FormData();

  formData.append('ProjectID', $('#addProjectID').val());
  formData.append('NoteType', $('#addNoteType').val());
  formData.append('Description', $('#addDescription').val());

  $.ajax({
    url: "/Project/AddProjectNote",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {

      $('#AddProjectNote').modal('toggle');
      gridRefresh();
      ClearModal();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

//proje noru detay modal
function ProjectNoteDetailModal(data) {
  var auth = $("#auth").val();
  var id = $("#ID").val();
  if (auth == 0 || data.CreatedBy == id) {
    $("#editButton").removeClass("invisible");
  }

  let date = new Date(data.Date);
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var fullDate = date.getFullYear() + "-" + (month) + "-" + (day);

  $('#detailProjectNoteID').val(data.ID);
  $('#detailAddedUser').val(data.AddUserNote);
  $('#detailDate').val(fullDate);
  $('#detailNoteType').val(data.NoteType);
  $('#detailDescription').val(data.Description);

  $('#DetailProjectNote').modal('toggle');
}

function CloseDetailModal() {
  $("#saveButton").addClass("invisible");
  $("#editButton").addClass("invisible");
  $("#detailNoteType").attr("readonly");
  $("#detailDescription").attr("readonly");
}

//proje detay düzenlemeye aç
function OpenToEdit() {
  $("#detailNoteType").prop("readonly", false);
  $("#detailDescription").prop("readonly", false);
  $("#saveButton").removeClass("invisible");
}

//proje notu düzenle kaydet
function SaveEdit() {
  var formData = new FormData();
  formData.append('ID', $('#detailProjectNoteID').val());
  formData.append('NoteType', $('#detailNoteType').val());
  formData.append('Description', $('#detailDescription').val());

  $.ajax({
    url: "/Project/EditProjectNote",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#saveButton").addClass("invisible");
      $("#detailNoteType").prop("readonly", true);
      $("#detailDescription").prop("readonly", true);

      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

//proje notu sil
function DeleteProjectNote(ID) {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: "Uyarı",
    text: "Silme İşlemini Onaylıyor Musunuz?",
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
        url: "/Project/DeleteProjectNote/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
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