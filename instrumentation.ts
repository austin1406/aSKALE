import * as Sentry from "@sentry/nextjs";

// Loads Sentry on the server and edge runtimes. Errors go to one Sentry account, tagged by site.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
  if (process.env.NEXT_RUNTIME === "edge") await import("./sentry.edge.config");
}

// Reports errors thrown while rendering pages, route handlers and server actions.
export const onRequestError = Sentry.captureRequestError;
