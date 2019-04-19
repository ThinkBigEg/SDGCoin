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

        var user_pk = document.getElementById("USRPK").value;
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

        var fp_pk = document.getElementById("FPPK").value;
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
                instance.hc2fp(fp_pk, amount, {from: account});
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

