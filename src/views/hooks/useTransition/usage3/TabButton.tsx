import { PropsWithChildren, useTransition } from "react";

export default function TabButton({
  children,
  isActive,
  onClick,
}: PropsWithChildren<{ isActive: boolean; onClick: () => void }>) {
  const [isPending, setTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>;
  }

  if (isPending) {
    return <b className="pending">{children}</b>;
  }

  return (
    <button
      className=""
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
