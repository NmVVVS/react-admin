import React from "react";
import Style from './index.module.less';
import {Spin} from "antd";

const RaLaunch: React.FC = () => {
    return <div className={Style.container}>
        <div>
            <Spin tip="资源加载中，请稍后..." size="large"/>
            <div className={Style.inc}>木田科技提供技术支持</div>
        </div>
    </div>
}

export default RaLaunch;
