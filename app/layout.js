// App.js
'use client'

import React from 'react';
import Page from './page';


import { StrealProvider } from '@/context/contexts'; // adjust the path according to your project structure

export default function App() {


  return (
    <StrealProvider> 
      <Page/>
    </StrealProvider>
  );
}



