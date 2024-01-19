$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});

function GetList() {
    var grid = $(userLogGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            keyExpr: "ID",
            loadUrl: "/UserLog/GetList",
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
        grouping: {
            contextMenuEnabled: true
        },
        groupPanel: {
            visible: true
        },
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        remoteOperations: true,
        allowColumnReordering: true,
        showBorders: true,

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
                dataField: "projectKey",
                caption: "Proje",
                alignment: 'center',
            },
            {
                dataField: "nameSurname",
                caption: "Kullanıcı Adı ve Soyadı",
                alignment: 'center',
            },
            {
                dataField: "loginDate",
                caption: "Giriş Yapılan Tarih",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy'
            },
            {
                dataField: "clientID",
                caption: "Müşteri",
                alignment: 'center',
            },
        ]

    }).dxDataGrid("instance");
}