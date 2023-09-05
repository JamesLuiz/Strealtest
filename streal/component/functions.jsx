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
      setAirdropTime,
      setStrealValue,
      setCDS,
      MintForOthers,
      setStreal,
      WithdrawFromVault,
      totalDeposited,
      getBalance,
      // wallet connect button
      walletConnect,

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
       <button onClick={() =>totalDeposited("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0" )}>collateral value in vault</button>
       <button onClick={() =>getBalance("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0")}>Get total stock balance</button>
       <button onClick={()=> returnMintedStreal("0x39b165389b3a0A810843376867Cced4564fA9F69")}>minted Streal</button>
        
       </div>

       <div>

       
       
       <button onClick={() => 
            depositCollateralAndMintStreal("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0",'0x04BFd6ebd5fb98131442DaF38CdECec7c76E9789', 300)}
            >
            mint Streal
        </button>


       <button onClick={() => 
            setStreal("0x04BFd6ebd5fb98131442DaF38CdECec7c76E9789")}
            >
            Set Streal address
        </button>
    
       <button onClick={() => 
            setStrealValue(5)}
            >
            set streal value
        </button>
    
       <button onClick={() => 
             snapshot()}
            >
            Snap shot
        </button>
       <button onClick={() => 
             setAirdropTime("180", "20")}
            >
            set airdrop time
        </button>
       <button onClick={() => 
             setCDS("0x285B84AcB1B237cE2d3a3bB6bf4997c0db63bd71")}
            >
            set CDS contract
        </button>
       <button onClick={() => 
             WithdrawFromVault("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0", 300)}
            >
            withdraw collateral from vault
        </button>
       <button onClick={() => 
             MintForOthers("0x04BFd6ebd5fb98131442DaF38CdECec7c76E9789", "0xB5E45bC8E119Fb3Ab8cfBC4F182Cc0150dE58C75", "0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0", 300)}
            >
            Buy Stock from profile
        </button>
       <button onClick={() => 
             getUserData("0xB5E45bC8E119Fb3Ab8cfBC4F182Cc0150dE58C75")}
            >
            user data
        </button>
       </div>

    </div>
  )
}

export default functions