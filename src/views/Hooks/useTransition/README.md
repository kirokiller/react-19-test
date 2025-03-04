## 参考

### `useTransition()`

在组件顶层调用 `useTransition`，将某些状态更新标记为 transition。

```
import { useTransition } from 'react';



function TabContainer() {

  const [isPending, startTransition] = useTransition();

  // ……

}
```

[参见下方更多示例](https://react.docschina.org/reference/react/useTransition#usage)。

#### 参数

`useTransition` 不需要任何参数。

#### 返回值

`useTransition` 返回一个由两个元素组成的数组：

1. `isPending`，告诉你是否存在待处理的 transition。
2. [`startTransition` 函数](https://react.docschina.org/reference/react/useTransition#starttransition)，你可以使用此方法将状态更新标记为 transition。

---

### `startTransition` 函数

`useTransition` 返回的 `startTransition` 函数允许你将状态更新标记为 transition。

```
function TabContainer() {

  const [isPending, startTransition] = useTransition();

  const [tab, setTab] = useState('about');



  function selectTab(nextTab) {

    startTransition(() => {

      setTab(nextTab);

    });

  }

  // ……

}
```

#### 参数

- 作用域（scope）：一个通过调用一个或多个 [`set` 函数](https://react.docschina.org/reference/react/useState#setstate) 更新状态的函数。React 会立即不带参数地调用此函数，并将在 `scope` 调用期间将所有同步安排的状态更新标记为 transition。它们将是非阻塞的，并且 [不会显示不想要的加载指示器](https://react.docschina.org/reference/react/useTransition#preventing-unwanted-loading-indicators)。

#### 返回值

`startTransition` 不返回任何值。

#### 注意

- `useTransition` 是一个 Hook，因此只能在组件或自定义 Hook 内部调用。如果需要在其他地方启动 transition（例如从数据库），请调用独立的 [`startTransition`](https://react.docschina.org/reference/react/startTransition) 函数。
- 只有在可以访问该状态的 `set` 函数时，才能将其对应的状态更新包装为 transition。如果你想启用 transition 以响应某个 prop 或自定义 Hook 值，请尝试使用 [`useDeferredValue`](https://react.docschina.org/reference/react/useDeferredValue)。
- 传递给 `startTransition` 的函数必须是同步的。React 会立即执行此函数，并将在其执行期间发生的所有状态更新标记为 transition。如果在其执行期间，尝试稍后执行状态更新（例如在一个定时器中执行状态更新），这些状态更新不会被标记为 transition。
- 标记为 transition 的状态更新将被其他状态更新打断。例如在 transition 中更新图表组件，并在图表组件仍在重新渲染时继续在输入框中输入，React 将首先处理输入框的更新，之后再重新启动对图表组件的渲染工作。
- transition 更新不能用于控制文本输入。
- 目前，React 会批处理多个同时进行的 transition。这是一个限制，可能会在未来版本中删除。

用法

- [将状态更新标记为非阻塞的 transition](https://react.docschina.org/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition)
- [在 transition 中更新父组件](https://react.docschina.org/reference/react/useTransition#updating-the-parent-component-in-a-transition)
- [在 transition 期间显示待处理的视觉状态](https://react.docschina.org/reference/react/useTransition#displaying-a-pending-visual-state-during-the-transition)
- [避免不必要的加载指示器](https://react.docschina.org/reference/react/useTransition#preventing-unwanted-loading-indicators)
- [构建一个 Suspense-enabled 的路由](https://react.docschina.org/reference/react/useTransition#building-a-suspense-enabled-router)
- [Displaying an error to users with an error boundary](https://react.docschina.org/reference/react/useTransition#displaying-an-error-to-users-with-error-boundary)
