$(document).ready(function (){

    let amenities = []
    let count = 0;
   let elements =  $(".special")
   for (elem of elements) {
    let name = $(elem).attr("data-name");
    $(elem).change(function(){
        if (this.checked)
        {
            amenities.push(name);
            $(".amenities h4").text(amenities.join())
        }
        else
        {
            let index = amenities.indexOf(name);
            amenities.splice(index, 1);
            $(".amenities h4").text(amenities.join())
        }
      
        
        // if (this.checked){
            
        //     let name = String($(this).attr("data-name"));
        //     alert("name is", name);
        //     amenities.push($(".amenities h4").append($(this).attr("data-name")))
        //    // $(".amenities h4").text(amenities.join(", "))
        //    alert(amenities.join())

        // }
        // else
        // {
            
        //     let index = amenities.indexOf($(this.attr("data-name")))
        //     alert(index);
        //     amenities.splice(index, 1)
        //     //$(".amenities h4").text(amenities.join(", "))
        //     alert(amenities.join())
        // }
    })
   }
   $.ajax({
    type: "GET",
    url: "http://0.0.0.0:5001/api/v1/status/",
    success: function (data) {
        if (data.status === "OK"){
           // alert(data.status)
            $("div#api_status").addClass("available")
        }
        else 
        {
          //  alert(data.status);
         //   alert("Class should be removed");
            $("div#api_status").removeClass("available")
        }
    },
    error: function (err) {
        // alert(err);
    }
})
})