$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
});

var onchangeData;


function GetList() {
  var grid = $(actionsGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Home/GetActionHome",
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
        if (e.data.color === "clsRed") {
          e.rowElement.css('background-color', "#fb6969");
        }
      };
    },
    //rowAlternationEnabled: true,
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
      //SÜTUN EKLEYECEK-SİLECEK VEYA YERLERİNİN DEĞİŞTİRLECEĞİ DURUMDA LÜTFEN "DETAY MODAL NOT" KISMINI OKUYUNUZ!!
      {
        dataField: "id",
        caption: "Aksiyon No",
        alignment: 'center',
        visible: false
      },
      {
        dataField: "actionDescription",
        caption: "Aksiyon Konusu",
        alignment: 'left',
        alignment: 'center',
        width: 200,
      },
      {
        dataField: "description",
        caption: "Aksiyon Açıklaması",
        alignment: 'center',
        width: 250,
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
        caption: "Son Tarih",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "startDate",
        caption: "Başlangıç Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "completeDate",
        caption: "Tamamlama Tarihi",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
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
              .append($('<a>', { class: "btn btn-sm btn-dark", }).append("Başlamadı"))
              .appendTo(container);
          }
          else if (info.data.actionStatus == 1) {
            $('<div id="Start">')
              .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
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
        caption: "İşlemler",
        type: "buttons",
        fixed: true,
        fixedPosition: "right",
        buttons: [
          {
            hint: "Durum Değiştir",
            icon: "clock",
            visible: function (e) {
              var userID = $("#userID").val();
              if ((e.row.data.actionStatus == 0 || e.row.data.actionStatus == 1) && e.row.data.responsibleID == userID)   //aksiyon durumu başlanmamış veya devam ediyorsa sorumlu kişi tarafından değiştirilebilir
                return true;
            },
            onClick: function (e) {
              data = e.row.data;
              ChangeActionStatusModal(data);
              CheckButtonStatus(data);
            }
          },
          {
            hint: "Aksiyon Detayı",
            icon: "textdocument",
            onClick: function (e) {
              data = e.row.data;
              //console.log(e);
              GetActionNoteList(e.row.data.id);
              OpenActionDetailModal(e);
            }
          },

        ]
      }
    ]

  }).dxDataGrid("instance");

  var auth = $("#auth").val();
  if (auth == 0) {
    grid.columnOption("createdBy", "visible", false);
  }
}

function openEditModal(data) {
  //console.log(data);


  $("#LastModifiedBy").val(data.lastModifiedBy);
  $("#ActionDescription").val(data.actionDescription);
  $("#Description").val(data.description);


  $("#ActionDetail").modal("toggle");
}


//aksiyon detay modal
/*DETAY MODAL NOT : Aksiyon detay modal için veriler doldurulurken ResponsibleID gibi sayı halinde gelen verilerin tabloda gösterilen verilerine erişebilmek için 
"e.row.cells[sütun numarası(visible:false olan ıd sütun olarak sayılmıyor ve indis 0 ile başlıyor)].displayValue" kullanılmıştır. Sütunların yerleri değiştirildiği,
sütun eklenip-silindiği durumda doğru sütunun "display value"su alınamayacağı için aşağıdaki alanda sütun numaralarının değiştirlmesi gerekmektedir!*/
function OpenActionDetailModal(e) {
  //console.log(data);
  data = e.row.data;
  $("#actionDetailActionDescription").val(data.actionDescription);
  $("#actionDetailDescription").val(data.description);
  $("#actionDetailActionPriority").val(e.row.cells[7].displayValue);
  $("#actionDetailStatus").val(e.row.cells[8].displayValue);
  $("#actionDetailResponsible").val(e.row.cells[2].displayValue);

  const start = data.startDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.startDate).toLocaleDateString();
  const complete = data.completeDate == "0001-01-01T00:00:00" ? "gg.aa.yy" : new Date(data.completeDate).toLocaleDateString();

  $("#actionDetailOpeningDate").val(new Date(data.openingDate).toLocaleDateString());
  $("#actionDetailEndDate").val(new Date(data.endDate).toLocaleDateString());
  $("#actionDetailStartDate").val(start);
  $("#actionDetailCompleteDate").val(complete);

  $("#DetailAction").modal('toggle');
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
    onToolbarPreparing: function (e) {
      var detail = $("#detail").val();
      if (detail == 2) {
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            icon: "plus", text: "Not Ekle", onClick: function (e) {
              $('#actionNoteAddModal').modal('toggle');
              $('#changeActionStatus').modal('hide');
            }
          },
          location: "after",
        });
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
        dataField: "id",
        caption: "Aksiyon Not No",
        alignment: 'center',
        visible: false
      },
      {
        dataField: "title",
        caption: "Not Başlığı",
        alignment: 'center',
        width: "30%"
      },
      {
        dataField: "description",
        caption: "Not İçeriği",
        alignment: 'center',
        width: "60%"
      },
      {
        caption: "İşlemler",
        type: "buttons",
        fixed: true,
        fixedPosition: "right",
        width: "10%",
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

//aksiyon not detay modal aç
function ActionNoteDetail(data) {
  $("#detailNoteTitle").val(data.title);
  $("#detailNoteDescription").val(data.description);

  if ($("#detail").val() != 2)
    $("#detail").val(1);


  if ($("#detail").val() == 1)
    $("#DetailAction").modal('hide');
  else
    $("#changeActionStatus").modal('hide');

  $("#actionNoteDetailModal").modal('toggle');
}

//aksiyon not detay modal kapat
function closActionNoteDetailModal() {
  $("#actionNoteDetailModal").modal('toggle');

  if ($("#detail").val() == 1)
    $("#DetailAction").modal('show');
  else
    $("#changeActionStatus").modal('show');
}

//aksiyon durum işlemleri
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

  $("#detail").val(2);
  $("#actionID").val(data.id);
  $("#actionStatusValue").val(data.actionStatus);
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
  ""
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


//not kaydet
function ActionNoteSave() {
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
      $('#actionNoteAddModal').modal('toggle');
      $('#changeActionStatus').modal('show');
      refreshGridAfterEdit();
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
    complete: function () {
      $("#actionNoteDescription").val("");
      $("#actionNoteTitle").val("");
    }
  });
}


//aksiyon not ekle modal kapat
function closeModalActionNote() {
  $("#actionNoteTitle").val("");
  $("#actionNoteDescription").val("");

  $("#actionNoteAddModal").modal("toggle");
  $("#changeActionStatus").modal("show");
}

//aksiyon durumu değiştir
function ChangeActionStatus() {
  var formData = new FormData();
  formData.append("id", $("#actionID").val());
  formData.append("startDate", $("#actionStartDate").val());
  formData.append("completeDate", $("#actionCompleteDate").val());
  formData.append("actionStatus", $("#actionStatusValue").val());

  if ($("#actionStatusValue").val() == "3") {
    $("#changeActionStatus").modal("hide");
    $("#CancelModal").modal("toggle");
  }
  else {
    $.ajax({
      url: "/Action/ChangeActionStatus",
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        $("#changeActionStatus").modal("hide");
      },
      error: function (e) {
        console.log(e);
      },
      complete: function () {
        location.reload();
      }
    });
  }
}

//aksiyon not sil
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
          if (data == "1") {
            swalWithBootstrapButtons(
              'Bilgi',
              'Silme İşlemi Başarılı',
              'success'
            )
          }
        },
        error: function (textStatus) {
          console.log('ERRORS:23 ');
        },
        complete: function () {
          refreshGridAfterEdit();
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

//akisyon notu düzenle
function ActionNoteEdit(data) {
  //console.log(data);

  $("#EditactionID").val(data.id);
  $("#actionNoteEditDescription").val(data.description);
  $("#actionNoteEditTitle").val(data.title);

  $("#actionNoteEditModal").modal("toggle");
  $("#changeActionStatus").modal("hide");
}

function ActionNoteEditSave() {
  var model = {};
  model.ActionID = $('#EditactionID').val();
  model.Title = $('#actionNoteEditTitle').val();
  model.Description = $('#actionNoteEditDescription').val();


  $.ajax({
    url: '/Action/ActionNoteUpdate',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(model),
    success: function (response) {
      //console.log(response);
      $('#actionNoteEditModal').modal('toggle');
      $('#changeActionStatus').modal('show');
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

function closeModalActionEditNote() {
  $("#changeActionStatus").modal("show");
  $("#actionNoteEditModal").modal("toggle");
}

function refreshGridAfterEdit() {
  $("#actionNotesGridContainer").dxDataGrid("instance").refresh();
}

function CancelModalClose() {
  $('#CancelModal').modal('toggle');
  $("#CancelNoteDescription").val("");
  $('#changeActionStatus').modal('show');
  $("#checkText").val("");
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

  $.ajax({
    url: '/Action/AddActionNote',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(model),
    success: function (response) {
      //console.log(response);
      $("#checkText").val("");
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
    },
    error: function (e) {
      console.log(e);
    },
    complete: function () {
      location.reload();
    }
  });

}

function closeActionStatusModal() {
  $("#detail").val("");
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
      $("#actionCompleteDate").val("");
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