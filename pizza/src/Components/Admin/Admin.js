import React from "react";
import AdminPanel from "./AdminPanel";
import "./admin.css";
const Admin = ({}) => {
    return(
        <div className="admin">
            <div className="container">
                <div className="admin-wrapper">
                    <AdminPanel />
                </div>
            </div>
        </div>
    )
}

export default Admin;