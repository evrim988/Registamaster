$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});
function GetList() {
    var grid = $(requestGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: "/Request/GetList",
            insertUrl: "/Request/RequestAdd",
            updateUrl: "/Request/RequestEdit",
            deleteUrl: "/Request/RequestDelete/",
            onBeforeSend: function (method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            mode: 'row',
            allowUpdating: true,
            allowDeleting: true,
        },
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
        editing: {
            mode: 'popup',
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            popup: {
                title: 'Yeni Talep Ekle',
                showTitle: true,
                width: 900,
                height: 525,
            },
            form: {
                items: [{
                    itemType: 'group',
                    colCount: 1,
                    colSpan: 2,
                    items: [
                        {
                            dataField: "notificationType",
                            caption: "Bildirim Türü",
                            lookup: {
                                dataSource: DevExpress.data.AspNet.createStore({
                                    key: "Id",
                                    loadUrl: "/Request/GetNotificationType/",
                                    onBeforeSend: function (method, ajaxOptions) {
                                        ajaxOptions.xhrFields = { withCredentials: true, };
                                    },
                                }),
                                valueExpr: "value",
                                displayExpr: "text",
                            }
                        },
                        {
                            dataField: "requestSubject",
                            caption: "Konu",
                        },
                        {
                            dataField: "description",
                            caption: "Açıklama",
                        },
                        {
                            dataField: "pageURL",
                            caption: "Sayfa Linki",
                        },
                        {
                            dataField: "category",
                            caption: "Kategori",
                            lookup: {
                                dataSource: DevExpress.data.AspNet.createStore({
                                    key: "Id",
                                    loadUrl: "/Request/GetCategorySelect/",
                                    onBeforeSend: function (method, ajaxOptions) {
                                        ajaxOptions.xhrFields = { withCredentials: true, };
                                    },
                                }),
                                valueExpr: "value",
                                displayExpr: "text",
                            }
                        },
                        {
                            dataField: "version",
                            caption: "Versiyon",
                            alignment: 'center',
                        },
                        {
                            dataField: "projectID",
                            caption: "Proje",
                            lookup: {
                                dataSource: DevExpress.data.AspNet.createStore({
                                    key: "Id",
                                    loadUrl: "/Request/GetProject/",
                                    onBeforeSend: function (method, ajaxOptions) {
                                        ajaxOptions.xhrFields = { withCredentials: true, };
                                    },
                                }),
                                valueExpr: "id",
                                displayExpr: "name",
                            }
                        },
                        {
                            dataField: "modulesID",
                            caption: "Modül/Süreç",
                            lookup: {
                                dataSource: DevExpress.data.AspNet.createStore({
                                    key: "Id",
                                    loadUrl: "/Request/GetModules/",
                                    onBeforeSend: function (method, ajaxOptions) {
                                        ajaxOptions.xhrFields = { withCredentials: true, };
                                    },
                                }),
                                valueExpr: "id",
                                displayExpr: "text",
                            }
                        }
                    ],
                }],

            },

        },

        columns: [

            {
                dataField: "projectID",
                caption: "Proje",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetProject/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",
                }
            },
            {
                dataField: "modulesID",
                caption: "Modül/Süreç",
                alignment:"center",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetModules/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",
                }
            },
            {
                dataField: "customerID",
                caption: "Müşteri",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetCustomer/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",
                }
            },
            {
                dataField: "notificationType",
                caption: "Bildirim Türü",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetNotificationType/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "value",
                    displayExpr: "text",
                }
            },
            {
                dataField: "requestSubject",
                caption: "Konu",
                alignment: 'center',
            },
            {
                dataField: "description",
                caption: "Açıklama",
                alignment: 'center',
            },
            {
                dataField: "pageURL",
                caption: "Sayfa Linki",
                alignment: 'center',
            },
            {
                dataField: "category",
                caption: "Kategori",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetCategorySelect/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "value",
                    displayExpr: "text",
                }
            },
            {
                dataField: "planedEndDate",
                caption: "Tamamlanma Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
            },
            {
                dataField: "pictureURL",
                caption: "Görüntü",
                alignment: 'center',
            },
            {
                dataField: "requestStatus",
                caption: "Durum",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetRequestStatus",
                        onBeforeSend: function (method, ajaxoptions) {
                            ajaxoptions.xhrFields = { withCredentials: true };
                        },
                    }),
                    valueExpr: "Id",
                    displayExpr: "Text"
                }
            },
            {
                dataField: "version",
                caption: "Versiyon",
                alignment: 'center',
            },
        ],
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                return $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        showBorders: true,
                        showColumnLines: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        allowColumnReordering: true,
                        onRowPrepared: function (e) {
                            if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };
                        },
                        onEditingStart(e) {
                            title = e.data.ElementDescription;
                        },
                        onInitNewRow: function (e) {
                            title = "";
                        },
                        onInitialized: function (e) {
                            actionGridContainer = e.component;
                        },
                        editing: {
                            mode: 'row',
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                        },
                        columns: [
                            {
                                dataField: "id",
                                caption: "Aksiyon No",
                                alignment: 'center',
                                allowEditing: false,
                            },
                            {
                                dataField: "actionDescription",
                                caption: "Aksiyon Açıklaması",
                                alignment: 'center',
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
                                dataField: "description",
                                caption: "Açıklama",
                                alignment: 'center',
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
                        ],
                        dataSource: DevExpress.data.AspNet.createStore({
                            key: "id",
                            loadUrl: "/Request/GetRequestDetail/",
                            loadParams: { ID: options.data.id },
                            updateUrl: "/Request/EditActionItem/",
                            insertUrl: "/Request/AddActionItem/",
                            deleteUrl: "/Request/DeleteActionItem/",
                            onBeforeSend: function (method, ajaxoptions) {
                                ajaxoptions.data.id = options.data.id;
                                ajaxoptions.xhrFields = { withCredentials: true };
                            }
                        })
                    })
            }
        }

    }).dxDataGrid("instance");

}

function deleteRequestAsk(id) {
    DeleteDialog("RequestDelete", id, "Talep Silinecektir!");
}

function DeleteDialog(id) {

    var data = new FormData();

    data.append('id', id);

    $.ajax({
        url: "/Request/RequestDelete/",
        type: 'POST',
        async: false,
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data2) {
            if (data2 > 0) {
                messah("Başarılı", "Firma Silindi", "success");
                location.reload();
            }
            else {
                ShowToastr("Hata", "Bir Hata Oluştu", "error");
            }
        },
        error: function (textStatus) {
            console.log('ERRORS:23 ');
        },
    });
}
