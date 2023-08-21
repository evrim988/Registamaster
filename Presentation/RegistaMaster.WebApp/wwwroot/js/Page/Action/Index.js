$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});
function GetList() {
    var grid = $(actionGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: "/Action/GetList",
            insertUrl: "/Action/AddAction",
            updateUrl: "/Action/ActionUpdate",
            deleteUrl: "/Action/DeleteAction",
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
        //editing: {
        //    mode: 'popup',
        //    allowUpdating: true,
        //    allowDeleting: true,
        //    allowAdding: true,
        //    popup: {
        //        title: 'Yeni Aksiyon Ekle',
        //        text: "Yeni Aksiyon Ekle",
        //        showTitle: true,
        //        width: 500,
        //        height: 325,
        //    },
        //    form: {
        //        items: [{
        //            itemType: 'group',
        //            colCount: 2,
        //            colSpan: 2,
        //            items: [
        //                {
        //                    dataField: "actionDescription",
        //                    caption: "Aksiyon Açıklaması",
        //                },
        //                {
        //                    dataField: "ResponsibleID",
        //                    caption: "Sorumlu",
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "ID",
        //                            loadUrl: "/Action/GetResponsible/",
        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                ajaxOptions.xhrFields = { withCredentials: true };
        //                            }
        //                        }),
        //                        valueExpr: "Id",
        //                        displayExpr: "name"
        //                    }
        //                },
        //                {
        //                    dataField: "openingDate",
        //                    caption: "Açılma Tarihi",
        //                    dataType: 'date',
        //                    format: 'dd/MM/yyyy',
        //                },
        //                {
        //                    dataField: "endDate",
        //                    caption: "Açılma Tarihi",
        //                    dataType: 'date',
        //                    format: 'dd/MM/yyyy',
        //                },
        //                {
        //                    dataField: "description",
        //                    caption: "Açıklama",
        //                },
        //                {
        //                    dataField: "actionStatus",
        //                    caption: "Durum",
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "Id",
        //                            loadUrl: "/Action/GetActionStatus",
        //                            onBeforeSend: function (method, ajaxoptions) {
        //                                ajaxoptions.xhrFields = { withCredentials: true };
        //                            },
        //                        }),
        //                        valueExpr: "Id",
        //                        displayExpr: "Text"
        //                    }
        //                }
        //            ]
        //        }],
        //    }
        //},
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
                dataField: "requestID",
                caption: "Talep",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Action/GetRequest/",
                        onBeforeSend: function (method, ajaxoptions) {
                            console.log(ajaxoptions.data.ID);
                            ajaxoptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    valueExpr: "Id",
                    displayExpr: "name"
                }
            },
            {
                dataField: "actionDescription",
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
                dataField: "description",
                caption: "Açıklama",
                alignment: 'left',
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
                }
            }
        ]

    })
}