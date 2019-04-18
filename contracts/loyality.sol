pragma solidity ^0.4.0;

contract loyality {
    /*function loyality(){

    }*/
    mapping (address => uint) userBalance;
    mapping (address => uint) hcBalance;
    mapping (address => bool) user;
    mapping (address => bool) hc;

    event Transfer(address from, address to, uint value);
    modifier onlyUser(){
        require(user[msg.sender] == true);
    }

    function user_to_hc(address hc_address , uint amount) public only_user(){
        require(user_tokens[msg.sender] < amount);

        user_tokens[msg.sender] -= amount;
        hc_tokens[hc_address] +=amount;

        emit Transfer(msg.sender , hc_address , amount);
    }
}
