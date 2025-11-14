## 参考

### `useContext(SomeContext)`

在组件的顶层调用 `useContext` 来读取和订阅 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。

```
import { useContext } from 'react';



function MyComponent() {

  const theme = useContext(ThemeContext);

  // ...
```

[请看下方更多示例。](https://zh-hans.react.dev/reference/react/useContext#usage)

#### 参数

- `SomeContext`：先前用 [`createContext`](https://zh-hans.react.dev/reference/react/createContext) 创建的 context。context 本身不包含信息，它只代表你可以提供或从组件中读取的信息类型。

#### 返回值

`useContext` 为调用组件返回 context 的值。它被确定为传递给树中调用组件上方最近的 `SomeContext.Provider` 的 `value`。如果没有这样的 provider，那么返回值将会是为创建该 context 传递给 [`createContext`](https://zh-hans.react.dev/reference/react/createContext) 的 `defaultValue`。返回的值始终是最新的。如果 context 发生变化，React 会自动重新渲染读取 context 的组件。

#### 注意事项

- 组件中的 `useContext()` 调用不受 **同一** 组件返回的 provider 的影响。相应的 `<Context.Provider>` 需要位于调用 `useContext()` 的组件 **之上**。
- 从 provider 接收到不同的 `value` 开始，React 自动重新渲染使用了该特定 context 的所有子级。先前的值和新的值会使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来做比较。使用 [`memo`](https://zh-hans.react.dev/reference/react/memo) 来跳过重新渲染并不妨碍子级接收到新的 context 值。
- 如果你的构建系统在输出中产生重复的模块（可能发生在符号链接中），这可能会破坏 context。通过 context 传递数据只有在用于传递 context 的 `SomeContext` 和用于读取数据的 `SomeContext` 是完全相同的对象时才有效，这是由 `===` 比较决定的。
