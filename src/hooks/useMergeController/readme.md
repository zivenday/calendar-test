
##### 受控与不受控组合钩子

受控和不受控为组件模式的两个面

### 受控模式

就是，这个组件的value受到调用方的控制。

### 非受控模式

就是外部提供默认value值，但是外部只是获取拿到组件值而已，不控制组件的value值，value值在组件内部进行更新。

比如一下。

```
非受控模式
const handleChange0=(e)=>{console.log(e.target.value)}
<component defaultValue='xxxx' onChange={handleChange0}></component>

component 内部：

需要把defaultValue转成value

const [value,setValue]=useSate(defaultValue)

return <div>{value}</div>
 



受控模式
const [value,setValue]=useState(xxx)
const handleChange=(e)=>{setValue(e.target.value+'!')}
<component value='value' onChange={handleChange}></component>

component 内部：

直接 return <div>{value}</div>

```

所以这个组件要用什么模式是用户怎么用来说的。

在不知道用户怎么用的情况下，基础组件就要摸着两种模式并存。

这部分逻辑的hook化就有了这个hook了

#### 回到兼容两种模式

如果把实现兼容模式转成一个需求，大概有这个几点：

1、如果组件只传入defalutValue，那么初始化要回显这个value，内部事件，自己维护内部value值，然后返回给外部。
2、如果组件传入value，不管有没有defautValue。都只回显value传值，更新也是随着value更新。
3、如果两个都没有，组件内容默认一个初始的值

那么具体怎么兼容两种模式呢？

有些同学可能会说？那不是很容易，如果有value传进来，就以value为主 ,在组件内部set里面的value值不就好了。不就好了。

可是这样或触发两次更新！

一次是外部value更新，传进来后，再一次set里面value。

所以兼容模式其中一个注意点是

##### 1、兼容模式不能触发多次更新，内部的维护的value值不需要和外部的value实时联动

下面是一个日历案例,做到了兼容两种模式：

```
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

interface CalanderProps {
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date) => void
}

const Calander = (props: CalanderProps) => {
  const { value: propsValue, defaultValue, onChange } = props

  const [value, setValue] = useState<Date>(() => {
    if (propsValue === undefined) {
      return defaultValue ? defaultValue : new Date()
    } else {
      return propsValue
    }
  })

  console.log('----', propsValue, value)

  const mergeValue = propsValue === undefined ? value : propsValue
  const tomorrow = () => {
    const current = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1)
    )
    if (propsValue === undefined) {
      setValue(current)
    }
    onChange?.(current)
  }

  const tomorrowAday = () => {
    const current = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 2)
    )
    if (propsValue === undefined) {
      setValue(current)
    }
    onChange?.(current)
  }
  return (
    <div>
      <div>组件值：{mergeValue.toLocaleDateString()}</div>
      <button onClick={tomorrow}>明天</button>
      <button onClick={tomorrowAday}>后天</button>
    </div>
  )
}

function App() {
  const [value, setValue] = useState(new Date('2024-7-29'))
  const handleChange = (value: Date) => {
    console.log('ppp', value)
    setValue(value)
  }
  return (
    <div className="App">
      <Calander defaultValue={new Date('2024-7-28')} value={value} onChange={handleChange}></Calander>
    </div>
  )
}

export default App

```

但是上面还有个缺陷：

##### 2、如果外部设置value为undefinded,那么怎么办呢？

如果外部设置了undefinded ,propsValue===undefinded 就没办法 用来判断是否是有外部传了value

此时的方法是监听propsValue的变化，如果发现外部value设置成了undefinded ,就要把内容的value也设成undefinded 这要回显的数据才是正确的。

加上以下代码

```
  useEffect(() => {
    if (propsValue === undefined) {
      setValue(propsValue)
    }
  }, [propsValue])

```

这样做还有些小问题，就是如果初始化的时候value是undefined

组件会刷新两次

所以改成这样就不会了

```
  const isFirst = useRef(true)
  useEffect(() => {
    if (propsValue === undefined && isFirst) {
      setValue(propsValue)
      isFirst.current = false
    }
  }, [propsValue])
```
