import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../app/hooks";
  
export type ProtectedRouteProps = {
    outlet: JSX.Element;
};

export default function ProtectedRoute(props : ProtectedRouteProps) {
    const user = useAppSelector(state => state.user)
    if(user.user.loggedIn) {
        return props.outlet;
    } else {
        return <Navigate to="/login" replace/>;
    }
};