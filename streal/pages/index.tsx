"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

import MainPageLayout from "../components/mainPageLayout/MainPageLayout";

import { useState } from "react";
import Dashboard from "../components/DashboardComponents/Dashboard";
import MainPagesWrapper from "../components/mainPageLayout/MainPageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
}
