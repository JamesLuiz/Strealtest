import React, { useContext } from 'react'
import { StrealContext } from '../pages'

const Data = () => {
  const {

  //----->smart contract details
  TokensDeposited,
  Tokens,
  votes,
  data, 
  name, 
  balance, 
  symbol, 
  airdrop, 
  totalSupply, 
  collateralBalance, 
  USDC,
  USDT,
  DAI,
  userData,
  allowance,
  userBalance,
  collateralAddress,
  collateralInUSD,
  mintedStreal,
  USDvalue,
  userDataUSDValue,
  snappedBalance

  } = useContext(StrealContext);

    
    return (
      <div>
        <h3>Owner address: {data}</h3>
        <h3>Name: {name}</h3>
        <h3>Token symbol: {symbol}</h3>
        <h3>Total supply: {totalSupply}</h3>
        <h3>Airdrop balance: {airdrop}</h3>
        <div>Owner balnce: {balance}</div>
        <div>token balances: {collateralBalance}</div>
        <div>USDC balance: {USDC}</div>
        <div>USDT balance: {USDT}</div>
        <div>DAI balance: {DAI}</div>
        <div>vote count: {votes}</div>
        <div>{Tokens}</div>
        <div>Minted streal: {mintedStreal}</div> 
        <div>user Data: {userData}</div>      
        <div>fiat: ${userDataUSDValue}</div>      
        <div>Snapshot: {snappedBalance} streal</div>      

      </div>
    )
}

export default Data