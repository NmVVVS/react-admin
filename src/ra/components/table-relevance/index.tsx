import React, {useState} from "react";
import {Button, Input, Space} from "antd";
// import ReactDialog from 'react-dialog';
import RaTable from "../../pages/table/RaTable";
import {TableRelevanceFormInputProps} from "./interface";
import {openDialog} from "@ghgenz/react-dialog";


const TableRelevanceFormInput: React.FC<TableRelevanceFormInputProps> = (props) => {
    const [relevanceValue, setRelevanceValue] = useState<any>();

    const onSelected = (value: any) => {
        props.onChange?.(value._id);
        console.log(props.field_name);
        console.log(value);
        setRelevanceValue(value);
    }
    const onClick = () => {
        openDialog({
            children: <RaTable tableKey={props.tableKey} showType="dialog" multiple={false} onSelected={onSelected}/>,
        })
        // new ReactDialog().show(
        //     {
        //         children: <RaTable tableKey={props.tableKey} showType="dialog" multiple={false}
        //                            onSelected={onSelected}/>,
        //         onCancel: (e) => e.close(),
        //         onOk: (e) => e.close()
        //     }
        // );
    }


    return <Space.Compact style={{width: '100%'}}>
        <Input disabled={true} value={relevanceValue?.[props.field_name]}/>
        <Button type="primary" onClick={onClick}>选择</Button>
    </Space.Compact>
}

const TableRelevanceTableColumn: React.FC = () => {
    return <></>
}

export {TableRelevanceFormInput, TableRelevanceTableColumn};

