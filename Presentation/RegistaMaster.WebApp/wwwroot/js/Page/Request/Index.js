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
            //updateUrl: "/Request/RequestEdit",
            //deleteUrl: "/Request/RequestDelete/",
            onBeforeSend: function (method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        //editing: {
        //    mode: 'row',
        //    allowUpdating: true,
        //    allowDeleting: true,
        //},
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
        //modal yapılacak
        //editing: {

        //    mode: 'popup',
        //    allowAdding: true,

        //    popup: {
        //        title: 'Yeni Talep Ekle',
        //        showTitle: true,
        //        width: 655,
        //        height: 620,
        //    },
        //    form: {
        //        items: [{
        //            itemType: 'group',
        //            colCount: 1,
        //            colSpan: 2,
        //            items: [
        //                {
        //                    dataField: "notificationTypeID",
        //                    caption: "Bildirim Türü",
        //                    alignment: 'center',
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
        //                    dataField: "categoryID",
        //                    caption: "Kategori",
        //                    alignment: 'center',
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
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
        //                    lookup: {
        //                        dataSource: DevExpress.data.AspNet.createStore({
        //                            key: "ID",
        //                            loadUrl: "/Request/GetModuleList/",

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
        //                    dataField: "versionID",
        //                    caption: "Versiyon",
        //                    alignment: 'center',
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
        //                    editorType: "dxTextArea",
        //                    editorOptions: {
        //                        height: 80,
        //                        width: 765
        //                    }
        //                },
        //                {
        //                    dataField: "pageURL",
        //                    caption: "Sayfa Linki",
        //                },
        //                {
        //                    itemType: 'button',
        //                    horizontalAlignment: 'right',
        //                    buttonOptions: {
        //                        text: 'Resim Yapıştır',
        //                        onClick: function (e) {
        //                            openModal(e);

        //                        }
        //                    },
        //                }

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
                        $('<div id="Open">')
                            .append($('<a>', { class: "btn btn-sm btn-info", }).append("Açık"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 1) {
                        $('<div id="Start">')
                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Başladı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 2) {
                        $('<div id="Cancel">')
                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("İptal/Reddedildi"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 3) {
                        $('<div id="Closed">')
                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Kapandı"))
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
            {
                caption: "İşlemler",
                fixed: true, // Sabitle
                fixedPosition: "right", // Sağa sabitle
                cellTemplate: function (container, options) {
                    $("<div>")
                        .dxButton({
                            icon: "preferences", // ayarlar icon 
                            hint: "İşlemler",
                            stylingMode: "outlined",
                            onClick: function (e) {
                                showContextMenu(options, e);
                            }
                        })
                        .appendTo(container);

                }

            }
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
                            mode: 'popup',
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
var popupInstance;
function openModal(e) {
    if (e === 'imagePasteButton') {
        // Eğer resim yapıştır butonuna basıldıysa
        // Popup'ı gizle
        if (popupInstance) {
            popupInstance.hide();
        }
        $('#m_modal_Image_Paste').modal('toggle');
    } 
    
  
}

function SuccessImage() {
    $('#m_modal_Image_Paste').modal('hide');

}

function closeImageModal() {
    $('#m_modal_Image_Paste').modal('hide');

}

function showContextMenu(options, e) {
    var contextMenu = $("<div>")
        .dxContextMenu({
            dataSource: [
                { text: "Aksiyon Ekle", icon: "plus" },
                { text: "Düzenle", icon: "edit" },
                { text: "Sil", icon: "remove" }

            ],
            onItemClick: function (item) {
                handleItemClick(item, options);


            }
        })
        .appendTo("body")
        .dxContextMenu("instance");

    contextMenu.option("position", { my: "top right", at: "bottom right", of: e.element });
    contextMenu.show();
}

function handleItemClick(item, options) {
    var items = item.itemData.text;
    var ID = options.data.id;

    switch (items) {
        case "Aksiyon Ekle":
            openPopup(ID);
            break;
        case "Düzenle":
            location.href = '../Users/Edit/' + ID;
            break;
        case "Sil":
            DeleteConfirme('/Request/RequestDelete/' + ID);
            break;
        default:
            break;
    }
}

function openPopup(ID) {

    var formItems = [
        {
            dataField: "ActionDescription",
            label: {
                text: "Aksiyon Konusu"
            },
            validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        },

        {
            dataField: "responsibleID",
            editorType: "dxSelectBox",
            validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
            editorOptions: {
                dataSource: DevExpress.data.AspNet.createStore({
                    loadUrl: "/Action/GetResponsible/",
                }),
                valueExpr: "id",
                displayExpr: "name"
            },
            label: {
                text: "Aksiyon Sorumlusu"
            },
        },
        {
            dataField: "description",
            validationRules: [{ type: "required", message: "Bu alan zorunludur." }],
            label: {
                text: "Aksiyon Açıklaması"
            },
            editorType: "dxTextArea",
            editorOptions: {
                height: 70,
                width: 860
            }
        },

    ];




    var form = $("<div>")
        .dxForm({
            colCount: 2,
            items: formItems,
            labelLocation: "top",
        })
        .appendTo("body")
        .dxForm("instance");

    $("<hr>").appendTo(form.element());

    var buttonContainer = $("<div>")
        .addClass("dx-form-field")
        .css("text-align", "right")
        .appendTo(form.element());


    var saveButton = $("<div>")
        .dxButton({
            text: "Kaydet",
            onClick: function () {
                saveData(form, popup, ID);
            }
        })
        .appendTo(buttonContainer);

    var popup = $("<div>")
        .dxPopup({
            title: "Aksiyon Ekle",
            width: 900,
            height: 350,
            contentTemplate: function (contentContainer) {

                contentContainer.append(form.element());
            },

        })
        .appendTo("body")
        .dxPopup("instance");


    popup.show();
}


function saveData(form, popup, ID) {
    var formData = form.option("formData");
    console.log(formData);

    $.ajax({
        url: "/Request/AddActionItem/" + ID,
        type: "POST",
        contentType: "application/json", // contentType'ı ayarla
        data: JSON.stringify(formData),

        success: function (result) {
            console.log("Veri başarıyla kaydedildi:", result);
            popup.hide();
        },
        error: function (error) {
            console.error("AJAX isteği sırasında bir hata oluştu:", error);
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
