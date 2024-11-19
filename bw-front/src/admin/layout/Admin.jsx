import './Admin.css';
import {NavLink, Outlet} from "react-router-dom";

export default function Admin () {
    return <>
        <div className="admin">
                <div className="content">
                    <Outlet />
                </div>
                <div className="buttons">
                        <NavLink to={"/admin"}><button>Statistic</button></NavLink>
                        <NavLink to={"/admin/countdown"}><button>Countdown</button></NavLink>
                        <NavLink to={"/admin/tasks"}><button>Tasks</button></NavLink>
                </div>
        </div>
    </>
}