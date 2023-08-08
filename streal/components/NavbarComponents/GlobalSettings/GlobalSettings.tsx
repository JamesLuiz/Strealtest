import React from "react";
import MobileNavTitle from "../MobileNavTitle/MobileNavTitle";
import MobileNavSwitch from "../MobileNavSwitch/MobileNavSwitch";

import { HiChevronRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  _TOGGLE_MODE,
  _TOGGLE_TESTNET,
} from "../../../redux/interface/interface-action";

export interface WebModalProps {
  position?: string;
  modal?: boolean;
  setWebSettingsModal?: any;
}

const GlobalSettings = ({
  position,
  modal,
  setWebSettingsModal,
}: WebModalProps) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.interface.mode);
  const testNet = useSelector((state: any) => state.interface.testNet);

  const toggleMode = () => dispatch(_TOGGLE_MODE());
  const toggleNet = () => dispatch(_TOGGLE_TESTNET());

  return (
    <div
      className={`global--settings--wrapper ${
        position === "web" && !modal && "hide--wrapper"
      }`}
      onClick={() => setWebSettingsModal && setWebSettingsModal(false)}
    >
      <div
        className={`menu--container web--modal--settings  ${
          position === "web" && !modal && "close--web--settings"
        } ${position === "web" && darkMode && "dark--mode--modal--bg"}`}
        onClick={() => setWebSettingsModal && setWebSettingsModal(true)}
      >
        <MobileNavTitle text="Global settings" />
        <MobileNavSwitch
          title="Dark mode"
          mode={darkMode}
          toggle={toggleMode}
        />
        <MobileNavSwitch
          title="Testnet mode"
          mode={testNet}
          toggle={toggleNet}
        />
        <div className="language--selection">
          <h5>Language</h5>
          <p className="">
            English <HiChevronRight className="icon" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
