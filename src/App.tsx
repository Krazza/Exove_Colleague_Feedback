import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import './App.css';
import Questionnaire from './components/Questionnaire';
import Responses from './components/Responses';
import FeedBackScreen from './components/FeedbackScreen';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import RoleCheckRoute from './components/RoleCheckRoute';
import { UserRoles } from './modules/Roles';
import UserSelect from './components/UserSelect';
import PopUp from './components/PopUp';
import ManagerSelection from './components/ManagerSelection';
import RequestApproval from "./components/RequestApproval"
import ShowChart from './components/ShowChart';
import Employees from './components/Employees';

const App=()=> {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<ProtectedRoute outlet={<Dashboard />}/>}>
                        <Route path="/dashboard/managerselect" element={<RoleCheckRoute requiredRole={UserRoles.manager} outlet={<ManagerSelection/>}/>}/>
                        <Route path="/dashboard/chart" element={<RoleCheckRoute requiredRole={UserRoles.manager} outlet={<ShowChart/>}/>}/>
                        <Route path="/dashboard/requestapproval" element={<RoleCheckRoute requiredRole={UserRoles.manager} outlet={<RequestApproval/>}/>}/>
                        <Route path="/dashboard/requests" element={<FeedBackScreen/>}/>
                        <Route path="/dashboard/employees" element={<RoleCheckRoute requiredRole={UserRoles.manager} outlet={<Employees />}/>} />
                        <Route path="/dashboard/questionnaire" element={<Questionnaire/>}/>
                        <Route path="/dashboard/userselect" element={<UserSelect/>}/>
                        <Route path="/dashboard/responses" element={<RoleCheckRoute requiredRole={UserRoles.developer} outlet={<Responses/>}/>}/>
                    </Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;