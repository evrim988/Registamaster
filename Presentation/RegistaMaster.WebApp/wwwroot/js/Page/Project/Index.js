$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
  $('select:disabled').css('background-color', '#ffffff');
});

function WhiteBackGround() {
  $('select:disabled').css('background-color', '#ffffff');
}
var auth = $("#auth").val();

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
    scrolling: {
      columnRenderingMode: 'virtual',
    },
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
        fixed: true,
        fixedPosition: "right",
        alignment: 'center',
        cellTemplate: function (container, options) {
          $("<div>")
            .dxButton({
              icon: "preferences",
              hint: "İşlemler",
              stylingMode: "text",
              onClick: function (e) {
                switch (auth) {
                  case '0':
                    showContextMenuAdmin(options, e);
                    break;
                  case '1':
                    showContextMenuLeader(options, e);
                    break;
                  case '2':
                    showContextMenuDeveloper(options, e);
                    break;
                }
              }
            })
            .appendTo(container);
        }
      }
    ],
    masterDetail: {
      enabled: true,
      template: masterDetailTemplate,
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
  $('#clear input[type="checkbox"]').prop('checked', false);

}

//proje ekle
function SaveProject() {

  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateFormProject()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }

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
  $("#addProjectNoteProjectID").val(ID);
  $("#AddProjectNote").modal("toggle");
}

//proje notu ekle
function SaveProjectNote() {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateFormProjectNote()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }
  var formData = new FormData();
  formData.append('ProjectID', $('#addProjectNoteProjectID').val());
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

//proje notu detay modal
function ProjectNoteDetailModal(row) {
  $("#saveButton").addClass("invisible");
  $("#detailNoteType").prop("readonly", true);
  $("#detailDescription").prop("readonly", true);
  var id = $("#ID").val();
  //console.log(id);
  //console.log(data.CreatedBy);
  var data = row.data;
  if (auth == 0 || data.CreatedBy == id) {
    $("#editButton").removeClass("invisible");
  }

  $('#detailProjectNoteID').val(data.ID);
  $('#detailCreatedBy').val(data.CreatedBy);
  $('#detailDate').val(new Date(data.Date).toLocaleDateString());
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
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateFormProjectNoteEdit()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }
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

//MasterDetail Tabs
function masterDetailTemplate(_, masterDetailOptions) {
  return $('<div>').dxTabPanel({
    
    items: [
      {
        title: 'Modüller',
        template: GetModuleTabTemplate(masterDetailOptions.data),
      },
      {
        title: 'Versiyonlar',
        template: GetVersionTabTemplate(masterDetailOptions.data),
      },
      {
        title: 'Proje Notları',
        template: GetProjectNoteTabTemplate(masterDetailOptions.data),
      },
    ],
      onSelectionChanged: function (e) {
        $("#projectGridContainer").dxDataGrid("instance").updateDimensions();
      }
  });
}

//MasterDetail ProjectNote Tabs
function GetProjectNoteTabTemplate(masterDetailData) {
  return function () {
    return $("<div>")
      .dxDataGrid({
      columnAutoWidth: true,
      showBorders: true,
      showColumnLines: true,
      showRowLines: true,
      rowAlternationEnabled: true,
      allowColumnReordering: true,
      allowColumnResizing: true,
      paging: { enabled: true },
      height: "100%",
      pager: {
        visible: true,
        allowedPageSizes: [10, 20, 50],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
      },
      columnResizingMode: 'widget',
      onRowPrepared: function (e) {
        if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };
        },
        grouping: {
          autoExpandAll: true,
        },
        groupPanel: {
          visible: false
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
          dataField: "CreatedBy",
          caption: "Ekleyen Kullanıcı",
          alignment: 'center',
          lookup: {
            dataSource: DevExpress.data.AspNet.createStore({
              loadUrl: "/Project/GetCreatedBy/",
            }),
            valueExpr: "id",
            displayExpr: "fullname"
          }
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
          alignment: 'center',
          buttons: [
            {
              hint: "Sil",
              icon: "trash",
              visible: function (e) {
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
                ProjectNoteDetailModal(e.row);
              }
            },
          ]
        },
      ],
      dataSource: DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: "/Project/GetProjectNotes/",
        loadParams: { ID: masterDetailData.id },
        updateUrl: "/Project/EditProjectNote",
        deleteUrl: "/Project/DeleteProjectNote",
        onBeforeSend: function (method, ajaxoptions) {
          ajaxoptions.data.id = masterDetailData.id;
          ajaxoptions.xhrFields = { withCredentials: true };
        }
      })
    });
  }
}

//MasterDetail Module Tabs
function GetModuleTabTemplate(masterDetailData) {
  return function () {
    return $("<div>")
      .dxDataGrid({
        columnAutoWidth: true,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        paging: { enabled: true },
        height: "100%",
        pager: {
          visible: true,
          allowedPageSizes: [10, 20, 50],
          showPageSizeSelector: true,
          showInfo: true,
          showNavigationButtons: true,
        },
        columnResizingMode: 'widget',
        onRowPrepared: function (e) {
          if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };
        },
        grouping: {
          autoExpandAll: true,
        },
        groupPanel: {
          visible: false
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
            caption: "Module No",
            alignment: 'center',
            visible: false
          },
          {
            dataField: "Name",
            caption: "Adı",
            alignment: 'center',
          },
          {
            dataField: "Description",
            caption: "Açıklama",
            alignment: 'center',
          },
          {
            dataField: "ProjectID",
            caption: "Proje",
            alignment: 'center',
            lookup: {
              dataSource: DevExpress.data.AspNet.createStore({
                key: "Id",
                loadUrl: "/Defination/GetProject/",
                onBeforeSend: function (method, ajaxOptions) {
                  ajaxOptions.xhrFields = { withCredentials: true, };
                },
              }),
              valueExpr: "id",
              displayExpr: "name",
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
                hint: "Sil",
                icon: "trash",
                visible: function (e) {
                  var id = $("#ID").val();
                  if (auth == 0 || id == e.row.data.CreatedBy)//not admin veya oluşturan tarafından silinebilir
                    return true;
                },
                onClick: function (e) {
                  DeleteProjectModule(e.row.data.ID);
                }
              },
              {
                hint: "Detay",
                icon: "textdocument",
                onClick: function (e) {
                  ModuleDetailModal(e.row);
                }
              },
            ]
          },
        ],
        dataSource: DevExpress.data.AspNet.createStore({
          key: "ID",
          loadUrl: "/Project/GetModules/",
          loadParams: { ID: masterDetailData.id },
          updateUrl: "/Project/EditModule",
          deleteUrl: "/Project/DeleteModule",
          onBeforeSend: function (method, ajaxoptions) {
            ajaxoptions.data.id = masterDetailData.id;
            ajaxoptions.xhrFields = { withCredentials: true };
          }
        })
      })
  }
}

//MasterDetail Version Tabs
function GetVersionTabTemplate(masterDetailData) {
  return function () {
    return $("<div>")
      .dxDataGrid({
        columnAutoWidth: true,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        paging: { enabled: true },
        height: "100%",
        pager: {
          visible: true,
          allowedPageSizes: [10, 20, 50],
          showPageSizeSelector: true,
          showInfo: true,
          showNavigationButtons: true,
        },
        columnResizingMode: 'widget',
        onRowPrepared: function (e) {
          if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };
        },
        grouping: {
          autoExpandAll: true,
        },
        groupPanel: {
          visible: false
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
            caption: "Version No",
            alignment: 'center',
            visible: false
          },
          {
            dataField: "Name",
            caption: "Adı",
            alignment: 'center',
          },
          {
            dataField: "Date",
            caption: "Tarih",
            dataType: 'date',
            format: 'dd/MM/yyyy',
          },
          {
            dataField: "ProjectID",
            caption: "Proje",
            validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
            lookup: {
              dataSource: DevExpress.data.AspNet.createStore({
                key: "Id",
                loadUrl: "/Defination/GetProject/",
                onBeforeSend: function (method, ajaxOptions) {
                  ajaxOptions.xhrFields = { withCredentials: true, };
                },
              }),
              valueExpr: "id",
              displayExpr: "name",
            }
          },
          {
            dataField: "DatabaseChange",
            caption: "Veritabanı Değişikliği",
            alignment: 'center',
            dataType: "boolean",
            lookup: {
              dataSource: [
                { id: true, text: "Evet" },
                { id: false, text: "Hayır" }
              ],
              valueExpr: "id",
              displayExpr: "text"
            }
          },
          {
            dataField: "isNewVersion",
            caption: "Yeni Versiyon",
            alignment: 'center',
            dataType: "boolean",
            visible: false,
            lookup: {
              dataSource: [
                { id: true, text: "Evet" },
                { id: false, text: "Hayır" }
              ],
              valueExpr: "id",
              displayExpr: "text"
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
                hint: "Sil",
                icon: "trash",
                visible: function (e) {
                  var id = $("#ID").val();
                  if (auth == 0 || id == e.row.data.CreatedBy)//not admin veya oluşturan tarafından silinebilir
                    return true;
                },
                onClick: function (e) {
                  DeleteProjectVersion(e.row.data.ID);
                }
              },
              {
                hint: "Detay",
                icon: "textdocument",
                onClick: function (e) {
                  VersionDetailModal(e.row);
                }
              },
            ]
          },
        ],
        dataSource: DevExpress.data.AspNet.createStore({
          key: "ID",
          loadUrl: "/Project/GetVersion",
          loadParams: { ID: masterDetailData.id },
          updateUrl: "/Project/EditVersion",
          deleteUrl: "/Project/DeleteVersion",
          onBeforeSend: function (method, ajaxoptions) {
            ajaxoptions.data.id = masterDetailData.id;
            ajaxoptions.xhrFields = { withCredentials: true };
          }
        })
      })
  }
}

//Proje Versiyon Sil
function DeleteProjectVersion(ID) {
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
        url: "/Project/DeleteVersion/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
          if (response == '0') {
            swalWithBootstrapButtons(
              'Hata',
              'Projenin Yalnızca Bir Versiyonu Olduğu İçin Silemezsiniz, Silme İşlemi Başarız.',
              'error'
            )
          }
          else {
            swalWithBootstrapButtons(
              'Bilgi',
              'Silme İşlemi Başarılı',
              'success'
            );
            gridRefresh();
          }
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

//Proje Modül Sil
function DeleteProjectModule(ID) {
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
        url: "/Project/DeleteModule/",
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
//ContextMenu Admin
function showContextMenuAdmin(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Proje Not Ekle", icon: "plus" },
        { text: "Modül Ekle", icon: "plus" },
        { text: "Versiyon Ekle", icon: "plus" },
        { text: "Proje Düzenle", icon: "edit" },
        { text: "Proje Sil", icon: "trash" },
      ],
      onItemClick: function (item) {
        handleItemClick(item, options);
      }
    })
    .appendTo("body")
    .dxContextMenu("instance");

  contextMenu.option("position", { my: "top right", at: "bottom right", of: e.element });
  contextMenu.show();
}
//ContextMenu Leader
function showContextMenuLeader(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Proje Not Ekle", icon: "plus" },
        { text: "Modül Ekle", icon: "plus" },
        { text: "Versiyon Ekle", icon: "plus" },
      ],
      onItemClick: function (item) {
        handleItemClick(item, options);
      }
    })
    .appendTo("body")
    .dxContextMenu("instance");

  contextMenu.option("position", { my: "top right", at: "bottom right", of: e.element });
  contextMenu.show();
}
//ContextMenu Developer 
function showContextMenuDeveloper(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Proje Not Ekle", icon: "plus" },
      ],
      onItemClick: function (item) {
        handleItemClick(item, options);
      }
    })
    .appendTo("body")
    .dxContextMenu("instance");
  contextMenu.option("position", { my: "top right", at: "bottom right", of: e.element });
  contextMenu.show();
}

function handleItemClick(item, options) {
  var items = item.itemData.text;
  var ID = options.data.id;
  var data = options.data;
  switch (items) {
    case "Proje Not Ekle":
      AddProjectNoteModal(ID);
      break;
    case "Modül Ekle":
      openPopupAddModuleModal(ID);
      break;
    case "Versiyon Ekle":
      openPopupAddVersionModal(ID);
      break;
    case "Proje Düzenle":
      OpenProjectEditModal(data);
      break;
    case "Proje Sil":
      CheckRequest(ID);
      break;
    default:
      break;
  }
}

//Modül ekle modal
function openPopupAddModuleModal(ID) {
  $("#addModuleProjectID").val(ID);
  $("#AddModule").modal("toggle");
}

//Modül ekle
function SaveModul() {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateFormModule()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }


  var formData = new FormData();
  formData.append('ProjectID', $('#addModuleProjectID').val());
  formData.append('Name', $('#addModuleName').val());
  formData.append('Description', $('#addModuleDescription').val());

  $.ajax({
    url: "/Project/AddModule",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {

      $('#AddModule').modal('toggle');
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

//Versiyon ekle modal
function openPopupAddVersionModal(ID) {
  $("#addVersionProjectID").val(ID);
  $("#AddVersion").modal("toggle");
}

//Versiyon ekle
function SaveVersion() {
  var formData = new FormData();
  formData.append('ProjectID', $('#addVersionProjectID').val());
  formData.append('Description', $('#addVersionDescription').val());
  formData.append('DatabaseChange', $("#addVersionDatabaseChange").prop("checked") ? "true" : "false");
  formData.append('IsNewVersion', $("#addVersionNewVersion").prop("checked") ? "true" : "false");


  $.ajax({
    url: "/Project/AddVersion",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {

      $('#AddVersion').modal('toggle');
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


//Modül detay düzenlemeye aç
function openPopupEditModuleModal() {
  $("#saveButtonModule").removeClass("invisible");
  $("#DetailModuleName").prop("readonly", false);
  $("#DetailModuleDescription").prop("readonly", false);
  $("#DetailModuleProjectName").prop("disabled", false);
}

//Modül düzenle kaydet
function openPopupEditModuleSave() {
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateFormModuleEdit()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }
  var formData = new FormData();
  formData.append('ID', $('#DetailModuleID').val());
  formData.append('ProjectID', $('#DetailModuleProjectName').val());
  formData.append('Name', $('#DetailModuleName').val());
  formData.append('Description', $('#DetailModuleDescription').val());

  $.ajax({
    url: "/Project/EditModule",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#saveButtonModule").addClass("invisible");
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

//Modül detay modal
function ModuleDetailModal(row) {
  $("#saveButtonModule").addClass("invisible");
  $("#DetailModuleName").prop("readonly", true);
  $("#DetailModuleDescription").prop("readonly", true);
  $("#DetailModuleProjectName").prop("disabled", true);
  WhiteBackGround();


  var id = $("#ID").val();
  //console.log(id);
  //console.log(data.CreatedBy);
  var data = row.data;
  if (auth != 2) {
    $("#editButtonModule").removeClass("invisible");
  }

  $('#DetailModuleID').val(data.ID);
  $('#DetailModuleProjectName').val(data.ProjectID);
  $('#DetailModuleName').val(data.Name);
  $('#DetailModuleDescription').val(data.Description);

  $('#DetailModule').modal('toggle');
}


//Versiyon detay düzenlemeye aç
function openPopupEditVersionModal() {
  $("#saveButtonVersion").removeClass("invisible");
  $("#DetailVersionDescription").prop("readonly", false);
  $("#DetailVersionProjectName").prop("disabled", false);
  $("#DetailVersionDatabaseChange").prop("disabled", false);
  $("#DetailVersionNewVersion").prop("disabled", false);
  $("#DetailVersionNewVersion").removeClass("invisible");
  $("#DetailVersionNewVersionLabel").removeClass("invisible");

}
//Versiyon düzenle kaydet
function openPopupEditVersionSave() {
  var formData = new FormData();
  formData.append('ID', $('#DetailVersionID').val());
  formData.append('ProjectID', $('#DetailVersionProjectName').val());
  formData.append('Description', $('#DetailVersionDescription').val());
  formData.append('Date', $('#DetailVersionDate').val());
  formData.append('DatabaseChange', $("#DetailVersionDatabaseChange").prop("checked") ? "true" : "false");
  formData.append('IsNewVersion', $("#DetailVersionNewVersion").prop("checked") ? "true" : "false");


  $.ajax({
    url: "/Project/EditVersion",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#saveButtonModule").addClass("invisible");
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}
//Versiyon detay modal
function VersionDetailModal(row) {
  $("#saveButtonVersion").addClass("invisible");
  $("#DetailVersionDescription").prop("readonly", true);
  $("#DetailVersionProjectName").prop("disabled", true);
  $("#DetailVersionDatabaseChange").prop("disabled", true);
  $("#DetailVersionNewVersion").addClass("invisible");
  $("#DetailVersionNewVersionLabel").addClass("invisible");

  WhiteBackGround();


  var id = $("#ID").val();
  //console.log(id);
  //console.log(data.CreatedBy);
  var data = row.data;
  if (auth != 2) {
    $("#editButtonVersion").removeClass("invisible");
  }

  $('#DetailVersionID').val(data.ID);
  $('#DetailVersionProjectName').val(data.ProjectID);
  $('#DetailVersionDescription').val(data.Description);
  $('#DetailVersionDatabaseChange').prop('checked', data.DatabaseChange);
  $('#DetailVersionNewVersion').prop('checked', data.IsNewVersion);
  $('#DetailVersionDate').val(data.Date);



  $('#DetailVersion').modal('toggle');
}
//Proje Ekle Modal boş alan kontrolü
function validateFormProject() {
  
    var requiredFields = [
      "ProjectName",
    ];
 
  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();
    if (!fieldValue)
      return false;
  }
  return true;
}
//Modül Ekle Modal boş alan kontrolü
function validateFormModule() {

  var requiredFields = [
    "addModuleName",
  ];

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();
    if (!fieldValue)
      return false;
  }
  return true;
} 
//Modül Düzenle Modal boş alan kontrolü
function validateFormModuleEdit() {

  var requiredFields = [
    "DetailModuleProjectName",
    "DetailModuleName"
  ];

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();
    if (!fieldValue)
      return false;
  }
  return true;
} 

// Proje Not Ekle Modal boş alan kontrolü
function validateFormProjectNote() {

  var requiredFields = [
    "addNoteType",
    "addDescription",
  ];

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();
    if (!fieldValue)
      return false;
  }
  return true;
}
// Proje Not Düzenle Modal boş alan kontrolü
function validateFormProjectNoteEdit() {

  var requiredFields = [
    "detailNoteType",
    "detailDescription"
  ];

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();
    if (!fieldValue)
      return false;
  }
  return true;
} 





