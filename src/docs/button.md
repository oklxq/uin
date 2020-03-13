
## 类型

包含**6种**不同类型的按钮

<u-btn>确定</u-btn>
<u-btn type='primary'>确定</u-btn>
<u-btn type='error'>确定</u-btn>
<u-btn type='success'>确定</u-btn>
<u-btn type='warning'>确定</u-btn>
<u-btn type='link'>link</u-btn>

``` html
<u-btn>确定</u-btn>
<u-btn type='primary'>确定</u-btn>
<u-btn type='error'>确定</u-btn>
<u-btn type='success'>确定</u-btn>
<u-btn type='warning'>确定</u-btn>
<u-btn type='link'>link</u-btn>
```

:::tip
也可使用 `u-button` 
:::

## 禁用状态

可使用 `disabled` 属性禁用按钮

<u-btn disabled>已禁用</u-btn>
<u-btn type='primary' disabled>已禁用</u-btn>
<u-btn type='error' disabled>已禁用</u-btn>
<u-btn type='success' disabled>已禁用</u-btn>
<u-btn type='warning' disabled>已禁用</u-btn>

``` html
<u-btn type='warning' disabled>已禁用</u-btn>
```

## 加载状态

可使用 `loading` 属性切换按钮的加载状态

<u-btn loading>确定</u-btn>
<u-btn type='primary' loading>确定</u-btn>
<u-btn type='error' loading>确定</u-btn>
<u-btn type='success' loading>确定</u-btn>
<u-btn type='warning' loading>确定</u-btn>
<u-btn type='link' loading>link</u-btn>

``` html
<u-btn type='primary' loading>确定</u-btn>
<u-btn type='primary' :loading="isLoading">确定</u-btn>
```

## 按钮尺寸

包含3种不同尺寸的按钮

<u-btn type='primary' size='sm'>确定</u-btn>
<u-btn type='primary'>确定</u-btn>
<u-btn type='primary' size='lg'>确定</u-btn>

``` html
<u-btn type='primary' size='sm'>确定</u-btn>
<u-btn type='primary'>确定</u-btn>
<u-btn type='primary' size='lg'>确定</u-btn>
```

