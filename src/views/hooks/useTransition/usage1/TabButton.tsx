import { PropsWithChildren } from "react";

export default function TabButton({
  children,
  isActive,
  onClick,
}: PropsWithChildren<{ isActive: boolean; onClick: () => void }>) {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
