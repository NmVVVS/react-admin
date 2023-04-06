import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import RaAxios from "../../utils/RaAxios";
import {RaTableConfig, RaTableDataSource, RaTableProps, RaTableSearchQuery} from "./interface";
import EventBus from "../../utils/EventBus";
import {useSearchParams} from "react-router-dom";
import RaTableTable from "./RaTableTable";
import RaTableEditor from "./RaTableEditor";
import {App, TablePaginationConfig} from "antd";
import {FilterValue, SorterResult} from "antd/es/table/interface";
import {openDialog} from "@ghgenz/react-dialog";

const RaTable: React.FC<RaTableProps> = (props) => {

    const [dataSource, setDataSource] = useState<RaTableDataSource>(), searchQuery = useRef<RaTableSearchQuery>({}),
        [config, setConfig] = useState<RaTableConfig>(), [loading, setLoading] = useState(false),
        tableKey = props.tableKey, tableType = props.type ?? "datasource",
        editFormRef = useRef<any>(), {message} = App.useApp();
    let query;
    if (props.showType === "page") [query] = useSearchParams();

    const loadColumn = useCallback(() => {
        RaAxios.get<RaTableConfig>(`/columns/${tableKey}`).then(setConfig);
    }, []);

    const loadDataSource = useCallback(() => {
        if (config === undefined) return;
        setLoading(true);
        let sorter: any = {};
        if (searchQuery.current.sorter !== undefined) {
            if (searchQuery.current.sorter instanceof Array) {
                for (let item of searchQuery.current.sorter) {
                    sorter[item.columnKey!] = item.order === 'ascend' ? 1 : -1;
                }
            } else {
                let temp = searchQuery.current.sorter as SorterResult<any>;
                sorter[temp.columnKey!] = temp.order === 'ascend' ? 1 : -1;
            }
        }

        const pagination = {pageIndex: 1, pageSize: 20};
        if (searchQuery.current.pagination !== undefined) {
            pagination.pageIndex = searchQuery.current.pagination.current || 1;
            pagination.pageSize = searchQuery.current.pagination.pageSize || 20;
        }

        if (searchQuery.current.filters !== undefined) {

        }


        RaAxios.get<RaTableDataSource>(`/${tableType}/${tableKey}`, {pagination, sorter}).then((res) => {
            setLoading(false);
            setDataSource(res);
        });
    }, [searchQuery, config]);


    const updateDataSource = () => {
        setDataSource({...dataSource!, data: [...dataSource!.data]});
    };

    const deleteTableItem = (index: number) => {
        dataSource?.data.splice(index, 1);
        updateDataSource();
    }

    const showEditor = (index?: number) => {
        let row: any;
        if (index !== undefined) {
            row = dataSource?.data![index];
        }
        openDialog({
            title: index === undefined ? "新增" : "编辑",
            children: React.createElement(RaTableEditor, {ref: editFormRef, columns: config!.columns, row: row}),
        })
        // new ReactDialog().show({
        //
        //     onCancel: (e) => e.close(),
        //     onOk: (e) => {
        //         editFormRef.current?.validateFields().then((data: any) => {
        //             const path = index === undefined ? `/add/${tableKey}` : `/edit/${tableKey}/${data._id}`;
        //             return RaAxios.post(path, data);
        //         }).then((res: any) => {
        //             message.success("请求成功");
        //             e.close();
        //             // console.log(res);
        //         })
        //     }
        // })
    }

    const onTableQueryChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[]) => {
        searchQuery.current = {
            sorter,
            pagination,
            filters
        };
        loadDataSource();
    }

    useEffect(() => {
        if (props.sorter !== undefined) {
            searchQuery.current.sorter = props.sorter;
        }

        loadColumn();
    }, []);
    useEffect(loadDataSource, [config])

    useEffect(() => {
        EventBus.subscribe("on_ra_table_item_delete", deleteTableItem);
        EventBus.subscribe("on_table_reload", loadDataSource);
        EventBus.subscribe("on_ra_table_item_edit", showEditor);
        EventBus.subscribe("on_table_query_change", onTableQueryChange);
        return () => {
            EventBus.unsubscribe("on_ra_table_item_delete", deleteTableItem);
            EventBus.unsubscribe("on_table_reload", loadDataSource);
            EventBus.unsubscribe("on_ra_table_item_edit", showEditor);
            EventBus.unsubscribe("on_table_query_change", onTableQueryChange);
        }
    }, [dataSource]);


    return useMemo(() => {
        return React.createElement(RaTableTable, {
            datasource: dataSource,
            config: config,
            loading,
            multiple: props.multiple,
            onSelected: props.onSelected
        })
    }, [dataSource, config, loading, props.multiple, props.onSelected]);
}

export default RaTable;
