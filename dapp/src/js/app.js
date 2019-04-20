
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


App = { //app is equal to big object
    web3Provider: null,
    contracts: {},

    init: function () {
        console.log("App Initialized...");
        return App.initWeb3();
    },

    initWeb3: function() {

        if (window.ethereum) {
            const ethereum = window.ethereum
            App.web3Provider = new Web3(ethereum)
        }
        ethereum.enable().then((account) => {
            App.web3Provider.eth.defaultAccount = account[0]
        });
        return App.initContract();
    },

    initContract: function () {
        $.getJSON('loyalty.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            App.contracts.loyalty = TruffleContract(data);

            // Set the provider for our contract
            App.contracts.loyalty.setProvider(App.web3Provider.currentProvider);
            App.contracts.loyalty.defaults({from: App.web3Provider.eth.defaultAccount});
            App.contracts.loyalty.deployed().then(function (instance) {
                console.log("loyalty address : ", instance.address);
            });
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-user2hc', App.user2hc);
        $(document).on('click', '.btn-lp2user', App.lp2user);
        $(document).on('click', '.btn-hc2fp', App.hc2fp);
        $(document).on('click', '.btn-fp2lp', App.fp2lp);


    },

    user2hc: function(event){
        event.preventDefault();

        var hc_pk = document.getElementById("HCPK").value;
        var amount = document.getElementById("amount").value;

        console.log("here")
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            console.log(accounts)
            var account = accounts[0];
            App.contracts.loyalty.deployed().then(function (instance) {
                // Execute createIns as a transaction by sending account
                instance.user2hc(hc_pk, amount, {from: account});
                instance.Transfer().watch(function (err, res) {
                    if (!err) {
                        console.log(res);
                    }
                });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    lp2user: function(event){
        event.preventDefault();

        var user_pk = document.getElementById("UPK").value;
        var amount = document.getElementById("rece_price").value;

        console.log(user_pk, amount)
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            App.contracts.loyalty.deployed().then(function (instance) {
                // Execute createIns as a transaction by sending account
                instance.lp2user(user_pk, amount, {from: account});
                instance.Transfer().watch(function (err, res) {
                    if (!err) {
                        console.log(res);
                    }
                });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    hc2fp: function(event){
        event.preventDefault();

        //var fp_pk = document.getElementById("FPPK").value;
        //var amount = document.getElementById("amount").value;

        console.log("here")
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            App.contracts.loyalty.deployed().then(function (instance) {
                // Execute createIns as a transaction by sending account
                /*instance.hc2fp(fp_pk, amount, {from: account});
                instance.Transfer().watch(function (err, res) {
                      if (!err) {
                        console.log(res);
                    }
                });
            }).catch(function (err) {
                console.log(err.message);
            });*/

            instance.get_hc_loyalty_recv(function (err,value) {
                console.log(value);
                $("#loyalty_recieved").html("recieved:  " + value);
            });
        });
        });
    },

    fp2lp: function(event){
        event.preventDefault();

        var lp_pk = document.getElementById("LPPK").value;
        var amount = document.getElementById("amount").value;

        console.log("here")
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            console.log(accounts)
            var account = accounts[0];
            App.contracts.loyalty.deployed().then(function (instance) {
                // Execute createIns as a transaction by sending account
                instance.fp2lp(lp_pk, amount, {from: account});
                instance.Transfer().watch(function (err, res) {
                    if (!err) {
                        console.log(res);
                    }
                });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

};


//what this means is whenever the server loads the window we want to initialize our app (App.initWeb3).
$(document).ready(function () {
   App.init();
});

