$(document).ready(function (){

    let amenities = []
    let amenities_id = []
   let elements =  $(".special")
   for (elem of elements) {
    let name = $(elem).attr("data-name");
    let id = $(elem).attr("data-id");
    $(elem).change(function(){
        if (this.checked)
        {
            amenities_id.push(id)
            amenities.push(name);
            $(".amenities h4").text(amenities.join())
        }
        else
        {
            let index = amenities.indexOf(name);
            amenities.splice(index, 1);
            amenities_id.splice(index, 1);
            $(".amenities h4").text(amenities.join())
        }
    })
   }
    // let amenities = []
    // let amenities_id = []
    let cities_id = []
    let elem_cities = []
    let cities =  $(".city")
    for (elem of cities) {
     let name = $(elem).attr("data-name");
     let a_id = $(elem).attr("data-id");
     $(elem).change(function(){
         if (this.checked)
         {
             cities_id.push(a_id)
             elem_cities.push(name)
             // amenities.push(name);
            $(".locations h4").text(elem_cities.join())
         }
         else
         {
             let index = elem_cities.indexOf(name);
             elem_cities.splice(index, 1);
             cities_id.splice(index, 1)
            $(".locations h4").text(elem_cities.join())
         }
     })
    }  
    
    
    let states_id = []
    let elem_states = []
    let states =  $(".state")
    for (elem of states) {
     let name = $(elem).attr("data-name");
     let a_id = $(elem).attr("data-id");
     $(elem).change(function(){
         if (this.checked)
         {
             states_id.push(a_id)
             elem_states.push(name)
             // amenities.push(name);
            $(".locations h4").text(elem_states.join())
         }
         else
         {
             let index = elem_states.indexOf(name);
             elem_states.splice(index, 1);
             states_id.splice(index, 1)
            $(".locations h4").text(elem_states.join())
         }
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
        alert(err);
    }
});


function getData(ajaxurl) { 
    return $.ajax({
      url: ajaxurl,
      type: 'GET',
    });
  };
  
  async function AData(ajxurl) {
    try {
      const res = await getData(ajxurl)
      console.log(res)
    } catch(err) {
      console.log(err);
    }
  }
// function get_search(){
    $('button').click(()=>{
        console.log("Send ids", amenities_id);
        let reviews = "";
        $.ajax({
            // url: "http://0.0.0.0:5001/api/v1/places/" +d.id+"/reviews",
            type:"POST",
            url:"http://0.0.0.0:5001/api/v1/places_search/",
            data:JSON.stringify({"amenities": amenities_id, "cities":cities_id,"states":states_id}),
            contentType: "application/json",
            success:  (data)=>{
                // console.log(data)
                $(".places").html("");
                
                for (let d of data){
                    let rev = [];
                    reviews = "<div class='reviews'><h2>3 Reviews</h2><ul>";
                    let resp =  $.get("http://0.0.0.0:5001/api/v1/places/" +d.id+"/reviews", function(da, err){
                         rev = da;
                            if (rev.length) {
                                //console.log("Are you here>")
                                for (let i of rev) {
                                    let Us;
                                    let user = $.get("http://0.0.0.0:5001/api/v1//users/" + i.user_id , (u, err) =>{
                                    Us = u
                                    
                                   
                                    console.log(user.responseText)
                                    reviews = reviews +  "<li><h3>" + Us.first_name + " </h3><p>"  + i.text+ "</li> " 
                                
                                reviews = reviews + "</ul> </div>";
                  
                       
                    console.log(reviews);

    
                  
                    $(".places").append("<article><div class='title_box'><h2>"+ 
                    d.name+"</h2><div class='price_by_night'>"+ 
                    d.price_by_night +"</div></div><div class='information'><div class='max_guest'>" + d.max_guest + "Guest" + (d.max_guest > 1 ? "s": "") +
                    "</div><div class='number_rooms'>" + d.number_rooms + "Bedroom" + (d.number_rooms != 1 ? "s": "") + 
                    "</div><div class='number_bathrooms'>" + d.number_bathrooms + "Bathroom" + 
                    (d.number_bathrooms != 1 ?"s": "") + "</div>" + 
                   "</div>"  + reviews + 
                   "</div></article>")
                   
                })
            }
            reviews = "";
                }
            })
                }
            },
            error:(err)=>{console.log(err);
            }
        })
    })
})