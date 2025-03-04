import { PropsWithChildren } from "react";

export default function Layout({ children, isPending }: PropsWithChildren<{ isPending: boolean }>) {
  return (
    <div className="layout">
      <section
        className="header"
        style={{
          opacity: isPending ? 0.7 : 1,
        }}
      >
        Music Browser
      </section>
      <main>{children}</main>
    </div>
  );
}
