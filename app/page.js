'use client'
import React, {useState, useEffect, useContext} from "react";
import Image from "next/image"; 
import { StrealContext } from "@/context/contexts";


// adjust the path according to your project structure

export default function Page() {
  const { title, connectWallet, Names } = useContext(StrealContext);
 
  useEffect(() => {
    connectWallet();
  }, []);


  return (
    <div>
      <h1>{title}</h1>
      <h2>{Names}</h2>
    </div>
  );
}
