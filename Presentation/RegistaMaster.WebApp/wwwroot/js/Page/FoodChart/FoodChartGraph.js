$(document).ready(function () {
  var root = null; // Kök öğe
  var chart = null; // AmCharts grafik nesnesi
  var xAxis = null; // AmCharts x ekseni
  var yAxis = null; // AmCharts y ekseni
  var series = null; // AmCharts serisi

  // updateChart fonksiyonu, grafik ve bileşenlerini güncelleyecek
  function updateChart(data) {
    if (!root) {
      root = am5.Root.new("chartdiv");

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1
      }));
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "MonthName",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true,
          labels: {
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
          },
          grid: {
            location: 1
          }
        }),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{MonthName}" // Sütunun MonthName ve Count değerlerini göster
        })
      }));

      yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));

      series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Count",
        sequencedInterpolation: true,
        categoryXField: "MonthName",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });
    }

    // Veriyi güncelle
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Animasyon ekle
    series.appear(1000);
    chart.appear(1000, 100);
  }

  // Varsayılan olarak mevcut yılı seç
  var currentYear = new Date().getFullYear();
  var selectYear = $("#year");
  for (var i = currentYear; i >= currentYear - 10; i--) {
    selectYear.append($('<option></option>').attr('value', i).text(i));
  }
  selectYear.val(currentYear);

  // Sayfa yüklendiğinde grafik oluştur
  $.ajax({
    url: "/FoodChart/FoodChartGraph",
    method: "POST",
    data: { year: currentYear }, // Varsayılan olarak mevcut yılı kullan
    success: function (response) {
      console.log("Ajax isteği başarılı:", response);

      var data = JSON.parse(response);

      // Grafik oluşturma ve veriyi güncelleme
      updateChart(data.Result);
    },
    error: function (xhr, status, error) {
      console.error("Ajax hatası:", status, error);
    }
  });

  // Yıl değiştikçe grafik güncelle
  selectYear.change(function () {
    var selectedYear = $(this).val();

    $.ajax({
      url: "/FoodChart/FoodChartGraph",
      method: "POST",
      data: { year: selectedYear },
      success: function (response) {
        console.log("Ajax isteği başarılı:", response);

        var data = JSON.parse(response);

        // Grafik oluşturma ve veriyi güncelleme
        updateChart(data.Result);
      },
      error: function (xhr, status, error) {
        console.error("Ajax hatası:", status, error);
      }
    });
  });
});
