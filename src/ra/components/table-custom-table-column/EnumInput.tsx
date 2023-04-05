import React, {useState} from "react";
import {Input} from "antd";
import {EnumInputProps} from "./interface";


const EnumInput: React.FC<EnumInputProps> = (props) => {
    const [value, setValue] = useState<string>(props.value ? props.value.join(',') : '');

    return <Input value={value} placeholder="请输入枚举列表，以英文逗号分割" onChange={(e) => {
        const value = e.target.value;
        setValue(value);
        props.onChange?.(value.split(","));
    }}/>
}

export default EnumInput;
