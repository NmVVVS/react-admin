export interface Menu {
    title: string;
    key: string;
    icon: string;
    page: "Table" | "自定义";
    type: "菜单" | "目录";
    extra?: string;
    children: Menu[];
}
