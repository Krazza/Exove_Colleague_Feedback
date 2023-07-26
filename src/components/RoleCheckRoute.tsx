import React from "react";
import { useAppSelector } from "../app/hooks";
import { UserRoles } from "../modules/Roles";
import Unauthorized from "./Unauthorized";
  
export type RoleCheckRouteProps = {
    requiredRole : UserRoles,
    outlet: JSX.Element;
};

export default function RoleCheckRoute(props : RoleCheckRouteProps) {
    const user = useAppSelector(state => state.user)
    if(user.user.role === props.requiredRole || user.user.role === UserRoles.admin) {
        return props.outlet;
    } else {
        return <Unauthorized/>;
    }
};