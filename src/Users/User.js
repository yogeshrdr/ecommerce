import React from 'react'
import Users from './Users'
import {StateProvider} from '../ContextApi/StateProvider'
import reducer, {initialState} from '../ContextApi/UserReducer'


function User() {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
        <Users />
        </StateProvider>
    )
}

export default User
