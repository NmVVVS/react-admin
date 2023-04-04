export interface RaTableDataSource {
    pageIndex: number;
    pageSize: number;
    total: number;
    data: any[];
}

export interface RaTableSearchQuery {
    page?: { pageIndex?: number, pageSize?: number; }
    sort?: {};
    filter?: {};
}

export interface RaTableProps {
    key?: string;
}

type RaTableColumnType = "string" | "boolean" | "enum" | "datetime" | "date" | "time" | "image" | "custom";

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
}

export interface RaTableConfig {
    tableName: string;
    deletable: boolean;
    editable: boolean;
    disableable: boolean;
    customEditPath?: string;
    columns: RaTableColumn[];
}
