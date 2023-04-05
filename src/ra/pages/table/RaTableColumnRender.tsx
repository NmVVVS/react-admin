import {RaTableColumn, RaTableConfig} from "./interface";
import dayjs from "dayjs";
import {Button, Popconfirm, Switch, Tag} from "antd";
import EventBus from "../../utils/EventBus";
import ComponentsMap from "../../config/ComponentsMap";
import React from "react";

const EnumColumnTagColor = ['geekblue', 'blue', 'volcano', 'red', 'magenta', '#f50', '#2db7f5', '#87d068', '#108ee9'];
const RaTableColumnRender = (value: any, column: RaTableColumn) => {
    switch (column.type) {
        case "string":
            return value;
        case "datetime":
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        case "date":
            return dayjs(value).format("YYYY-MM-DD");
        case "time":
            return dayjs(value).format("HH:mm:ss");
        case "boolean":
            return <Switch defaultChecked={value}/>;
        // case "object":
        //     return <Button type="link" size="small">查看</Button>
        case "enum":
            return <Tag color={EnumColumnTagColor[column.enum!.indexOf(value)]}>{value}</Tag>;
        case "custom":
            return React.createElement(ComponentsMap[column.component!].tableRender, {value})
        case "number":
            return value;
        case "relevance":
            return value;
        default:
            return value + "";
    }
}

const RaTableColumnActionRender = (config: RaTableConfig, index: number) => {
    return <>
        {
            config.editable ? <Button type="link" size="small" onClick={() => {
                EventBus.post("on_ra_table_item_edit", index);
            }}>编辑</Button> : null
        }
        {
            config.deletable ?
                <Popconfirm title="温馨提示" description="删除后将无法恢复，确认继续吗？" onConfirm={() => {
                    EventBus.post("on_ra_table_item_delete", index);
                }}>
                    <Button type="link" style={{color: "red"}} size="small">删除</Button>
                </Popconfirm>
                : null
        }
    </>
}


export {RaTableColumnRender, RaTableColumnActionRender};
