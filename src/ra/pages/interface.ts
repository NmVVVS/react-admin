import {RouteObject} from "react-router/dist/lib/context";
import {Menu} from "../interface";
import {MenuProps} from "antd";

export interface RaLayoutProps {
    routes: RouteObject[];
    menus: MenuProps['items'];
}
