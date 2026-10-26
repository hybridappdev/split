export const remotes = [
  { name: "Desk", url: "http://localhost:5001/src/remote.tsx" },
  { name: "Blotter", url: "http://localhost:5002/src/remote.tsx" },
] as const;

export type RemoteModule = {
  mount: (element: HTMLElement) => void | (() => void);
};
