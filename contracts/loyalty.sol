pragma solidity >=0.4.21 <0.6.0;

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
        _;
    }

    modifier onlyHC(address hcPK){
        require(hungerCenter[hcPK] == true);
        _;
    }

    function lp2user(address userPK , string memory receipt_id, uint receipt_price ) public onlyLP{
        require(user[userPK] == true);
        lpBalance[msg.sender] += receipt_price;
        userBalance[userPK] += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }

    function user2hc(address hcPK , uint amount) public onlyUser onlyHC(hcPK){
        require(userBalance[msg.sender] >= amount);

        userBalance[msg.sender] -= amount;
        hcBalance[hcPK] += amount;

        emit Transfer(msg.sender , hcPK , amount);
    }


}
