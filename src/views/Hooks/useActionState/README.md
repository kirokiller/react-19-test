<!-- 这是一个服务端 用的 表单 hooks -->

# useActionState

`useActionState` is a Hook that allows you to update state based on the result of a form action.

```
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

### Note

In earlier React Canary versions, this API was part of React DOM and called `useFormState`.

- Reference
  - [`useActionState(action, initialState, permalink?)`](https://react.dev/reference/react/useActionState#useactionstate)
- Usage
  - [Using information returned by a form action](https://react.dev/reference/react/useActionState#using-information-returned-by-a-form-action)
- Troubleshooting
  - [My action can no longer read the submitted form data](https://react.dev/reference/react/useActionState#my-action-can-no-longer-read-the-submitted-form-data)

---

## Reference

### `useActionState(action, initialState, permalink?)`

Call `useActionState` at the top level of your component to create component state that is updated [when a form action is invoked](https://react.dev/reference/react-dom/components/form). You pass `useActionState` an existing form action function as well as an initial state, and it returns a new action that you use in your form, along with the latest form state and whether the Action is still pending. The latest form state is also passed to the function that you provided.

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

      <button formAction={formAction}>Increment</button>

    </form>

  )

}
```

The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.

If used with a Server Function, `useActionState` allows the server’s response from submitting the form to be shown even before hydration has completed.

[See more examples below.](https://react.dev/reference/react/useActionState#usage)

#### Parameters

- `fn`: The function to be called when the form is submitted or button pressed. When the function is called, it will receive the previous state of the form (initially the `initialState` that you pass, subsequently its previous return value) as its initial argument, followed by the arguments that a form action normally receives.
- `initialState`: The value you want the state to be initially. It can be any serializable value. This argument is ignored after the action is first invoked.
- **optional** `permalink`: A string containing the unique page URL that this form modifies. For use on pages with dynamic content (eg: feeds) in conjunction with progressive enhancement: if `fn` is a [server function](https://react.dev/reference/rsc/server-functions) and the form is submitted before the JavaScript bundle loads, the browser will navigate to the specified permalink URL, rather than the current page’s URL. Ensure that the same form component is rendered on the destination page (including the same action `fn` and `permalink`) so that React knows how to pass the state through. Once the form has been hydrated, this parameter has no effect.

#### Returns

`useActionState` returns an array with the following values:

1. The current state. During the first render, it will match the `initialState` you have passed. After the action is invoked, it will match the value returned by the action.
2. A new action that you can pass as the `action` prop to your `form` component or `formAction` prop to any `button` component within the form. The action can also be called manually within [`startTransition`](https://react.dev/reference/react/startTransition).
3. The `isPending` flag that tells you whether there is a pending Transition.

#### Caveats

- When used with a framework that supports React Server Components, `useActionState` lets you make forms interactive before JavaScript has executed on the client. When used without Server Components, it is equivalent to component local state.
- The function passed to `useActionState` receives an extra argument, the previous or initial state, as its first argument. This makes its signature different than if it were used directly as a form action without using `useActionState`.

原型

```typescript
export function useActionState<State>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string
): [state: Awaited<State>, dispatch: () => void, isPending: boolean];
export function useActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string
): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean];
// state: 状态值
// action: dispatch 更新函数
// initialState: 初始值
```

```tsx
import { startTransition, useActionState, useState } from "react";

async function updateNameApi(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success set name:" + name);
    }, 1000);
  });
}

// Using pending state from Actions
export function UpdateName() {
  const [error, submitAction, isPending] = useActionState<string | null, string>(
    async (previousState, newName) => {
      const error = await updateNameApi(newName);
      if (error) {
        return error;
      }
      return null;
    },
    // initialState
    null
  );
  const [name, setName] = useState("");

  const handleClick = () => {
    /**
      直接调用submitAction将导致错误提示：
      An async function was passed to useActionState, but it was dispatched outside of an action context. This is likely not what you intended. Either pass the dispatch function to an action prop, or dispatch manually inside startTransition

      React 19 将<form> 与 Actions 集成，from 的提交被视为action 所以无此问题
    */

    // 使用 startTransition 包裹异步调用
    startTransition(() => {
      submitAction(name);
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleClick} disabled={isPending}>
        Update
      </button>
      <p>loading: {isPending ? "true" : "false"}</p>
      {error && <p>{error}</p>}
    </div>
  );
}
```
