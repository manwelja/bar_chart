const errorChecks() {

}
const calcBarWeight = function(lowerLimit, upperLimit)
{
  let span = upperLimit - lowerLimit;
  let weight = span / 100;

  return weight;
}
//Generate a bar chart using the items entered by the user
$(document).ready(function() {
  $("#btnChartMe").click(function(){

    let bBarChartTitle = $("#txtBarChartTitle").val();
    let bBarChartUpper = $("#txtBarUpperLimit").val();
    let bBarChartLower = $("#txtBarLowerLimit").val();
    let tdLineFiller, trOpen, thLine, tdLine, tdBlankLine = "";
    let tableBody = $("#myChart tbody:last");

    if(bBarChartTitle === ""){
      alert("PLease enter a title for the bar chart.")
    }else if(bBarChartUpper === ""){
      alert("Please enter an upper limit for the bar chart");
    }else if(bBarChartLower === ""){
      alert("Please enter a lower limit for the bar chart")
    }else {
     // alert($("#myChart thDType").val())
     // $("#myChart thDType").val($("#txtBarDType").val());
      let barWeight = calcBarWeight($("#txtBarLowerLimit").val(), $("#txtBarUpperLimit").val())
      let arrTitleRange = $("#txtBarTitles").val().split(",");
      let arrValueRange = $("#txtBarValues").val().split(",");
      for(let y = 0; y < 100; y ++){
        tdLineFiller = tdLineFiller + "<td></td>";
      }
      tableBody.append("<tr style=visibility:collapse>" + tdLineFiller + "</tr>");



      //alert("here");
      for(let i=0; i < arrTitleRange.length;i++){
//        trOpen = "<tr class=bar colspan=" + arrValueRange[i] + $("#txtBarDType").val() + ">";
        trOpen = "<tr>";
        thLine = "<th class=sideTitle scope=row>" + arrTitleRange[i] + "</th>";
        tdLine = "<td class=bar colspan =" +  arrValueRange[i]/barWeight + ">" + arrValueRange[i] + "%</span></td>";
        if(arrValueRange[i] < bBarChartUpper){
          tdBlankLine = "<td colspan=" + ((bBarChartUpper-arrValueRange[i])/barWeight) + "></td></tr>";
        }else {
          tdBlankLine = "</tr>";
        }


        tableBody.append(trOpen + thLine + tdLine + tdBlankLine);

      }
    $("#txtBarTitles").val("");
    $("#txtBarValues").val("");
    }
  });
});


//Process user input for the bar chart
$(document).ready(function() {
  $("#btnAddItem").click(function(){

    let bTitle = $("#txtBarTitle").val();
    let bValue = $("#txtBarValue").val();
    let bTitleRange = $("#txtBarTitles").val();
    let bValueRange = $("#txtBarValues").val();

    if(flagFieldsValid === 'true')
    {
      if(bTitle === "" && bValue === ""){
        alert("Please enter values for both title and range value");
       }else if (bTitle === "" ){
        alert("Please enter values for title");
       }else if(bValue === ""){
        alert("Please enter values for range");
       }else if(isNaN(bValue)) {
        alert('The range value must be a number');
        $("#txtBarValue").val("");
      }else {
        if(bTitleRange === ""){
          $("#txtBarTitles").val(bTitle);
          $("#txtBarTitle").val("");
        }else {
          $("#txtBarTitles").val($("#txtBarTitles").val()  + "," + bTitle);
          $("#txtBarTitle").val("");
        }
        if(bValueRange === ""){
          $("#txtBarValues").val(bValue);
          $("#txtBarValue").val("");
        }else {
          $("#txtBarValues").val($("#txtBarValues").val()  + "," + bValue);
          $("#txtBarValue").val("");
        }
       }
    }

  });
});

//Reset the form
$(document).ready(function() {
  $("#btnResetAll").click(function(){
    let confirmAction = confirm("Are you sure to want to reset all of the bar chart values?");
    if (confirmAction) {
      $("#txtBarTitle").val("");
      $("#txtBarValue").val("");
      $("#txtBarTitles").val("");
      $("#txtBarValues").val("");
    }
  });
});


