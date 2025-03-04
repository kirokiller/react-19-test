import { memo } from "react";

/**
 * 这个优化需要将 SlowList 包裹在 memo 中。这是因为每当 text 改变时，React 需要能够快速重新渲染父组件。
 * 在重新渲染期间，deferredText 仍然保持着之前的值，因此 SlowList 可以跳过重新渲染（它的 props 没有改变）。
 * 如果没有 memo，SlowList 仍会重新渲染，这将使优化失去意义。
 */
const SlowList = memo(function SlowList({ text }: { text: string }) {
  // 仅打印一次。实际的减速是在 SlowItem 组件内部。
  console.log("[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />");

  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return <ul className="items">{items}</ul>;
});

function SlowItem({ text }: { text: string }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 每个 item 暂停 1ms，模拟极其缓慢的代码
  }

  return <li className="item">Text: {text}</li>;
}

export default SlowList;
