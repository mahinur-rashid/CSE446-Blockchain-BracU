import PageHolder from "./PageHolder";
import { useEth } from "../contexts/EthContext";
import { useEffect, useState } from "react";

function UserProfile() {
    const user = localStorage.getItem('userSession').split(',');
    const roles = ['Admin', 'Reporter', 'Investigator'];

    return (
        <PageHolder className="px-5">
            <h1>{user[0]}</h1>
            <div className="d-flex justify-content-between">
                <span className="fs-4" >User Name: {user[1]}</span>
                <span className="fs-4">User NID: {user[2]}</span>
                <span className="fs-4">User Role: {roles[parseInt(user[3])]}</span>
            </div>
        </PageHolder>
    );
}

export default UserProfile;