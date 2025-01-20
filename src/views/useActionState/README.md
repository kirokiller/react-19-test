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
```

state: 状态值
action: dispatch 更新函数
initialState: 初始值

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

      React 19 将<form> 与 Actions 集成，from 的提交被视为action
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
