import React from 'react'
import useAuthStatus from '../features/hooks/useAuthStatus'
import Loading from './Loading'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {

    const { isChecking , isLogged} = useAuthStatus()

    if(isChecking){
        return <Loading/>
    }

    return isLogged ? <Outlet/> :  <Navigate to={"/login"}/>


}

export default PrivateComponent
