import {ColumnsType} from "antd/es/table";
import {TablePaginationConfig} from "antd";
import {FilterValue, SorterResult} from "antd/es/table/interface";

export interface RaTableDataSource<T = any> {
    pageIndex: number;
    pageSize: number;
    total: number;
    data: T[];
}

export interface RaTableSearchQuery {
    pagination?: TablePaginationConfig;
    filters?: Record<string, FilterValue | null>;
    sorter?: SorterResult<any> | SorterResult<any>[];
}

export interface RaTableTableProps {
    loading: boolean;
    config?: RaTableConfig;
    datasource?: RaTableDataSource;
    multiple?: boolean;
    onSelected?: (values: any[] | any) => void;
}

export type RaTableColumnType =
    "string"
    | "boolean"
    | "enum"
    | "datetime"
    | "date"
    | "time"
    | "image"
    | "custom"
    | "password"
    | "number"
    | "relevance";

export interface RaTableColumn {
    show: boolean;
    key: string;
    searchable: boolean;
    sorter: boolean;
    title: string;
    type: RaTableColumnType;
    enum?: any[];
    render?: any;
    editable: boolean;
    component?: string;
    createable: boolean;
    table_name?: string;
    field_name?: string;
    width?: number;
    count?: number;
}

export interface RaTableConfig {
    tableName: string;
    deletable: boolean;
    editable: boolean;
    disableable: boolean;
    customEditPath?: string;
    columns: RaTableColumn[];
}

export interface RaTableProps {
    tableKey?: string;
    showType?: "page" | "dialog";
    type?: "datasource" | "group";
    multiple?: boolean;
    onSelected?: (values: any[] | any) => void;
    sorter?: { columnKey: string, order: "ascend" | "descend" }
}
