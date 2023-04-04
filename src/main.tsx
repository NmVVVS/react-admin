import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import RaApp from "./ra/pages/ra-app";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {App} from "antd";

axios.defaults.baseURL = "http://192.168.78.1:3000/table/"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App>
        <BrowserRouter>
            <RaApp/>
        </BrowserRouter>
    </App>
)
