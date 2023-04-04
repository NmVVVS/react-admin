import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Button, Card, Empty, Space, Table, TablePaginationConfig} from "antd";
import {RaTableConfig, RaTableDataSource, RaTableProps, RaTableSearchQuery} from "./interface";
import Style from './index.module.less';
import RaAxios from "../../utils/RaAxios";
import RaTableColumnFactory from "./RaTableColumnFactory";
import {useParams, useSearchParams} from "react-router-dom";
import EventBus from "../../utils/EventBus";
import {DownloadOutlined, ReloadOutlined, SettingOutlined} from "@ant-design/icons";
import ReactDialog from "react-dialog";
import RaTableEditor from "./RaTableEditor";

const RaTable: React.FC<RaTableProps> = (props) => {
    const [dataSource, setDataSource] = useState<RaTableDataSource>(), searchQuery = useRef<RaTableSearchQuery>(),
        params = useParams(), [config, setConfig] = useState<RaTableConfig>(),
        tableKey = props.key ?? params['key'] ?? "menu", [query] = useSearchParams(), editFormRef = useRef<any>();
    let tableType = query.get("type") ?? "datasource";

    const loadColumn = useCallback(() => {
        RaAxios.get<RaTableConfig>(`/columns/${tableKey}`).then(setConfig);
    }, []);

    const loadDataSource = useCallback(() => {
        RaAxios.get<RaTableDataSource>(`/${tableType}/${tableKey}`, searchQuery).then(setDataSource);
    }, [searchQuery]);

    const columns = useMemo(() => RaTableColumnFactory(config), [config]);
    const tablePagination = useMemo((): TablePaginationConfig | false => {
        if (tableType === "group") return false;
        return {
            current: dataSource?.pageIndex,
            pageSize: dataSource?.pageSize,
            total: dataSource?.total
        } as TablePaginationConfig;
    }, [dataSource]);
    const updateDataSource = () => {
        setDataSource({...dataSource!, data: [...dataSource!.data]});
    };
    const cardExtra = () => {
        return <>
            <Space.Compact>
                <Button></Button>
            </Space.Compact>
            <Space>
                <Button type="primary" onClick={() => showEditor()}>新增</Button>
                <DownloadOutlined/>
                <ReloadOutlined/>
                <SettingOutlined/>
            </Space>
        </>
    }
    const showEditor = (index?: number) => {
        let row: any;
        if (index !== undefined) {
            row = dataSource?.data[index!];
        }
        new ReactDialog().show({
            title: index === undefined ? "新增" : "编辑",
            children: <RaTableEditor ref={editFormRef} columns={config!.columns} row={row}/>,
            onCancel: (instance) => instance.close(),
            onOk: (ins) => {
                editFormRef.current?.validateFields().then((data: any) => {
                    return RaAxios.post("/columns/edit", data);
                }).then((res: any) => {
                    console.log(res);
                })
            }
        })
    }

    useEffect(loadColumn, []);

    useEffect(() => {
        const RaTableItemDeleteCallback = (index: number) => {
            dataSource?.data.splice(index, 1);
            updateDataSource();
        }
        EventBus.subscribe("on_ra_table_item_delete", RaTableItemDeleteCallback);

        const RaTableItemEditCallback = (index: number) => {
            showEditor(index);
        }
        EventBus.subscribe("on_ra_table_item_edit", RaTableItemEditCallback);

        return () => {
            EventBus.unsubscribe("on_ra_table_item_delete", RaTableItemDeleteCallback);
            EventBus.unsubscribe("on_ra_table_item_edit", RaTableItemEditCallback);
        }
    }, [dataSource]);

    useEffect(loadDataSource, [columns]);


    return useMemo(() => {
        if (dataSource === undefined)
            return <div className={Style.emptyContainer}><Empty/></div>

        return <Card title="asdf" extra={cardExtra()}>
            <Table columns={columns} dataSource={dataSource.data} rowKey="_id" bordered={true}
                   pagination={tablePagination} rowSelection={{type: "checkbox"}}/>
        </Card>
    }, [dataSource]);
}

export default RaTable;

