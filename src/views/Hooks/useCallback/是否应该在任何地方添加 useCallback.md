#### 是否应该在任何地方添加 `useCallback`？

如果你的应用程序与本网站类似，并且大多数交互都很粗糙（例如替换页面或整个部分），则通常不需要缓存。另一方面，如果你的应用更像是一个绘图编辑器，并且大多数交互都是精细的（如移动形状），那么你可能会发现缓存非常有用。

使用 `useCallback` 缓存函数仅在少数情况下有意义：

- 将其作为 props 传递给包装在 [`memo`] 中的组件。如果 props 未更改，则希望跳过重新渲染。缓存允许组件仅在依赖项更改时重新渲染。
- 传递的函数可能作为某些 Hook 的依赖。比如，另一个包裹在 `useCallback` 中的函数依赖于它，或者依赖于 [`useEffect`](https://react.docschina.org/reference/react/useEffect) 中的函数。

在其他情况下，将函数包装在 `useCallback` 中没有任何意义。不过即使这样做了，也没有很大的坏处。所以有些团队选择不考虑个案，从而尽可能缓存。不好的地方可能是降低了代码可读性。而且，并不是所有的缓存都是有效的：一个始终是新的值足以破坏整个组件的缓存。

请注意，`useCallback` 不会阻止创建函数。你总是在创建一个函数（这很好！），但是如果没有任何东西改变，React 会忽略它并返回缓存的函数。

**在实践中, 你可以通过遵循一些原则来减少许多不必要的记忆化**：

1. 当一个组件在视觉上包装其他组件时，让它 [接受 JSX 作为子元素](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children)。随后，如果包装组件更新自己的 state，React 知道它的子组件不需要重新渲染。
2. 建议使用 state 并且不要 [提升状态](https://react.docschina.org/learn/sharing-state-between-components) 超过必要的程度。不要将表单和项是否悬停等短暂状态保存在树的顶部或全局状态库中。
3. 保持 [渲染逻辑纯粹](https://react.docschina.org/learn/keeping-components-pure)。如果重新渲染组件会导致问题或产生一些明显的视觉瑕疵，那么这是组件自身的问题！请修复这个错误，而不是添加记忆化。
4. 避免 [不必要地更新 Effect](https://react.docschina.org/learn/you-might-not-need-an-effect)。React 应用程序中的大多数性能问题都是由 Effect 的更新链引起的，这些更新链不断导致组件重新渲染。
5. 尝试 [从 Effect 中删除不必要的依赖关系](https://react.docschina.org/learn/removing-effect-dependencies)。例如，将某些对象或函数移动到副作用内部或组件外部通常更简单，而不是使用记忆化。

如果特定的交互仍然感觉滞后，[使用 React 开发者工具](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) 查看哪些组件在记忆化中受益最大，并在需要时添加记忆化。这些原则使你的组件更易于调试和理解，因此在任何情况下都最好遵循它们。从长远来看，我们正在研究 [自动记忆化](https://www.youtube.com/watch?v=lGEMwh32soc) 以一劳永逸地解决这个问题。
