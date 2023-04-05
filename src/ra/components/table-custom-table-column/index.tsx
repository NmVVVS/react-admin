import React, {useRef, useState} from "react";
// import {
//     TableCustomInputRenderFormInputProps,
//     TableCustomInputRenderTableRenderProps
// } from "../table-custom-input-render";
import {Button, Input, Space} from "antd";
import ReactDialog from 'react-dialog';
import ColumnEditor from "./ColumnEditor";
import {TableCustomInputRenderFormInputProps, TableCustomInputRenderTableRenderProps} from "./interface";

const FormInput: React.FC<TableCustomInputRenderFormInputProps> = (props) => {
    const columnEditorRef = useRef<any>();
    const [value, setValue] = useState<string>(JSON.stringify(props.value));

    const onClick = () => {
        new ReactDialog().show({
            children: <ColumnEditor ref={columnEditorRef} value={props.value}/>,
            onCancel: (ins) => ins.close(),
            onOk: (ins) => {
                columnEditorRef?.current?.validateFields().then((res: any) => {
                    console.log(res)
                    props.onChange?.(res);
                    setValue(JSON.stringify(res));
                    ins.close();
                });
            }
        });
    }


    return <Space.Compact style={{width: '100%'}}>
        <Input disabled value={value}/>
        <Button type="primary" onClick={onClick}>编辑</Button>
    </Space.Compact>
}

const TableRender: React.FC<TableCustomInputRenderTableRenderProps> = (props) => {
    return <Button type="link" size="small">查看</Button>
}


const TableCustomTableColumn = {
    formInput: FormInput,
    tableRender: TableRender
};

export default TableCustomTableColumn;
