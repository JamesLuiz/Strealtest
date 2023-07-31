import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {
  strealAddress, strealAbi
} from '../../context/constant';


const fetchContract = (signerOrProvider) => new ethers.Contract(strealAddress, strealAbi, signerOrProvider)

export const StrealContext = React.createContext();



export const StrealProvider = ({children}) => {
  const [data, setAccounts] = useState("")
  const [name, setName] = useState("")
  const [balances, setBalance] = useState("")
  const [symbol, setSymbol] = useState("")
  const [airdrop, setAirdrop] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [collateralBalance, setCollateralBalance] = useState([]);
  const [USDC, setUSDC] = useState("");
  const [USDT, setUSDT] = useState("");
  const [DAI, setDAI] = useState("");
  //---> connecting wallet
  // moved connectWallet inside useEffect

  // ... other imports

    useEffect(() => {
      
      const connectWallet = async () => {
        try {
          if (!window.ethereum) return console.log("Install MetaMask");
          // if not connected, request connection
          if (!window.ethereum.isConnected()) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          // set the account in state
          setAccounts(address);
          console.log(address)
          
          // fetch the contract using signer
          const contract = fetchContract(signer);
          
          // here the name of the contract is fetched (assuming contract has a public `name` method)
          const contractName = await contract.name(); 
          setName(contractName);  // do something with the name

          const tokenBalance = await contract.balanceOf(address);
          const convert = tokenBalance/1e18;
          setBalance(convert);

          const xyz = await contract.symbol();
          setSymbol(xyz);

          const airdropBalance = await contract.airdrops();
          const math = airdropBalance/1e18;
          setAirdrop(math);

          const supply = await contract.totalSupply()
          let returnData = supply/1e18;
          setTotalSupply(returnData);

          // usdc balance
          const collateralDeposit = await contract.balance()
          setCollateralBalance([collateralDeposit].toString());
          const collatera_1 = collateralDeposit[1]/1e6;
          setUSDC(collatera_1);

          // usdt balance
          const collateral_2 = collateralDeposit[0]/1e6;
          setUSDT(collateral_2);

          // DAI balance
          const collateral_3 = collateralDeposit[2]/1e18;
          setDAI(collateral_3);
          
          
        } catch (error) {
          console.error("Failed to connect wallet and fetch contract", error);
        }
      };
      connectWallet();


      // listening for account change
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccounts(accounts[0]);
      });

    }, []);


  //-----> votes this function handles the vote counts
  const getVotes = async(_address) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const voteCount = await contract.votes(_address);
      const sum = voteCount.toString();
      setVotes(sum);
    }  
    } catch (error) {
      console.error("could not get vote count")
    }
    
   
  }

  //-----> this function returns the USD value of any token
  const [USDvalue, setUSDvalue] = useState('')
  const getUSDvalue = async(_tokenAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.getUsdValue(_tokenAddress, amount);
      const sum = data.toString();
      setUSDvalue(sum);
    }  
    } catch (error) {
      console.error("could not get vote count")
    }
    
   
  }
  //------> this function displays the token deposited by the user
  const [TokensDeposited , setTokenDeposited] = useState("")
  const getTokenType = async(userAddress, tokenAddress) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const token = await contract._collateralDeposited(userAddress, tokenAddress);
      const sum = token.toString();
      setTokenDeposited(sum);
    }  
    } catch (error) {
      console.error("could not fetch  collateral token")
    }
    
   
  };

  //-------->this function fetches all the supported collateral tokens from the _collateralTokens Array, just pass the indexNumber as params
  const [Tokens , setTokens] = useState("")
  const getToken = async(tokenIndex) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const token = await contract._collateralTokens(tokenIndex);
      
      setTokens(token);
    }  
    } catch (error) {
      console.error("could not get supported token, check your implementaion")
    }
    
   
  }

  //----> this function returns the amount the user minted and the usd Value equivalent
  const [userData , setUserData] = useState("")
  const [userDataUSDValue, setUserDataUSDValue] = useState("")
  const getUserData = async(addressUser) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract._getAccountInfo(addressUser);
      const sum = data[0]/1e18;

      const sum2=data[1]/1e6; 
      
      setUserData(sum);
      setUserDataUSDValue(sum2);
    }  
    } catch (error) {
      console.error("could not fetch user data")
    }
    
   
  }

  
  //----> this function returns the amount a user approves to be spent on his behalf by a third party
  const [allowance , setUserAllowance] = useState("")
  const returnAllowance = async(addressUser, addressSpender) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.allowance(addressUser, addressSpender); 
      const sum = data/1e18;
      setUserAllowance(sum);
    }  
    } catch (error) {
      console.error("could not fetch allowance")
    }
    
   
  }

  //----> this function returns balance of any address passed as params
  const [userBalance , setUserBalance] = useState("")
  const returnBalance = async(addressUser) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.balanceOf(addressUser); 
      const sum = data/1e18;
      setUserBalance(sum);
    }  
    } catch (error) {
      console.error("could not fetch balance")
    }
    
   
  }

  //----> this function returns amount of streal equivalent to collateral deposited
  const [ collateralAddress, setCollateralAddress] = useState("")
  const returnAountToMint= async(TokenAddress, amountTomint) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.calculateEquivalentAmountToMint(TokenAddress, amountTomint); 
      setCollateralAddress(data);
    }  
    } catch (error) {
      console.error("could not fetch amountEquivalent")
    }
  }


  //----> this function returns total amount of collateral deposited in USD
  const [ collateralInUSD, setCollateralInUSD] = useState("")
  const returnCollateralUSDvalue = async(adressUser) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.getAccountCollateralValueInUsd(adressUser);
      const sum = data.toNumber()
      const final = sum/1e6
      setCollateralInUSD(final);

    }  
    } catch (error) {
      console.error("could not fetch amountEquivalent")
    }
    
   
  }

  //-----> this function returns the amount of streal minted by a user
  const [ mintedStreal, setMintedStreal] = useState("")
  const returnMintedStreal = async(adressUser) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      const data = await contract.mintedStreal(adressUser);
      const sum = data/1e18 
      setMintedStreal(sum);
    }  
    } catch (error) {
      console.error("could not fetch amountEquivalent")
    }
    
   
  }


  //-----> thisfunction is called by the owner to airdrop users
  const [airdropDataAmount, setAirdropData] = useState("")
  const [airdropDataUser, setAirdropDataUser] = useState("")
  const airdropUsers = async(recipients, values) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      if (!Array.isArray(recipients) || !Array.isArray(values)) {
        throw new Error('Recipients and values must be arrays');
      }
    
      // Ensure recipients and values have the same length
      if (recipients.length !== values.length) {
        throw new Error('Recipients and values must have the same length');
      }
    
      // Call the airdrop function
      const tx = await contract.airdrop(recipients, values);
    
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      if (receipt) {
        console.log(receipt);
      }
      contract.on("airdropped", (recipient, _amount, event) => {
        setAirdropDataUser(recipient);
        let amount = _amount;
        const sum = amount/1e18;
        setAirdropData(sum)
        console.log("Recipient: ", recipient);
        console.log("Amount: ", amount.toString());
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
    
      // Return the transaction receipt
      return receipt;
    }  
    } catch (error) {
      console.error("could not airdrop check parameters!")
    }
  }

  // this function allows users to approve tokens to be spent on their behalf
  const [ApprovedAddress, setApprovedAddress] = useState("");
  const [ApprovedAmount, setApprovedAmount] = useState("")
  const [txHash, setTxHash] = useState("");

  const approval = async(spenderAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.approve(spenderAddress, amount * 1e18);
      const receipt = data.wait();
      contract.on("Approval", (_, spender, amount, event) => {
        setApprovedAddress(spender);
        setTxHash(event.transactionHash);
        const data = amount/1e18;
        setApprovedAmount(data);
        console.log("Recipient: ", spender);
        console.log("Amount: ", data);
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
    
      return receipt;
    }  
    } catch (error) {
      console.error("could not tranfer, check if your spender is approved");
    }
    
   
  }
  //-----> this function allows only yhe contract owner to burn specific amount of streal
  const burnForCommerce = async(amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.burnForCommerce(amount);
      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not burn, check parameters and make sure your're the owner of the contract")
    }
    
   
  }

  //-----> this function allows streal to be burned from other addresses
  const burnFrom = async(addressUser, _amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);
      
      const amount = _amount * 1e18;

      // call the approve function
      await contract.approve(addressUser, amount);
      const data = await contract.burnFrom(addressUser, amount);

      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not burn, resort to debug")
    }
    
   
  }


  // this function increases spender's allowance
  const increaseAllowance = async(addressUser, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.increaseAllowance(addressUser, amount *1e18); 
      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not burn, resort to debug")
    }
    
   
  }

  //-----> this function allow the owner to owner to mint streal an address
  const mintForCommerce = async(addressUser, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.mintForCommerce(addressUser, amount);
      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not mint to sender, check input");
    }
    
   
  }

  
  //--------> this funtion allow users to get their tokens back and burn the streal the hold from circulation.
  const [customerAddress, setCustomerAddress, ] = useState("")
  const [amountRedeemed, setAmountRedeemed] = useState("")
  const [txnHashRedeemedAmount, setTxnHashRedeemedAmount] = useState("")
  const redeemCollateralForStreal = async(tokenAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.redeemCollateralForStreal(tokenAddress, amount);
      const receipt = data.wait();
      contract.on("redeemedCollateral", (spender, amount, event) => {
        setCustomerAddress(spender);
        setTxnHashRedeemedAmount(event.transactionHash);
        const data = amount.toString();
        setAmountRedeemed(data);
        console.log("Recipient: ", spender);
        console.log("Amount: ", amount.toString());
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      return receipt;
    }  
    } catch (error) {
      console.error("could not redeem collateral, check input parameters");
    }
    
   
  }

  //------> this function decreases allowance of spender

  const decreaseAllowance = async(spenderAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.decreaseAllowance(spenderAddress, amount * 1e18);
      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not decrease allowance, check if your spender is approved");
    }
    
   
  }

  //-------> this function allows you to deposit collateral and mint Streal
  const [txHashForCollateralDeposit, setTxHashForCollateralDeposit] = useState("")
  const [ApprovedAmountCollateral, setApprovedAmountCollateral] = useState("")
  const depositCollateralAndMintStreal = async(tokenAddress,contractAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
    // Create a contract object for the token
      const tokenContract = new ethers.Contract(
      tokenAddress,
      [
          "function approve(address to, uint256 value) public returns(bool)",
          "function decimals() view returns(uint8)"
      ],
      signer
    );
    

      // Call the approve function on the token contract
      const approveTx = await tokenContract.approve(contractAddress, amount);

      // Wait for the transaction to be mined
      await approveTx.wait();

      console.log("Token approved successfully");


      const data = await contract.depositCollateralAndMintStreal(tokenAddress, amount);
      const receipt = data.wait();
      console.log(receipt)
      contract.on("collateralDeposited", (_, spender, amount, event) => {
        // Define and invoke an async IIFE
        (async () => {
            setTxHashForCollateralDeposit(event.transactionHash);
            const decimals = await tokenContract.decimals();
            const sum = amount/ 10**decimals;
            setApprovedAmountCollateral(sum.toString());
            console.log("Recipient: ", spender);
            console.log("Amount: ", sum.toString());
            console.log("Event transaction: ", event.transactionHash);
            console.log("Event block number: ", event.blockNumber);
        })().catch(console.error); // Catch and log any errors
      });
    
      return receipt;
      
    }  
    } catch (error) {
      console.error("could not deposit collateral to mint Streal, check your params");
    }
    
   
  }
  //-----> this function allows you to return your streal to the circulating supply and then get your collateral will be refunded - platform fee. NB>(for vendors and big accounts).
  const [depositor, setDepositor] = useState("")
  const [amountToreceive, setAmountToreceive] = useState("")
  const [depositTxHash, setDepositTxHash] = useState("")
  const depositStrealAndGetToken = async(amountStreal, TokenCollateralAddress) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.depositStrealAndGetToken(amountStreal, TokenCollateralAddress);
      const receipt = data.wait();
      contract.on("strealDeposited", (spender, amount, event) => {
        setDepositor(spender);
        setDepositTxHash(event.transactionHash);
        const data = amount.toString();
        setAmountToreceive(data);
        console.log("Recipient: ", spender);
        console.log("Amount: ", data);
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      return receipt;
    }  
    } catch (error) {
      console.error("could not deposit Streal, check input parameters");
    }
    
   
  }


  //------> this function allows the contract owner to mint reward to users
  const [recipientAddresses, setRecipientAddresses] = useState("")
  const [mintRewardTxHash, setMintRewardTxHash] = useState("")
  const mintReward = async(recipients, values) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      if (!Array.isArray(recipients) || !Array.isArray(values)) {
        throw new Error('Recipients and values must be arrays');
      }
    
      // Ensure recipients and values have the same length
      if (recipients.length !== values.length) {
        throw new Error('Recipients and values must have the same length');
      }
    
      // Call the airdrop function
      const tx = await contract.mintReward(recipients, values);
    
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      if (receipt) {
        console.log(receipt, "successful!");
      }

      contract.on("mintRewards", (spender, event) => {
        setRecipientAddresses(spender);
        setMintRewardTxHash(event.transactionHash);
        console.log("Recipient: ", spender);
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      // Return the transaction receipt
      return receipt;
    }  
    } catch (error) {
      console.error("could not mintReward check parameters!")
    }
  }

  //---> this function cand aid users transfer streal from their dashboard, they can also do it in their wallet
  const [transferRecipient, setTransferRecipient] = useState("")
  const [transferedAmount, setTransferedAmount] = useState("")
  const [transferTxHash, setTransferTxHash] = useState("")
  const transfer = async(spenderAddress, amount) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.transfer(spenderAddress, amount * 1e18);
      const receipt = data.wait();
      contract.on("Transfer", (_, spender, amount, event) => {
        setTransferRecipient(spender);
        setTransferTxHash(event.transactionHash);
        const data = amount/1e18;
        setTransferedAmount(data);
        console.log("Recipient: ", spender);
        console.log("Amount: ", amount.toString());
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      return receipt;
    }  
    } catch (error) {
      console.error("could not tranfer, check if your spender is approved");
    }
    
   
  }



  //---->  this function is for voting proposals made by the team, basically for feed back
  const [votedCandidate, setVotedCandidate] = useState("");
  const [voteTxHash, setVoteTxHash] = useState("")
  const vote = async(address1) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.vote(address1);
      const receipt = data.wait();
      contract.on("voted", (spender, event) => {
        setVotedCandidate(spender);
        setVoteTxHash(event.transactionHash);
        console.log("Recipient: ", spender);
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      return receipt;
    }  
    } catch (error) {
      console.error("could not vote, check your input");
    }
    
   
  }

  //----> this function allows the owner to transfer ownership to another address, in case of purchase or anything
  const [newOwner, setNewOwner] = useState("");
  const [OldOwner, setOldOwner] = useState("");
  const [txnHashForOwnerShip, setTxnHashForOwnerShip] = useState("")
  const transferOwnership = async(address2) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.transferOwnership(address2);
      const receipt = data.wait();
      contract.on("OwnershipTransferred", (oldOwner, recipient, event) => {
        setNewOwner(recipient);
        setOldOwner(oldOwner)
        setTxnHashForOwnerShip(event.transactionHash);
        console.log("Recipient: ", recipient);
        console.log("Event transaction: ", event.transactionHash);
        console.log("Event block number: ", event.blockNumber);
      });
      return receipt;
    }  
    } catch (error) {
      console.error("could not vote, check your input");
    }
    
   
  }

  //----> this function is called by token owner to withdraw collateral balances
  const withdraw = async() => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.withdraw();
      const receipt = data.wait();
      return receipt;
    }  
    } catch (error) {
      console.error("could not withdraw");
    }
    
   
  }

  //----> this function takes the snapshot of all balances at a point tin time, could be helpful at airdrops.
  const [snapShotID, setSnapShotID] = useState("")
  const snapshot = async() => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);


      // call the approve function
      const data = await contract.snapshot();
      contract.on("Snapshot", (snapshotId, event) => {
        const ID = snapshotId.toString();
        console.log(`Snapshot ID: ${ID}`);
        console.log(`Block number: ${event.blockNumber}`);
        console.log(`Address that triggered the event: ${event.address}`);
        setSnapShotID(ID)
      });
      const receipt = data.wait();
      return receipt;

      // Assume 'contract' is the instance of your ERC20Snapshot contract.


    }  
    } catch (error) {
      console.error("could not snapshot, you're not the contract owner!");
    }
    
   
  }


  //-----> this function returns balances snapshot at the current time
  const [snappedBalance, setSnappedBalance] = useState("")
  const balanceOfAtSnapshot = async(address3) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.balanceOfAt(address3, snapShotID);
      const sum = data/1e18;
      setSnappedBalance(sum);
    }  
    } catch (error) {
      console.error("could not return snapshot balance!");
    }
    
   
  }


  const [airdroppedAddresses, setAirdroppedAddresses] = useState([])
  const airdroppedAddress = async(address3) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.airdroppedAddresses();
      
      setAirdroppedAddresses(data);
    }  
    } catch (error) {
      console.error("could not return snapshot balance!");
    }
    
   
  }

  //----> this function sets time to redeem collateral, airdrops 
  const setAirdropTime = async(address3) => {
    
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      // if not connected, request connection
      if (window.ethereum.isConnected()) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address)
      
      // fetch the contract using signer
      const contract = fetchContract(signer);

      // call the approve function
      const data = await contract.setAirdropLockTime();
      
    }  
    } catch (error) {
      console.error("could not return snapshot balance!");
    }
    
   
  }

  



  const title = "hello functions"
  return (
    <StrealContext.Provider value={{
      //----> fuctions exports
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
      setAirdropTime,

      //-----> data returned from helper functions
      TokensDeposited,
      userData,
      userDataUSDValue,
      Tokens,
      allowance,
      userBalance,
      collateralAddress,
      collateralInUSD,
      mintedStreal,
      USDvalue,
      airdroppedAddresses,

      // snapshot function return data
      snappedBalance,

      // airdrop function returnData
      airdropDataAmount,
      airdropDataUser,

      // approve function return data
      txHash,
      ApprovedAmount,
      ApprovedAddress,

      // returned data for depositCollateralAndMintStreal function
      txHashForCollateralDeposit,
      ApprovedAmountCollateral,

      // return data for transfer function
      transferRecipient,
      transferedAmount,
      transferTxHash,

      // vote data
      votedCandidate,
      voteTxHash,

      // redeemCollateralForStreal return data
      customerAddress,
      amountRedeemed,
      txnHashRedeemedAmount,

      // transfer ownership return data
      newOwner,
      OldOwner,
      txnHashForOwnerShip,

      // mintReward returnData
      recipientAddresses,
      mintRewardTxHash,

      // depositStrealAndGetToken Functio return data
      depositor,
      amountToreceive,
      depositTxHash,

      //-----> smart contract details
      title,
      data,
      name,
      balances,
      symbol,
      airdrop,
      totalSupply,
      collateralBalance,
      USDC,
      USDT,
      DAI 
    }}>
      {children}
    </StrealContext.Provider>
  )
}


// Create a component to render for '/' route
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to streal Data Page!</h1>
      <p>
        THis page demonstrates how data can be fetched from the smart contract and then distributed to the various components using the reactHook "useContext"
      </p>
    </div>
  )
}

// Default export it
export default HomePage;
