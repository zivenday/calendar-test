
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


受控模式
const [value,setValue]=useState(xxx)
const handleChange=(e)=>{setValue(e.target.value+'!')}
<component value='value' onChange={handleChange}></component>

```

所以这个组件要用什么模式是用户怎么用来说的。

在不知道用户怎么用的情况下，基础组件就要摸着两种模式并存。

这部分逻辑的hook化就有了这个hook了
