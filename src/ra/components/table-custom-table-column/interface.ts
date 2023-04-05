import {FormInstance} from "antd/es/form/hooks/useForm";
import {RaTableColumnType} from "../../pages/table/interface";

export interface ColumnEditorProps {
    value?: any[];
}

export interface ColumnItemPops {
    name: number;
    initValue: { type: RaTableColumnType, show: boolean };
}

export interface TableCustomInputRenderTableRenderProps {
    value?: any;
}

export interface TableCustomInputRenderFormInputProps {
    value?: any;
    onChange?: (value: any) => void;
}

export interface EnumInputProps {
    value?: string[];
    onChange?: (value: string[]) => void;
}
