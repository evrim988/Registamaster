$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
  $('select:disabled').css('background-color', '#ffffff');

  $('.card-img-container').on('click', function () {
    var imageUrl = $(this).find('img').attr('src');
    if (imageUrl !== "/Modernize/Img/yok.png") {

      $.magnificPopup.open({
        items: {
          src: imageUrl
        },
        type: 'image',
        callbacks: {
          close: function () {
            $('#RequestEditModal').modal('show');
          }
        }
      });
      $('#RequestEditModal').modal('hide');
    }
  });

});

var onchangeData;
var auth = $("#auth").val();
var userID = $("#userID").val();


function gridRefresh() {
  $("#requestGridContainer").dxDataGrid("instance").refresh();
}
function GetList() {
  var grid = $(requestGridContainer).dxDataGrid({

    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Request/GetList",
      insertUrl: "/Request/RequestAdd",

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
      if (e.data != undefined) {
        switch (e.data.requestStatus) {
          case 0:
            if (new Date(e.data.planedEndDate) <= new Date())
              e.data.color = "#F1948A";
            break;
          case 1:
            e.data.color = "#CDEFFE";
            break;
          case 2:
            e.data.color = "#E1FFE2";
            break;
          case 3:
            e.data.color = "#FDEBD0";
            break;
        }
        e.rowElement.css('background-color', e.data.color);
      };
    },
    rowAlternationEnabled: false,
    grouping: {
      contextMenuEnabled: true
    },
    groupPanel: {
      visible: true   // or "auto"
    },
    columnAutoWidth: true,
    remoteOperations: true,
    allowColumnReordering: true,
    allowColumnResizing: true,
    columnResizingMode: 'widget',
    showBorders: true,
    showRowLines: true,
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

    onToolbarPreparing: function (e) {
      let toolbarItems = e.toolbarOptions.items;
      toolbarItems.push({
        widget: "dxButton",
        options: {
          icon: "plus", text: "Talep Ekle", onClick: function (e) {
            $('#NotificationTypeID').val(-1);
            $('#RequestCreateModal').modal('toggle');
          }
        },
        location: "after",

      });
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
        dataField: "id",
        caption: "Talep No",
        alignment: 'center',
        sortOrder: "desc",
        visible: false
      },
      {
        dataField: "projectID",
        caption: "Proje",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Request/GetProject/",
            onBeforeSend: function (method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true, };
            },
          }),
          valueExpr: "id",
          displayExpr: "name",
        },
      },
      {
        dataField: "moduleID",
        caption: "Modül/Süreç",
        alignment: "center",
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: "/Request/GetModules/",
            onBeforeSend: function (method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true, };
            },
          }),
          valueExpr: "id",
          displayExpr: "name",
        },
      },
      {
        dataField: "notificationTypeID",
        caption: "Bildirim Türü",
        alignment: 'center',
        width: 140,
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Request/GetNotificationType/",
            onBeforeSend: function (method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true, };
            },
          }),
          valueExpr: "value",
          displayExpr: "text",
        }
      },
      {
        dataField: "subject",
        caption: "Konu",
        alignment: 'center',
        width: 200,
      },
      {
        dataField: "description",
        caption: "Açıklama",
        alignment: 'center',
        width: 250
      },
      {
        dataField: "pageURL",
        caption: "Sayfa Linki",
        alignment: 'center',
        width: 150
      },
      {
        dataField: "categoryID",
        caption: "Kategori",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Request/GetCategorySelect/",
            onBeforeSend: function (method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true, };
            },
          }),
          valueExpr: "value",
          displayExpr: "text",
        }
      },
      {
        dataField: "createdOn",
        caption: "Talep Açılma Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "planedEndDate",
        caption: "Tamamlanma Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "pictureURL",
        caption: "Görüntü",
        alignment: 'center',
        cellTemplate(container, options) {
          if (options.data.pictureURL === null) {
            $('<div>')
              .append($('<img>', { src: '/Modernize/Img/yok.png', class: "rounded-circle", width: "35", height: "35" }))
              .appendTo(container);
          }
          else {

            $('<div>')
              .append($('<img>', {
                src: '/Documents/RequestDocs/' + options.value, class: "rounded-circle", width: "35", height: "35", click: function () {
                  OpenPartImage('/Documents/RequestDocs/' + options.value);
                }
              }))
              .appendTo(container);

          }
        },
      },
      {
        dataField: "requestStatus",
        caption: "Durum",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Request/GetRequestStatus",
            onBeforeSend: function (method, ajaxoptions) {
              ajaxoptions.xhrFields = { withCredentials: true };
            },
          }),
          valueExpr: "Id",
          displayExpr: "Text"
        },
        cellTemplate: function (container, info) {
          if (info.data.requestStatus == 0) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-light", }).append("Açık"))
              .appendTo(container);
          }
          else if (info.data.requestStatus == 1) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Başladı"))
              .appendTo(container);
          }
          else if (info.data.requestStatus == 2) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-success" }).append("Kapandı"))
              .appendTo(container);
          }
          else if (info.data.requestStatus == 3) {
            $('<div id="Closed">')
              .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Beklemede"))
              .appendTo(container);
          }
        }
      },
      {
        dataField: "versionID",
        caption: "Versiyon",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Request/GetVersion/",
            onBeforeSend: function (method, ajaxOptions) {
              ajaxOptions.xhrFields = { withCredentials: true, };
            },
          }),
          valueExpr: "id",
          displayExpr: "name",
        }
      },
      {
        dataField: "createdBy",
        caption: "Talebi Açan Kişi",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            loadUrl: "/Action/GetCreatedBy/",
          }),
          valueExpr: "id",
          displayExpr: "fullname"
        }
      },
      {
        caption: "İşlemler",
        fixed: true,
        fixedPosition: "right",
        alignment: 'center',
        cellTemplate: function (container, options) {
          switch (options.data.requestStatus) {
            case 0:
              if (options.data.createdBy == userID) {   //talep başlanmamış durumdaysa talebi oluşturan kişi için contextmenu
                $("<div>")
                  .dxButton({
                    icon: "preferences",
                    hint: "İşlemler",
                    stylingMode: "text",
                    onClick: function (e) {
                      if (auth == 2)
                        showContextMenuDeveloper(options, e);
                      else
                        showContextMenu(options, e);
                    }
                  })
                  .appendTo(container);
              }
              else {
                if (auth == 0) {     //talep başlanmamış durumdaysa admin için contextmenu
                  $("<div>")
                    .dxButton({
                      icon: "preferences",
                      hint: "İşlemler",
                      stylingMode: "text",
                      onClick: function (e) {
                        showContextMenuAdmin(options, e);
                      }
                    })
                    .appendTo(container);
                }
                else {      //talep başlanmamış durumdaysa ekip lideri için yalnızca aksiyon ekleyebilir
                  if (auth != 2) {
                    $("<div>")
                      .dxButton({
                        icon: "add",
                        hint: "Aksiyon Ekle",
                        stylingMode: "text",
                        onClick: function (e) {
                          openPopup(options.data);
                        }
                      })
                      .appendTo(container);
                  }
                }
              }
              break;
            case 1://talep başlandı durumundaysa yalnızca talebe aksiyon ekleme işlemi yapılabilir
              if (auth != 2) {
                $("<div>")
                  .dxButton({
                    icon: "add",
                    hint: "Aksiyon Ekle",
                    stylingMode: "text",
                    onClick: function (e) {
                      openPopup(options.data);
                    }
                  })
                  .appendTo(container);
              }
              break;
            case 2:  //talep tamamlanmış durumdaysa
              if (options.data.createdBy == userID || auth == 0) { //yalnızca talebi açan kişi veya admin tarafından silinebilir
                $("<div>")
                  .dxButton({
                    icon: "trash",
                    hint: "Sil",
                    stylingMode: "text",
                    onClick: function (e) {
                      var ID = options.data.id;
                      DeleteRequestCheckActions(ID);
                    }
                  })
                  .appendTo(container);
              }
              break;
            case 3:  //talep bekleme durumundaysa
              if (auth != 2) {
                $("<div>")
                  .dxButton({
                    icon: "preferences",
                    hint: "İşlemler",
                    stylingMode: "text",
                    onClick: function (e) {
                      showContextMenuWaiting(options, e);
                    }
                  })
                  .appendTo(container);
              }
              break;
          };
          $("<div>")
            .dxButton({
              icon: "textdocument",
              hint: "Talep Detayı",
              stylingMode: "text",
              onClick: function (e) {
                RequestDetail(options.data);
              }
            })
            .appendTo(container);
        }
      }
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
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            onRowPrepared: function (e) {
              if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };

              if (e.data != undefined) {
                switch (e.data.ActionStatus) {
                  case 0:
                    if (new Date(e.data.EndDate) <= new Date())
                      e.data.Color = "#F1948A";
                    break;
                  case 1:
                    e.data.Color = "#CDEFFE";
                    break;
                  case 2:
                    e.data.Color = "#E1FFE2";
                    break;
                  case 3:
                    e.data.Color = "#FDEBD0";
                    break;
                }
                e.rowElement.css('background-color', e.data.Color);
              }
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
                caption: "Aksiyon No",
                alignment: 'center',
                allowEditing: false,
                visible: false,
              },
              {
                dataField: "Subject",
                caption: "Aksiyon Konusu",
                alignment: 'center',
                width: 200,
              },
              {
                dataField: "Description",
                caption: "Aksiyon Açıklaması",
                alignment: 'center',
                width: 250,
              },
              {
                dataField: "ResponsibleID",
                caption: "Sorumlu",
                alignment: 'center',
                lookup: {
                  dataSource: DevExpress.data.AspNet.createStore({
                    loadUrl: "/Action/GetResponsible/",
                  }),
                  valueExpr: "id",
                  displayExpr: "name"
                }
              },
              {
                dataField: "OpeningDate",
                caption: "Açılma Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                allowEditing: false,
              },
              {
                dataField: "EndDate",
                caption: "Hedef Tarih",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                allowEditing: false,
              },
              {
                dataField: "StartDate",
                caption: "Başlama Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                cellTemplate: function (container, info) {
                  if (info.data.StartDate == "0001-01-01T00:00:00") {
                    $('<div>')
                      .append($('<text>').append("-"))
                      .appendTo(container);
                  }
                  else {
                    $('<div>')
                      .append($('<text>').append(new Date(info.data.StartDate).toLocaleDateString().replace('.', '/').replace('.', '/')))
                      .appendTo(container);
                  }
                }
              },
              {
                dataField: "CompleteDate",
                caption: "Tamamlama Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                cellTemplate: function (container, info) {
                  if (info.data.CompleteDate == "0001-01-01T00:00:00") {
                    $('<div>')
                      .append($('<text>').append("-"))
                      .appendTo(container);
                  }
                  else {
                    $('<div>')
                      .append($('<text>').append(new Date(info.data.CompleteDate).toLocaleDateString().replace('.', '/').replace('.', '/')))
                      .appendTo(container);
                  }
                }
              },
              {
                dataField: "ActionStatus",
                caption: "Durum",
                alignment: 'center',
                lookup: {
                  dataSource: DevExpress.data.AspNet.createStore({
                    key: "ID",
                    loadUrl: "/Action/GetActionStatus",

                  }),
                  valueExpr: "Id",
                  displayExpr: "Text"
                },
                cellTemplate: function (container, info) {
                  if (info.data.ActionStatus == 0) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-dark", }).append("Başlamadı"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionStatus == 1) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionStatus == 2) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionStatus == 3) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-danger" }).append("İptal/Reddedildi"))
                      .appendTo(container);
                  }
                }
              },
              {
                dataField: "ActionPriorityStatus",
                caption: "Öncelik",
                alignment: 'center',
                lookup: {
                  dataSource: DevExpress.data.AspNet.createStore({
                    key: "ID",
                    loadUrl: "/Action/GetPriortyActionStatus",

                  }),
                  valueExpr: "Id",
                  displayExpr: "Text"
                },
                cellTemplate: function (container, info) {
                  if (info.data.ActionPriorityStatus == 0) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-primary", }).append("Öncelik Belirtilmedi"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionPriorityStatus == 1) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-dark", }).append("1"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionPriorityStatus == 2) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-secondary", }).append("2"))
                      .appendTo(container);
                  }
                  else if (info.data.ActionPriorityStatus == 3) {
                    $('<div>')
                      .append($('<a>', { class: "btn btn-sm btn-warning", }).append("3"))
                      .appendTo(container);
                  }
                }
              },
              {
                dataField: "CreatedBy",
                caption: "Aksiyon Açan Kişi",
                alignment: 'center',
                lookup: {
                  dataSource: DevExpress.data.AspNet.createStore({
                    loadUrl: "/Action/GetCreatedBy/",
                  }),
                  valueExpr: "id",
                  displayExpr: "fullname"
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
                      if (e.row.data.ActionStatus == 0 && (e.row.data.CreatedBy == userID || auth == 0)) //yalnızca başlanmamış aksiyonları aksiyonu açan veya admin düzenleyebilir
                        return true;
                    },
                    onClick: function (e) {
                      data = e.row.data;
                      OpenActionEditModals(data);
                    }
                  },
                  {
                    hint: "Sil",
                    icon: "trash",
                    visible: function (e) {
                      if (e.row.data.ActionStatus != 1 && (e.row.data.CreatedBy == userID || auth == 0)) { //devam etmeyen aksiyonları aksiyonu açan kişi veya admin silebilir
                        return true;
                      }
                    },
                    onClick: function (e) {
                      data = e.row.data;
                      DeleteActionDialog(data.ID);
                    }
                  },
                  {
                    hint: "Durum Değiştir",
                    icon: "clock",
                    visible: function (e) {
                      if ((e.row.data.ActionStatus == 0 || e.row.data.ActionStatus == 1) && e.row.data.ResponsibleID == userID)   //aksiyon durumu aksiyon başlanmamış veya devam ediyorsa sorumlu kişi tarafından değiştirilebilir
                        return true;
                    },
                    onClick: function (e) {
                      data = e.row.data;
                      ChangeActionStatusModal(data);
                    }
                  },
                  {
                    hint: "Aksiyon Detayı",
                    icon: "textdocument",
                    onClick: function (e) {
                      data = e.row.data;
                      OpenActionDetailModal(data);
                      GetActionNoteList(e.row.data.ID);
                    }
                  },
                ]
              },
            ],
            dataSource: DevExpress.data.AspNet.createStore({
              key: "ID",
              loadUrl: "/Request/GetRequestDetail/",
              loadParams: { ID: options.data.id },

              onBeforeSend: function (method, ajaxoptions) {
                ajaxoptions.data.id = options.data.id;
                ajaxoptions.xhrFields = { withCredentials: true };
              }
            })
          })
      }
    }

  }).dxDataGrid("instance");

  //kullanıcı developer ise talepler işlemler kolonunu kapat
  //var auth = $("#auth").val();
  //if (auth == 2) {
  //  grid.columnOption("İşlemler", "visible", false);
  //}
}

function closeRequestModal() {
  $('#RequestCreateModal').modal('hide');
  $('#screenshot').css('background', 'none');
  $('#imagePreviewDiv').attr("hidden", "hidden");
  $('#imagePreview').attr('src', '');
  $('#ProjectID').val(0);
  $('#CategoryID').val(0);
  $('#NotificationTypeID').val(-1);
  $('#ModuleID').empty();
  $('#VersionID').empty();
  $('#clearModal input').val("");
  $('#clearModal textarea').val("");
}
function SuccessRequestImage() {
  $('#m_modal_Image_Paste').modal('hide');
  $('#RequestCreateModal').modal('toggle');

}
function OpenImageModal() {
  $('#RequestCreateModal').modal('hide');
  $('#m_modal_Image_Paste').modal('toggle');

}
function closeImageModal() {
  $('#m_modal_Image_Paste').modal('hide');
  $('#RequestCreateModal').modal('toggle');
  $('#base64').val('');
  $('#imagePreviewDiv').attr("hidden", "hidden");
  $('#screenshot').css('background', 'none');
}
function closeEditRequestModal() {
  $('#RequestEditModal').modal('hide');
}
//talep ekle
function SaveRequestModal() {

  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  })
  if (!validateForm()) {
    swalWithBootstrapButtons(
      'Uyarı',
      'Lütfen Zorunlu Alanları Doldurunuz...',
      'info'
    )
    return;
  }


  var data = new FormData();
  data.append('NotificationTypeID', $('#NotificationTypeID').val());
  data.append('CategoryID', $('#CategoryID').val());
  data.append('ProjectID', $('#ProjectID').val());
  data.append('ModuleID', $('#ModuleID').val());
  data.append('VersionID', $('#VersionID').val());
  data.append('Subject', $('#Subject').val());
  data.append('Description', $('#Description').val());
  data.append('PageUrl', $('#PageUrl').val());
  data.append('base64', $('#base64').val());


  $.ajax({
    url: "/Request/Create",
    type: 'POST',
    data: data,
    cache: false,
    processData: false,
    contentType: false,
    success: function (response) {
      //console.log(response);
      if ($('#fileInput')[0].files.length > 0) {
        UploadFile(response.id);
      }
      else {
        closeRequestModal();
        gridRefresh();
      }
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}


function UploadFile(ID) {
  var input = $('#fileInput')[0];

  var formData = new FormData();
  var files = input.files;

  for (var i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  formData.append('ID', ID);

  $.ajax({
    url: '/Request/SaveRequestDoc',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log('Success:');
      closeRequestModal();
      gridRefresh();
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
}

//talep ekle proje seçiminden sonra select list içeriklerinin hazırlanması
function GetSelectList() {
  var data = new FormData();
  data.append('ID', $('#ProjectID').val());

  //module select list
  $.ajax({
    url: "/Request/GetModuleList",
    type: 'POST',
    async: false,
    data: data,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $("#ModuleID").empty();

      var object = JSON.parse(data);
      if (object.length != 0) {
        var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

      }
      else
        var s = '<option selected="selected" disabled value="-1">Bu Projenin Modülü Bulunmamaktadır.</option>';

      $("#ModuleID").html(s);

    }
  });

  //versiyon select list
  $.ajax({
    url: "/Request/GetVersionList",
    type: 'POST',
    async: false,
    data: data,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $("#VersionID").empty();

      if (!data || data === "1") {
        return;
      }
      var object = JSON.parse(data);
      if (object.length != 0) {
        var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

        $("#VersionID").html(s);
      }

    }
  });
}

//default contextmenu
function showContextMenu(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Aksiyon Ekle", icon: "plus" },
        { text: "Düzenle", icon: "edit" },
        { text: "Sil", icon: "trash" },
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

//default contextmenu developer
function showContextMenuDeveloper(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Düzenle", icon: "edit" },
        { text: "Sil", icon: "trash" },
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

//admin contextmenu
function showContextMenuAdmin(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Aksiyon Ekle", icon: "plus" },
        { text: "Sil", icon: "trash" },
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

//bekleme contextmenu
function showContextMenuWaiting(options, e) {
  var contextMenu = $("<div>")
    .dxContextMenu({
      dataSource: [
        { text: "Aksiyon Ekle", icon: "plus" },
        { text: "Tamamla", icon: "check" },
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
    case "Aksiyon Ekle":
      openPopup(data);
      break;
    //case "Talebi Reddet":
    //   CancelRequest(ID);
    //   break;
    case "Düzenle":
      openEditModals(data, ID);
      break;
    case "Sil":
      DeleteRequestCheckActions(ID);
      break;
    case "Tamamla":
      CompleteRequest(ID);
      break;
    default:
      break;
  }
}

//bekleme durumundaki talebi tamamla
function CompleteRequest(ID) {
  var requestID = new FormData();

  requestID.append('id', ID);

  $.ajax({
    url: "/Request/CompleteRequest",
    type: 'POST',
    data: requestID,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
  });
}



//talep detay modal
function RequestDetail(data) {
  //console.log(data);
  $("#detailNotificationTypeID").val(data.notificationTypeID);
  $("#detailCategoryID").val(data.categoryID);
  $("#detailProjectID").val(data.projectID);
  $("#detailSubject").val(data.subject);
  $("#detailDescription").val(data.description);
  $("#detailPageUrl").val(data.pageURL);
  $("#detailOpeningDate").val(new Date(data.createdOn).toLocaleDateString());
  $("#detailEndDate").val(new Date(data.planedEndDate).toLocaleDateString());
  $("#detailRequestImage").val(data.pictureURL);


  var imagePath = data.pictureURL ? "/Documents/RequestDocs/" + data.pictureURL : "/Modernize/Img/yok.png";
  $("#detailRequestImage").attr("src", imagePath);

  if (data.files.length > 0) {
    $('#detailFiles a').remove();
    data.files.forEach(addLink);
    $("#detailFilesDiv").removeAttr("hidden");
  }
  else {
    $("#detailFilesDiv").attr("hidden", "hidden");
  }
  function addLink(item) {
    var hyperlink = $('<a>', {
      href: item.fileURL,
      text: item.fileName,
      class: 'list-group-item group-list-item-action',
      target: '_blank'
    });
    console.log("fileURL");
    console.log(item.fileURL);
    $('#detailFiles').append(hyperlink);
  }

  var projectID = new FormData();

  projectID.append('id', data.projectID);

  //module select list
  $.ajax({
    url: "/Request/GetModuleList",
    type: 'POST',
    async: false,
    data: projectID,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      if (!data || data === "1") {
        return;
      }
      $("#detailModuleID").empty();
      var object = JSON.parse(data);
      if (object.length != 0) {
        var s;
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

        $("#detailModuleID").html(s);
      }


      $("#detailModuleID").empty();

      var object = JSON.parse(data);
      if (object.length != 0) {
        var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }
      }
      else
        var s = '<option selected="selected" disabled value="-1">Bu Projenin Modülü Bulunmamaktadır.</option>';

      $("#detailModuleID").html(s);


    },
    complete: function () {
      if ($("#detailModuleID option").length != 1)
        $("#detailModuleID").val(data.moduleID);
    }
  });

  //versiyon select list
  $.ajax({
    url: "/Request/GetVersionList",
    type: 'POST',
    async: false,
    data: projectID,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      /*console.log(data);*/
      if (!data || data === "1") {
        return;
      }
      $("#VersionEditID").empty();
      var object = JSON.parse(data);
      if (object.length != 0) {
        var s;
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

        $("#detailVersionID").html(s);
      }

    },
    complete: function () {
      $("#detailVersionID").val(data.versionID);
    }
  });

  $("#RequestDetailModal").modal("toggle");

}

//talep düzenle modal
function openEditModals(data, ID) {
  //console.log(data);
  //console.log(ID);
  // Modal form alanlarını seçilen satırdan gelen veri ile doldurun
  $("#NotificationEditTypeID").val(data.notificationTypeID);
  $("#CategoryEditID").val(data.categoryID);
  $("#ProjectEditID").val(data.projectID);

  $("#RequestEditSubject").val(data.subject);
  $("#DescriptionEdit").val(data.description);
  $("#PageEditUrl").val(data.pageURL);
  $("#RequestImage").val(data.pictureURL);
  $("#ID").val(ID);

  var imagePath = data.pictureURL ? "/Documents/RequestDocs/" + data.pictureURL : "/Modernize/Img/yok.png";
  $("#RequestImage").attr("src", imagePath);

  if (data.files.length > 0) {
    $('#editFiles li').remove();
    data.files.forEach(addLi);
    $("#editFilesDiv").removeAttr("hidden");
  }
  else {
    $("#editFilesDiv").attr("hidden", "hidden");
  }
  function addLi(item) {
    var newLi = $('<li>', {
      class: 'list-group-item'
    });
    
    var checkbox = $('<input>', {
      class: 'form-check-input me-1',
      id: item.id,
      type: 'checkbox',
      value: '',
      'data-toggle': 'tooltip',
      title: 'Silmek için işaretleyiniz'
    }).appendTo(newLi);

    $('<a>', {
      class: 'form-check-label',
      href: item.fileURL,
      text: item.fileName,
      target: '_blank'
    }).appendTo(newLi);

    $('#editFiles').append(newLi);
  }

  var projectID = new FormData();

  projectID.append('id', data.projectID);

  //module select list
  if (data.moduleID != null) {
    $.ajax({
      url: "/Request/GetModuleList",
      type: 'POST',
      async: false,
      data: projectID,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        //console.log(data);
        if (!data || data === "1") {
          return;
        }
        $("#ModuleEditID").empty();
        var object = JSON.parse(data);
        var s;
        if (object.length != 0) {
          for (var i = 0; i < object.length; i++) {
            s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
          }
        }
        $("#ModuleEditID").html(s);
      },
      complete: function () {
        $("#ModuleEditID").val(data.moduleID);
      }
    });
  }
  else {
    var s = '<option selected="selected" disabled value="-1">Bu Projenin Modülü Bulunmamaktadır.</option > ';
    $("#ModuleEditID").html(s);
    $("#ModuleEditID").val(-1);
  }


  //versiyon select list
  $.ajax({
    url: "/Request/GetVersionList",
    type: 'POST',
    async: false,
    data: projectID,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      if (!data || data === "1") {
        return;
      }
      $("#VersionEditID").empty();
      var object = JSON.parse(data);
      if (object.length != 0) {
        ///var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option > ';
        var s;
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

        $("#VersionEditID").html(s);
      }

    },
    complete: function () {
      $("#VersionEditID").val(data.versionID);
    }
  });

  $("#RequestEditModal").modal("toggle");

}

//talep düzenle proje değiştirilirse selectlist içerikleri değişme işlemleri
function GetSelectListEdit() {
  var data = new FormData();
  data.append('ID', $('#ProjectEditID').val());

  //module select list
  $.ajax({
    url: "/Request/GetModuleList",
    type: 'POST',
    async: false,
    data: data,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      //$("#ModuleEditID").empty();
      //if (!data || data === "1") {
      //  return;
      //}
      var object = JSON.parse(data);
      if (object.length != 0) {
        var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }
      }
      else {
        var s = '<option selected="selected" disabled value="-1">Bu Projenin Modülü Bulunmamaktadır.</option>';
      }
      $("#ModuleEditID").html(s);
    }
  });

  //versiyon select list
  $.ajax({
    url: "/Request/GetVersionList",
    type: 'POST',
    async: false,
    data: data,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $("#VersionEditID").empty();
      if (!data || data === "1") {
        return;
      }
      var object = JSON.parse(data);
      if (object.length != 0) {
        var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
        for (var i = 0; i < object.length; i++) {
          s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
        }

        $("#VersionEditID").html(s);
      }
    }
  });
}
//talep güncelle
function SaveRequestEditModal() {
  var formData = new FormData();

  formData.append("notificationTypeID", $("#NotificationEditTypeID").val());
  formData.append("categoryID", $("#CategoryEditID").val());
  formData.append("projectID", $("#ProjectEditID").val());
  formData.append("moduleID", $("#ModuleEditID").val());
  formData.append("versionID", $("#VersionEditID").val());
  formData.append("subject", $("#RequestEditSubject").val());
  formData.append("description", $("#DescriptionEdit").val());
  formData.append("pictureURL", $("#RequestImage").val());
  formData.append("pageUrl", $("#PageEditUrl").val());
  formData.append("ID", $("#ID").val());
  formData.append("lastModifiedBy", $("#LastModifiedBy").val());
  formData.append("customerID", $("#CustomerID").val());
  formData.append("createdOn", $("#CreatedOn").val());

  //console.log(formData);

  var files = [];

  var boxes = $("#editFiles").find("li input");
  boxes.each(function (index, element) {
    if (element.checked) {
      var id = $(element).attr("id");
      files.push(id);
    }
  });

  $.ajax({
    url: "/Request/RequestUpdate",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      if (files.length == 0 && $('#fileInputEdit')[0].files.length == 0) {
        $("#RequestEditModal").modal("toggle");
        gridRefresh();
      }
      else if ($('#fileInputEdit')[0].files.length > 0) {
        UploadFileEdit($("#ID").val());
      }
    },
    error: function (e) {
      console.log(e);
    }
  });

 
  if (files.length != 0) {
    $.ajax({
      url: "/Request/DeleteFile",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(files),

      success: function (data) {
        if ($('#fileInputEdit')[0].files.length == 0) {
          $("#RequestEditModal").modal("toggle");
          gridRefresh();
        }
        //console.log(data);
      },
      error: function (e) {
        console.log(e);
      }
    });
  }
}

function UploadFileEdit(ID) {
  var input = $('#fileInputEdit')[0];

  var formData = new FormData();
  var files = input.files;

  for (var i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  formData.append('ID', ID);

  $.ajax({
    url: '/Request/SaveRequestDoc',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log('Success:');
      $("#RequestEditModal").modal("toggle");
      $('#fileInputEdit').val('');
      gridRefresh();
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
}


//aksiyon ekle popup
function openPopup(data) {
  var ID = data.id;
  var today = new Date();
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  var formItems = [
    {
      dataField: "Subject",
      label: {
        text: "Aksiyon Konusu"
      },
      validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
      editorOptions: {
        value: data.subject
      }
    },

    {
      dataField: "responsibleID",
      editorType: "dxSelectBox",
      validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
      editorOptions: {
        dataSource: DevExpress.data.AspNet.createStore({
          loadUrl: "/Action/GetResponsible/",
        }),
        valueExpr: "id",
        displayExpr: "name"
      },
      label: {
        text: "Aksiyon Sorumlusu"
      },
    },
    {
      dataField: "openingDate",
      caption: "Başlangıç Tarihi",
      alignment: 'center',
      dataType: 'date',
      editorType: "dxDateBox",
      editorOptions: {
        format: 'dd/MM/yyyy',
        value: today,
        min: today,
      },
      label: {
        text: "Aksiyon Başlangıç Tarihi"
      },

    },
    {
      dataField: "endDate",
      caption: "Hedef Tarih",
      alignment: 'center',
      dataType: 'date',
      editorType: "dxDateBox",
      editorOptions: {
        format: 'dd/MM/yyyy',
        value: endDate,
        min: today,

      },
      label: {
        text: "Aksiyon Hedef Tarihi"
      },
    },

    {
      dataField: "actionPriorityStatus",
      editorType: "dxSelectBox",
      label: {
        text: "Aksiyon Öncelik Durumu"
      },
      editorOptions: {
        dataSource: DevExpress.data.AspNet.createStore({
          key: "Id",
          loadUrl: "/Action/GetPriortyActionStatus",
          onBeforeSend: function (method, ajaxoptions) {
            ajaxoptions.xhrFields = { withCredentials: true };
          },
        }),
        valueExpr: "Id",
        displayExpr: "Text",
        value: 0
      }
    },
    {
      dataField: "description",
      validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
      label: {
        text: "Aksiyon Açıklaması"
      },
      editorType: "dxTextArea",
      editorOptions: {
        height: 70,
        width: 415,
        value: data.description
      },
    },

  ];




  var form = $("<div>")
    .dxForm({
      colCount: 2,
      items: formItems,
      labelLocation: "top",
    })
    .appendTo("body")
    .dxForm("instance");

  $("<hr>").appendTo(form.element());

  var buttonContainer = $("<div>")
    .addClass("dx-form-field")
    .css("text-align", "right")
    .appendTo(form.element());


  var saveButton = $("<div>")
    .dxButton({
      text: "Kaydet",
      onClick: function () {
        saveData(form, popup, ID);
      },
      elementAttr: {
        style: "background-color: #4CAF50; color: white;"
      }
    })
    .appendTo(buttonContainer);

  var popup = $("<div>")
    .dxPopup({
      title: "Aksiyon Ekle",
      width: 900,
      height: 380,
      contentTemplate: function (contentContainer) {

        contentContainer.append(form.element());
      },

    })
    .appendTo("body")
    .dxPopup("instance");


  popup.show();
}

//aksiyon ekle kayıt
function saveData(form, popup, ID) {
  var formData = form.option("formData");
  //console.log(formData);

  $.ajax({
    url: "/Request/AddActionItem/" + ID,
    type: "POST",
    contentType: "application/json", // contentType'ı ayarla
    data: JSON.stringify(formData),

    success: function (result) {
      //console.log("Veri başarıyla kaydedildi:", result);
    },
    error: function (error) {
      console.error("AJAX isteği sırasında bir hata oluştu:", error);
    },
    complete: function () {
      popup.hide();
      gridRefresh();
    }
  });
}

//talep sil
function DeleteDialog(ID) {
  //console.log(ID);
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
        url: "/Request/RequestDelete/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          //console.log(data);
          if (data == "-1") {
            swalWithBootstrapButtons(
              'Uyarı',
              'Talebe Ait Aksiyonlar Bulunmaktadır',
              'info'
            )
          } else if (data == "1") {
            gridRefresh();
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
//modal boş alan kontrolü
function validateForm() {
  var optionsCount = $("#ModuleID option").length;
  if (optionsCount == 1) {
    var requiredFields = [
      "ProjectID",
      //"ModuleID",
      "Subject",
      "Description",
    ];
  }
  else {
    var requiredFields = [
      "ProjectID",
      "ModuleID",
      "Subject",
      "Description",
    ];
  }


  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val();

    if (!fieldValue) {

      return false;
    }
  }

  return true;
}
function OpenPartImage(image) {
  //console.log(image);

  $.fancybox.open({
    src: image, // Açılacak resmin URL'si
    type: 'image'  // Resmin türü (diğer içerik türlerini de kullanabilirsiniz)
  });

}

//Resim Yapıştır
(function ($) {
  var defaults;
  $.event.fix = (function (originalFix) {
    return function (event) {
      event = originalFix.apply(this, arguments);
      if (event.type.indexOf("copy") === 0 || event.type.indexOf("paste") === 0) {
        event.clipboardData = event.originalEvent.clipboardData;
      }
      return event;
    };
  })($.event.fix);
  defaults = {
    callback: $.noop,
    matchType: /image.*/
  };
  return ($.fn.pasteImageReader = function (options) {
    if (typeof options === "function") {
      options = {
        callback: options
      };
    }
    options = $.extend({}, defaults, options);
    return this.each(function () {
      var $this, element;
      element = this;
      $this = $(this);
      return $this.bind("paste", function (event) {
        var clipboardData, found;
        found = false;
        clipboardData = event.clipboardData;
        return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
          var file, reader;
          if (found) {
            return;
          }
          if (
            type.match(options.matchType) ||
            clipboardData.items[i].type.match(options.matchType)
          ) {
            file = clipboardData.items[i].getAsFile();
            reader = new FileReader();
            reader.onload = function (evt) {
              return options.callback.call(element, {
                dataURL: evt.target.result,
                event: evt,
                file: file,
                name: file.name
              });
            };
            reader.readAsDataURL(file);
            snapshoot();
            return (found = true);
          }
        });
      });
    });
  });
})(jQuery);

var dataURL, filename;
$("html").pasteImageReader(function (results) {
  filename = results.filename, dataURL = results.dataURL;
  $data.text(dataURL);
  $size.val(results.file.size);
  $type.val(results.file.type);
  var img = document.createElement("img");
  img.src = dataURL;
  var w = img.width;
  var h = img.height;
  $width.val(w);
  $height.val(h);
  $("#imagePreview").attr('src', dataURL);
  var img2 = $("#imagePreview");
  var currentWidth = img2.width();
  var currentHeight = img2.height();

  if (currentWidth > 500 || currentHeight > 500) {
    var ratio = Math.min(500 / currentWidth, 500 / currentHeight);
    img2.width(currentWidth * ratio);
    img2.height(currentHeight * ratio);
  }
  $('#imagePreviewDiv').removeAttr("hidden");
  return $(".actives")
    .css({
      backgroundImage: "url(" + dataURL + ")"
    })
    .data({ width: w, height: h });
});

var $data, $size, $type, $width, $height;
$(function () {
  $data = $(".data");
  $size = $(".size");
  $type = $(".type");
  $width = $("#width");
  $height = $("#height");
  $(".target").on("click", function () {
    var $this = $(this);
    var bi = $this.css("background-image");
    if (bi != "none") {
      $data.text(bi.substr(4, bi.length - 6));
    }

    $(".actives").removeClass("actives");
    $this.addClass("actives");

    $this.toggleClass("contain");

    $width.val($this.data("width"));
    $height.val($this.data("height"));
    if ($this.hasClass("contain")) {
      $this.css({
        width: $this.data("width"),
        height: $this.data("height"),
        "z-index": "10"
      });
    }
    else {
      $this.css({ width: "", height: "", "z-index": "" });
    }
  });
});

function copy(text) {
  var t = document.getElementById("base64");
  t.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successfully" : "unsuccessfully";
    alert("Base64 data coppied " + msg + " to clipboard");
  } catch (err) {
    alert("Unable to copy text");
  }
}

//talebe bağlı aksiyon kontrolü
function DeleteRequestCheckActions(ID) {

  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    buttonsStyling: false,
  });

  var id = new FormData();

  id.append('id', ID);

  $.ajax({
    url: "/Request/CheckActionsForDeleteRequest",
    type: 'POST',
    async: false,
    data: id,
    cache: false,
    processData: false,
    contentType: false,
    success: function (response) {
      switch (response) {
        case "1":
          DeleteDialog(ID);
          break;
        case "2":
          DeleteRequestWithActions(ID);
          break;
      }
    }
  });
}

//aksiyonlarla birlikte talebi sil
function DeleteRequestWithActions(ID) {
  //console.log(ID);
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })

  swalWithBootstrapButtons({
    title: "Uyarı",
    text: "Talebe Bağlı Aksiyonlar Bulunmaktadır, Tüm Bağlı Kayıtları Silme İşlemini Onaylıyor Musunuz?",
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
        url: "/Request/RequestDeleteWithActions/",
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


//Aksiyon düzenle modal
function OpenActionEditModals(data) {
  //console.log(data);

  $("#editActionID").val(data.ID);
  $("#editActionSubject").val(data.Subject);
  $("#actionEditDescription").val(data.Description);
  $("#actionEditActionPriority").val(data.ActionPriorityStatus);
  $("#actionEditResponsible").val(data.ResponsibleID);

  if (new Date(data.OpeningDate) < new Date()) {
    let minDate = new Date();
    var day = ("0" + minDate.getDate()).slice(-2);
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
    $("#actionEditOpeningDate").val(fullDate);
    $("#actionEditOpeningDate").attr('min', fullDate);
  }
  else {
    let openingDate = new Date(data.OpeningDate);
    var opDay = ("0" + openingDate.getDate()).slice(-2);
    var opMonth = ("0" + (openingDate.getMonth() + 1)).slice(-2);
    var opFullDate = openingDate.getFullYear() + "-" + (opMonth) + "-" + (opDay);
    $("#actionEditOpeningDate").val(opFullDate);
    $("#actionEditOpeningDate").attr('min', opFullDate);
  }

  if (new Date(data.EndDate) < new Date()) {
    let minDate = new Date();
    var day = ("0" + minDate.getDate()).slice(-2);
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
    $("#actionEditEndDate").val(fullDate);
    $("#actionEditEndDate").attr('min', fullDate);
  }
  else {
    let endDate = new Date(data.EndDate);
    var endDay = ("0" + endDate.getDate()).slice(-2);
    var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
    var endFullDate = endDate.getFullYear() + "-" + (endMonth) + "-" + (endDay);
    $("#actionEditEndDate").val(endFullDate);
    $("#actionEditEndDate").attr('min', endFullDate);
  }


  $("#EditAction").modal("toggle");
}

//aksiyon update
function SaveActionUpdate() {
  var formData = new FormData();

  formData.append("ID", $("#editActionID").val());
  formData.append("subject", $("#editActionSubject").val());
  formData.append("description", $("#actionEditDescription").val());
  formData.append("actionPriorityStatus", $("#actionEditActionPriority").val());
  formData.append("openingDate", $("#actionEditOpeningDate").val());
  formData.append("endDate", $("#actionEditEndDate").val());
  formData.append("responsibleID", $("#actionEditResponsible").val());

  //console.log(formData);

  $.ajax({
    url: "/Action/ActionUpdate",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#EditAction").modal("toggle");
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    }
  });
}
//aksiyon sil
function DeleteActionDialog(ID) {
  //console.log(ID);
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
        url: "/Action/ActionDelete/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
          //console.log(response);
          if (response == "1") {
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

//aksiyon durum değiştir
function ChangeActionStatus() {
  if ($("#actionStatusValue").val() == "3") {
    $("#changeActionStatus").modal("hide");
    $("#CancelModal").modal("toggle");
  }
  else {
    var formData = new FormData();
    formData.append("ID", $("#actionID").val());
    formData.append("StartDate", $("#actionStartDate").val());
    formData.append("CompleteDate", $("#actionCompleteDate").val());
    formData.append("ActionStatus", $("#actionStatusValue").val());

    $.ajax({
      url: "/Action/ChangeActionStatus",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#changeActionStatus").modal("hide");
        $("#detail").val("");
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

//aksiyon detay modal
function OpenActionDetailModal(data) {
  //console.log(data);
  $("#actionDetailSubject").val(data.Subject);
  $("#actionDetailDescription").val(data.Description);
  $("#actionDetailResponsible").val(data.ResponsibleID);
  $("#actionDetailActionPriority").val(data.ActionPriorityStatus);
  $("#actionDetailStatus").val(data.ActionStatus);

  let OpeningDate = new Date(data.OpeningDate).toLocaleDateString();
  $("#actionDetailOpeningDate").val(OpeningDate);

  let EndDate = new Date(data.EndDate).toLocaleDateString();
  $("#actionDetailEndDate").val(EndDate);
  const Start = data.StartDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.StartDate).toLocaleDateString();
  const Complete = data.CompleteDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.CompleteDate).toLocaleDateString();
  $("#actionDetailStartDate").val(Start);
  $("#actionDetailCompleteDate").val(Complete);


  $("#DetailAction").modal('toggle');
}




//aksiyon durum değiştir
function ChangeActionStatusModal(data) {
  $("#detail").val(2);
  $("#actionID").val(data.ID);
  GetActionNoteList(data.ID);
  $("#actionStatusValue").val(data.ActionStatus);
  onchangeData = data;
  //console.log(data);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day;
  }
  const StartDate = data.StartDate !== "0001-01-01T00:00:00" ? new Date(data.StartDate) : "";
  const CompleteDate = data.CompleteDate !== "0001-01-01T00:00:00" ? new Date(data.CompleteDate) : "";

  if ($("#actionStatusValue").val() == 0) {
    $("#actionStartDate").prop("disabled", true);
    $("#actionCompleteDate").prop("disabled", true);
  }
  if ($("#actionStatusValue").val() != 0) {
    $("#btn-check-1").prop("disabled", true);
  }

  $("#actionStartDate").val(formatDate(StartDate));
  $("#actionCompleteDate").val(formatDate(CompleteDate));

  // Modal açıldığında toggle butonları kontrol et
  $('#changeActionStatus').on('shown.bs.modal', function () {
    toggleButtons();
  });

  // Toggle butonuna tıklandığında rengi güncelle
  $('.btn-check').on('change', function () {
    toggleButtons();
  });

  $('.btn-check').on('click', function () {
    // Tüm checkbox'ları unchecked yap
    $('.btn-check').prop('checked', false);
    // Tıklanan checkbox'ı checked yap
    $(this).prop('checked', true);
    var selectedValue = $(this).attr('data-value');
    $("#actionStatusValue").val(selectedValue);
  });
  function selectButtonByStatus(status) {
    // Tüm toggle butonlarını kontrol et
    $('.btn-check').each(function () {
      // Butonun data-value özniteliğini al
      var buttonValue = $(this).attr('data-value');
      // Eğer butonun değeri actionStatus ile eşleşiyorsa
      if (buttonValue == status) {
        // Butonu seçili hale getir
        $(this).prop('checked', true);
        $("#actionStatusValue").val(status);
      } else {
        // Butonu seçili olmaktan çıkar
        $(this).prop('checked', false);
      }
    });
  }

  var actionStatus = data.ActionStatus;
  selectButtonByStatus(actionStatus);
  $("#changeActionStatus").modal("toggle");
}
//aksiyon notları grid
function GetActionNoteList(ID) {
  //console.log(ID);
  var grid = $(actionNotesGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Action/GetActionNoteList/" + ID,

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
    columnAutoWidth: true,
    remoteOperations: true,
    allowColumnReordering: true,
    showBorders: true,
    allowColumnResizing: true,
    columnResizingMode: 'widget',
    grouping: {
      contextMenuEnabled: true
    },
    groupPanel: {
      visible: true   // or "auto"
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
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: 'Ara...',
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
    editing: {
      mode: 'popup',
      allowUpdating: true,
      allowDeleting: true,
    },
    onToolbarPreparing: function (e) {
      var detail = $("#detail").val();
      if (detail == 2) {
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            icon: "plus", text: "Not Ekle", onClick: function (e) {
              $('#actionNoteModalLabel').text('Not Ekle');
              $('#actionNoteModal').modal('toggle');
              $('#changeActionStatus').modal('hide');
            }
          },
          location: "after",
        });
      }
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
        dataField: "id",
        caption: "Aksiyon Not No",
        alignment: 'center',
        visible: false
      },
      {
        dataField: "title",
        caption: "Not Başlığı",
        alignment: 'center',
        width: '30%'
      },
      {
        dataField: "description",
        caption: "Not İçeriği",
        alignment: 'center',
        width: '60%'
      },
      {
        caption: "İşlemler",
        type: "buttons",
        fixed: true,
        fixedPosition: "right",
        width: '10%',
        alignment: 'center',
        buttons: [
          {
            hint: "Düzenle",
            icon: "edit",
            visible: function (e) {
              var detail = $("#detail").val();
              if (detail == 2)   //aksiyon durum değiştir drumunda not düzenle aktif
                return true;
            },
            onClick: function (e) {
              data = e.row.data;
              ActionNoteEdit(data);
            }
          },
          {
            hint: "Sil",
            icon: "trash",
            visible: function (e) {
              var detail = $("#detail").val();
              if (detail == 2)   //aksiyon durum değiştir drumunda not sil aktif
                return true;
            },
            onClick: function (e) {
              DeleteActionNote(e.row.data.id);
            }
          },
          {
            hint: "Not Detayı",
            icon: "textdocument",
            onClick: function (e) {
              data = e.row.data;
              ActionNoteDetail(data);
            }
          },
        ]
      },
    ]

  }).dxDataGrid("instance");
}
function toggleButtons() {
  var buttons = document.querySelectorAll('.btn-check'); // Toggle butonlarını seç

  // Her bir toggle butonu için kontrol
  buttons.forEach(function (button) {
    // Buton seçiliyse (checked durumda ise)
    if (button.checked) {
      button.nextElementSibling.classList.remove('btn-dark'); // Siyah rengi kaldır
      button.nextElementSibling.classList.add('btn-primary'); // Mavi rengi ekle
    } else {
      button.nextElementSibling.classList.remove('btn-primary'); // Mavi rengi kaldır
      button.nextElementSibling.classList.add('btn-dark'); // Siyah rengi ekle
    }
  });
}
//aksiyon notu sil
function DeleteActionNote(ID) {
  //console.log(ID);
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
        url: "/Action/ActionNoteDelete/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
          //console.log(response);
          if (response == "1") {
            swalWithBootstrapButtons(
              'Bilgi',
              'Silme İşlemi Başarılı',
              'success'
            );
            refreshGridAfterEdit();
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
//aksiyon notu kaydet
function ActionNoteSave() {
  if ($('#actionNoteID').val() == 0) {
    var model = {};
    model.ActionID = $('#actionID').val();
    model.Title = $('#actionNoteTitle').val();
    model.Description = $('#actionNoteDescription').val();


    $.ajax({
      url: '/Action/AddActionNote',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(model),
      success: function (response) {
        //console.log(response);
        closeModalActionNote();
        refreshGridAfterEdit();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
      complete: function () {
      }
    });
  }
  else {
    var model = {};
    model.ID = $('#actionNoteID').val();
    model.Title = $('#actionNoteTitle').val();
    model.Description = $('#actionNoteDescription').val();


    $.ajax({
      url: '/Action/ActionNoteUpdate',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(model),
      success: function (response) {
        //console.log(response);
        $('#actionNoteID').val("0");
        closeModalActionNote();
        refreshGridAfterEdit();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
      complete: function () {
        //console.log("complete");
      }
    });
  }
}

//aksiyon not ekle modal kapat
function closeModalActionNote() {
  $("#actionNoteTitle").val("");
  $("#actionNoteDescription").val("");

  $("#actionNoteModal").modal("toggle");
  $("#changeActionStatus").modal("show");
}

//aksiyon note detay modal
function ActionNoteDetail(data) {
  //console.log(data);

  $("#DetailactionID").val(data.id);
  $("#actionNoteDetailDescription").val(data.description);
  $("#actionNoteDetailTitle").val(data.title);

  if ($("#detail").val() != 2)
    $("#detail").val(1);

  if ($("#detail").val() == 1)
    $("#DetailAction").modal('hide');
  else
    $("#changeActionStatus").modal('hide');

  $("#actionNoteDetail").modal("toggle");
}

//aksiyon not düzenle
function ActionNoteEdit(data) {
  //console.log(data);

  $("#actionNoteID").val(data.id);
  $("#actionNoteDescription").val(data.description);
  $("#actionNoteTitle").val(data.title);

  $('#actionNoteModalLabel').text('Not Düzenle');
  $('#actionNoteModal').modal('toggle');

  //$("#actionNoteEditModal").modal("toggle");
  $("#changeActionStatus").modal("hide");
}

//aksiyon note detay modal kapat
function closeModalActionDetailNote() {
  $("#actionNoteDetail").modal("toggle");
  if ($("#detail").val() == 1)
    $("#DetailAction").modal('show');
  else
    $("#changeActionStatus").modal('show');
}
function refreshGridAfterEdit() {
  $("#actionNotesGridContainer").dxDataGrid("instance").refresh();
}

function CloseChangeStatusModal() {
  $("#detail").val("");
}

function CancelModalClose() {
  $("#checkText").text("");
  $('#CancelModal').modal('toggle');
  $("#CancelNoteDescription").val("");
  $('#changeActionStatus').modal('show');
}

function CancelModalSave() {
  var model = {};
  model.ActionID = $('#actionID').val();
  model.Title = "İptal/Reddedildi Nedeni"
  model.Description = $('#CancelNoteDescription').val();
  if (model.Description == '') {
    $("#checkText").text("*İptal Nedeni Boş Geçilemez!")
    return;
  }
  $("#detail").val("");

  $.ajax({
    url: '/Action/AddActionNote',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(model),
    success: function (response) {
      //console.log(response);
      $("#checkText").text("");
      $('#CancelNoteDescription').val("");
      $('#CancelModal').modal('toggle');
      refreshGridAfterEdit();
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
    complete: function () {
      //console.log("complete");
    }
  });


  var formData = new FormData();
  formData.append("id", $("#actionID").val());
  formData.append("StartDate", $("#actionStartDate").val());
  formData.append("CompleteDate", $("#actionCompleteDate").val());
  formData.append("actionStatus", $("#actionStatusValue").val());
  $.ajax({
    url: "/Action/ChangeActionStatus",
    type: 'POST',
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      $("#changeActionStatus").modal("hide");
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

function CheckButtonStatus(data) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day;
  }
  const newStartDate = onchangeData.StartDate !== "0001-01-01T00:00:00" ? new Date(onchangeData.StartDate) : new Date();
  const newCompleteDate = onchangeData.CompleteDate !== "0001-01-01T00:00:00" ? new Date(onchangeData.CompleteDate) : new Date();
  switch ($("#actionStatusValue").val()) {
    case "0":
      $("#actionStartDate").prop("disabled", true);
      $("#actionCompleteDate").prop("disabled", true);
      $("#actionStartDate").val("");
      $("#actionCompleteDate").val("");

      break;
    case "1":
      $("#actionStartDate").prop("disabled", false);
      $("#actionCompleteDate").prop("disabled", false);
      $("#actionStartDate").val(formatDate(newStartDate));
      if (formatDate(newCompleteDate) == formatDate(new Date())) {
        $("#actionCompleteDate").val("");
      }
      else {
        $("#actionCompleteDate").val(formatDate(newCompleteDate));
      }
      break;
    case "2":
      $("#actionStartDate").prop("disabled", false);
      $("#actionCompleteDate").prop("disabled", false);
      $("#actionStartDate").val(formatDate(newStartDate));
      $("#actionCompleteDate").val(formatDate(newCompleteDate));
      break;
    case "3":
      $("#actionStartDate").prop("disabled", false);
      $("#actionCompleteDate").prop("disabled", false);
      $("#actionStartDate").val(formatDate(newStartDate));
      $("#actionCompleteDate").val(formatDate(newCompleteDate));
      break;
    default:
  }
}

function OpenImage(imgSrc) {
  $.fancybox.open({
    src: imgSrc,
    type: 'image'
  });
}

function OpenAnyImage(imageElementId) {
  var imgSrc = $('#' + imageElementId).attr('src');
  OpenImage(imgSrc);
}