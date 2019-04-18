pragma solidity ^0.4.0;

contract loyalty {


    mapping (address => bool) loyaltyProvider;
    mapping (address => uint) lpBalance;

    mapping (address => bool) user;
    mapping (address => uint) userBalance;


    mapping (address => bool) hungerCenter;
    mapping (address => uint) hcBalance;

    event Transfer(address from , address to , uint amount);

    modifier onlyLP(){
        require(loyaltyProvider[msg.sender] == true);
        _;
    }

    modifier onlyUser(){
        require(user[msg.sender] == true);
    }

    modifier onlyHC(address hcPK){
        require(hungerCenter[hcPK] == true);
    }

    function lp2user(address userPK , string memory receipt_id, uint receipt_price ) public onlyLP{
        require(user[userPK] == true);
        lpBalance[msg.sender] += receipt_price;
        userBalance[userPK] += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }

    function user2hc(address hcPK , uint amount) public onlyUser onlyHC{
        require(userBalance[msg.sender] >= amount);

        userBalance[msg.sender] -= amount;
        hcPK[hc_address] += amount;

        emit Transfer(msg.sender , hcPK , amount);
    }


}
