$(document).ready(function () {
  DevExpress.localization.locale('tr');
  //GetModules();
  GetVersion();
});

var auth = $("#auth").val();
function GetModules() {
  $("#nav-module-tab").css("color", "#5d87ff");
  $("#nav-version-tab").css("color", "black");
  var grid = $(modulesGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Defination/GetModules",
      insertUrl: "/Defination/AddModules",
      updateUrl: "/Defination/ModuleUpdate",
      deleteUrl: "/Defination/DeleteModule",
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
    filterRow: {
      visible: true,
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
      grid.option("editing.popup.title", "Düzenle");

    },
    onInitNewRow: function (e) {
      grid.option("editing.popup.title", "Ekle");
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
        title: 'Modül Ekle',
        showTitle: true,
        width: 500,
        height: 315,
      },
      form: {
        items: [{
          itemType: 'group',
          colCount: 2,
          colSpan: 2,
          items: [
            {
              dataField: "name",
              caption: "Adı",
              validationRules: [{ type: "required", message: "Bu alan zorunludur." }]
            },
            {
              dataField: "projectID",
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
              dataField: "description",
              caption: "Açıklama",
              editorType: "dxTextArea",
              editorOptions: {
                height: 100
              },
              colSpan: 2
            },
          ],
        }],

      },

    },

    onContentReady: function (e) {

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
    },

    columns: [
      {
        dataField: "name",
        caption: "Adı",
        alignment: 'center',
      },
      {
        dataField: "description",
        caption: "Açıklama",
        alignment: 'center',
      },
      {
        dataField: "projectID",
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
    ],
  }).dxDataGrid("instance");
  if (auth == 2) {
    grid.option("editing.allowAdding", false);
    grid.option("editing.allowUpdating", false);
    grid.option("editing.allowDeleting", false);
  }
}


function GetVersion() {
  $("#nav-module-tab").css("color", "black");
  $("#nav-version-tab").css("color", "#5d87ff");
  var grid = $(versionGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/Defination/GetVersion",
      insertUrl: "/Defination/AddVersion",
      updateUrl: "/Defination/UpdateVersion",
      deleteUrl: "/Defination/DeleteVersion",
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
    filterRow: {
      visible: true,
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
      grid.option("editing.popup.title", "Düzenle");

    },
    onInitNewRow: function (e) {
      grid.option("editing.popup.title", "Ekle");
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
        title: 'Versiyon Ekle',
        showTitle: true,
        width: 600,
        height: 355,
      },
      form: {
        items: [{
          itemType: 'group',
          colCount: 2,
          colSpan: 2,
          items: [
            //{
            //   dataField: "name",
            //   caption: "Adı",
            //   validationRules: [{ type: "required", message: "Bu alan zorunludur." }]
            //},
            {
              dataField: "projectID",
              caption: "Proje",
              colSpan: 2,
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
              dataField: "description",
              caption: "Açıklama",
              editorType: "dxTextArea",
              editorOptions: {
                height: 100
              },
              colSpan: 2
            },
            {
              dataField: "isNewVersion",
              caption: "Yeni Versiyon",
              dataType: "boolean",
              editorType: "dxCheckBox",
            },
            {
              dataField: "databaseChange",
              caption: "Veritabanı Değişiliği Var Mı?",
              dataType: "boolean",
              editorType: "dxCheckBox",
            },
            
          ],
        }],

      },

    },

    onContentReady: function (e) {

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
    },

    columns: [
      {
        dataField: "name",
        caption: "Adı",
        alignment: 'center',
      },
      {
        dataField: "description",
        caption: "Açıklama",
        alignment: 'center',
      },
      {
        dataField: "date",
        caption: "Tarih",
        dataType: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        dataField: "projectID",
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
        dataField: "databaseChange",
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
        visible:false,
        lookup: {
          dataSource: [
            { id: true, text: "Evet" },
            { id: false, text: "Hayır" }
          ],
          valueExpr: "id",
          displayExpr: "text"
        }
      },
    ],

  }).dxDataGrid("instance");
  if (auth == 2) {
    grid.option("editing.allowAdding", false);
    grid.option("editing.allowUpdating", false);
    grid.option("editing.allowDeleting", false);
  }
}