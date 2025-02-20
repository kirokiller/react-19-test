import { useState } from "react";
import { MessageContainer, MessagePromise } from "./message";

function fetchMessage(): MessagePromise {
  return new Promise<string>((_, reject) => {
    reject();
  }).catch(() => {
    return "no new message found.";
  });
}

export default function App() {
  const [messagePromise, setMessagePromise] = useState<MessagePromise | null>(null);
  const [show, setShow] = useState(false);
  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  if (show) {
    return <MessageContainer messagePromise={messagePromise!} />;
  } else {
    return <button onClick={download}>Download message</button>;
  }
}
