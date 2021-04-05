import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AddStudenrScreen } from '../components/screens/AddStudenrScreen'
import { ListStudentScreen } from '../components/screens/ListStudentScreen'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>
            <div>
                <Switch>
                    <Route exact path="/add" component={AddStudenrScreen}/>
                    <Route exact path="/list" component={ListStudentScreen}/>
                    <Redirect to="/add"/>
                </Switch>
            </div>
        </>
    )
}
