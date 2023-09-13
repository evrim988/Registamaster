$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});
function gridRefresh() {
    $("#requestGridContainer").dxDataGrid("instance").refresh();
}
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
        //editing: {

        //    mode: 'popup',
        //    allowUpdating: true,
        //    allowDeleting: true,
        //    allowAdding: true,

        //    popup: {
        //        title: 'Yeni Talep Ekle',
        //        showTitle: true,
        //        width: 900,
        //        height: 525,
        //    },
        //    form: {
        //        items: [{
        //            itemType: 'group',
        //            colCount: 1,
        //            colSpan: 2,
        //            items: [
        //                {
        //                    dataField: "notificationType",
        //                    caption: "Bildirim Türü",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "Id",
        //                            loadUrl: "/Request/GetNotificationType/",
        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                ajaxOptions.xhrFields = { withCredentials: true, };
        //                            },
        //                        }),
        //                        valueExpr: "value",
        //                        displayExpr: "text",
        //                    }
        //                },
        //                {
        //                    dataField: "category",
        //                    caption: "Kategori",
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "Id",
        //                            loadUrl: "/Request/GetCategorySelect/",
        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                ajaxOptions.xhrFields = { withCredentials: true, };
        //                            },
        //                        }),
        //                        valueExpr: "value",
        //                        displayExpr: "text",
        //                    }
        //                },
        //                {
        //                    dataField: "projectID",
        //                    caption: "Proje",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "Id",
        //                            loadUrl: "/Request/GetProject/",
        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                ajaxOptions.xhrFields = { withCredentials: true, };
        //                            },
        //                        }),
        //                        valueExpr: "id",
        //                        displayExpr: "name",
        //                    },

        //                },
        //                {

        //                    dataField: "moduleID",
        //                    caption: "Modül/Süreç",

        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "ID",
        //                            loadUrl: "/Request/GetModules/",

        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                console.log(ajaxOptions);
        //                                ajaxOptions.xhrFields = { withCredentials: true, };

        //                            },
        //                        }),
        //                        valueExpr: "id",
        //                        displayExpr: "name",
        //                    },
        //                },
        //                {
        //                    dataField: "version",
        //                    caption: "Versiyon",
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "Id",
        //                            loadUrl: "/Request/GetVersion/",
        //                            onBeforeSend: function (method, ajaxOptions) {
        //                                ajaxOptions.xhrFields = { withCredentials: true, };
        //                            },
        //                        }),
        //                        valueExpr: "id",
        //                        displayExpr: "name",
        //                    }
        //                },
        //                {
        //                    dataField: "requestSubject",
        //                    caption: "Konu",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
        //                },
        //                {
        //                    dataField: "description",
        //                    caption: "Açıklama",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
        //                },
        //                {
        //                    dataField: "pageURL",
        //                    caption: "Sayfa Linki",
        //                },
        //            ],
        //        }],

        //    },

        //},

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
                },

            },
            {
                dataField: "moduleID",
                caption: "Modül/Süreç",
                alignment: "center",
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "ID",
                        loadUrl: "/Request/GetModules/",
                        onBeforeSend: function (method, ajaxOptions) {
                            console.log(ajaxOptions);
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",

                },

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
                dataField: "notificationTypeID",
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
                dataField: "categoryID",
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
                },
                cellTemplate: function (container, info) {
                    if (info.data.requestStatus == 0) {
                        $('<div id="NotStarted">')
                            .append($('<a>', { class: "btn btn-sm btn-dark", }).append("Başlamadı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 1) {
                        $('<div id="Start">')
                            .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Başladı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 2) {
                        $('<div id="Contiuned">')
                            .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 3) {
                        $('<div id="Completed">')
                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 4) {
                        $('<div id="Cancel">')
                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("Iptal/Reddedildi"))
                            .appendTo(container);
                    }
                }
            },
            {
                dataField: "versionID",
                caption: "Versiyon",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/Request/GetVersion/",
                        onBeforeSend: function (method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true, };
                        },
                    }),
                    valueExpr: "id",
                    displayExpr: "name",
                }
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
                                caption: "Aksiyon Konusu",
                                alignment: 'center',
                            },
                            {
                                dataField: "description",
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
                                allowEditing: false,
                               
                            },
                            {
                                dataField: "endDate",
                                caption: "Son Tarih",
                                alignment: 'center',
                                dataType: 'date',
                                format: 'dd/MM/yyyy',
                                allowEditing: false,
                            },

                            {
                                dataField: "actionStatus",
                                caption: "Durum",
                                alignment: 'center',
                                allowEditing: false,
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
                                        $('<div id="NotStarted" onclick="openModal(' + info.data.id + ')">')
                                            .append($('<a>', { class: "btn btn-sm btn-dark", }).append("Başlamadı"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.actionStatus == 1) {
                                        $('<div id="Start" onclick="openModal(' + info.data.id + ')">')
                                            .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Başladı"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.actionStatus == 2) {
                                        $('<div id="Contiuned" onclick="openModal(' + info.data.id + ')">')
                                            .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.actionStatus == 3) {
                                        $('<div id="Completed" onclick="openModal(' + info.data.id + ')">')
                                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.actionStatus == 4) {
                                        $('<div id="Cancel"onclick="openModal(' + info.data.id + ')">')
                                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("Iptal/Reddedildi"))
                                            .appendTo(container);
                                    }
                                }
                            },
                            {
                                dataField: "lastModifiedBy",
                                caption: "Aksiyon Açan Kişi",
                                alignment: 'center',
                                allowEditing: false,
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

function openModal(id) {
    console.log(id);
    $('#actionID').val(id);
    $('#changeActionStatus').modal('toggle');
}
function closeModal() {
    $('#changeActionStatus').modal('hide');
}

function saveModal() {
    var actionStatus = $('#actionSelect').val();
    var ID = $('#actionID').val();
    var requestStatus = $('#requestSelect').val();
    var formData = new FormData();
    formData.append('actionStatus', actionStatus);
    formData.append('ID', ID);
    formData.append('requestStatus', requestStatus);
    console.log(ID);
    $.ajax({
        type: "POST",
        url: '/Request/ActionStatusChangeUpdate/',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            closeModal();
            gridRefresh();
        },
        error: function (e) {
            console.log(e)
        }
    });
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
