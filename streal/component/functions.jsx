import React, {useContext, useState} from 'react'
import { StrealContext } from '../pages';

const functions = () => {
    const {
        title,
        // this function should be called in a button first
      //-----> hover your mouse above each function to understand how to pass parameters to these functions in your components
      // helper functions
      getVotes,
      airdroppedAddress,
      getTokenType,
      getToken,
      getUserData,
      returnAllowance,
      returnBalance,
      returnAountToMint,
      returnCollateralUSDvalue,
      returnMintedStreal,
      getUSDvalue,
      balanceOfAtSnapshot,

      // main functions 
      airdropUsers,
      burnForCommerce,
      burnFrom,
      increaseAllowance,
      mintForCommerce,
      redeemCollateralForStreal,
      decreaseAllowance,
      depositCollateralAndMintStreal,
      depositStrealAndGetToken,
      mintReward,
      transfer,
      vote,
      transferOwnership,
      withdraw,
      snapshot,
      approval,
      // wallet connect button
      walletConnect,
      setAirdropTime,

    } = useContext(StrealContext);

    

    /*
        this is how you'll call the airdropUsers and mintReward functions, otherwise you'll get an error, it only accept an array of addresses and corresponding values.

        these recipients and values will be passed dynamically by a logic, if users do some particular task, we can save their rewards and addresses respectively in an array and then pass it as params to these functions marked with (//<>)


        const recipients = ["0xRecipient1", "0xRecipient2"]; 
        const values = ["value1", "value2"];


        // Call the airdropUsers function
        airdropUsers(recipients, values)
        .then(receipt => console.log(receipt))
        .catch(error => console.error(error));

            
    */

    // returnMintedStreal("0xB5E45bC8E119Fb3Ab8cfBC4F182Cc0150dE58C75")
  return (
    <div>
       <h4>
            {title}
        </h4> 
        <p>
            this part will demonstrate how the functions will be used along side their params
        </p>
       <div>

        
       <button onClick={() =>depositStrealAndGetToken(20, "0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0" )}>deposit streal</button>
       <button onClick={() =>returnCollateralUSDvalue("0x39b165389b3a0A810843376867Cced4564fA9F69" )}>collateral value</button>
       <button onClick={() =>redeemCollateralForStreal("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0",100 )}>redeem collateral</button>
        
       </div>

       <div>

       
       
       <button onClick={() => 
            depositCollateralAndMintStreal("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0", "0x673cc67E86aFc8fc84Fa5CB5197720169f495190", 300)}
            >
            mint Streal
        </button>


       <button onClick={() => 
            airdropUsers(["0x39b165389b3a0A810843376867Cced4564fA9F69", "0xd320cb4a09b1Fb75bD4557C2D9f2767aD72D0F3b"], ["300", "350"])}
            >
            air drop
        </button>
    
       <button onClick={() => 
            mintReward(["0x39b165389b3a0A810843376867Cced4564fA9F69", "0xd320cb4a09b1Fb75bD4557C2D9f2767aD72D0F3b"], ["300", "350"])}
            >
            mint reward
        </button>
    
       <button onClick={() => 
             snapshot()}
            >
            Snap shot
        </button>
       <button onClick={() => 
             setAirdropTime()}
            >
            set airdrop time
        </button>
       <button onClick={() => 
             withdraw()}
            >
            withdraw collateral
        </button>
       <button onClick={() => 
             balanceOfAtSnapshot("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            Snap shot balance
        </button>
       <button onClick={() => 
             getUserData("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            user data
        </button>
       </div>

    </div>
  )
}

export default functions