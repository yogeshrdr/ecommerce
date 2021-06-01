import React from 'react';
import {StateProvider} from '../ContextApi/StateProvider'
import reducer, {initialState} from '../ContextApi/AdminReducer'
import Admin from './Admin';

function ManufacturerMain() {
    return (
        <div>
            <StateProvider initialState={initialState} reducer={reducer}>
                <Admin />
            </StateProvider>
        </div>
    )
}

export default ManufacturerMain
