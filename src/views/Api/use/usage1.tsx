import { createContext, use, type PropsWithChildren } from "react";
import "./usage1.css";

const ThemeContext = createContext<string | null>(null);

/* 使用 use 读取 context */
export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
  const theme = use(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ show, children }: PropsWithChildren<{ show: boolean }>) {
  if (show) {
    const theme = use(ThemeContext);
    const className = "button-" + theme;
    return <button className={className}>{children}</button>;
  }
  return false;
}
