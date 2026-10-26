Desk and blotter share primitives and still release on their own.

This shell loads each app from its own dev server. It does not import either codebase. Shipping a change to blotter does not rebuild desk.

```bash
pnpm --dir ../desk dev
pnpm --dir ../blotter dev
pnpm dev
```

Desk is http://localhost:5001. Blotter is http://localhost:5002. This shell is http://localhost:5000.

[syedarshad.in](https://syedarshad.in)

[primitives](https://github.com/hybridappdev/primitives)

MIT
