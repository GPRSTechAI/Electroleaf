import { Navigate, Redirect } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import SensorsList, { NewSensor, ViewSensor } from 'src/pages/sensors';
import ChangeImage from 'src/pages/sensors/changeImage';
import TanksList from 'src/pages/tanks';
import NewTank from 'src/pages/tanks/newTank';
import Readings from 'src/pages/Readings';

import UsersList from 'src/pages/users';
import NewUser from 'src/pages/users/newUser';
import Privilege from './pages/users/privilege';

import ThresholdsList from './pages/thresholds';
// import NewSensor from 'src/components/sensors/newSensor';
// import ViewSensor from 'src/components/sensors/ViewSensor';
import Dashboard from 'src/pages/dashboard/Dashboard';
import DashboardViewSensor from 'src/pages/dashboard/DashboardViewSensor';
import OldDashboard from 'src/pages/Dashboard-old';
import Login from 'src/pages/auth/Login';
import ForgotPassword from 'src/pages/auth/ForgotPassword';
import ResetPassword from 'src/pages/auth/ResetPassword';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';


import ActuatorsList, { NewActuator, ViewActuator } from 'src/pages/actuators';
// import NewActuator from 'src/components/actuators/newActuator/index';
// import ViewActuator from 'src/components/actuators/viewActuator';
import AllActuatorCommands from 'src/pages/actuators/viewActuator/AllActuatorCommands';
import NewActuatorCommand from 'src/pages/actuators/viewActuator/newActuatorCommands';
import Threads, { NewThread, ViewThread } from 'src/pages/threads'

const routes = [
    {
        path: 'app',
        element: <DashboardLayout />,
        children: [
            // { path: 'account', element: <Account /> },
            { path: 'customers', element: <CustomerList /> },
            { path: 'readings', element: <Readings /> },
            {
                path: 'sensors', children: [
                    { path: '', element: <SensorsList /> },
                    { path: 'new', element: <NewSensor /> },
                    { path: 'edit/:id', element: <NewSensor /> },
                    { path: 'image/:id', element: <ChangeImage /> },
                    { path: ':id', element: <ViewSensor /> },
                ]
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    { path: ':sensorId', element: <DashboardViewSensor /> },
                    { path: ':sensorId/:parameterId', element: <DashboardViewSensor /> },
                ]
            },
            { path: 'dashboard-old', element: <OldDashboard /> },
            // { path: 'products', element: <ProductList /> },
            // { path: 'settings', element: <Settings /> },
            //{ path: '*', element: <Navigate to="/404" /> }


            { path: 'actuators', element: <ActuatorsList /> },
            { path: 'actuators/new', element: <NewActuator /> },
            { path: 'actuators/edit/:id', element: <NewActuator /> },
            { path: 'actuators/:id', element: <ViewActuator /> },
            { path: 'actuatorCommands', element: <AllActuatorCommands /> },
            { path: 'actuatorCommands/edit/:id', element: <NewActuatorCommand /> },

            {
                path: 'threads', children: [
                    { path: '', element: <Threads /> },
                    { path: 'new/:tab', element: <NewThread /> },
                    { path: 'new', element: <NewThread /> },
                    { path: 'edit/:id/:tab', element: <NewThread /> },
                    { path: 'edit/:id', element: <NewThread /> },
                    { path: ':threadId', element: <ViewThread /> },
                ]
            },
            {
                path: 'tanks', children: [
                    { path: '', element: <TanksList /> },
                    { path: 'new', element: <NewTank /> },
                    { path: 'edit/:id', element: <NewTank /> },
                ]
            },
            {
                path: 'constants', children: [
                    { path: '', element: <ThresholdsList /> },
                ]
            },
            {
                path: 'users', children: [
                    { path: '', element: <UsersList /> },
                    { path: 'new', element: <NewUser /> },
                    { path: 'edit/:id', element: <NewUser /> },
                    { path: 'privileges/:id', element: <Privilege /> },
                ]
            },
            { path: '*', element: <NotFound /> }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'forgotPassword', element: <ForgotPassword /> },
            { path: 'resetPassword/:email/:token', element: <ResetPassword /> },
            { path: 'register', element: <Register /> },
            { path: '404', element: <NotFound /> },
            { path: '/', element: <Navigate to="/app/dashboard" /> },
            //{ path: '*', element: <Navigate to="/404" /> }
            { path: '*', element: <NotFound /> }
        ]
    }
];

const authRoutes = [
    { path: 'login', element: <Login /> },
    { path: 'forgotPassword', element: <ForgotPassword /> },
    { path: 'resetPassword/:email/:token', element: <ResetPassword /> },
    { path: 'register', element: <Register /> },
    { path: '*', element: <Navigate to="/login" /> }
]

export default routes;
export {
    authRoutes
}