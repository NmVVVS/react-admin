import React, {useEffect, useImperativeHandle, useMemo, useState} from "react";
import {Button, Form, Input, InputNumber, Select, Space, Switch} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, CloseCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {ColumnEditorProps, ColumnItemPops} from "./interface";
import {RaTableColumnType} from "../../pages/table/interface";
import EnumInput from "./EnumInput";
import {SortableContext} from "@dnd-kit/sortable";
import {DndContext} from "@dnd-kit/core";
// "string" | "boolean" | "enum" | "datetime" | "date" | "time" | "object" | "custom";
const ColumnItemTypeOption = [
    {value: 'string', label: '字符串'},
    {value: 'number', label: '数字'},
    {value: 'boolean', label: '布尔'},
    {value: 'image', label: '图片'},
    {value: 'enum', label: '枚举'},
    {value: 'datetime', label: '日期时间'},
    {value: 'date', label: '日期'},
    {value: 'time', label: '时间'},
    {value: 'custom', label: '自定义'},
    {value: 'relevance', label: '表关联'},

];


const ColumnItem: React.FC<ColumnItemPops> = (props) => {
    const [columnItemType, setColumnItem] = useState<RaTableColumnType | undefined>(props.initValue ? props.initValue.type : undefined);
    const [show, setShow] = useState<boolean>(props.initValue ? props.initValue.show : true)

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
                <Select options={ColumnItemTypeOption} style={{width: 120}} onSelect={(e) => {
                    console.log(e)
                }} onChange={setColumnItem}/>
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
                <Switch onChange={(checked) => setShow(checked)}/>
            </Form.Item>
        </>
    }, []);

    const widthInput = useMemo(() => {
        if (!show) return null;
        return <Form.Item label="列宽度" name={[props.name, 'width']}>
            <InputNumber placeholder="当前列在表格中的宽度"/>
        </Form.Item>
    }, [show]);

    const typeInput = useMemo(() => {
        switch (columnItemType) {
            case "enum":
                return <Form.Item label="枚举数据" name={[props.name, 'enum']} rules={rules.enum}>
                    {/*<Input placeholder="请输入枚举列表，以英文逗号分割"/>*/}
                    <EnumInput/>
                </Form.Item>
            case "custom":
                return <Form.Item label="组件映射Key" name={[props.name, 'component']} rules={rules.component}>
                    <Input placeholder="请输入组件映射Key"/>
                </Form.Item>
            case "relevance":
                return <>
                    <Form.Item label="关联表表名" name={[props.name, 'table_name']}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="关联显示字段" name={[props.name, 'field_name']}>
                        <Input/>
                    </Form.Item>
                </>
            case "image":
                return <Form.Item label="允许选择个数" name={[props.name, 'count']}>
                    <InputNumber/>
                </Form.Item>
            default:
                return null;
        }
    }, [columnItemType]);

    return <Space>
        {base}
        {widthInput}
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
        <DndContext>
            <Form.List name="columns" initialValue={props.value}>
                {(fields, {add, remove, move}) => (
                    <>
                        <Form.Item>
                            <Button type="primary" onClick={() => add(defaultValue)}>
                                添加字段
                            </Button>
                        </Form.Item>
                        {fields.map(({key, name, ...restField}) => (
                            <Space key={key} style={{display: 'flex', marginBottom: 8, alignItems: "center"}}
                                   align="baseline">
                                {/*<Space.Compact>*/}
                                {/*    <Button icon={<ArrowUpOutlined/>} disabled={name === 0} onClick={() => {*/}
                                {/*        move(name, 0);*/}
                                {/*    }}/>*/}
                                {/*    <Button icon={<ArrowDownOutlined/>} disabled={name === fields.length - 1}*/}
                                {/*            onClick={() => {*/}
                                {/*                // move(name, name + 1);*/}
                                {/*            }}/>*/}
                                {/*</Space.Compact>*/}
                                <ColumnItem key={key} name={name} initValue={props.value?.[name] ?? undefined}/>
                                <Button icon={<CloseCircleOutlined/>} onClick={() => remove(name)}/>
                            </Space>
                        ))}
                    </>
                )}
            </Form.List>
        </DndContext>

    </Form>
})


export default ColumnEditor;
