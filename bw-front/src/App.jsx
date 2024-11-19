import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Earn from "./pages/Earn.jsx";
import Friends from "./pages/Friends.jsx";
import Wallet from "./pages/Wallet.jsx";
import Wrapper from "./wrapper/Wrapper.jsx";
import Passed from "./pages/Passed.jsx";
import UILoading from "./components/ui/Loading/UILoading.jsx";


import useAppStore from "./store/app.js";

import Statistic from "./admin/Statistic.jsx";
import Tasks from "./admin/Tasks.jsx";
import UpdateTask from './admin/UpdateTask.jsx'

import Admin from "./admin/layout/Admin.jsx";
import {CreateTask} from "./admin/CreateTask.jsx";
import UpdateCountdown from "./admin/UpdateCountdown.jsx";

function App() {
    const app = useAppStore()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function initializeApp() {
            await app.init();
            setLoading(false);
        }

        initializeApp()
    }, [app.init])


    return (
        loading ? <UILoading/> :
            <Routes>
                <Route path="/" element={<Wrapper/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/earn" element={<Earn/>}/>
                    <Route path="/friends" element={<Friends/>}/>
                    <Route path="/wallet" element={<Wallet/>}/>
                </Route>

                <Route path="/passed" element={<Passed/>}/>

                <Route path='/admin' element={<Admin/>}>
                    <Route index element={<Statistic/>}/>
                    <Route path='tasks' element={<Tasks/>}/>
                    <Route path='tasks/update/:id' element={<UpdateTask/>}/>
                    <Route path='tasks/create/' element={<CreateTask/>}/>
                    <Route path='countdown/' element={<UpdateCountdown/>}/>
                </Route>
            </Routes>
    )

}

export default App
