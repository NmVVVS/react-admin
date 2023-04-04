import React, {useImperativeHandle, useMemo, useState} from "react";
import {Button, Form, Input, Select, Space, Switch} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {ColumnEditorProps, ColumnItemPops} from "./interface";
// "string" | "boolean" | "enum" | "datetime" | "date" | "time" | "object" | "custom";
const ColumnItemTypeOption = [
    {value: 'string', label: '字符串'},
    {value: 'boolean', label: '布尔'},
    {value: 'image', label: '图片'},
    {value: 'enum', label: '枚举'},
    {value: 'datetime', label: '日期时间'},
    {value: 'date', label: '日期'},
    {value: 'time', label: '时间'},
    {value: 'custom', label: '自定义'},
];


const ColumnItem: React.FC<ColumnItemPops> = (props) => {
    const [columnItemType, setColumnItem] = useState<string>("");
    const rules = {
        title: [
            {required: true, message: "请输入字段标题"},
        ],
        key: [
            {required: true, message: "请输入字段标识"},
        ],
        type: [
            {required: true, message: "请选择字段类型"},
        ],
        enum: [
            {required: true, message: "请输入枚举值,英文逗号分割"},
        ],
        component: [
            {required: true, message: "请输入组件映射Key"},
        ],
    };

    const base = useMemo(() => {
        return <>
            <Form.Item label="标题" name={[props.name, 'title']} rules={rules.title}>
                <Input/>
            </Form.Item>
            <Form.Item label="标识" name={[props.name, 'key']} rules={rules.key}>
                <Input/>
            </Form.Item>
            <Form.Item label="类型" name={[props.name, 'type']} rules={rules.type}>
                <Select options={ColumnItemTypeOption} style={{width: 120}} onChange={setColumnItem}/>
            </Form.Item>
            <Form.Item label="开启排序" name={[props.name, 'sorter']} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item label="开启搜索" name={[props.name, 'searchable']} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item label="开启新增" name={[props.name, 'createable']} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item label="开启编辑" name={[props.name, 'editable']} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item label="开启显示" name={[props.name, 'show']} valuePropName="checked">
                <Switch/>
            </Form.Item>
        </>
    }, []);

    const typeInput = useMemo(() => {
        if (columnItemType === "enum") {
            return <Form.Item label="枚举数据" name={[props.name, 'enum']} rules={rules.enum}>
                <Input placeholder="请输入枚举列表，以英文逗号分割"/>
            </Form.Item>
        } else if (columnItemType === "custom") {
            return <Form.Item label="组件映射Key" name={[props.name, 'component']} rules={rules.component}>
                <Input placeholder="请输入组件映射Key"/>
            </Form.Item>
        }
        return null;
    }, [columnItemType]);

    return <Space>
        {base}
        {typeInput}
    </Space>
}


const ColumnEditor = React.forwardRef((props: ColumnEditorProps, ref) => {
    const [form] = useForm();
    const defaultValue = {createable: true, editable: true, show: true, searchable: false, sorter: false};

    useImperativeHandle(ref, () => ({
        validateFields: () => {
            return new Promise(resolve => {
                form.validateFields().then(res => {
                    resolve(res['columns'])
                });
            })
        }
    }));

    return <Form layout="vertical" form={form}>
        <Form.List name="columns" initialValue={props.value}>
            {(fields, {add, remove}) => (
                <>
                    <Form.Item>
                        <Button type="primary" onClick={() => add(defaultValue)}>
                            添加字段
                        </Button>
                    </Form.Item>
                    {fields.map(({key, name, ...restField}) => (
                        <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                            <ColumnItem key={key} name={name}/>
                            <MinusCircleOutlined onClick={() => remove(name)}/>
                        </Space>
                    ))}
                </>
            )}
        </Form.List>
    </Form>
})


export default ColumnEditor;
