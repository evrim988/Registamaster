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
        
        onToolbarPreparing: function (e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: "dxButton",
                options: {
                    icon: "plus", text: "Yeni Talep Ekle", onClick: function (e) {
                        //$("#RequestCreateModal").dxPopup("instance").show();
                        AddRequestCheckAuth();
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
        
       
        columns: [
            {
                dataField: "id",
                caption: "Talep No",
                alignment: 'center',
                sortOrder: "desc",
                visible: false
            },
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
                dataField: "createdOn",
                caption: "Talep Açılma Tarihi",
                alignment: 'center',
                dataType: 'date',
                format: 'dd/MM/yyyy',
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
                                src: '/Modernize/Img/RequestFile/' + options.value, class: "rounded-circle", width: "35", height: "35", click: function () {
                                    OpenPartImage('/Modernize/Img/RequestFile/' + options.value);
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
                        $('<div>')
                            .append($('<a>', { class: "btn btn-sm btn-info", }).append("Açık"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 1) {
                        $('<div>')
                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Başladı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 2) {
                        $('<div>')
                            .append($('<a>', { class: "btn btn-sm btn-warning" }).append("Kapandı"))
                            .appendTo(container);
                    }
                    else if (info.data.requestStatus == 3) {
                        $('<div id="Closed">')
                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("İptal/Reddedildi"))
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
                        
                        
                        allowColumnReordering: true,
                        allowColumnResizing: true,
                        columnResizingMode: 'widget',
                        onRowPrepared: function (e) {
                            if (e.rowType == "header") { e.rowElement.css("background-color", "#fcfae3"); e.rowElement.css('color', '#4f5052'); };

                            if (e.data != undefined) {
                                if (e.data.Color === "clsRed") {
                                    e.rowElement.css('background-color', "#fb6969");
                                }
                            }

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
                       
                        columns: [
                            {
                                dataField: "ID",
                                caption: "Aksiyon No",
                                alignment: 'center',
                                allowEditing: false,
                            },
                            {
                                dataField: "CreatedOn",
                                caption: "Aksiyon Açılma Tarihi",
                                alignment: 'center',
                                dataType: 'date',
                                format: 'dd/MM/yyyy',
                            },
                            {
                                dataField: "ActionDescription",
                                caption: "Aksiyon Konusu",
                                alignment: 'center',
                            },
                            {
                                dataField: "Description",
                                caption: "Aksiyon Açıklaması",
                                alignment: 'center',
                            },
                            {
                                dataField: "ResponsibleID",
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
                                dataField: "OpeningDate",
                                caption: "Başlangıç Tarihi",
                                alignment: 'center',
                                dataType: 'date',
                                format: 'dd/MM/yyyy',
                                allowEditing: false,

                            },
                            {
                                dataField: "EndDate",
                                caption: "Son Tarih",
                                alignment: 'center',
                                dataType: 'date',
                                format: 'dd/MM/yyyy',
                                allowEditing: false,
                            },
                            
                            {
                                dataField: "ActionStatus",
                                caption: "Durum",
                                alignment: 'center',
                                lookup: {
                                    dataSource: DevExpress.data.AspNet.createStore({
                                        key:"ID",
                                        loadUrl: "/Action/GetActionStatus",
                                        
                                    }),
                                    valueExpr: "Id",
                                    displayExpr: "Text"
                                },
                                cellTemplate: function (container, info) {
                                    if (info.data.ActionStatus == 0) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-dark", }).append("Başlamadı"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionStatus == 1) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-primary" }).append("Devam Ediyor"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionStatus == 2) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-success" }).append("Tamamlandı"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionStatus == 3) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-danger" }).append("İptal/Reddedildi"))
                                            .appendTo(container);
                                    }
                                }
                            },
                            {
                                dataField: "ActionPriorityStatus",
                                caption: "Öncelik",
                                alignment: 'center',
                                lookup: {
                                    dataSource: DevExpress.data.AspNet.createStore({
                                        key: "ID",
                                        loadUrl: "/Action/GetPriortyActionStatus",

                                    }),
                                    valueExpr: "Id",
                                    displayExpr: "Text"
                                },
                                cellTemplate: function (container, info) {
                                    if (info.data.ActionPriorityStatus == 0) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-primary", }).append("Öncelik Belirtilmedi"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionPriorityStatus == 1) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-dark", }).append("1"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionPriorityStatus == 2) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-secondary", }).append("2"))
                                            .appendTo(container);
                                    }
                                    else if (info.data.ActionPriorityStatus == 3) {
                                        $('<div>')
                                            .append($('<a>', { class: "btn btn-sm btn-warning", }).append("3"))
                                            .appendTo(container);
                                    }
                                }
                            },
                            {
                                dataField: "LastModifiedBy",
                                caption: "Aksiyon Açan Kişi",
                                alignment: 'center',
                                allowEditing: false,
                            },
                            {
                                caption: "İşlemler",
                                type: "buttons",
                                fixed: true,
                                fixedPosition: "right",
                                buttons: [
                                    {
                                        hint: "Düzenle",
                                        icon: "edit",

                                        onClick: function (e) {
                                            data = e.row.data;
                                            EditActionCheckAuth(data);
                                        }
                                    },
                                    {
                                        hint: "Sil",
                                        icon: "trash",
                                        onClick: function (e) {
                                            data = e.row.data;
                                            DeleteActionCheckAuth(data);
                                        }
                                    },
                                    {
                                        hint: "Durum Değiştir",
                                        icon: "clock",
                                        onClick: function (e) {
                                            data = e.row.data;
                                            ActionChangeStatusCheckAuth(data);
                                        }
                                    },
                                ]
                            },
                        ],
                        dataSource: DevExpress.data.AspNet.createStore({
                            key: "ID",
                            loadUrl: "/Request/GetRequestDetail/",
                            loadParams: { ID: options.data.id },
                          
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

    $('#ProjectID').val(0);
    $('#CategoryID').val(0);
    $('#NotificationTypeID').val(-1);
    $('#ModuleID').empty();
    $('#VersionID').empty();
    $('#clearModal input').val("");
    $('#clearModal textarea').val("");
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



function GetSelectList() {
    var data = new FormData();
    data.append('ID', $('#ProjectID').val());

    //module select list
    $.ajax({
        url: "/Request/GetModuleList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            $("#ModuleID").empty();
            if (!data || data === "1") {
                return;
            }
            
            var object = JSON.parse(data);
            if (object.length != 0) {
                var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#ModuleID").html(s);
            }

        }
    });

    //versiyon select list
    $.ajax({
        url: "/Request/GetVersionList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            $("#VersionID").empty();

            if (!data || data === "1") {
                return;
            }
            var object = JSON.parse(data);
            if (object.length != 0) {
                var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#VersionID").html(s);
            }

        }
    });
}

function showContextMenu(options, e) {
    var contextMenu = $("<div>")
        .dxContextMenu({
            dataSource: [
                { text: "Aksiyon Ekle", icon: "plus" },
               
                { text: "Düzenle", icon: "edit" },
                { text: "Sil", icon: "trash" },
                {
                    text: "Talebi Reddet",
                    icon: "remove"
                }

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
            AddActionCheckAuth(data);
            break;
        case "Talebi Reddet":

            CancelRequestCheckAuth(data);
            break;
        case "Düzenle":
            EditRequestCheckAuth(data, ID);
            break;
        case "Sil":
            DeleteRequestCheckAuth(ID);
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

    var projectID = new FormData();

    projectID.append('id', data.projectID);

    //module select list
    $.ajax({
        url: "/Request/GetModuleList",
        type: 'POST',
        async: false,
        data: projectID,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (!data || data === "1") {
                return;
            }
            $("#ModuleEditID").empty();
            var object = JSON.parse(data);
            if (object.length != 0) {
                /*            var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';*/
                var s;
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#ModuleEditID").html(s);
            }

        },
        complete: function () {
            $("#ModuleEditID").val(data.moduleID);
        }
    });

    //versiyon select list
    $.ajax({
        url: "/Request/GetVersionList",
        type: 'POST',
        async: false,
        data: projectID,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (!data || data === "1") {
                return;
            }
            $("#VersionEditID").empty();
            var object = JSON.parse(data);
            if (object.length != 0) {
                ///var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option > ';
                var s;
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#VersionEditID").html(s);
            }

        },
        complete: function () {
            $("#VersionEditID").val(data.versionID);
        }
    });

    $("#RequestEditModal").modal("toggle");

}


function GetSelectListEdit() {
    var data = new FormData();
    data.append('ID', $('#ProjectEditID').val());

    //module select list
    $.ajax({
        url: "/Request/GetModuleList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            $("#ModuleEditID").empty();
            if (!data || data === "1") {
                return;
            }
            var object = JSON.parse(data);
            if (object.length != 0) {
                var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#ModuleEditID").html(s);
            }

        }
    });

    //versiyon select list
    $.ajax({
        url: "/Request/GetVersionList",
        type: 'POST',
        async: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            $("#VersionEditID").empty();
            if (!data || data === "1") {
                return;
            }
            var object = JSON.parse(data);
            if (object.length != 0) {
                var s = '<option selected="selected" disabled value="-1">Lütfen Seçiniz</option>';
                for (var i = 0; i < object.length; i++) {
                    s += '<option value="' + object[i].Value + '">' + object[i].Text + '</option>';
                }

                $("#VersionEditID").html(s);
            }

        }
    });
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

    var today = new Date();
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
            dataField: "openingDate",
            caption: "Başlangıç Tarihi",
            alignment: 'center',
            dataType: 'date',
            editorType: "dxDateBox",
            editorOptions: {
                format: 'dd/MM/yyyy',
                value: today,
                min: new Date(),
            },
            label: {
                text: "Aksiyon Başlangıç Tarihi"
            },

        },
        {
            dataField: "endDate",
            caption: "Son Tarih",
            alignment: 'center',
            dataType: 'date',
            editorType: "dxDateBox",
            editorOptions: {
                format: 'dd/MM/yyyy',
                value: today,
                min: new Date(),

            }, 
            label: {
                text: "Aksiyon Hedef Tarihi"
            },
        },

        {
            dataField: "actionPriorityStatus",
            editorType: "dxSelectBox",
            label: {
                text: "Aksiyon Öncelik Durumu"
            },
            editorOptions: {
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "Id",
                    loadUrl: "/Action/GetPriortyActionStatus",
                    onBeforeSend: function (method, ajaxoptions) {
                        ajaxoptions.xhrFields = { withCredentials: true };
                    },
                }),
                valueExpr: "Id",
                displayExpr: "Text",
                value: 0 
            }
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
                width: 415
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
            },
            elementAttr: {
                style: "background-color: #4CAF50; color: white;" 
            }
        })
        .appendTo(buttonContainer);

    var popup = $("<div>")
        .dxPopup({
            title: "Aksiyon Ekle",
            width: 900,
            height: 380,
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

function AddRequestCheckAuth() {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    $.ajax({
        url: '/Request/CheckAuthForAdd',
        async: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (response) {

            if (response != "1") {

                swalWithBootstrapButtons(
                    'Uyarı',
                    'Talep Ekleme Yetkiniz Bulunmamaktadır!',
                    'info'
                );
            }
            else {
                $('#RequestCreateModal').modal('toggle');
            }
        },
    });
}

function EditRequestCheckAuth(data, ID) {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });

    //console.log(data);
    if (data.requestStatus == 0) {
        var id = new FormData();

        id.append('id', ID);

        $.ajax({
            url: "/Request/CheckAuthForEditRequest",
            type: 'POST',
            async: false,
            data: id,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Bu Kaydı Düzenleme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    openEditModals(data, ID);
                }
            }
        });
    }
    else {
        swalWithBootstrapButtons(
            'Uyarı',
            'Yalnızca Açık Durumundaki Talepler Düzenlenebilir!',
            'info'
        );
    }

}

function DeleteRequestCheckAuth(ID) {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });

    var id = new FormData();

    id.append('id', ID);

    $.ajax({
        url: "/Request/CheckAuthForDeleteRequest",
        type: 'POST',
        async: false,
        data: id,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
            switch (response) {
                case "1":
                    DeleteDialog(ID);
                    break;
                case "2":
                    DeleteRequestWithActions(ID);
                    break;
                case "3":
                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Talebe Bağlı Devam Etmekte Olan Aksiyonlar Bulunmaktadır, Kayıt Silinemez!',
                        'info'
                    );
                    break;
                default:
                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Bu Kaydı Silme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                    break;
            }
        }
    });
}

function DeleteRequestWithActions(ID) {
    //console.log(ID);
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: "Uyarı",
        text: "Talebe Bağlı Aksiyonlar Bulunmaktadır, Tüm Bağlı Kayıtları Silme İşlemini Onaylıyor Musunuz?",
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
                url: "/Request/RequestDeleteWithActions/",
                type: 'POST',
                async: false,
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    swalWithBootstrapButtons(
                        'Bilgi',
                        'Silme İşlemi Başarılı',
                        'success'
                    );
                },
                error: function (textStatus) {
                    console.log('ERRORS:23 ');
                },
                complete: function () {
                    location.reload();
                }
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

function CancelRequestCheckAuth(data) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    console.log(data.requestStatus);
    if (data.requestStatus == "0") {
        var id = new FormData();

        id.append('id', data.id);

        $.ajax({
            url: "/Request/CancelRequestCheckAuth",
            type: 'POST',
            async: false,
            data: id,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Talep Reddetme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    CancelRequest(data.id);
                }
            }
        });
    }
    else {
        swalWithBootstrapButtons(
            'Uyarı',
            'Yalnızca Açık Durumundaki Talepler Reddedilebilir!',
            'info'
        );
    }
}

function CancelRequest(ID) {
    //console.log(ID);
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: "Uyarı",
        text: "Talep Reddedilecek, İşlemi Onaylıyor Musunuz?",
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
                url: "/Request/CancelRequest/",
                type: 'POST',
                async: false,
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                    if (data == "1") {
                        swalWithBootstrapButtons(
                            'Bilgi',
                            'İşlem Başarılı',
                            'success'
                        )
                    }
                },
                error: function (textStatus) {
                    console.log('ERRORS:23 ');
                },
                complete: function () {
                    location.reload();
                }
            });
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swalWithBootstrapButtons(
                'Bilgi',
                'İşlem İptal Edildi',
                'info'
            )
        }
    })
}

//ACTION

function AddActionCheckAuth(data) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    if (data.requestStatus == "0" || data.requestStatus == "1") {
        $.ajax({
            url: '/Request/CheckAuthForAdd',
            async: false,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (response) {

                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Aksiyon Ekleme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    openPopup(data.id);
                }
            },
        });
    }
    else {
        swalWithBootstrapButtons(
            'Uyarı',
            'Tamamlanmış Veya Reddedilmiş Taleplere Aksiyon Açılamaz!',
            'info'
        );
    }
}

function EditActionCheckAuth(data) {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });

    //console.log(data);

    if (data.ActionStatus == "0") {
        var id = new FormData();

        id.append('id', data.ID);

        $.ajax({
            url: "/Request/CheckAuthForEditAction",
            type: 'POST',
            async: false,
            data: id,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Bu Kaydı Düzenleme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    OpenActionEditModals(data);
                }
            }
        });
    }
    else {
        swalWithBootstrapButtons(
            'Uyarı',
            'Tamamlanmış, Devam Etmekte Olan veya İptal Edilmiş Aksiyon Düzenlenemez!',
            'info'
        );
    }


}

function OpenActionEditModals(data) {
    //console.log(data);

    $("#editActionID").val(data.ID);
    $("#editActionActionDescription").val(data.ActionDescription);
    $("#actionEditDescription").val(data.Description);
    $("#actionEditActionPriority").val(data.ActionPriorityStatus);
    $("#actionEditResponsible").val(data.ResponsibleID);

    if (new Date(data.OpeningDate) < new Date()) {
        let minDate = new Date();
        var day = ("0" + minDate.getDate()).slice(-2);
        var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
        var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
        $("#actionEditOpeningDate").val(fullDate);
        $("#actionEditOpeningDate").attr('min', fullDate);
    }
    else {
        let openingDate = new Date(data.OpeningDate);
        var opDay = ("0" + openingDate.getDate()).slice(-2);
        var opMonth = ("0" + (openingDate.getMonth() + 1)).slice(-2);
        var opFullDate = openingDate.getFullYear() + "-" + (opMonth) + "-" + (opDay);
        $("#actionEditOpeningDate").val(opFullDate);
        $("#actionEditOpeningDate").attr('min', opFullDate);
    }

    if (new Date(data.EndDate) < new Date()) {
        let minDate = new Date();
        var day = ("0" + minDate.getDate()).slice(-2);
        var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
        var fullDate = minDate.getFullYear() + "-" + (month) + "-" + (day);
        $("#actionEditEndDate").val(fullDate);
        $("#actionEditEndDate").attr('min', fullDate);
    }
    else {
        let endDate = new Date(data.EndDate);
        var endDay = ("0" + endDate.getDate()).slice(-2);
        var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
        var endFullDate = endDate.getFullYear() + "-" + (endMonth) + "-" + (endDay);
        $("#actionEditEndDate").val(endFullDate);
        $("#actionEditEndDate").attr('min', endFullDate);
    }


    $("#EditAction").modal("toggle");
}

function SaveActionUpdate() {
    var formData = new FormData();

    formData.append("ID", $("#editActionID").val());
    formData.append("actionDescription", $("#editActionActionDescription").val());
    formData.append("description", $("#actionEditDescription").val());
    formData.append("actionPriorityStatus", $("#actionEditActionPriority").val());
    formData.append("openingDate", $("#actionEditOpeningDate").val());
    formData.append("endDate", $("#actionEditEndDate").val());
    formData.append("responsibleID", $("#actionEditResponsible").val());

    console.log(formData);

    $.ajax({
        url: "/Request/ActionUpdate",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {

            //console.log(data);
            location.reload();

        },
        error: function (e) {
            console.log(e);
        }
    });
}

function DeleteActionCheckAuth(data) {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });

    if (data.ActionStatus == "1") {
        swalWithBootstrapButtons(
            'Uyarı',
            'Devam Etmekte Olan Aksiyon Silinemez!',
            'info'
        );
    }
    else {
        var id = new FormData();

        id.append('id', data.ID);

        $.ajax({
            url: "/Request/CheckAuthForDeleteAction",
            type: 'POST',
            async: false,
            data: id,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Kaydı Silme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    DeleteActionDialog(data.ID);
                }
            }
        });
    }
}

function DeleteActionDialog(ID) {
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
                url: "/Request/ActionDelete/",
                type: 'POST',
                async: false,
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                    if (data == "1") {
                        swalWithBootstrapButtons(
                            'Bilgi',
                            'Silme İşlemi Başarılı',
                            'success'
                        )
                    }
                },
                error: function (textStatus) {
                    console.log('ERRORS:23 ');
                },
                complete: function () {
                    location.reload();
                }
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

function ActionChangeStatusCheckAuth(data) {
    //console.log(data);

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    if (data.ActionStatus == "2" || data.ActionStatus == "3") {
        swalWithBootstrapButtons(
            'Uyarı',
            'Tamamlanmış Veya İptal/Reddedilmiş Aksiyonların Durumları Değiştirilemez!',
            'info'
        );
    }
    else {
        var id = new FormData();

        id.append('id', data.ResponsibleID);

        $.ajax({
            url: "/Request/ChanceActionStatusCheckAuth",
            type: 'POST',
            async: false,
            data: id,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {

                if (response != "1") {

                    swalWithBootstrapButtons(
                        'Uyarı',
                        'Bu Kaydı Değiştirme Yetkiniz Bulunmamaktadır!',
                        'info'
                    );
                }
                else {
                    ChangeActionStatusModal(data);
                }
            }
        });
    }
}

function ChangeActionStatusModal(data) {

    $("#actionID").val(data.ID);
    $("#actionSelect").val(data.ActionStatus);

    $("#changeActionStatus").modal("toggle");
}

function ChanceActionStatus() {
    var formData = new FormData();

    formData.append("id", $("#actionID").val());
    formData.append("actionStatus", $("#actionSelect").val());

    console.log(formData);

    $.ajax({
        url: "/Request/ChangeActionStatus",
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