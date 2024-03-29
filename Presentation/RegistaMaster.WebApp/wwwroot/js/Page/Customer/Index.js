$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();

});

function GetList() {
  var grid = $(customersGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Customer/GetList",
      insertUrl: "/Customer/CustomerAdd",
      updateUrl: "/Customer/CustomerEdit",
      deleteUrl: "/Customer/DeleteCustomer",
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
      title = "";
    },
    loadPanel: {
      enabled: true,
    },

    editing: {
      mode: 'popup',
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
      popup: {
        title: 'Yeni Müşteri Ekle',
        showTitle: true,
        width: 500,
        height: 340,
      },
      form: {
        items: [{
          itemType: 'group',
          colCount: 2,
          colSpan: 2,
          items: [
            {
              dataField: "name",
              caption: "Müşteri Adı",
              validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
              colSpan: 2
            },
            {
              dataField: "email",
              caption: "Email",
              colSpan: 2
            },
            {
              dataField: "address",
              caption: "Adres",
              editorType: "dxTextArea",
              editorOptions: {
                height: 80
              },
              colSpan: 2
            },
          ],
        }],

      },

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
        caption: "Firma Adı",
        alignment: 'center',

      },
      {
        dataField: "address",
        caption: "Adres",
        alignment: 'center',
      },
      {
        dataField: "email",
        caption: "Email",
        alignment: 'center',
      },
      {
        type: "buttons",
        buttons: ["edit", "delete",]

      },
    ],

  }).dxDataGrid("instance");

}

