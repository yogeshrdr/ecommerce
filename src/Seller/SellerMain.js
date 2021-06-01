import React from 'react'
import Seller from './Seller'
import reducer , {initialState} from '../ContextApi/SellerReducer'
import {StateProvider} from '../ContextApi/StateProvider'


function SellerMain() {
    return (
        <div>
            <StateProvider initialState={initialState} reducer={reducer}>
                <Seller />
            </StateProvider>
        </div>
    )
}

export default SellerMain
