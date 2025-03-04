import { PropsWithChildren } from "react";

export default function TabButton({
  children,
  isActive,
  action,
}: PropsWithChildren<{ isActive: boolean; action: () => void }>) {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        action();
      }}
    >
      {children}
    </button>
  );
}
