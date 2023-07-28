 
import { StrealProvider } from "./index"; 
import React, { StrictMode } from "react";
import Data from "../component/Data";
import Function from "../component/functions"


 
const MyApp = ({ Component, pageProps }) => (

<StrictMode> 
    <StrealProvider>
     <Component {...pageProps} /> 
    <Data/>
    <Function/>
    </StrealProvider>
  </StrictMode>

)
export default MyApp 
