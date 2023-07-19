"use client";

import React from 'react';
import { Provider } from 'react-redux';
import  store  from "./store";

export function ReduxProvider({childern}:{ childern: React.ReactNode}){

    return <Provider store={store}>{childern}</Provider>
}