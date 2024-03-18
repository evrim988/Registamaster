$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});

function GetList() {
    var grid = $(userGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: "/User/GetList",
            //insertUrl: "/User/AddUser",
            //updateUrl: "/User/UserEdit",
            //deleteUrl: "/User/DeleteUser",
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
        onToolbarPreparing: function (e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: "dxButton",
                options: {
                    icon: "plus", text: "Yeni Kullanıcı Ekle", onClick: function (e) {
                        AddUserCheckAuth();
                    }
                },
                location: "after",

            });
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
        //editing: {
        //    mode: 'row',
        //    allowUpdating: true,
        //    allowDeleting: true,
        //},

        //editing: {
        //    mode: 'popup',
        //    allowUpdating: true,
        //    allowDeleting: true,
        //    allowAdding: true,
        //    popup: {
        //        title: 'Yeni Kullanıcı Ekle',
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
        //                    dataField: "name",
        //                    caption: "Ad",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        //                },
        //                {
        //                    dataField: "surname",
        //                    caption: "Soyad",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        //                },
        //                {
        //                    dataField: "username",
        //                    caption: "Kullanıcı Adı",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        //                },
        //                {
        //                    dataField: "password",
        //                    caption: "Şifre",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        //                },
        //                {
        //                    dataField: "email",
        //                    caption: "Email",
        //                    validationRules: [{ type: "required", message: "Bu alan zorunludur." }],

        //                },
        //            ],
        //        }],

        //    },

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
            //{
            //    dataField: 'Image',
            //    caption: "Fotoğraf",
            //    allowExporting: false,
            //    width: 100,
            //    allowFiltering: false,
            //    allowEditing: false,
            //    allowSorting: false,
            //    cellTemplate(container, options) {
            //        if (options.data.UserImageURL === null) {
            //            $('<div>')
            //                .append($('<img>', { src: '/Modernize/Img/yok.png', class: "rounded-circle", width: "35", height: "35" }))
            //                .appendTo(container);
            //        }
            //        else {
            //            $('<div>')
            //                .append($('<img>', { src: '/Modernize/Img/ProfilePhotos/' + options.value, class: "rounded-circle", width: "35", height: "35" }))
            //                .appendTo(container);
            //        }
            //    },

            //},
            {
                dataField: "name",
                caption: "Adı",
                alignment: 'center',
            },
            {
                dataField: "surname",
                caption: "Soyadı",
                alignment: 'center',
            },
            {
                dataField: "username",
                caption: "Kullanıcı Adı",
                alignment: 'center',
            },
            {
                dataField: "email",
                caption: "EMail",
                alignment: 'center',
            },
            {
                dataField: "password",
                caption: "Şifre",
                visible: false
            },
            {
                dataField: "authorizationStatus",
                caption: "Kullanıcı Türü",
                alignment: 'center',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "Id",
                        loadUrl: "/User/GetAuthStatus",
                        onBeforeSend: function (method, ajaxoptions) {
                            ajaxoptions.xhrFields = { withCredentials: true };
                        },
                    }),
                    valueExpr: "Id",
                    displayExpr: "Text"
                }
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
                            EditUserCheckAuth(data);
                        }
                    },
                    {
                        hint: "Sil",
                        icon: "trash",
                        onClick: function (e) {
                            ID = e.row.data.id;
                            DeleteUserCheckAuth(ID);
                        }
                    },
                    {
                        hint: "Yetki Değiştir",
                        icon: "key",
                        onClick: function (e) {
                            data = e.row.data;
                            ChangeAuthCheckAuth(data);
                        }
                    },
                ]
            },
        ],

    }).dxDataGrid("instance");

}

function AddUserCheckAuth() {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    $.ajax({
        url: '/User/CheckAdminAuth',
        async: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (response) {
            //console.log(response);
            if (response != "1") {

                swalWithBootstrapButtons(
                    'Uyarı',
                    'Kullanıcı Ekleme Yetkiniz Bulunmamaktadır!',
                    'info'
                );
            }
            else {
                $('#addUser').modal('toggle');
            }
        },
    });
}

function AddUser() {
    var formData = new FormData();

    formData.append("name", $("#addName").val());
    formData.append("surname", $("#addSurname").val());
    formData.append("username", $("#addUsername").val());
    formData.append("email", $("#addEmail").val());
    formData.append("password", $("#addPassword").val());
    formData.append("authorizationStatus", $("#addAuthStatus").val());

    //console.log(formData);

    $.ajax({
        url: "/User/AddUser",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            $('#addUser').modal('toggle');
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {
            location.reload();
        }
    });
}

function EditUserCheckAuth(data) {

    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });

    //console.log(data);

    var ID = new FormData();

    ID.append('id', data.id);

    $.ajax({
        url: "/User/CheckAuthForEditUser",
        type: 'POST',
        async: false,
        data: ID,
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
                OpenEditModals(data);
            }
        }
    });
}

function OpenEditModals(data) {

    $("#editID").val(data.id);
    $("#editName").val(data.name);
    $("#editSurname").val(data.surname);
    $("#editUsername").val(data.username);
    $("#editEmail").val(data.email);
    $("#editPassword").val(data.password);

    $('#editUser').modal('toggle');
}

function UpdateUser() {
    var formData = new FormData();

    formData.append("id", $("#editID").val());
    formData.append("name", $("#editName").val());
    formData.append("surname", $("#editSurname").val());
    formData.append("username", $("#editUsername").val());
    formData.append("email", $("#editEmail").val());
    formData.append("password", $("#editPassword").val());

    console.log(formData);

    $.ajax({
        url: "/User/UpdateUser",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            //console.log(data);
            $('#editUser').modal('toggle');
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {
            location.reload();
        }
    });
}

function ChangeAuthCheckAuth(data) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    $.ajax({
        url: '/User/CheckAdminAuth',
        async: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (response) {
            //console.log(response);
            if (response != "1") {

                swalWithBootstrapButtons(
                    'Uyarı',
                    'Bu İşlemi Yapma Yetkiniz Bulunmamaktadır!',
                    'info'
                );
            }
            else {
                OpenAuthModal(data);
            }
        },
    });
}

function OpenAuthModal(data) {

    $("#chanceAuthID").val(data.id);
    $("#changeAuthStatus").val(data.authorizationStatus);

    $('#changeAuthorization').modal('toggle');
}

function ChangeAuthorization() {
    var formData = new FormData();

    formData.append("id", $("#chanceAuthID").val());
    formData.append("authorizationStatus", $("#changeAuthStatus").val());

    console.log(formData);

    $.ajax({
        url: "/User/ChangeAuthorization",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            //console.log(data);
            $('#changeAuthorization').modal('toggle');
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {
            location.reload();
        }
    });
}

function DeleteUserCheckAuth(ID) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
    });
    $.ajax({
        url: '/User/CheckAdminAuth',
        async: false,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (response) {
            //console.log(response);
            if (response != "1") {

                swalWithBootstrapButtons(
                    'Uyarı',
                    'Kullanıcı Silme Yetkiniz Bulunmamaktadır!',
                    'info'
                );
            }
            else {
                DeleteUser(ID);
            }
        },
    });
}

function DeleteUser(ID) {
    //console.log(ID);
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: "Uyarı",
        text: "Kullanıcı Silinecek Onaylıyor Musunuz?",
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
                url: "/User/DeleteUser/",
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