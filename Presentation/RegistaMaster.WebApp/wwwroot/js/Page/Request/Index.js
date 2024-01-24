$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();

    $('.card-img-container').on('click', function () {
        var imageUrl = $(this).find('img').attr('src');
        if (imageUrl !== "/Modernize/Img/yok.png") {

            $.magnificPopup.open({
                items: {
                    src: imageUrl
                },
                type: 'image',
                callbacks: {
                    close: function () {
                        $('#RequestEditModal').modal('show');
                    }
                }
            });
            $('#RequestEditModal').modal('hide');
        }
    });

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
        allowColumnResizing: true,
        columnResizingMode: 'widget',
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
        onToolbarPreparing: function (e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: "dxButton",
                options: {
                    icon: "plus", text: "Yeni Talep Ekle", onClick: function (e) {
                        //$("#RequestCreateModal").dxPopup("instance").show();
                        $('#RequestCreateModal').modal('toggle');

                    }
                },
                location: "after",

            });
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
        onRowRemoving: function (e) {
            var detailGrid = actionGridContainer; // actionGridContainer'ın detay grid örneği olduğunu varsayalım

            var detailRows = detailGrid.getVisibleRows();
            var hasRelatedRecords = detailRows.some(function (row) {
                return row.data.requestID === e.data.id; // Detay grid'de requestID adında bir alan olduğunu varsayalım
            });

            if (hasRelatedRecords) {
                e.cancel = true; // Silme işlemini iptal et
                alert("Silemezsiniz. Detay grid'de ilişkili kayıtlar bulunmaktadır.");
            }
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
                cellTemplate(container, options) {
                    //console.log(options.data);
                    if (options.data.pictureURL === null) {
                        $('<div>')
                            .append($('<img>', { src: '/Modernize/Img/yok.png', class: "rounded-circle", width: "35", height: "35" }))
                            .appendTo(container);
                    }
                    else {

                        $('<div>')
                            .append($('<img>', {
                                src: '/Modernize/Img/RequestFiles/' + options.value, class: "rounded-circle", width: "35", height: "35", click: function () {
                                    OpenPartImage('/Modernize/Img/RequestFiles/' + options.value);
                                }
                            }))
                            .appendTo(container);

                    }
                },
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
                dataField: "lastModifiedBy",
                caption: "Talebi Açan Kişi",
                alignment: 'center',
                allowEditing: false,
            },
            {
                caption: "İşlemler",
                fixed: true, 
                fixedPosition: "right", 
                cellTemplate: function (container, options) {
                    $("<div>")
                        .dxButton({
                            icon: "preferences", 
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
                        allowColumnResizing: true,
                        columnResizingMode: 'widget',
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
                            allowUpdating: true,
                            allowDeleting: true
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
                                        key:"Id",
                                        loadUrl: "/Action/GetActionStatus",
                                        
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

function closeRequestModal() {
    $('#RequestCreateModal').modal('hide');
}
function SuccessRequestImage() {
    $('#m_modal_Image_Paste').modal('hide');
    $('#RequestCreateModal').modal('toggle');

}
function OpenImageModal() {
    $('#RequestCreateModal').modal('hide');
    $('#m_modal_Image_Paste').modal('toggle');

}
function closeImageModal() {
    $('#m_modal_Image_Paste').modal('hide');
    $('#RequestCreateModal').modal('toggle');

}
function closeEditRequestModal() {
    $('#RequestEditModal').modal('hide');
}
function SaveRequestModal() {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    })
    if (!validateForm()) {
        swalWithBootstrapButtons(
            'Uyarı',
            'Lütfen Zorunlu Alanları Doldurunuz...',
            'info'
        )
        return;
    }


    var data = new FormData();
    data.append('NotificationTypeID', $('#NotificationTypeID').val());
    data.append('CategoryID', $('#CategoryID').val());
    data.append('ProjectID', $('#ProjectID').val());
    data.append('ModuleID', $('#ModuleID').val());
    data.append('VersionID', $('#VersionID').val());
    data.append('RequestSubject', $('#RequestSubject').val());
    data.append('Description', $('#Description').val());
    data.append('PageUrl', $('#PageUrl').val());
    data.append('base64', $('#base64').val());


    $.ajax({
        url: "/Request/Create",
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {

            console.log(data);
            $('#RequestCreateModal').modal('hide');
            location.reload();

        },
        error: function (e) {
            console.log(e);
        }
    });
}



function GetModuleList() {
    var data = new FormData();
    data.append('ID', $('#ProjectID').val());

    $.ajax({
        url: "/Request/GetModuleList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (!data || data === "1") {
                return;
            }
            $("#ModuleID").empty();
            var object = JSON.parse(data);
            var s = '<option value="-1">Lütfen Seçiniz</option>';
            for (var i = 0; i < object.length; i++) {
                s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
            }

            $("#ModuleID").html(s);
        }
    });
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
    var data = options.data;

    switch (items) {
        case "Aksiyon Ekle":
            openPopup(ID);
            break;
        case "Düzenle":
            openEditModals(data, ID);
            break;
        case "Sil":
            DeleteDialog(ID);
            break;
        default:
            break;
    }
}
function openEditModals(data, ID) {
    console.log(data);
    console.log(ID);
    // Modal form alanlarını seçilen satırdan gelen veri ile doldurun
    $("#NotificationEditTypeID").val(data.notificationTypeID);
    $("#CategoryEditID").val(data.categoryID);
    $("#ProjectEditID").val(data.projectID);
    $("#ModuleEditID").val(data.moduleID);
    $("#VersionEditID").val(data.versionID);
    $("#RequestEditSubject").val(data.requestSubject);
    $("#DescriptionEdit").val(data.description);
    $("#PageEditUrl").val(data.pageUrl);
    $("#RequestImage").val(data.pictureURL);
    $("#ID").val(ID);
    $("#LastModifiedBy").val(data.lastModifiedBy);
    $("#CustomerID").val(data.customerID);
    $("#CreatedOn").val(data.createdOn);
    

    var imagePath = data.pictureURL ? "/Modernize/Img/RequestFiles/" + data.pictureURL : "/Modernize/Img/yok.png";
    $("#RequestImage").attr("src", imagePath);

    $("#RequestEditModal").modal("toggle");
}

function SaveRequestEditModal() {
    var formData = new FormData();

    formData.append("notificationTypeID", $("#NotificationEditTypeID").val());
    formData.append("categoryID", $("#CategoryEditID").val());
    formData.append("projectID", $("#ProjectEditID").val());
    formData.append("moduleID", $("#ModuleEditID").val());
    formData.append("versionID", $("#VersionEditID").val());
    formData.append("requestSubject", $("#RequestEditSubject").val());
    formData.append("description", $("#DescriptionEdit").val());
    formData.append("pictureURL", $("#RequestImage").val());
    formData.append("pageUrl", $("#PageEditUrl").val());
    formData.append("ID", $("#ID").val());
    formData.append("lastModifiedBy", $("#LastModifiedBy").val());
    formData.append("customerID", $("#CustomerID").val());
    formData.append("createdOn", $("#CreatedOn").val());

    console.log(formData);

    $.ajax({
        url: "/Request/RequestUpdate",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {

            console.log(data);
            location.reload();

        },
        error: function (e) {
            console.log(e);
        }
    });

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
            location.reload();
        },
        error: function (error) {
            console.error("AJAX isteği sırasında bir hata oluştu:", error);
        }
    });
}


function DeleteDialog(ID) {
    console.log(ID);
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: "Uyarı",
        text: "Silme İşlemini Onaylıyor Musunuz?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            var data = new FormData();

            data.append('id', ID);

            $.ajax({
                url: "/Request/RequestDelete/",
                type: 'POST',
                async: false,
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if (data == "-1") {
                        swalWithBootstrapButtons(
                            'Uyarı',
                            'Talebe Ait Aksiyonlar Bulunmaktadır',
                            'info'
                        )
                    } else if (data == "1") {
                        location.reload();
                    }
                    
                },
                error: function (textStatus) {
                    console.log('ERRORS:23 ');
                },
            });
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swalWithBootstrapButtons(
                'Bilgi',
                'Silme İşlemi İptal Edildi',
                'info'
            )
        }
    })
}
//modal boş alan kontrolü
function validateForm() {
    var requiredFields = [
        "ProjectID",
        "ModuleID",
        "RequestSubject",
        "Description",
    ];

   

    for (var i = 0; i < requiredFields.length; i++) {
        var fieldValue = $("#" + requiredFields[i]).val();

        if (!fieldValue) {
            
            return false;
        }
    }

    return true;
}
function OpenPartImage(image) {
    console.log(image);

    $.fancybox.open({
        src: image, // Açılacak resmin URL'si
        type: 'image'  // Resmin türü (diğer içerik türlerini de kullanabilirsiniz)
    });

}

//Resim Yapıştır
(function ($) {
    var defaults;
    $.event.fix = (function (originalFix) {
        return function (event) {
            event = originalFix.apply(this, arguments);
            if (event.type.indexOf("copy") === 0 || event.type.indexOf("paste") === 0) {
                event.clipboardData = event.originalEvent.clipboardData;
            }
            return event;
        };
    })($.event.fix);
    defaults = {
        callback: $.noop,
        matchType: /image.*/
    };
    return ($.fn.pasteImageReader = function (options) {
        if (typeof options === "function") {
            options = {
                callback: options
            };
        }
        options = $.extend({}, defaults, options);
        return this.each(function () {
            var $this, element;
            element = this;
            $this = $(this);
            return $this.bind("paste", function (event) {
                var clipboardData, found;
                found = false;
                clipboardData = event.clipboardData;
                return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
                    var file, reader;
                    if (found) {
                        return;
                    }
                    if (
                        type.match(options.matchType) ||
                        clipboardData.items[i].type.match(options.matchType)
                    ) {
                        file = clipboardData.items[i].getAsFile();
                        reader = new FileReader();
                        reader.onload = function (evt) {
                            return options.callback.call(element, {
                                dataURL: evt.target.result,
                                event: evt,
                                file: file,
                                name: file.name
                            });
                        };
                        reader.readAsDataURL(file);
                        snapshoot();
                        return (found = true);
                    }
                });
            });
        });
    });
})(jQuery);

var dataURL, filename;
$("html").pasteImageReader(function (results) {
    filename = results.filename, dataURL = results.dataURL;
    $data.text(dataURL);
    $size.val(results.file.size);
    $type.val(results.file.type);
    var img = document.createElement("img");
    img.src = dataURL;
    var w = img.width;
    var h = img.height;
    $width.val(w);
    $height.val(h);
    return $(".actives")
        .css({
            backgroundImage: "url(" + dataURL + ")"
        })
        .data({ width: w, height: h });
});

var $data, $size, $type, $width, $height;
$(function () {
    $data = $(".data");
    $size = $(".size");
    $type = $(".type");
    $width = $("#width");
    $height = $("#height");
    $(".target").on("click", function () {
        var $this = $(this);
        var bi = $this.css("background-image");
        if (bi != "none") {
            $data.text(bi.substr(4, bi.length - 6));
        }

        $(".actives").removeClass("actives");
        $this.addClass("actives");

        $this.toggleClass("contain");

        $width.val($this.data("width"));
        $height.val($this.data("height"));
        if ($this.hasClass("contain")) {
            $this.css({
                width: $this.data("width"),
                height: $this.data("height"),
                "z-index": "10"
            });
        }
        else {
            $this.css({ width: "", height: "", "z-index": "" });
        }
    });
});

function copy(text) {
    var t = document.getElementById("base64");
    t.select();
    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successfully" : "unsuccessfully";
        alert("Base64 data coppied " + msg + " to clipboard");
    } catch (err) {
        alert("Unable to copy text");
    }
}
