import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from './context/AuthContext';

export const ProtectedRoutes = () => {
    const { loggedUser } = useContext(AuthContext);

    return (
        loggedUser ? <Outlet /> : <Navigate to='/' />
    );
}