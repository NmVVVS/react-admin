import {RaTableConfig} from "./interface";
import {ColumnsType} from "antd/es/table";
import {RaTableColumnActionRender, RaTableColumnRender} from "./RaTableColumnRender";
// import RaTableColumnRender from "./RaTableColumnRender";


const RaTableColumnFactory = (config?: RaTableConfig): ColumnsType<any> => {
    if (config === undefined) return [];

    const columns: ColumnsType<any> = config.columns.filter(item => item.isShow)
        .map(item => ({
            key: item.key,
            dataIndex: item.key,
            title: item.title,
            sorter: item.sorter,
            render: (value) => RaTableColumnRender(value, item)
        }));

    if (config.editable || config.deletable) {
        columns.push({
            key: "action", title: "操作", render: (value, record, index) => RaTableColumnActionRender(config, index)
        });
    }

    return columns;

}

export default RaTableColumnFactory;
