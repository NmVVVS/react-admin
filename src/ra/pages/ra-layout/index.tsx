import React, {useEffect} from "react";
import {App, Layout, Menu} from "antd";
import useWindowSize from "../../hooks/useWindowSize";
import Style from './index.module.less';
import {useNavigate, useRoutes} from "react-router-dom";
import RaAxios from "../../utils/RaAxios";
import {RaLayoutProps} from "../interface";


const RaLayout: React.FC<RaLayoutProps> = (props) => {
    const windowSize = useWindowSize(), routes = useRoutes(props.routes),
        navigate = useNavigate();


    return <Layout className={Style.rootLayout}>
        <Layout.Header className={Style.header}>
            adfasfasdf
        </Layout.Header>
        <Layout>
            <Layout.Sider style={{height: windowSize.height - 64}}>
                <Menu items={props.menus} onClick={(info) => navigate(info.key)}/>
            </Layout.Sider>
            <Layout.Content className={Style.content} style={{height: windowSize.height - 64}}>
                {routes}
            </Layout.Content>
        </Layout>
    </Layout>
}

export default RaLayout;
