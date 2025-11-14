import { PropsWithChildren, useTransition } from "react";

export default function TabButton({
  children,
  isActive,
  action,
}: PropsWithChildren<{ isActive: boolean; action: () => void }>) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>;
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button
      onClick={() => {
        startTransition(() => {
          action();
        });
      }}
    >
      {children}
    </button>
  );
}
