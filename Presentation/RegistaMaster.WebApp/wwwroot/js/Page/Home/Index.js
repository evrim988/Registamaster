$(document).ready(function () {
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
                dataField: "id",
                caption: "Aksiyon No",
                alignment: 'center',
            },
            {
                dataField: "actionDescription",
                caption: "Aksiyon Konusu",
                alignment: 'left',
            },
            {
                dataField: "description",
                caption: "Aksiyon Açıklaması",
                alignment: 'left',
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
                alignment: 'left',
                dataType: 'date',
                format: 'dd/MM/yyyy',
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
                            .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Başladı"))
                            .appendTo(container);
                    }
                    else if (info.data.actionStatus == 2) {
                        $('<div id="Contiuned">')
                            .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
                            .appendTo(container);
                    }
                    else if (info.data.actionStatus == 3) {
                        $('<div id="Completed" >')
                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
                            .appendTo(container);
                    }
                    else if (info.data.actionStatus == 4) {
                        $('<div id="Cancel">')
                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("Iptal/Reddedildi"))
                            .appendTo(container);
                    }
                }
            },
            {
                dataField: "lastModifiedBy",
                caption: "Aksiyon Açan Kişi",
                alignment: 'center',
            }
        ],

    }).dxDataGrid("instance");

}

