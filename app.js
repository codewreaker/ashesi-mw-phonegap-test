 $(function () {

     addReading();
     fetchData();


     function addReading() {
         $("body").on('click', '#saveReading', function () {
             var dataString;
             var reading = $("#meterReading").val();
             var meter = $("#selectedMeter option:selected").text();
             var dataString = 'opt=1&meterReading=' + reading + '&meter=' + meter;

             if (dataString != null) {
                 var obj = sendRequest(dataString);
                 if (obj.result == 1) {
                     $(".message").html('<a class="ui-shadow ui-btn ui-corner-all ui-btn-icon-left ">ADDED SUCCESSFULLY</a>');
                 } else {
                     $(".message").html('<a class="ui-shadow ui-btn ui-corner-all ui-btn-icon-left">FAILED</a>');
                 }
             } else {
                 alert("Please Fill All Fields");
             }
         });
     }

     function fetchData(){
            var obj = sendRequest("opt=2");
            var data = obj.data;
            var len = data.length;

            for(i=0;i<len;i++){
$("#meter-list").append('<label for="'+data[i].meter_id+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off"> '+data[i].meter_name+' | '+data[i].meter_reading+' lt</label><input type="checkbox" id="'+data[i].meter_id+'">'
                       );
            }
     }





     function sendRequest(dataString) {
         var obj = $.ajax({
             type: "POST",
             url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/mobile_web_server/water.php",
             data: dataString,
             async: false,
             cache: false
         });
         var result = $.parseJSON(obj.responseText);
         return result;
     }
 });
