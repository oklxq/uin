module.exports = {
    title: 'uin',
    base: '/uin/',
    themeConfig: {
        sidebarDepth: 2,
        sidebar: [
            {
                title: '基础组件',
                children: [
                    ['/button', '按钮'],
                    ['/icon', '图标'],
                    ['/tab', 'Tab'],
                ]
            },

            {
                title: '表单组件',
                children: [
                    ['/input', '输入框'],
                    ['/radio', '单选框'],
                    ['/checkbox', '复选框'],
                    ['/select', '下拉框'],
                ]
            }
        ]
    }
}