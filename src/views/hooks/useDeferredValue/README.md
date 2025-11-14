#### 参数

- `value`：你想延迟的值，可以是任何类型。

#### 返回值

在组件的初始渲染期间，返回的延迟值将与你提供的值相同。但是在组件更新时，React 将会先尝试使用旧值进行重新渲染（因此它将返回旧值），然后再在后台使用新值进行另一个重新渲染（这时它将返回更新后的值）。

#### 注意事项

- 你应该向 `useDeferredValue` 传递原始值（如字符串和数字）或在渲染之外创建的对象。如果你在渲染期间创建了一个新对象，并立即将其传递给 `useDeferredValue`，那么每次渲染时这个对象都会不同，这将导致后台不必要的重新渲染。
- 当 `useDeferredValue` 接收到与之前不同的值（使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 进行比较）时，除了当前渲染（此时它仍然使用旧值），它还会安排一个后台重新渲染。这个后台重新渲染是可以被中断的，如果 `value` 有新的更新，React 会从头开始重新启动后台渲染。举个例子，如果用户在输入框中的输入速度比接收延迟值的图表重新渲染的速度快，那么图表只会在用户停止输入后重新渲染。
- `useDeferredValue` 与 [``](https://react.docschina.org/reference/react/Suspense) 集成。如果由于新值引起的后台更新导致 UI 暂停，用户将不会看到后备方案。他们将看到旧的延迟值，直到数据加载完成。
- `useDeferredValue` 本身并不能阻止额外的网络请求。
- `useDeferredValue` 本身不会引起任何固定的延迟。一旦 React 完成原始的重新渲染，它会立即开始使用新的延迟值处理后台重新渲染。由事件（例如输入）引起的任何更新都会中断后台重新渲染，并被优先处理。
- 由 `useDeferredValue` 引起的后台重新渲染在提交到屏幕之前不会触发 Effect。如果后台重新渲染被暂停，Effect 将在数据加载后和 UI 更新后运行。

#### 用法

- [在新内容加载期间显示旧内容。](https://react.docschina.org/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading)
- [表明内容已过时](https://react.docschina.org/reference/react/useDeferredValue#indicating-that-the-content-is-stale)
- [延迟渲染 UI 的某些部分](https://react.docschina.org/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui)
