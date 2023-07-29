import React, {useContext, useState} from 'react'
import { StrealContext } from '../pages';

const functions = () => {
    const {
        title,
        getUSDvalue,
        getVotes,
        getTokenType,
        getToken,
        getUserData,
        returnAllowance,
        returnBalance,
        returnAountToMint,
        returnCollateralUSDvalue,
        returnMintedStreal,
        airdropUsers, //<>
        approve,
        burnForCommerce,
        burnFrom,
        increaseAllowance,
        mintForCommerce,
        redeemCollateralForStreal,
        decreaseAllowance,
        depositCollateralAndMintStreal,
        depositStrealAndGetToken,
        mintReward, //<>
        transfer,
        vote,
        transferOwnership,
        withdraw,
        snapshot,
        balanceOfAtSnapshot

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
       <button onClick={() => 
             depositCollateralAndMintStreal("0xAcDe43b9E5f72a4F554D4346e69e8e7AC8F352f0",                            "0x41b9DB907DDf8c79e3E318e9EeE57CeFbb5cf403", 100)}
            >
            deposit
        </button>
       <button onClick={() => 
             returnMintedStreal("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            mintedStreal
        </button>
       <button onClick={() => 
             getUserData("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            User data
        </button>
       <button onClick={() => 
             snapshot()}
            >
            Snap shot
        </button>
       <button onClick={() => 
             balanceOfAtSnapshot("0x39b165389b3a0A810843376867Cced4564fA9F69")}
            >
            Snap shot balance
        </button>
       </div>

    </div>
  )
}

export default functions