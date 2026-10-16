import { createServer } from "node:http";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { GET as availability, POST as checkout } from "../app/api/checkout/route";
import { POST as contact } from "../app/api/contact/route";
import { POST as newsletter } from "../app/api/newsletter/route";
import { GET as status } from "../app/api/orders/status/route";
import { POST as webhook } from "../app/api/webhooks/stripe/route";

type Handler = (request: Request) => Response | Promise<Response>;
const routes: Record<string, Record<string, Handler>> = {
  "/api/health": { GET: () => Response.json({ status: "ok" }) },
  "/api/checkout": { GET: availability, POST: checkout },
  "/api/contact": { POST: contact },
  "/api/newsletter": { POST: newsletter },
  "/api/orders/status": { GET: status },
  "/api/webhooks/stripe": { POST: webhook },
};

const port = Number(process.env.PORT || 10000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be a valid TCP port.");
const server = createServer({ requestTimeout: 60000, headersTimeout: 15000, maxHeaderSize: 16384 }, async (incoming, outgoing) => {
  outgoing.setHeader("X-Content-Type-Options", "nosniff");
  outgoing.setHeader("Cache-Control", "no-store");
  try {
    const url = new URL(incoming.url || "/", "http://backend.internal");
    const route = routes[url.pathname];
    const method = incoming.method || "GET";
    if (!route) {
      outgoing.writeHead(404, { "Content-Type": "application/json" });
      outgoing.end(JSON.stringify({ error: "Endpoint not found." }));
      incoming.resume();
      return;
    }
    const handler = route[method];
    if (!handler) {
      outgoing.writeHead(405, { Allow: Object.keys(route).join(", "), "Content-Type": "application/json" });
      outgoing.end(JSON.stringify({ error: "Method not allowed." }));
      incoming.resume();
      return;
    }
    const headers = new Headers();
    for (const [name, value] of Object.entries(incoming.headers)) {
      if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(", ") : value);
    }
    const init: RequestInit & { duplex?: "half" } = { method, headers };
    if (method !== "GET" && method !== "HEAD") {
      init.body = Readable.toWeb(incoming) as ReadableStream<Uint8Array>;
      init.duplex = "half";
    }
    const response = await handler(new Request(url, init));
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) await pipeline(Readable.fromWeb(response.body as import("node:stream/web").ReadableStream), outgoing);
    else outgoing.end();
  } catch {
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "application/json" });
      outgoing.end(JSON.stringify({ error: "The service is temporarily unavailable. Please try again." }));
    } else outgoing.end();
  }
});
server.listen(port, "0.0.0.0", () => console.log(`API listening on port ${port}`));
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  });
}
