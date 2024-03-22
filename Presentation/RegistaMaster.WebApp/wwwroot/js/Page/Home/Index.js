﻿$(document).ready(function () {
   DevExpress.localization.locale('tr');
   GetList();
});

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

         },
         {
            dataField: "description",
            caption: "Aksiyon Açıklaması",
            alignment: 'center',
            width: 200,
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
                  }
               },
               {
                  hint: "Aksiyon Detayı",
                  icon: "textdocument",
                  onClick: function (e) {
                     data = e.row.data;
                     console.log(e);
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
   console.log(data);


   $("#LastModifiedBy").val(data.lastModifiedBy);
   $("#ActionDescription").val(data.actionDescription);
   $("#Description").val(data.description);


   $("#ActionDetail").modal("toggle");
}

//aksiyon durumunu değiştir modal
function ChangeActionStatusModal(data) {

   $("#actionID").val(data.id);
   $("#actionSelect").val(data.actionStatus);

   $("#changeActionStatus").modal("toggle");
}

//aksiyon durumunud değiştir
function ChanceActionStatus() {
   var formData = new FormData();

   formData.append("id", $("#actionID").val());
   formData.append("actionStatus", $("#actionSelect").val());

   console.log(formData);

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

//aksiyon detay modal
/*DETAY MODAL NOT : Aksiyon detay modal için veriler doldurulurken ResponsibleID gibi sayı halinde gelen verilerin tabloda gösterilen verilerine erişebilmek için 
"e.row.cells[sütun numarası(visible:false olan ıd sütun olarak sayılmıyor ve indis 0 ile başlıyor)].displayValue" kullanılmıştır. Sütunların yerleri değiştirildiği,
sütun eklenip-silindiği durumda doğru sütunun "display value"su alınamayacağı için aşağıdaki alanda sütun numaralarının değiştirlmesi gerekmektedir!*/
function OpenActionDetailModal(e) {
   data = e.row.data;
   $("#actionDetailActionDescription").val(data.actionDescription);
   $("#actionDetailDescription").val(data.description);
   $("#actionDetailActionPriority").val(e.row.cells[5].displayValue);
   $("#actionDetailStatus").val(e.row.cells[6].displayValue);
   $("#actionDetailResponsible").val(e.row.cells[2].displayValue);


   let opDate = new Date(data.openingDate).toLocaleDateString();
   $("#actionDetailOpeningDate").val(opDate);

   let endDate = new Date(data.endDate).toLocaleDateString();
   $("#actionDetailEndDate").val(endDate);

   $("#DetailAction").modal('toggle');
}