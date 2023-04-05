import React, {useMemo, useRef} from "react";
import {App, Button, Card, Empty, Space, Table, TablePaginationConfig} from "antd";
import {RaTableTableProps} from "./interface";
import Style from './index.module.less';
import RaTableColumnFactory from "./RaTableColumnFactory";
import EventBus from "../../utils/EventBus";
import {DownloadOutlined, ReloadOutlined, SettingOutlined} from "@ant-design/icons";
import {FilterValue, SorterResult} from "antd/es/table/interface";

const RaTableTable: React.FC<RaTableTableProps> = (props) => {

    const onReloadClick = () => {
        EventBus.post("on_table_reload");
    }


    const cardExtra = () => {
        return <>
            <Space.Compact>
                <Button></Button>
            </Space.Compact>
            <Space>
                <Button type="primary" onClick={() => {
                    EventBus.post("on_ra_table_item_edit")
                }}>新增</Button>
                <Space.Compact>
                    <Button icon={<DownloadOutlined/>}/>
                    <Button icon={<ReloadOutlined/>} onClick={onReloadClick}/>
                    <Button icon={<SettingOutlined/>}/>
                </Space.Compact>
            </Space>
        </>
    }


    const columns = useMemo(() => RaTableColumnFactory(props.config), [props.config]);

    const tablePagination = useMemo((): TablePaginationConfig | false => {
        if (props.datasource?.pageIndex === 0) return false;
        return {
            current: props.datasource?.pageIndex,
            pageSize: props.datasource?.pageSize,
            total: props.datasource?.total
        };
    }, [props.datasource]);

    const onSelected = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        if (props.multiple === false) {
            props.onSelected?.(selectedRows[0]);
        } else {
            props.onSelected?.(selectedRows);
        }
    };

    const onTableQueryChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[]) => {
        EventBus.post("on_table_query_change", pagination, filters, sorter);
    }

    return useMemo(() => {
        if (props.datasource?.data === undefined)
            return <div className={Style.emptyContainer}><Empty/></div>

        return <Card title="asdf" extra={cardExtra()}>
            <Table columns={columns} dataSource={props.datasource.data} rowKey="_id" bordered={true}
                   pagination={tablePagination} loading={props.loading} onChange={onTableQueryChange}
                   rowSelection={{type: props.multiple === false ? "radio" : "checkbox", onChange: onSelected}}
            />
        </Card>
    }, [props.datasource?.data, props.loading]);
}

export default RaTableTable;

