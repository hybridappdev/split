import { useEffect, useRef, useState } from "react";
import { remotes, type RemoteModule } from "./host";

export function App() {
  return (
    <main className="shell">
      {remotes.map((remote) => (
        <Pane key={remote.name} name={remote.name} url={remote.url} />
      ))}
    </main>
  );
}

function Pane({ name, url }: { name: string; url: string }) {
  const body = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    const element = body.current;
    if (!element) return;
    let cancel = false;
    let unmount: void | (() => void);

    import(/* @vite-ignore */ url)
      .then((mod: RemoteModule) => {
        if (cancel) return;
        unmount = mod.mount(element);
        setStatus("");
      })
      .catch(() => {
        if (!cancel) setStatus(`${name} is not running.`);
      });

    return () => {
      cancel = true;
      unmount?.();
    };
  }, [name, url]);

  return (
    <section className="pane" aria-label={name}>
      <h1>{name}</h1>
      <div className="pane-body">
        <div ref={body} className="mount" />
        {status ? <p className="status">{status}</p> : null}
      </div>
    </section>
  );
}
