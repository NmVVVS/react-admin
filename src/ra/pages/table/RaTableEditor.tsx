import React, {useImperativeHandle, useMemo} from "react";
import {DatePicker, Form, Input, Radio, Switch} from "antd";
import {RaTableColumn} from "./interface";
import ComponentsMap from "../../config/ComponentsMap";
import {useForm} from "antd/es/form/Form";

interface RaTableEditorProps {
    columns: RaTableColumn[];
    row?: any;
}

const RaTableEditor = React.forwardRef((props: RaTableEditorProps, ref) => {
    const [form] = useForm();

    useImperativeHandle(ref, () => ({
        validateFields: form.validateFields
    }));

    const getFormItemNode = (column: RaTableColumn) => {
        switch (column.type) {
            case "string":
                return <Input/>
            case "boolean":
                return <Switch/>
            case "enum":
                return <Radio.Group options={column.enum}/>
            case "datetime":
                return <Input/>
            case "custom":
                return React.createElement(ComponentsMap[column.component!].formInput);
            default:
        }
    }

    const getFormItemValuePropName = (column: RaTableColumn) => {
        if (column.type === "boolean") return "checked"
        return undefined;
    }

    const formItem = useMemo(() => {
        let columns;
        if (props.row === undefined) {
            columns = props.columns.filter(item => item.createable);
        } else {
            columns = props.columns.filter(item => item.editable);
        }
        return columns.map(item => {
            return <Form.Item label={item.title} name={item.key} key={item.key}
                              valuePropName={getFormItemValuePropName(item)}>
                {getFormItemNode(item)}
            </Form.Item>
        })
    }, [props.columns]);

    return <div>
        <Form labelCol={{span: 5}} form={form} initialValues={props.row}>
            <Form.Item name="_id" style={{display: "none"}}>
                <Input/>
            </Form.Item>
            {formItem}
        </Form>
    </div>
});


export default RaTableEditor;
