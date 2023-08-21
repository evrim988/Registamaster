$(document).ready(function () {
    DevExpress.localization.locale('tr');
    GetList();
});

function GetList() {
    var grid = $(userGridContainer).dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: "/User/GetList",
            insertUrl: "/User/AddUser",
            updateUrl: "/User/UserEdit",
            deleteUrl: "/User/DeleteUser",
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
        editing: {
            mode: 'row',
            allowUpdating: true,
            allowDeleting: true,
        },

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
        //                },
        //                {
        //                    dataField: "surName",
        //                    caption: "Soyad",
        //                },
        //                {
        //                    dataField: "userName",
        //                    caption: "Kullanıcı Adı",
        //                },
        //                {
        //                    dataField: "password",
        //                    caption: "Şifre",
        //                },
        //                {
        //                    dataField: "eMail",
        //                    caption: "Email",
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
            {
                dataField: 'Image',
                caption: "Fotoğraf",
                allowExporting: false,
                width: 100,
                allowFiltering: false,
                allowEditing: false,
                allowSorting: false,
                cellTemplate(container, options) {
                    if (options.data.UserImageURL === null) {
                        $('<div>')
                            .append($('<img>', { src: '/Modernize/Img/yok.png', class: "rounded-circle", width: "35", height: "35" }))
                            .appendTo(container);
                    }
                    else {
                        $('<div>')
                            .append($('<img>', { src: '/Modernize/Img/ProfilePhotos/' + options.value, class: "rounded-circle", width: "35", height: "35" }))
                            .appendTo(container);
                    }
                },

            },
            {
                dataField: "name",
                caption: "Adı",
                alignment: 'center',
            },
            {
                dataField: "surName",
                caption: "Soyadı",
                alignment: 'center',
            },
            {
                dataField: "userName",
                caption: "Kullanıcı Adı",
                alignment: 'center',
            },
            {
                dataField: "password",
                caption: "Şifre",
                alignment: 'center',
            },
            {
                dataField: "eMail",
                caption: "EMail",
                alignment: 'center',
            },
            {
                type: "buttons",
                buttons: ["edit", "delete"]
            },
        ],

    }).dxDataGrid("instance");

}

