import React, {ReactNode} from "react";
import TableCustomTableColumn from "../components/table-custom-table-column";
import {
    TableCustomInputRenderFormInputProps,
    TableCustomInputRenderTableRenderProps
} from "../components/table-custom-input-render";


type P = {
    [key: string]: { formInput: React.FC<TableCustomInputRenderFormInputProps>, tableRender: React.FC<TableCustomInputRenderTableRenderProps> };
};

const ComponentsMap: P = {"table-edit-column": TableCustomTableColumn};
export default ComponentsMap;
