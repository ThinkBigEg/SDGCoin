
var serverIP = "34.74.167.90";

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
                html_str += '<ul class="nav"><div><li><a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["name"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["location"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["pk"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["description"] + '</a>';
                html_str += '<br>';
                html_str += '</li></div></ul>';
                html_str += '</div>';

            }
            $("#FPlist").append(html_str);
        }
    });
})

$(document).on('ready', function () {

    var FPKey = document.getElementById("ItemPK").nodeValue;
    $.ajax({
        dataType: "json",
        url: "http://" + serverIP + ":5000/app/get/"+FPKey,
        success: function (data) {
            
            var html_str = "";
            for (idx in data["res"]) {

                html_str += '<div class="profile-usermenu">';
                html_str += '<ul class="nav"><div><li><a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["name"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["location"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["pk"] + '</a>';
                html_str += '<br>';
                html_str += '<a href="#"><i class="glyphicon glyphicon-star"></i>' + data["res"][idx]["description"] + '</a>';
                html_str += '<br>';
                html_str += '</li></div></ul>';
                html_str += '</div>';
                html_str += '<div class="profile-userbuttons"><button type="submit" id="addqnt" class="btn btn-primary" onclick="IncreaseQnt()">ADD</button></div>'
                html_str += '<div class="profile-userbuttons"><label type="submit" id="qnt" class="form-control">Quantity</label></div>'
            }
            $("#FPlist").append(html_str);
        }
    });
})

function IncreaseQnt(){
    var temp=0;
    temp +=1;
    document.getElementById("qnt").innerHTML += temp;
}