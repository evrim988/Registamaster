$(document).ready(function () {
  var currentYear = new Date().getFullYear();
  var selectYear = $("#year");
  for (var i = currentYear; i >= currentYear - 10; i--) {
    selectYear.append($('<option></option>').attr('value', i).text(i));
  }

  selectYear.change(function () {
    var selectedYear = $(this).val();
    console.log(selectedYear);

    $.ajax({
      url: "/FoodChart/FoodChartGraph",
      method: "POST",
      data: { year: selectedYear },
      success: function (response) {
        console.log("Ajax isteği başarılı:", response);

        var jsonObject = JSON.parse(response);
        var data = jsonObject.Data;
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            console.log("Key: " + key + ", Value: " + data[key]);
          }
        }



        var chartData = response;

        
        
        //xAxis.data.setAll([
        //  { country: "OCAK", value: chartData.Result.January },
        //  { country: "ŞUBAT", value: chartData.Result.February },
        //  { country: "MART", value: chartData.Result.March },
        //  { country: "NİSAN", value: chartData.Result.April },
        //  { country: "MAYIS", value: chartData.Result.May },
        //  { country: "HAZİRAN", value: chartData.Result.June },
        //  { country: "TEMMUZ", value: chartData.Result.July },
        //  { country: "AĞUSTOS", value: chartData.Result.August },
        //  { country: "EYLÜL", value: chartData.Result.September },
        //  { country: "EKİM", value: chartData.Result.October },
        //  { country: "KASIM", value: chartData.Result.November },
        //  { country: "ARALIK", value: chartData.Result.December }
        //]);

        //series.data.setAll([
        //  { country: "OCAK", value: chartData.Result.January },
        //  { country: "ŞUBAT", value: chartData.Result.February },
        //  { country: "MART", value: chartData.Result.March },
        //  { country: "NİSAN", value: chartData.Result.April },
        //  { country: "MAYIS", value: chartData.Result.May },
        //  { country: "HAZİRAN", value: chartData.Result.June },
        //  { country: "TEMMUZ", value: chartData.Result.July },
        //  { country: "AĞUSTOS", value: chartData.Result.August },
        //  { country: "EYLÜL", value: chartData.Result.September },
        //  { country: "EKİM", value: chartData.Result.October },
        //  { country: "KASIM", value: chartData.Result.November },
        //  { country: "ARALIK", value: chartData.Result.December }
        //]);
      },
      error: function (xhr, status, error) {
        console.error("Ajax hatası:", status, error);
      }
    });
  });
});