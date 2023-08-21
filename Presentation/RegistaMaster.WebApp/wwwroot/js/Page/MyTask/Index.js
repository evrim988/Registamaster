$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});

function GetList() {
    var grid = $(tasksGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: "/Task/GetMyTaskUserID",
            updateUrl: "/Task/MyTaskUpdate",
            deleteUrl: "/Task/Delete",
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
        editing: {
            mode: 'row',
            allowUpdating: true,
            allowDeleting: true,
        },
        columns: [

            {
                dataField: "id",
                caption: "No",
                alignment: 'center',
                allowEditing: false,
            },
            {
                dataField: "planedStart",
                caption: "Planlanan Başlangıç Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                allowEditing: false,
            },
            {
                dataField: "planedEnd",
                caption: "Planlanan Bitiş Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                allowEditing: false,
            },
            {
                dataField: "title",
                caption: "Konu",
                alignment: 'center',
                allowEditing: false,
            },
            {
                dataField: "description",
                caption: "Açıklama",
                alignment: 'center',
                allowEditing: false,
            },
            {
                dataField: "responsibleID",
                caption: "Sorumlu",
                alignment: 'center',
                allowEditing: false,
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Task/GetResponsible/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",
                }
            },
            {
                dataField: "taskStatus",
                caption: "Durum",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Task/GetTaskStatus/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "Id",
                    displayExpr: "Text",
                }
            },
            {
                dataField: "priorityStatus",
                caption: "Öncelik",
                alignment: 'center',
                allowEditing: false,
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Task/GetPriorityStatus/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "Id",
                    displayExpr: "Text",
                }
            },
            {
                caption: "İşlemler",
                type: "buttons",
                fixed: true,
                fixedPosition: "right",
                buttons: ["edit", "delete"]
            },
        ],

    }).dxDataGrid("instance");

}

