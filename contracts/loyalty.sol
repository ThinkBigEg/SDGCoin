pragma solidity >=0.4.21 <0.6.0;

contract loyalty {

    struct loyaltyProviderProfile{
        uint curr_perc;
        uint loyalty_created;
        uint loyalty_paid;
    }

    mapping (address => loyaltyProviderProfile) lpProfile;
    mapping (address => bool) loyaltyProvider;

    mapping (address => bool) user;


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
    //who creates LP?
    function create_lp(address lpPK, uint curr_perc ) public{
        loyaltyProvider[lpPK] = true;
        lpProfile[lpPK].curr_perc = curr_perc;
        lpProfile[lpPK].loyalty_created = 0;
        lpProfile[lpPK].loyalty_paid = 0;
    }

    function get_lp_profile_perc(address lpPK) public returns(uint){
        return lpProfile[lpPK].curr_perc;
    }

    function get_lp_profile_created(address lpPK) public returns(uint){
        return lpProfile[lpPK].loyalty_created;
    }

    function get_lp_profile_paid(address lpPK) public returns(uint){
        return lpProfile[lpPK].loyalty_paid;
    }

    function lp2user(address userPK , string memory receipt_id, uint receipt_price ) public onlyLP{
        require(user[userPK] == true);
        lpProfile[msg.sender].loyalty_created += receipt_price;
        userProfile[userPK].loyalty_recv += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }

    function user2hc(address hcPK , uint amount) public onlyUser onlyHC(hcPK){
        require(userBalance[msg.sender] >= amount);

        userBalance[msg.sender] -= amount;
        hcBalance[hcPK] += amount;

        emit Transfer(msg.sender , hcPK , amount);
    }


}
