### `useActionState(action, initialState, permalink?)`

在组件的顶层调用 `useActionState` 即可创建一个随 [表单动作被调用](https://zh-hans.react.dev/reference/react-dom/components/form) 而更新的 state。在调用 `useActionState` 时在参数中传入现有的表单动作函数以及一个初始状态，无论 Action 是否在 pending 中，它都会返回一个新的 action 函数和一个 form state 以供在 form 中使用。这个新的 form state 也会作为参数传入提供的表单动作函数。

```
import { useActionState } from "react";



async function increment(previousState, formData) {

  return previousState + 1;

}



function StatefulForm({}) {

  const [state, formAction] = useActionState(increment, 0);

  return (

    <form>

      {state}

      <button formAction={formAction}>+1</button>

    </form>

  )

}
```

form state 是一个只在表单被提交触发 action 后才会被更新的值。如果该表单没有被提交，该值会保持传入的初始值不变。

如果与服务器函数一起使用，`useActionState` 允许与表单交互的服务器的返回值在激活完成前显示。

[请参阅下方更多示例](https://zh-hans.react.dev/reference/react/useActionState#usage)。

#### 参数

- `fn`：当按钮被按下或者表单被提交时触发的函数。当函数被调用时，该函数会接收到表单的上一个 state（初始值为传入的 `initialState` 参数，否则为上一次执行完该函数的结果）作为函数的第一个参数，余下参数为普通表单动作接到的参数。
- `initialState`：state 的初始值。任何可序列化的值都可接收。当 action 被调用一次后该参数会被忽略。
- **可选的** `permalink`: A string containing the unique page URL that this form modifies. For use on pages with dynamic content (eg: feeds) in conjunction with progressive enhancement: if `fn` is a [server function](https://zh-hans.react.dev/reference/rsc/server-functions) and the form is submitted before the JavaScript bundle loads, the browser will navigate to the specified permalink URL, rather than the current page’s URL. Ensure that the same form component is rendered on the destination page (including the same action `fn` and `permalink`) so that React knows how to pass the state through. Once the form has been hydrated, this parameter has no effect.

#### 返回值

`useActionState` 返回一个包含以下值的数组：

1. 当前的 state。第一次渲染期间，该值为传入的 `initialState` 参数值。在 action 被调用后该值会变为 action 的返回值。
2. 一个新的 action 函数用于在你的 `form` 组件的 `action` 参数或表单中任意一个 `button` 组件的 `formAction` 参数中传递。这个 action 也可以手动在 [`startTransition`](https://zh-hans.react.dev/reference/react/startTransition) 中调用。
3. 一个 `isPending` 标识，用于表明是否有正在 pending 的 Transition。

#### 注意

- 在支持 React 服务器组件的框架中使用该功能时，`useActionState` 允许表单在服务器渲染阶段时获得部分交互性。当不使用服务器组件时，它的特性与本地 state 相同。
- 与直接通过表单动作调用的函数不同，传入 `useActionState` 的函数被调用时，会多传入一个代表 state 的上一个值或初始值的参数作为该函数的第一个参数。
