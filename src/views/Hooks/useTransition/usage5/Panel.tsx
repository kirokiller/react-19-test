import { PropsWithChildren } from "react";

export default function Panel({ children }: PropsWithChildren) {
  return <section className="panel">{children}</section>;
}
