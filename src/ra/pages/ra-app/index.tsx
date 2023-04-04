import React, {useEffect} from "react";
import {App, Layout, Menu, MenuProps} from "antd";
import useWindowSize from "../../hooks/useWindowSize";
import Style from './index.module.less';
import {getItem} from "../../utils";
import {Route, Routes} from "react-router-dom";
import RaTable from "../table/RaTable";
import RaAxios from "../../utils/RaAxios";


const items: MenuProps['items'] = [
    getItem('Navigation One', 'sub1', null, [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', null, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    {type: 'divider'},

    getItem('Navigation Three', 'sub4', null, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),

    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];


const RaApp: React.FC = () => {
    const windowSize = useWindowSize(), {message} = App.useApp();

    useEffect(() => {
        // 初始化axios
        RaAxios.setOnNetworkErrorCallback((response) => {
            message.error(response.message)
        });
        RaAxios.setOnRequestErrorCallback((response) => {
            message.error(response.message);
        });
    }, []);


    return <Layout className={Style.rootLayout}>
        <Layout.Header className={Style.header}>
            adfasfasdf
        </Layout.Header>
        <Layout>
            <Layout.Sider style={{height: windowSize.height - 64}}>
                <Menu items={items}/>
            </Layout.Sider>
            <Layout.Content className={Style.content} style={{height: windowSize.height - 64}}>
                <Routes>
                    <Route path="/table/:key" element={<RaTable/>}/>
                </Routes>
            </Layout.Content>
        </Layout>
    </Layout>
}

export default RaApp;
