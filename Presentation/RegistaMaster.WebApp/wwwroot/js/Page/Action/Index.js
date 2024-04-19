var userID;
var auth;
$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
  //console.log(actionID);
  userID = $("#userID").val();
  auth = $("#auth").val();

  $('select:disabled').css('background-color', '#ffffff');
});
var onchangeData;
var detail;

function gridRefresh() {
  $("#actionGridContainer").dxDataGrid("instance").refresh();
}
function GetList() {
  var grid = $(actionGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Action/GetList",

      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      }
    }),
    onCellPrepared(e) {
      if (e.rowType == "header") {
        e.cellElement.css("text-align", "center");
      };
      if (e.rowType === "data" && e.column.dataField === "requestID") {
        $(e.cellElement).attr("title", "Talep Detayı İçin Çift Tıklayınız");
      };
      if ((e.rowType === "data" && e.column.dataField !== "requestID" && e.column.dataField !== "buttons")) {
        $(e.cellElement).attr("title", "Aksiyon Detayı İçin Çift Tıklayınız");
      }
    },
    onRowPrepared: function (e) {
      if (e.rowType == "header") { e.rowElement.css("background-color", "#b9ceff"); e.rowElement.css('color', '#4f5052'); e.rowElement.css('font-weight', 'bold'); };

      if (e.data != undefined) {
        switch (e.data.actionStatus) {
          case 0:
            if (new Date(e.data.endDate) <= new Date())
              e.data.color = "#F1948A";
            break;
          case 1:
            e.data.color = "#CDEFFE";
            break;
          case 2:
            e.data.color = "#D6FFD7";
            break;
          case 3:
            e.data.color = "#FDEBD0";
            break;
        }
        e.rowElement.css('background-color', e.data.color);
      };
    },
    //rowAlternationEnabled: true,
    columnAutoWidth: true,
    remoteOperations: true,
    allowColumnReordering: true,
    showBorders: true,
    allowColumnResizing: true,
    columnResizingMode: 'widget',
    showRowLines: true,
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
    selection: {
      mode: 'single',
    },
    hoverStateEnabled: true,
    onCellClick: function (e) {
      lastClickedCell = e.column.dataField;
    },
    onRowDblClick: function (e) {
      if (lastClickedCell === "requestID") {
        RequestDetail(e.data.requestID);
        return;
      }
      if (lastClickedCell !== "buttons") {
        GetActionNoteList(e.data.id);
        OpenActionDetailModal(e.data);
      }
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
        caption: "Aksiyon No",
        alignment: 'center',
        visible: false
      },
      {
        dataField: "requestID",
        caption: "Talep",
        alignment: 'center',
        width: 200,
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            loadUrl: "/Action/GetRequest/",
          }),
          valueExpr: "id",
          displayExpr: "name"
        }
      },
      {
        dataField: "subject",
        caption: "Aksiyon Konusu",
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
        dataField: "createdBy",
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
        dataField: "responsibleID",
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
        dataField: "openingDate",
        caption: "Açılma Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "endDate",
        caption: "Hedef Tarih",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "startDate",
        caption: "Başlama Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
        cellTemplate: function (container, info) {
          if (info.data.startDate == "0001-01-01T00:00:00") {
            $('<div>')
              .append($('<text>').append("-"))
              .appendTo(container);
          }
          else {
            $('<div>')
              .append($('<text>').append(new Date(info.data.startDate).toLocaleDateString().replace('.', '/').replace('.', '/')))
              .appendTo(container);
          }
        }
      },
      {
        dataField: "completeDate",
        caption: "Tamamlama Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
        cellTemplate: function (container, info) {
          if (info.data.completeDate == "0001-01-01T00:00:00") {
            $('<div>')
              .append($('<text>').append("-"))
              .appendTo(container);
          }
          else {
            $('<div>')
              .append($('<text>').append(new Date(info.data.completeDate).toLocaleDateString().replace('.', '/').replace('.', '/')))
              .appendTo(container);
          }
        }
      },
      {
        dataField: "actionPriorityStatus",
        caption: "Öncelik",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Action/GetPriortyActionStatus",

          }),
          valueExpr: "Id",
          displayExpr: "Text"
        },
        cellTemplate: function (container, info) {
          if (info.data.actionPriorityStatus == 0) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-primary", }).append("Öncelik Belirtilmedi"))
              .appendTo(container);
          }
          else if (info.data.actionPriorityStatus == 1) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-dark", }).append("1"))
              .appendTo(container);
          }
          else if (info.data.actionPriorityStatus == 2) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-secondary", }).append("2"))
              .appendTo(container);
          }
          else if (info.data.actionPriorityStatus == 3) {
            $('<div>')
              .append($('<a>', { class: "btn btn-sm btn-warning", }).append("3"))
              .appendTo(container);
          }
        }
      },
      {
        dataField: "actionStatus",
        caption: "Durum",
        alignment: 'center',
        lookup: {
          dataSource: DevExpress.data.AspNet.createStore({
            key: "Id",
            loadUrl: "/Action/GetActionStatus",
            onBeforeSend: function (method, ajaxoptions) {
              ajaxoptions.xhrFields = { withCredentials: true };
            },
          }),
          valueExpr: "Id",
          displayExpr: "Text"
        },
        cellTemplate: function (container, info) {
          if (info.data.actionStatus == 0) {
            $('<div id="NotStarted">')
              .append($('<a>', { class: "btn btn-sm btn-dark", text: "Başlamadı" }).click(function () {
                if (info.data.responsibleID == userID)
                  ChangeActionStatusModal(info.data)
              }))
              .appendTo(container);
          }
          else if (info.data.actionStatus == 1) {
            $('<div id="Start">')
              .append($('<a>', { class: "btn btn-sm btn-primary", text: "Devam Ediyor" }).click(function () {
                if (info.data.responsibleID == userID)
                  ChangeActionStatusModal(info.data)
              }))
              .appendTo(container);
          }
          else if (info.data.actionStatus == 2) {
            $('<div id="Contiuned">')
              .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
              .appendTo(container);
          }
          else if (info.data.actionStatus == 3) {
            $('<div id="Completed" >')
              .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Iptal/Reddedildi"))
              .appendTo(container);
          }
        }
      },
      {
        dataField:"buttons",
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
              if (e.row.data.actionStatus == 0 && (e.row.data.createdBy == userID || auth == 0)) //yalnızca başlanmamış aksiyonları aksiyonu açan veya admin düzenleyebilir
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
              if (e.row.data.actionStatus != 1 && (e.row.data.createdBy == userID || auth == 0)) { //devam etmeyen aksiyonları aksiyonu açan kişi veya admin silebilir
                return true;
              }
            },
            onClick: function (e) {
              DeleteActionDialog(e.row.data.id);
            }
          },
          {
            hint: "Durum Değiştir",
            icon: "clock",
            visible: function (e) {
              if ((e.row.data.actionStatus == 0 || e.row.data.actionStatus == 1) && e.row.data.responsibleID == userID)   //aksiyon durumu aksiyon başlanmamış veya devam ediyorsa sorumlu kişi tarafından değiştirilebilir
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
              //console.log(e);
              GetActionNoteList(e.row.data.id);
              OpenActionDetailModal(data);
            }
          },
        ]
      },
    ]

  }).dxDataGrid("instance");
}



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
    onCellClick: function (e) {
      lastClickedCellDetail = e.column.dataField;
    },
    onRowDblClick: function (e) {
      if (lastClickedCellDetail !== "buttons") {
        ActionNoteDetail(e.data);
      }
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
      if (detail == 2) {
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            icon: "plus", text: "Not Ekle", onClick: function (e) {
              $('#actionNoteModalLabel').text('Not Ekle');
              $('#cancelFooter').hide();
              $("#detailFooter").hide();
              $('#noteFooter').show();
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
        dataField:"buttons",
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

function RequestDetail(data) {
  $.ajax({
    url: "/Action/GetRequestDetail",
    type: 'POST',
    data: { ID: data },
    cache: false,
    success: function (response) {
      RequestDetailModal(response);
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

function RequestDetailModal(data) {
  //console.log(data);
  $("#requestNotificationType").val(data.notificationType);
  $("#requestCategory").val(data.category);
  $("#requestProject").val(data.project);
  $("#requestVersion").val(data.version);
  $("#requestModule").val(data.module);
  $("#requestPageURL").val(data.pageURL);
  $("#requestStartDate").val(data.startDate);
  $("#requestPlanedEndDate").val(data.planedEndDate);
  $("#requestSubject").val(data.subject);
  $("#requestDescription").val(data.description);

  var imagePath = data.pictureURL ? "/Documents/RequestDocs/" + data.pictureURL : "/Modernize/Img/yok.png";
  $("#requestImage").attr("src", imagePath);

  if (data.files.length > 0) {
    $('#detailFiles a').remove();
    data.files.forEach(addLink);
    $("#requestFilesDiv").removeAttr("hidden");
  }
  else {
    $("#requestFilesDiv").attr("hidden", "hidden");
  }
  function addLink(item) {
    var hyperlink = $('<a>', {
      href: item.fileURL,
      text: item.fileName,
      class: 'list-group-item group-list-item-action',
      target: '_blank'
    });

    $('#requestFiles').append(hyperlink);
  }
  $("#RequestModal").modal("toggle");
}

function OpenImage() {
  var imgSrc = $('#requestImage').attr('src');
  if (imgSrc == "/Modernize/Img/yok.png")
    return;
  OpenPopup(imgSrc);
}

function OpenPopup(imgSrc) {
  $.fancybox.open({
    src: imgSrc,
    type: 'image'
  });
}

//aksiyon güncelle modal
function OpenActionEditModals(data) {
  //console.log(data);

  $("#editActionID").val(data.id);
  $("#editActionSubject").val(data.subject);
  $("#actionEditDescription").val(data.description);
  $("#actionEditActionPriority").val(data.actionPriorityStatus);
  $("#actionEditResponsible").val(data.responsibleID);

  if (new Date(data.openingDate) < new Date()) {
    let minDate = new Date();
    var day = ("0" + minDate.getDate()).slice(-2);
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
    $("#actionEditOpeningDate").val(fullDate);
    $("#actionEditOpeningDate").attr('min', fullDate);
  }
  else {
    let openingDate = new Date(data.openingDate);
    var opDay = ("0" + openingDate.getDate()).slice(-2);
    var opMonth = ("0" + (openingDate.getMonth() + 1)).slice(-2);
    var opFullDate = openingDate.getFullYear() + "-" + (opMonth) + "-" + (opDay);
    $("#actionEditOpeningDate").val(opFullDate);
    $("#actionEditOpeningDate").attr('min', opFullDate);
  }

  if (new Date(data.endDate) < new Date()) {
    let minDate = new Date();
    var day = ("0" + minDate.getDate()).slice(-2);
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
    $("#actionEditEndDate").val(fullDate);
    $("#actionEditEndDate").attr('min', fullDate);
  }
  else {
    let endDate = new Date(data.endDate);
    var endDay = ("0" + endDate.getDate()).slice(-2);
    var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
    var endFullDate = endDate.getFullYear() + "-" + (endMonth) + "-" + (endDay);
    $("#actionEditEndDate").val(endFullDate);
    $("#actionEditEndDate").attr('min', endFullDate);
  }

  $("#EditAction").modal("toggle");
}

//aksiyon güncelle
function SaveActionUpdate() {
  if (!validateActionForm()) {
    RequiredToastr();
    return;
  }
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
      //console.log(data);
      $("#EditAction").modal("toggle");
      gridRefresh();
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
    }
  });
}

//aksiyon ekle düzenle validation
function validateActionForm() {
  var requiredFields = [
    "editActionSubject",
    "actionEditDescription",
  ];

  for (var i = 0; i < requiredFields.length; i++) {
    var fieldValue = $("#" + requiredFields[i]).val().trim();

    if (!fieldValue) {
      return false;
    }
  }
  return true;
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


//aksiyon durumu değiştir modal
function ChangeActionStatusModal(data) {
  detail = 2;
  $("#actionID").val(data.id);
  GetActionNoteList(data.id);
  onchangeData = data;


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day;
  }
  const startDate = data.startDate !== "0001-01-01T00:00:00" ? new Date(data.startDate) : "";
  const completeDate = data.completeDate !== "0001-01-01T00:00:00" ? new Date(data.completeDate) : "";

  if ($("#actionStatusValue").val() == 0) {
    $("#actionStartDate").prop("disabled", true);
    $("#actionCompleteDate").prop("disabled", true);
  }
  if ($("#actionStatusValue").val() != 0) {
    $("#btn-check-1").prop("disabled", true);
  }

  $("#actionStartDate").val(formatDate(startDate));
  $("#actionCompleteDate").val(formatDate(completeDate));

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

  var actionStatus = data.actionStatus;
  selectButtonByStatus(actionStatus);
  $("#changeActionStatus").modal("toggle");
}



function ActionNoteSave() {
  if ($('#actionNoteID').val() == 0) {
    var model = {};
    model.ActionID = $('#actionID').val();
    model.Title = $('#actionNoteTitle').val();
    model.Description = $('#actionNoteDescription').val();
    if (model.Description.trim() == '' && model.Title.trim() == "") {
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "hideMethod": "fadeOut"
      }
      toastr["error"]("Boş Not Kaydedilemez!")
      return;
    }

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
    if (model.Description.trim() == '' && model.Title.trim() == "") {
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "hideMethod": "fadeOut"
      }
      toastr["error"]("Boş Not Kaydedilemez!")
      return;
    }

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



function closeModal() {
  $("#changeActionStatus").modal("toggle");
  detail = 0;
}

//aksiyon not modal temizle
function clearModalActionNote() {
  $("#actionNoteTitle").val("");
  $("#actionNoteTitle").attr("readonly", false);
  $("#actionNoteDescription").attr("readonly", false);
  $("#actionNoteDescription").val("");
  $("#detailFooter").hide();
  $("#cancelFooter").hide();
  $("#noteFooter").show();
}

//aksiyon not modal kapat
function closeModalActionNote() {
  if (detail == 1)
    $("#DetailAction").modal('show');
  else if (detail == 2)
    $("#changeActionStatus").modal('show');
  $("#actionNoteModal").modal("toggle");
  clearModalActionNote();
}

//aksiyon durumu değiştir
function ChangeActionStatus() {

  if ($("#actionStatusValue").val() == "3") {
    $("#changeActionStatus").modal("hide");
    //$("#CancelModal").modal("toggle");
    $("#actionNoteModalLabel").text("İptal/Reddedlidi");
    $("#actionNoteTitle").attr("readonly", true);
    $("#actionNoteTitle").val("İptal/Ret Nedeni");
    $("#noteFooter").hide();
    $("#detailFooter").hide();
    $("#cancelFooter").show();
    $("#actionNoteModal").modal("toggle");
  }
  else {
    var formData = new FormData();
    formData.append("id", $("#actionID").val());
    formData.append("startDate", $("#actionStartDate").val());
    formData.append("completeDate", $("#actionCompleteDate").val());
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
        detail = 0;
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

function ActionNoteDetail(data) {
  //console.log(data);
  $("#actionNoteModalLabel").text("Not Detay");
  $("#actionNoteTitle").val(data.title);
  $("#actionNoteTitle").attr("readonly", true);
  $("#actionNoteDescription").val(data.description);
  $("#actionNoteDescription").attr("readonly", true);
  $("#cancelFooter").hide();
  $("#noteFooter").hide();
  $("#detailFooter").show();

  if (detail != 2)
    detail = 1;

  if (detail == 1)
    $("#DetailAction").modal('hide');
  else
    $("#changeActionStatus").modal('hide');

  $("#actionNoteModal").modal("toggle");
}

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

function gridRefresh() {
  $("#actionGridContainer").dxDataGrid("instance").refresh();
}
function refreshGridAfterEdit() {
  $("#actionNotesGridContainer").dxDataGrid("instance").refresh();
}

function OpenActionDetailModal(data) {

  $("#actionDetailSubject").val(data.subject);
  $("#actionDetailDescription").val(data.description);
  $("#actionDetailActionPriority").val(data.actionPriorityStatus);
  $("#actionDetailStatus").val(data.actionStatus);
  $("#actionDetailResponsible").val(data.responsibleID);


  const start = data.startDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.startDate).toLocaleDateString();
  const complete = data.completeDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.completeDate).toLocaleDateString();

  $("#actionDetailOpeningDate").val(new Date(data.openingDate).toLocaleDateString());
  $("#actionDetailEndDate").val(new Date(data.endDate).toLocaleDateString());
  $("#actionDetailStartDate").val(start);
  $("#actionDetailCompleteDate").val(complete);

  $("#DetailAction").modal('toggle');
}

function CancelModalSave() {
  var model = {};
  model.ActionID = $('#actionID').val();
  model.Title = $('#actionNoteTitle').val();
  model.Description = $('#actionNoteDescription').val();
  if (model.Description == '') {
    $("#checkText").text("*İptal Nedeni Boş Geçilemez!")
    return;
  }
  detail = 0;


  $.ajax({
    url: '/Action/AddActionNote',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(model),
    success: function (response) {
      //console.log(response);
      $("#checkText").val("");
      clearModalActionNote();

      $("#actionNoteModal").modal("toggle");
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
  formData.append("startDate", $("#actionStartDate").val());
  formData.append("completeDate", $("#actionCompleteDate").val());
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
  const newStartDate = onchangeData.startDate !== "0001-01-01T00:00:00" ? new Date(onchangeData.startDate) : new Date();
  const newCompleteDate = onchangeData.completeDate !== "0001-01-01T00:00:00" ? new Date(onchangeData.completeDate) : new Date();
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