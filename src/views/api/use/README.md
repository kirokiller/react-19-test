## 参考

### `use(resource)` version 19

在组件中调用 `use` 以读取类似于 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或 [context](https://react.docschina.org/learn/passing-data-deeply-with-context) 的资源的值。

```
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);

  // ...
```

与其他 React Hook 不同的是，可以在循环和条件语句（如 `if`）中调用 `use`。但需要注意的是，调用 `use` 的函数仍然必须是一个组件或 Hook。

当使用 Promise 调用 `use` Hook 时，它会与 [`Suspense`](https://react.docschina.org/reference/react/Suspense) 和 [错误边界](https://react.docschina.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary) 集成。当传递给 `use` 的 Promise 处于 pending 时，调用 `use` 的组件也会 **挂起**。如果调用 `use` 的组件被包装在 Suspense 边界内，将显示后备 UI。一旦 Promise 被解决，Suspense 后备方案将被使用 `use` Hook 返回的数据替换。如果传递给 `use` 的 Promise 被拒绝，将显示最近错误边界的后备 UI。

[参见下方更多示例)(#usage)。

#### 参数

- `resource`：想要从中读取值的数据源。资源可以是 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或 [context](https://react.docschina.org/learn/passing-data-deeply-with-context)。

#### 返回值

`use` Hook 返回从资源中读取的值，类似于 fullfilled [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 或 [context](https://react.docschina.org/learn/passing-data-deeply-with-context)。

#### 注意

- `use` Hook 必须在组件或 Hook 内部调用。
- 在 [服务器组件](https://react.docschina.org/reference/react/use-server) 中获取数据时，应优先使用 `async` 和 `await` 而不是 `use`。`async` 和 `await` 会从调用 `await` 的点开始渲染，而 `use` 会在数据获取到后重新渲染组件。
- 在 [服务器组件](https://react.docschina.org/reference/react/use-server) 中创建 Promise 并将其传递给 [客户端组件](https://react.docschina.org/reference/react/use-client) 优于在客户端组件中创建 Promise。在客户端组件中创建的 Promise 每次渲染都会重新创建。从服务器组件传递到客户端组件的 Promise 在重新渲染时保持稳定。[请参阅此示例](https://react.docschina.org/reference/react/use#streaming-data-from-server-to-client)。

## 用法

- [使用 `use` 读取 context](https://react.docschina.org/reference/react/use#reading-context-with-use)
- [将数据从服务器流式传递给客户端](https://react.docschina.org/reference/react/use#streaming-data-from-server-to-client)
- [处理 rejected Promise](https://react.docschina.org/reference/react/use#dealing-with-rejected-promises)
