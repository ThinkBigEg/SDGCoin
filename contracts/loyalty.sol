pragma solidity ^0.4.0;

contract loyalty {


    mapping (address => bool) loyaltyProvider;
    mapping (address => uint) lpBalance;
    mapping (address => bool) user;
    mapping (address => uint) userBalance;


    event Transfer(address from , address to , uint amount);

    modifier onlyLP(){
        require(loyaltyProvider[msg.sender] == true);
        _;
    }

    function lp2user(address userPK , string memory receipt_id, uint receipt_price ) public onlyLP{
        require(user[userPK] == true);
        lpBalance[msg.sender] += receipt_price;
        userBalance[userPK] += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }



}
