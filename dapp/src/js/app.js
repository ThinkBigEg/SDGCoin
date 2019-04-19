App = { //app is equal to big object
    web3Provider: null,
    contracts: {},

    init: function () {
        console.log("App Initialized...");
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract(); //App.initContracts also works.
    },

    initContract: function () {
        $.getJSON('loyalty.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            App.contracts.loyalty = TruffleContract(data);

            // Set the provider for our contract
            App.contracts.loyalty.setProvider(App.web3Provider);

            App.contracts.loyalty.deployed().then(function (instance) {
                console.log("loyalty address : ", instance.address);
            });
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-user2hc', App.user2hc);
    },

    user2hc: function(event){
        event.preventDefault();
        var hc_pk = document.getElementById("HCPK").value;
        var amount = document.getElementById("amount").value;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
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

    changePage: function(){
        var Institution_Address = document.getElementById("InstAddress").value;
        localStorage.setItem('InstitutionAddress', Institution_Address);
    },

    backtrackPage: function(){
        App.contracts.Institution.getCreator(function (err,creator) {
            if(!err)
                localStorage.setItem('InstitutionAddress', creator);
        });
    },


};


//what this means is whenever the server loads the window we want to initialize our app (App.initWeb3).
$(document).ready(function () {
   if (window.location.pathname === "/Course.html") {

        $(function () {
            App.initCoursePg();
            console.log("App Course..");
        });

    }
    else {
        $(function () {
            App.initWeb3();
            console.log("App UserUI..");
        });
    }

});