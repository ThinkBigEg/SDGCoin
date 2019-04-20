var serverIP = "34.74.53.56";

$(document).on('ready', function () {
    $.ajax({
        dataType: "json",
        url: "http://" + serverIP + ":5000/app/get/hc",
        success: function (data) {

            var html_str = "";
            for (idx in data["res"]) {
                html_str += '<div class="profile-usermenu">';
                html_str += '<ul class="nav"><div><li><a href="HungerCenter.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["name"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="HungerCenter.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["location"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="HungerCenter.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["pk"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="HungerCenter.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["description"] + '</a>';
                html_str += '<br>';
                html_str += '</li></div></ul>';
                html_str += '</div>';
            }
            $("#hclist").append(html_str);
        }
    });
})
/*
$(document).on('click',"#register", function() {

    var name =  document.getElementById("name").value;
    var location =  document.getElementById("location").value;
    var desc =  document.getElementById("desc").value;
    var perc =  document.getElementById("perc").value;
    var pk = document.getElementById("PK").value;
    alert("Done");
    $.ajax({
        dataType: "json",
        url: "http://"+serverIP+":5000/app/register/lp/"+pk+"/"+name+"/"+desc+"/"+location+"/"+perc+"/",
        success: function (data) {
            alert("Success");
            console.log(data);
        }
        
    });
})*/
/*
$("#Hregister").on('click', function() {

    var name =  document.getElementById("Hname").value;
    var location =  document.getElementById("Hlocation").value;
    var desc =  document.getElementById("Hdesc").value;
    var pk = document.getElementById("HPK").value;
    alert("Done");
    $.ajax({
        dataType: "json",
        url: "http://"+serverIP+":5000/app/register/hc/"+pk+"/"+name+"/"+desc+"/"+location,
        success: function (data) {
            alert(data);
            console.log(data);
        }
    });
})
*/


$(document).on('ready', function () {

    $.ajax({
        dataType: "json",
        url: "http://" + serverIP + ":5000/app/get/fp",
        success: function (data) {
            
            var html_str = "";
            for (idx in data["res"]) {
                html_str += '<div class="profile-usermenu">';
                html_str += '<ul class="nav"><div><li><a href="FPMenu.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["name"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="FPMenu.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["location"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="FPMenu.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["pk"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="FPMenu.html"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["description"] + '</a>';
                html_str += '<br>';
                html_str += '</li></div></ul>';
                html_str += '</div>';
            }
            $("#FPlist").append(html_str);
        }
    });
})




$(document).on('ready', function () {

    pk="121212";

    //"fp_pk":
    //"iid": "1"
    //"itype"
    //"n": 1,
    //"iavailability": "True"

    //var FPKey = document.getElementById("ItemPK").nodeValue;
    $.ajax({
        dataType: "json",
        url: "http://" + serverIP + ":5000/app/fp_menu_items/get/"+pk,
        success: function (data) {
            var html_str = "";
            for (idx in data["res"]) {
                alert(data['res'][idx]);

                html_str += '<div class="profile-usermenu">';
                html_str += '<ul class="nav">';                
                html_str += '<div><li><a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["iname"] + '</a> <br/>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["idesc"] + '</a> <br/>';
                html_str += '<a href="#" id="iprice'+idx+'">' + data["res"][idx]["price"] + '</a> <br/>';
                html_str += '</li></div></ul>';
                html_str += '</div>';

                html_str += '<div class="profile-userbuttons"><label id="qnt'+idx+'" class="form-control">0</label></div>';
                html_str += '<div class="profile-userbuttons"><button type="submit" id="addqnt" class="btn btn-primary" onclick="IncreaseQnt('+idx+')">ADD</button></div>';
            }
            $("#FPMenu").append(html_str);
        }
    });
})


function IncreaseQnt(idx){
    //incraese qty by 1
    var temp= parseInt(document.getElementById("qnt"+idx).textContent);
    temp +=1;
    document.getElementById("qnt"+idx).textContent = temp;

    // increase order price
    var itm_price = parseFloat(document.getElementById("iprice"+idx).innerHTML);
    total_amt = parseInt(document.getElementById("totalamnt").textContent) + itm_price
    document.getElementById("totalamnt").textContent = total_amt
}