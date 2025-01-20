import { useState, useTransition } from "react";

async function updateNameApi(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success set name:" + name);
    }, 1000);
  });
}

// Using pending state from Actions
export function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateNameApi(name);
      if (error) {
        setError(error);
        return;
      }
      setError(null);
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      <p>loading: {isPending ? "true" : "false"}</p>
      {error && <p>{error}</p>}
    </div>
  );
}
