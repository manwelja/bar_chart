
//Generate a bar chart using the items entered by the user
$(document).ready(function() {
  $("#chartMe").click(function(){
    $("p").append("Some prepended text.");
    alert('here');
  });
});


//Process user input for the bar chart
$(document).ready(function() {
  $("#btnAddItem").click(function(){
    let bTitle = $("#txtBarTitle").val();
    let bValue = $("#txtBarValue").val();
    let bTitleRange = $("#txtBarTitles").val();
    let bValueRange = $("#txtBarValues").val();

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


