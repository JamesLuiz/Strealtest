import { useState, useEffect } from "react";
import DashboardTablePostConnectItem from "./DashboardTablePostConnectItem";
import { BsInfoCircle } from "react-icons/bs";

export default function DashboardTablePostConnection() {
  const [coinData, setCoinData] = useState([]);
  const assetToBorrowHeader = [
    { name: "Assets" },
    { name: "Available" },
    { name: "APY, variable" },
    { name: "APY, stable" },
  ];
  const assetToSupplyHeader = [
    { name: "Assets" },
    { name: "Wallet balance" },
    { name: "APY" },
    { name: "Can be collateral", collateral: true },
  ];
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&per_page=${50}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCoinData(result);
      });
  }, []);
  return (
    <div className="dashboard-table-post-connection">
      <div className="supplies-main-col">
        <div className="sec-col">
          <div className="sec-title1">Your supplies</div>
          <div className="sec-title2">Nothing supplied yet </div>
        </div>
        <div className="main-col">
          <div className="column-cont">
            {" "}
            <div className="column-title">
              <div className="title">Assets to supply</div>
              <div>Hide</div>
            </div>
            <div className="column-info-box">
              <div>
                <BsInfoCircle size={18} color={"blue"}></BsInfoCircle>
              </div>
              <span>
                Your Ethereum wallet is empty. Purchase or transfer assets.
              </span>
            </div>
          </div>

          <div className="header">
            {assetToSupplyHeader.map((item, index) => {
              return (
                <div
                  className={`${item.collateral && "collateral-tick"}`}
                  key={index}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="info-prompt"></div>
          <div className="table">
            {coinData.map((item: any, index) => {
              return (
                <DashboardTablePostConnectItem
                  id={item.id}
                  apySupply={item.price_change_percentage_24h}
                  canBeCollateral={true}
                  tokenImage={item.image}
                  tokenName={item.symbol}
                  walletBalance={"0"}
                  key={index}
                  apyVariable={item.market_cap_change_percentage_24h}
                ></DashboardTablePostConnectItem>
              );
            })}
          </div>
        </div>
      </div>
      <div className="borrows-main-col">
        <div className="sec-col">
          <div className="sec-title1">Your borrows</div>
          <div className="sec-title2">Nothing supplied yet</div>
        </div>
        <div className="main-col">
          <div className="column-cont">
            {" "}
            <div className="column-title">
              <div className="title">Assets to borrow</div>
              <div>Hide</div>
            </div>
            <div className="column-info-box">
              <div>
                <BsInfoCircle size={18} color={"blue"}></BsInfoCircle>
              </div>
              <span>
                To borrow you need to supply any asset to be used as collateral.
              </span>
            </div>
          </div>

          <div className="header">
            {assetToSupplyHeader.map((item, index) => {
              return (
                <div
                  className={`${item.collateral && "collateral-tick"}`}
                  key={index}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="info-prompt"></div>
          <div className="table">
            {coinData.map((item: any, index) => {
              return (
                <DashboardTablePostConnectItem
                  apySupply={item.price_change_percentage_24h}
                  canBeCollateral={true}
                  tokenImage={item.image}
                  isBorrowItem
                  id={item.id}
                  tokenName={item.symbol}
                  walletBalance={"0"}
                  key={index}
                  apyVariable={item.market_cap_change_percentage_24h}
                ></DashboardTablePostConnectItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
