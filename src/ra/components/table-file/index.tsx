import React, {useState} from "react";
import {Button, Input, Space} from "antd";
import {TableFileFormInputProp} from "./interface";
import ReactDialog from 'react-dialog';
import ReactFileManager from 'react-file-manager';


const TableFileFormInput: React.FC<TableFileFormInputProp> = (props) => {
    const [value, setValue] = useState<string>("");
    const onClick = () => {
        // new ReactDialog().show({
        //     children: <ReactFileManager/>
        // })
    }

    return <Space.Compact style={{width: '100%'}}>
        <Input disabled={true}/>
        <Button type="primary" onClick={onClick}>选择</Button>
    </Space.Compact>
}
export {TableFileFormInput};
