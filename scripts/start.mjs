import { spawn } from "node:child_process";
const backend = process.env.BACKEND_ONLY === "1";
const args = backend
  ? ["--import", "tsx", "backend/server.ts"]
  : ["node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0"];
const child = spawn(process.execPath, args, { stdio: "inherit", env: process.env });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("error", () => { console.error("Unable to start the application."); process.exit(1); });
child.on("exit", (code) => process.exit(code ?? 1));
