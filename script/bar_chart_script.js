//helper function to detect missing input items
const barChartParamsMissing = function() {
  let txtBarChartTitle = $("#txtBarChartTitle").val();
  let txtBarChartUpper = $("#txtBarUpperLimit").val();
  let txtBarChartLower = $("#txtBarLowerLimit").val();
  let txtBarDType = $("#txtBarDType").val();

  const arrMissingItems = [];
  let errorFlag = false;
  if(txtBarChartTitle === ""){
    arrMissingItems.push("title");
    errorFlag=true;
  }
  if(txtBarChartUpper === ""){
    arrMissingItems.push("upper limit");
    errorFlag=true;
  }
  if(txtBarChartLower === ""){
    arrMissingItems.push("lower limit");
    errorFlag=true;
  }
  if(txtBarDType === ""){
    arrMissingItems.push("data type");
    errorFlag=true;
  }
  if(errorFlag){
    alert("Please enter the following items: \n\n" + arrMissingItems.join(", "));
  }
  return errorFlag;
}

//helper function to detect error in input for bar chart table
const barChartTableParamsMissing = function() {

  let bTitle = $("#txtBarTitle").val();
  let bValue = $("#txtBarValue").val();
  const arrMissingItems = [];
  let errorFlag = false;

  if (bTitle === "" ){
    arrMissingItems.push(bTitle);
    errorFlag=true;
  }
  if(bValue === ""){
    arrMissingItems.push(bTitle);
    errorFlag=true;
  }
  if(errorFlag){
    alert("Please enter the following items: \n\n" + arrMissingItems.join(", "));
  }
  return errorFlag;


}
//helper function - error check to ensure value entered is not < lower or > upper limits

const upperLowerLimitError = function() {
  let txtValue = $("#txtBarValue").val();
  let txtBarChartUpper = $("#txtBarUpperLimit").val();
  let txtBarChartLower = $("#txtBarLowerLimit").val();
  let errorFlag = false;

  if(txtValue < txtBarLowerLimit) {
    errorFLag = true;
    alert("The bar value must be greater than the lower limit of the chart.")
  }if(txtValue > txtBarLowerLimit) {
    errorFLag = true;
    alert("The bar value must be lower than the upper limit of the chart.")
  }
  return errorFlag;
}

//calculate the width of each table column
const calcBarWeight = function(lowerLimit, upperLimit)
{
  let span = upperLimit - lowerLimit;
  let weight = span / 300;

  return weight;
}


//Generate a bar chart using the items entered by the user
$(document).ready(function() {
  $("#btnChartMe").click(function(){
    let tdLineFiller = "", trOpen= "", thLine = "", tdLine = "", tdBlankLine = "", barWeight = "";
    let txtBarChartTitle = $("#txtBarChartTitle").val();
    let txtBarChartUpper = $("#txtBarUpperLimit").val();
    let txtBarChartLower = $("#txtBarLowerLimit").val();
    let txtBarDType = $("#txtBarDType").val();

    let tableBody = $("#myChart tbody:last");
    let tableRows = 0, prevHeight = 0, divInterval = 0, gridCount = 0;

    barWeight = calcBarWeight($("#txtBarLowerLimit").val(), $("#txtBarUpperLimit").val())

    const arrTitleRange = $("#txtBarTitles").val().split(",");
    const arrValueRange = $("#txtBarValues").val().split(",");

    tableRows = arrValueRange + 1;
    tdLine = "<tr height=300px><th id=gridTh>";
    let divText = txtBarChartUpper;
    for(let y = 1;y < 6 ; y++) {

        divText -= divInterval;
        divInterval = (txtBarChartUpper - txtBarChartLower) / 5;
        let divHeight = 300/5;

        tdLine+= "<div style = \"height: " + divHeight + "px\">" + divText + "</div>";
    }
    tdLine += "</th>"


    for(let i=0; i < arrTitleRange.length;i++){

      if(i < 10){
        gridCount = i;
      }else {
        gridCount = i - 10;
      }
      tdLine += "<td id=gridTd><div id=gridDiv" + gridCount + " style = \"height: " +  arrValueRange[i]/barWeight + "px;\">" + arrValueRange[i] + txtBarDType + "</div></td>";
    }
    tdLine += "</tr>";
    tableBody.append(tdLine);

    thLine = "<tr><td>values</td>";
    for(let i = 0; i < arrTitleRange.length; i++){
      thLine += "<td>" + arrTitleRange[i] + "</td>";
    }
    thLine += "</tr>";
    tableBody.append(thLine);
  });
});


//Append new bar chart items to ones already entered
$(document).ready(function() {
  $("#btnAddItem").click(function(){

    let bTitle = $("#txtBarTitle").val();
    let bValue = $("#txtBarValue").val();
    let bTitleRange = $("#txtBarTitles").val();
    let bValueRange = $("#txtBarValues").val();


    if(!barChartTableParamsMissing() && !upperLowerLimitError()){

      if(isNaN(bValue)) {
        alert('The range value must be a number');
        //$("#txtBarValue").val("");
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


