import React from 'react';
import {StateProvider} from '../ContextApi/StateProvider'
import reducer, {initialState} from '../ContextApi/ManufacturerReducer'
import Manufacturer from './Manufacturer';

function ManufacturerMain() {
    return (
        <div>
            <StateProvider initialState={initialState} reducer={reducer}>
                <Manufacturer />
            </StateProvider>
        </div>
    )
}

export default ManufacturerMain
