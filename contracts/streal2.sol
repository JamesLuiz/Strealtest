// SPDX-License-Identifier: MIT
// hardhat local address 0x7b1111381c90b5Ff71C2859ef5dDC29EFFDDb85d
/*
 * @title DecentralizedStableCoin
 * @author James Luiz
 * Collateral: Exogenous
 * Minting (Stability Mechanism): Decentralized (Algorithmic)
 * Value (Relative Stability): Anchored (Pegged to USD)
 * Collateral Type: Crypto
 *
 * 
 */

 /*
 * @title StrealEngine
 * @author James Luiz
 * usdt testnet: 0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0
 * usdc testnet: 0xe9DcE89B076BA6107Bb64EF30678efec11939234
 * DAI testnet: 0xF14f9596430931E177469715c591513308244e8F

* streal address 0x23Ba406937C963781A64C42c3f75A36eE1462c86
 * Pricefeed address 
 * DAI: 0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046
 * USDC: 0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0
 * USDT: 0x92C09849638959196E976289418e5973CC96d645
 * The system is deisgned to be as minimal as possible, and have the tokens maintain a 1 token == $5 (usdc, usdt, dai, gold) peg at all times.
 * This is a stablecoin with the properties:
 * - Exegenously Collateralized
 * - Matic Pegged
 * - Algorithmically Stable
 *
 * It is similar to DAI if DAI had no governance, no fees, and was backed by only (usdc, usdt, dai, gold).
 * Our streal system is "overcollateralised", at no point should the value of all collateral <= the (usdc, usdt, dai, gold) backed value of Streal
 * @notice This contract is the core of the Decentralized Stablecoin system. It handles all the logic
 * for minting and redeeming Streal, as well as depositing and withdrawing collateral.
 * @notice This contract is based on the MakerDAO DSS system
 */




pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OracleLib, AggregatorV3Interface} from "./libraries/OracleLib.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Streal is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, AccessControl, ReentrancyGuard {
    // state variables
    address[] public _collateralTokens; 
    uint256 private constant Additional_Feed_Precision = 1e10;
    uint256 private constant Feed_Precision = 1e18;
    uint256 private constant Liquidation_threshold = 5;
    uint256 private constant Liquidation_Precision = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18;
    address[] public supportedTokens;
    address[] public priceFeedAddress;
    address[] public airdroppedAddresses;
    uint256 public airdrops = 100000000 * 1e18;
    uint256 private supply = 200000000 * 1e18;
    uint256 public airdropLockTime;
    uint256 public airdropLockTimeSet;
    
    

    // mappings
    // user -> amount
    mapping (address => uint256) public mintedStreal;
    // user -> token -> amount
    mapping (address => mapping(address => uint256)) public _collateralDeposited;
    // token adress -> chainlink pricefeed address
    mapping (address => address) public priceFeed;
    mapping(address => uint256) public votes;
    mapping(address => address) public hasVoted;
    mapping(address => uint256) public airdropTimes;
    mapping(address => bool) public airdroppedAddress; 
    

    // event
    event collateralDeposited(address indexed user, address indexed token, uint256 amount);
    event airdropped(address indexed user, uint256 amount);
    event redeemedCollateral(address indexed user, uint256 amount);
    event strealDeposited(address indexed user, uint256 amount);
    event withdrawal(address indexed user, uint256 amount);
    event voted(address indexed user);
    event mintRewards(address indexed recipients);


    // modifiers
    modifier allowedToken (address token) {
        require(priceFeed[token] != address(0), "invalid token");
        _;
    }

    modifier moreThanZero (uint256 amount) {
        require(amount > 0, "amount must be greater than zero");
        _;
    }




    constructor() ERC20("Streal", "Streal") {

         supportedTokens = [
            0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0, // usdt,
            0xe9DcE89B076BA6107Bb64EF30678efec11939234, // usdc,
            0xF14f9596430931E177469715c591513308244e8F // DAI
        ];

        priceFeedAddress = [
            0x92C09849638959196E976289418e5973CC96d645,
            0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0,
            0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046
        ];
        
        require(supportedTokens.length == priceFeedAddress.length); 

        for (uint i = 0; i < supportedTokens.length; i++) {
            priceFeed [supportedTokens[i]] = priceFeedAddress[i];
            _collateralTokens.push(supportedTokens[i]);
        } 

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, supply);
        supply -= airdrops;

    }

    // functions
    function depositCollateralAndMintStreal(
    address tokenCollateralAddress,
    uint256 amountCollateral 
    ) public  {
        depositCollateral(tokenCollateralAddress, amountCollateral);

        // Calculate the equivalent amount of Streal tokens to mint based on the collateral type
        uint256 equivalentAmountToMint = calculateEquivalentAmountToMint(tokenCollateralAddress, amountCollateral);
        uint256 amount = equivalentAmountToMint * 1e18;
        // Mint the calculated equivalent amount of Streal tokens
        mintStreal(amount);
    }

    

    function calculateEquivalentAmountToMint(address tokenCollateralAddress, uint256 amountCollateral) public view returns (uint256) {
        // Determine the decimal places based on the token type
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        uint256 strealPrice = 5 * 1e18;
        // Calculate the equivalent amount of Streal tokens based on the collateral value
        uint256 equivalentAmountToMint = (amount * (10**(18 - tokenDecimals))) / (strealPrice);
        return equivalentAmountToMint;
    }

    function getDecimals(address tokenAddress) internal view returns (uint8) {
        IERC20Metadata token = IERC20Metadata(tokenAddress);
        return token.decimals();

    }
    /// @notice Follows CEI
    /// @notice tokenCollateralAddress, address of token to deposit as collateral
    /// @notice amount of collteral to be deposited
    
    function depositCollateral (address tokenCollateralAddress, uint256 _amount) private moreThanZero(_amount) nonReentrant allowedToken(tokenCollateralAddress)
    {   uint8 decimals = getDecimals(tokenCollateralAddress);
        uint256 amount = _amount * (10**decimals);
        _collateralDeposited[msg.sender][tokenCollateralAddress] += amount;
        emit collateralDeposited(msg.sender, tokenCollateralAddress, amount );

        IERC20(tokenCollateralAddress).transferFrom(
            msg.sender, 
            address(this),
            amount
        );

    }

   function depositStrealAndGetToken(uint256 amountStreal, address tokenCollateralAddress) public {
        require(block.timestamp >= getUserStartTime(msg.sender)  + airdropLockTime, "time"); 
        require(!airdroppedAddress[msg.sender], "airdrop");
        // Determine the decimal places based on the token type
        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        // Calculate the equivalent amount of collateral tokens based on the Streal value
        uint256 equivalentAmountToReceive = amountStreal * 5 * (10 ** tokenDecimals);
        
        uint256 amountFee = equivalentAmountToReceive * 3 / 100;
        uint256 amountAfterFee = equivalentAmountToReceive - amountFee;
        
        uint256 leftOver = amountAfterFee / 10**tokenDecimals;
        // Ensure that the contract has enough of the desired token
        require(IERC20(tokenCollateralAddress).balanceOf(address(this)) >= equivalentAmountToReceive);
        // Deduct the Streal from the user's balance
        burnStreal(amountStreal * 1e18);
        _mint(owner(), amountStreal * 1e18);
        // Transfer the fee to the contract owner and the remaining amount to the user
        IERC20(tokenCollateralAddress).transfer(owner(), amountFee);
        IERC20(tokenCollateralAddress).transfer(msg.sender, amountAfterFee);
        emit strealDeposited(msg.sender, leftOver);
    }


    function redeemCollateralForStreal(
        address tokenCollateralAddress,
        uint256 amountCollateral
    ) public {
        require(block.timestamp >= getUserStartTime(msg.sender) + airdropLockTime, "time");
        require(!airdroppedAddress[msg.sender], "airdrop");

        uint8 tokenDecimals = getDecimals(tokenCollateralAddress);
        uint256 amount = amountCollateral * (10**tokenDecimals);
        uint256 strealToBurn = calculateEquivalentAmountToMint(tokenCollateralAddress, amountCollateral);
        uint256 _amount = strealToBurn * 1e18; 
        // Calculate the fee
        uint256 fee = amount * 5 / 100;

        // Ensure that the user has enough collateral deposited
        require(_collateralDeposited[msg.sender][tokenCollateralAddress] >= amount);
        // Deduct the collateral from the user's deposited collateral
        _collateralDeposited[msg.sender][tokenCollateralAddress] -= amount;
        // Deduct the fee from the collateral
        uint256 balances =  amount -= fee; 
        uint256 leftOver = balances / 10**tokenDecimals;
        uint256 contractBalance = IERC20(tokenCollateralAddress).balanceOf(address(this));
        require(contractBalance >= balances);
        // Transfer the collateral to the user
        bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, balances);

        require(success);
        IERC20(tokenCollateralAddress).transfer(owner(), fee);
       
        // Burn the Streal tokens
        burnStreal(_amount);
        emit redeemedCollateral(msg.sender, leftOver);
        
    }


    /* 
    @notice amountToMint the amount of streal to mint
    @notice check if they have more collateral value than the minimum threshHold
    */
    

    function mintStreal(uint256 amountToMint) private moreThanZero(amountToMint){
       mintedStreal[msg.sender] += amountToMint;
       bool minted = mint(msg.sender, amountToMint);
        require(minted);
    }
    

    // don't call this function directly or you'll lose money
    function burnStreal(uint256 _amountToBurn) private moreThanZero(_amountToBurn) nonReentrant {
        uint256 amountToBurn = _amountToBurn;
        _burnStreal(amountToBurn, msg.sender);
    }

    function _burnStreal(
        uint256 amountToBurn,
        address onBehalfOf
    ) private {
        mintedStreal[onBehalfOf] -= amountToBurn;
        burn(amountToBurn);
    }




      ////////////////////////////////////
     // internal and private Functions //
    ////////////////////////////////////
    function getAccountCollateralValueInUsd(address user) public view returns(uint256 totalCollateralValueInUsd) {
        for (uint256 i = 0; i < _collateralTokens.length; i++) {
            address token = _collateralTokens[i];
            uint256 amount = _collateralDeposited[user][token];
            totalCollateralValueInUsd += getUsdValue(token, amount);  // add the value instead of replacing it
        }
        return totalCollateralValueInUsd;
    }



    function _getAccountInfo(address user) public view returns(uint256 totalStrealMinted, uint256 collateralValueInUsd){
        totalStrealMinted = mintedStreal[user];
        collateralValueInUsd = getAccountCollateralValueInUsd(user);
    }

    //// @notice returns how close a user is to liquidation
    //// @notice if the user goes below ration, they'll be liquidated


    

    /////////////////////////////////////
    //public & external view Functions//
    ///////////////////////////////////

    

    function getUsdValue(address token, uint256 amount) public view returns(uint256){
        AggregatorV3Interface price_Feed = AggregatorV3Interface(priceFeed[token]);
        (, int256 price,,,) = price_Feed.latestRoundData();
        return ((uint256(price) * Additional_Feed_Precision) * amount) / Feed_Precision ;

    }


    function withdraw() public onlyOwner {
        for (uint i=0; i<supportedTokens.length; i++) {
            IERC20 token = IERC20(supportedTokens[i]);
            uint256 balances = token.balanceOf(address(this));
            if (balances > 0) {
                token.transfer(msg.sender, balances);
            }
            emit withdrawal(msg.sender, balances);
        }
       
    }

   function balance() public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](supportedTokens.length);
        
        for (uint i=0; i<supportedTokens.length; i++) {
            IERC20 token = IERC20(supportedTokens[i]);
            balances[i] = token.balanceOf(address(this));
        }

        return balances;
    }

    function snapshot() public onlyOwner { 
        _snapshot();
    }


    // 0x099fcF7Dd4819049bbAfF3C9dF3d490369513985

    function burn(uint256 _amount) public override{
        uint256 balances = balanceOf(msg.sender);
        
        require(_amount > 0);
        require (balances >= _amount, "burnable exceeds balance"); 
        super.burn(_amount);
    }

    function burnForCommerce(uint256 _amount) public  onlyOwner moreThanZero(_amount) nonReentrant {
        uint256 balances = balanceOf(msg.sender);
        require (balances >= _amount); 
        super.burn(_amount * 1e18);
    }


    function mint(address to, uint256 amount) internal nonReentrant returns (bool) {

        require (to != address(0), "invalid address");
        require (amount >= 0);
       _mint(to, amount);
       return true;
    }


    function mintForCommerce(address to, uint256 amount) public nonReentrant onlyOwner returns (bool) {

       to = msg.sender; 
        require (amount >= 0);
       _mint(to, amount * 1e18);
       return true;
    }

    // this funcion allows new tokens to be minted into the adddresss of various users as redwards
    function mintReward(address[] memory recipients, uint256[] memory amounts) public onlyOwner nonReentrant returns (bool) {
        require(recipients.length == amounts.length);

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];
            require(to != address(0));
            require(amount >= 0);
            emit mintRewards(recipients[i]);
            _mint(to, amount * 1e18);
        }
        return true;
    }


    // The following functions are overrides required by Solidity.
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);

    }


    function getUserStartTime(address user) public view returns (uint256) {
        if (airdroppedAddress[user]){
            // If the user is in the airdrop list, use the airdrop time
            return airdropTimes[user];
        } else {
            // If the user is not in the airdrop list, use the time when the airdropLockTime was set
            return airdropLockTimeSet;
        }
    }


   function setAirdropLockTime(uint256 _airdropLockTime) public onlyOwner {
        airdropLockTime = _airdropLockTime;
        airdropLockTimeSet = block.timestamp;
    }

    
    
    function airdrop(address[] memory recipients, uint256[] memory values) public onlyOwner nonReentrant returns (bool success) {
        require(recipients.length == values.length);

        uint256 totalValue = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0));
            totalValue += values[i];
        }

        require(totalValue <= airdrops);
 
        for (uint256 i = 0; i < recipients.length; i++) {
            transfer(recipients[i], values[i] * (10 ** 18));
            airdroppedAddresses.push(recipients[i]);
            airdroppedAddress[recipients[i]] = true;
            emit airdropped(recipients[i], values[i] * 1e18);
        }

        for (uint256 i = 0; i < recipients.length; i++) {
            airdropTimes[recipients[i]] = block.timestamp;
        }
        airdrops -= totalValue * 1e18;
        return true;
    }

    function vote(address candidate) public returns (bool success) {
        require(candidate != msg.sender);
        require(hasVoted[msg.sender] != candidate);
        votes[candidate] += 1;
        hasVoted[msg.sender] = candidate;
        emit voted(candidate);
        return true;
    }
}