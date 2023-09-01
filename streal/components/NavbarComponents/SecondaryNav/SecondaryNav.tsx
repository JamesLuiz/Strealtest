import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import Image from "next/image";
import React from "react";
import MobileNavList from "../MobileNavList/MobileNavList";
import ConnectWalletModal from "../../../components/modals/ConnectWalletModal";

import SETTINGS from "../../../public/Images/settings.svg";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import _CONNECT_WALLET from "../../../redux/auth/auth-action";
import { useWeb3 } from "../../../redux/auth/hooks";
import { useDispatch } from "react-redux";
import { StrealContext } from "../../../pages/indexData";
import { useContext } from "react";

interface Props {
  mobileNavModal: boolean;
  connectWalletModal: boolean;
  toggleConnectWalletModal: () => void;
  toggleMobileNavModal: () => void;
  toggleWebSettingsModal: () => void;
}

const SecondaryNav = ({
  mobileNavModal,
  toggleMobileNavModal,
  toggleWebSettingsModal,
  toggleConnectWalletModal,
  connectWalletModal,
}: Props) => {
  const { web3Provider, _CONNECT_WALLET, _DISCONNECT_WALLET, address } =
    useWeb3();

  const strealData = useContext(StrealContext);

  const { getUserData, data, connectWallet } = strealData;

  return (
    <div className="secondary--nav">
      <ConnectWalletModal
        closeFunction={toggleConnectWalletModal}
        isOpen={connectWalletModal}
      ></ConnectWalletModal>
      {!mobileNavModal && (
        <PrimaryButton
          onClick={() => {
            _CONNECT_WALLET();
            connectWallet();
          }}
          /*  onClick={web3Provider ? _DISCONNECT_WALLET : _CONNECT_WALLET} */
          text={
            data
              ? `${data?.slice(0, 4)}...${data?.slice(38, 43)}`
              : "Connect wallet"
          }
        />
      )}

      <Image
        onClick={toggleWebSettingsModal}
        className="web--settings"
        src={SETTINGS}
        alt="settings"
      />
      {!mobileNavModal ? (
        <div onClick={toggleMobileNavModal} className="mobile--settings">
          <BiMenu className="icon" />
        </div>
      ) : (
        <MdClose
          onClick={toggleMobileNavModal}
          className="mobile--close--settings"
        />
      )}
      <MobileNavList
        modal={mobileNavModal}
        toggleModal={toggleMobileNavModal}
      />
    </div>
  );
};

export default SecondaryNav;
