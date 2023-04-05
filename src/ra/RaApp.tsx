import React, {useEffect, useMemo, useState} from "react";
import {App, MenuProps} from "antd";
import {BrowserRouter, Navigate, Route, Routes, useRoutes} from "react-router-dom";
import RaLayout from "./pages/ra-layout";
import Login from "./pages/login";
import RaAxios from "./utils/RaAxios";
import {RaTableDataSource} from "./pages/table/interface";
import {Menu} from "./interface";
import RaLaunch from "./pages/ra-launch";
import {RouteObject} from "react-router/dist/lib/context";
import RaTable from "./pages/table/RaTable";
import {getItem} from "./utils";
import NotFount from "./pages/not-fount";
import Dashboard from "./pages/dashboard";

const RaApp: React.FC = () => {
    const [menu, setMenu] = useState<MenuProps['items']>(), [routes, setRoutes] = useState<RouteObject[]>([]),
        {message} = App.useApp();

    useEffect(() => {

    }, []);


    useEffect(() => {
        // 初始化axios
        RaAxios.setOnNetworkErrorCallback((response) => {
            console.log(message);
            message.error(response.message)
        });
        RaAxios.setOnRequestErrorCallback((response) => {
            message.error(response.message);
        });

        RaAxios.get<RaTableDataSource<Menu>>("/group/menu", {sorter: {index: 1}}).then((res) => {
            const routes: RouteObject[] = [];
            const menus = res.data;

            routes.push({path: '/', element: <Dashboard/>});
            // routes.push({path: '/table/:key', element: <RaTable/>});
            const parseMenu = (parentKey: string, data: Menu[]): MenuProps['items'] => {
                return data.map(item => {
                    let key = parentKey + "/" + item.key;
                    if (item.type === "菜单") {
                        const extra = JSON.parse(item.extra || "{}");
                        switch (item.page) {
                            case "Table":
                                routes.push({path: key, element: <RaTable key={key} tableKey={item.key} {...extra} />});
                                break;
                            default:
                                routes.push({path: key, element: <Navigate to="/404" replace/>});
                                break;
                        }
                    }

                    return getItem(item.title, key, null, item.hasOwnProperty("children") ? parseMenu(key, item.children) : undefined);
                });
            }
            setMenu(parseMenu('', menus));
            setRoutes(routes);
            // console.log(routes);
        })
    }, []);

    const rootElement = useMemo(() => {
        if (menu === undefined) {
            return <Route path="/*" element={<RaLaunch/>}/>;
        } else {
            return <Route path="/*" element={<RaLayout menus={menu} routes={routes}/>}/>;
        }
    }, [menu]);

    return <BrowserRouter>
        <Routes>
            {rootElement}
            <Route path="/404" element={<NotFount/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>

}

export default RaApp;
