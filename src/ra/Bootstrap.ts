import ReactDOM from "react-dom/client";
import {App} from "antd";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import axios from "axios";
import '../assets/index.css';
import RaApp from "./RaApp";

axios.defaults.baseURL = "http://192.168.78.1:3000/table/"








const Bootstrap = {
    start: () => {
        const raApp = React.createElement(RaApp);
        const AntdApp = React.createElement(App, {children: raApp});
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(AntdApp);
    }
}


export default Bootstrap;
