pragma solidity >=0.4.21 <0.6.0;

contract loyalty {

    struct loyaltyProviderProfile{
        uint curr_perc;
        uint loyalty_created;
        uint loyalty_paid;
    }

    struct userProfile{
        uint loyalty_rec;
        uint loyalty_spent;
    }

    struct hungerCenterProfile{
        uint loyalty_recv;
        uint loyalty_spent;
    }

    struct foodProviderProfile{
        uint curr_loyalty;
    }

    mapping (address => loyaltyProviderProfile) lpProfile;

    mapping (address => userProfile) userprofile;

    mapping (address => hungerCenterProfile) hcProfile;

    mapping (address => foodProviderProfile) fpProfile;

    event Transfer(address from , address to , uint amount);


    function get_lp_profile_perc(address lpPK) public view returns(uint){
        return lpProfile[lpPK].curr_perc;
    }

    function get_lp_profile_created(address lpPK) public view returns(uint){
        return lpProfile[lpPK].loyalty_created;
    }

    function get_lp_profile_paid(address lpPK) public view returns(uint){
        return lpProfile[lpPK].loyalty_paid;
    }

    function get_user_loyalty_recv() public view returns(uint){
        return userprofile[msg.sender].loyalty_rec;
    }

    function get_user_loyalty_spent() public view returns(uint){
        return userprofile[msg.sender].loyalty_spent;
    }

    function get_hc_loyalty_recv(address hcPK) public view returns(uint){
        return hcProfile[hcPK].loyalty_recv;
    }

    function get_hc_loyalty_spent(address hcPK) public view returns(uint){
        return hcProfile[hcPK].loyalty_spent;
    }

    function get_fp_curr_loyalty(address fpPK) public view returns(uint){
        return fpProfile[fpPK].curr_loyalty;
    }



    function lp2user(address userPK , uint receipt_price ) public{
        require(receipt_price != 0);
        lpProfile[msg.sender].loyalty_created += receipt_price;
        userprofile[userPK].loyalty_rec += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }

    function user2hc(address hcPK , uint amount) public {
        uint curr = userprofile[msg.sender].loyalty_rec - userprofile[msg.sender].loyalty_spent;
        require( amount != 0 && curr >= amount);
        userprofile[msg.sender].loyalty_spent += amount;
        hcProfile[hcPK].loyalty_recv += amount;

        emit Transfer(msg.sender , hcPK , amount);
    }

    function hc2fp(address fpPK, uint amount ) public {
        require(amount != 0);
        hcProfile[msg.sender].loyalty_spent += amount;
        fpProfile[fpPK].curr_loyalty += amount;

        emit Transfer(msg.sender,fpPK , amount);
    }

    function fp2lp(address lpPK , uint amount)public {
        require(amount != 0 && fpProfile[msg.sender].curr_loyalty >= amount);
        fpProfile[msg.sender].curr_loyalty -= amount;
        lpProfile[lpPK].loyalty_paid += amount;

        emit Transfer(msg.sender , lpPK , amount);
    }


}
