$(document).ready(function () {
  DevExpress.localization.locale('tr');
  GetList();
  checkFileInput();

  $('#fileInput').on('change', function () {
    checkFileInput();
  });
});

function GetList() {
  var grid = $(foodChartGridContainer).dxDataGrid({
    dataSource: DevExpress.data.AspNet.createStore({
      key: "id",
      loadUrl: "/FoodChart/GetList",
      insertUrl: "/FoodChart/FoodChartAdd",
      updateUrl: "/FoodChart/FoodChartEdit",
      deleteUrl: "/FoodChart/FoodChartDelete",
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
      e.data.date = new Date();
    },
    loadPanel: {
      enabled: true,
    },

    editing: {
      mode: 'row',
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
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
      $filterButton.css("margin-right", "5px");

      if (e.element.find('#filterButton').length == 0)
        e.element
          .find('.dx-toolbar-after')
          .prepend($filterButton);

      var $importButton = $('<div id="importButton">').dxButton({
        icon: 'import',
        hint:"Dosya Yükle",
        onClick: function () {
          $("#importDiv").attr("hidden", false);
        }
      });
      
      $importButton.css("margin-right", "5px");
        e.element
          .find('.dx-toolbar-after')
          .prepend($importButton);

    },
    export: {
      enabled: true,
    },
    onExporting(e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Yemek_Cizegelsi');

      // Grid'deki sütun başlıklarını alın
      const columns = e.component.getVisibleColumns();

      // Sütun başlıklarını ekle
      const headerRow = [];
      columns.forEach(column => {
        headerRow.push({ header: column.caption || column.dataField, key: column.dataField });
      });
      worksheet.columns = headerRow;

      // DataSource'tan tüm verileri al
      const dataSource = e.component.option("dataSource");
      dataSource.load().done(data => {
        // Verileri ekle
        data.forEach(rowData => {
          const dataRow = {};
          columns.forEach(column => {
            const value = rowData[column.dataField];
            dataRow[column.dataField] = value !== undefined ? value : '';
          });
          worksheet.addRow(dataRow);
        });

        // Dosyayı indirme işlemi
        workbook.xlsx.writeBuffer().then(buffer => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Yemek_Cizegelsi.xlsx');
        });
      });
    },
    columns: [
      {
        dataField: "date",
        caption: "Tarih",
        alignment: 'center',
        dataType: 'date',
        format: 'dd.MM.yyyy'
      },
      {
        dataField: "personNumber",
        caption: "Kişi Sayısı",
        alignment: 'center',
      },
      {
        type: "buttons",
        buttons: ["edit", "delete",]

      },
    ],

  }).dxDataGrid("instance");

}
//Dosya seçilme durumuna göre upload butonu durumu
function checkFileInput() {
  var fileName = $('#fileInput').val();
  if (fileName == '') {
    $('#submitButton').prop('disabled', true);
    return; // Dosya adı boş ise fonksiyondan çık
  }

  // Dosya uzantısını kontrol et
  var validExtensions = ['.xlsx', '.xls'];
  var fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  if (!validExtensions.includes(fileExtension)) {
    // Eğer dosya uzantısı geçerli değilse, submit butonunu devre dışı bırak ve toastr mesajı göster
    $('#submitButton').prop('disabled', true);
    toastr.error('Geçersiz dosya. Lütfen bir Excel dosyası seçin.');
  } else {
    // Dosya uzantısı geçerli ise, submit butonunu etkinleştir
    $('#submitButton').prop('disabled', false);
  }
}

