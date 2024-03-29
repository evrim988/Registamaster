$(document).ready(function () {
  DevExpress.localization.locale('tr');
  CheckDate();
  GetList();

});

function GetList() {
  var grid = $(foodChartGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/FoodChart/GetList",
      insertUrl: "/FoodChart/FoodChartAdd",
      updateUrl: "/FoodChart/FoodChartEdit",
      deleteUrl: "/FoodChart/FoodChartDelete",
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
      e.data.date = new Date();
    },
    loadPanel: {
      enabled: true,
    },

    editing: {
      mode: 'row',
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
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
        dataField: "date",
        caption: "Tarih",
        alignment: 'center',
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "personNumber",
        caption: "Kişi Sayısı",
        alignment: 'center',
      },
      {
        type: "buttons",
        buttons: ["edit", "delete",]

      },
    ],

  }).dxDataGrid("instance");

}

function CheckDate() {
  // Bugünün tarihini al
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // Ay 0'dan başladığı için 1 ekliyoruz
  var year = today.getFullYear();

  var todayStr = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

  $.ajax({
    url: '/FoodChart/CheckDateExists',
    type: 'GET',
    data: { date: todayStr },
    success: function (response) {
      if (response.exists) {
        $('.dx-datagrid-addrow-button').css('display', 'none');
      }
      else {
        $('.dx-datagrid-addrow-button').css('display', 'block');
      }
    },
    error: function () {
    }
  });
}