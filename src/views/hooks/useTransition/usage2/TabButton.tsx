import { PropsWithChildren, useTransition } from "react";

export default function TabButton({
  children,
  isActive,
  onClick,
}: PropsWithChildren<{ isActive: boolean; onClick: () => void }>) {
  const [, setTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        setTransition(() => {
          onClick();
        });
      }}
    >
      {children}
    </button>
  );
}
