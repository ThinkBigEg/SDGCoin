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

    mapping (address => bool) loyaltyProvider;
    mapping (address => loyaltyProviderProfile) lpProfile;

    mapping (address => bool) user;
    mapping (address => userProfile) userprofile;

    mapping (address => bool) hungerCenter;
    mapping (address => hungerCenterProfile) hcProfile;

    mapping (address => bool) foodProvider;
    mapping (address => foodProviderProfile) fpProfile;

    event Transfer(address from , address to , uint amount);

    modifier onlyLP(address lpPK){
        require(loyaltyProvider[lpPK] == true);
        _;
    }

    modifier onlyUser(address _userPK){
        require(user[_userPK] == true);
        _;
    }

    modifier onlyHC(address hcPK){
        require(hungerCenter[hcPK] == true);
        _;
    }

    modifier onlyFP(address _fpPK){
        require(foodProvider[_fpPK] == true);
        _;
    }

    function get_lp_profile_perc(address lpPK) public view returns(uint){
        return lpProfile[lpPK].curr_perc;
    }

    function get_lp_profile_created(address lpPK) public view returns(uint){
        return lpProfile[lpPK].loyalty_created;
    }

    function get_lp_profile_paid(address lpPK) public view returns(uint){
        return lpProfile[lpPK].loyalty_paid;
    }

    function get_user_loyalty_recv(address userPK) public view returns(uint){
        return userprofile[userPK].loyalty_rec;
    }

    function get_user_loyalty_spent(address userPK) public view returns(uint){
        return userprofile[userPK].loyalty_spent;
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

    function lp2user(address userPK , uint receipt_price ) public onlyLP(msg.sender) onlyUser(userPK){
        require(receipt_price != 0);
        lpProfile[msg.sender].loyalty_created += receipt_price;
        userprofile[userPK].loyalty_rec += receipt_price;

        emit Transfer(msg.sender , userPK , receipt_price);
    }

    function user2hc(address hcPK , uint amount) public onlyUser(msg.sender) onlyHC(hcPK){
        uint curr = userprofile[msg.sender].loyalty_rec - userprofile[msg.sender].loyalty_spent;
        require( amount != 0 && curr >= amount);
        userprofile[msg.sender].loyalty_spent += amount;
        hcProfile[hcPK].loyalty_recv += amount;

        emit Transfer(msg.sender , hcPK , amount);
    }

    function hc2fp(address fpPK, uint amount ) public onlyHC(msg.sender) onlyFP(fpPK){
        require(amount != 0);
        hcProfile[msg.sender].loyalty_spent += amount;
        fpProfile[fpPK].curr_loyalty += amount;

        emit Transfer(msg.sender,fpPK , amount);
    }

    function fp2lp(address lpPK , uint amount)public onlyFP(msg.sender) onlyLP(lpPK){
        require(amount != 0 && fpProfile[msg.sender].curr_loyalty >= amount);
        fpProfile[msg.sender].curr_loyalty -= amount;
        lpProfile[lpPK].loyalty_paid += amount;

        emit Transfer(msg.sender , lpPK , amount);
    }


}
