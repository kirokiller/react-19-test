import { useState } from "react";
import SlowList from "./SlowList";

/**
 * 未使用useDeferredValue，每次text变化强制所有列表重渲染且无法中断，在输入中将导致卡顿
 */
export default function App() {
  const [text, setText] = useState("");
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  );
}
