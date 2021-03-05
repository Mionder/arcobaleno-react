import React, {useState, useEffect, Component} from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import axios from "axios";
import AdminAddPizza from "./AdminAddPizza";
import AdminEditPizza from "./AdminEditPizza";
class AdminPanel extends Component{
    state = {
        currentAdmin: "Pizza",
    }
    render() {
        const {currentAdmin} = this.state;
        return(
            <div className="admin-panel">
                <div className="sidebar-admin">
                    <ul className="sidebar-panel">
                        <li className={currentAdmin === "Pizza" ? "sidebar-item active-admin" : "sidebar-item"} onClick={()=>this.setState({currentAdmin: "Pizza"})}>
                            <i className="fas fa-pizza-slice"></i>
                        </li>
                        <li className={currentAdmin === "Drinks" ? "sidebar-item active-admin" : "sidebar-item"} onClick={()=>this.setState({currentAdmin: "Drinks"})}>
                            <i className="fas fa-cocktail"></i>
                        </li>
                    </ul>
                </div>
                <div className="content-admin">
                    {currentAdmin === "Pizza" ? (
                            <div className="admin-pizza">
                                <AdminAddPizza />
                                <AdminEditPizza />
                            </div>
                        )
                         : ""
                    }
                </div>
            </div>
        )
    }
}
export default AdminPanel;