"use client";

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export type MessagePromise = Promise<string>;

function Message({ messagePromise }: { messagePromise: MessagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}

export function MessageContainer({ messagePromise }: { messagePromise: MessagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong.</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
