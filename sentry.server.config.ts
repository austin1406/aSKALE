import * as Sentry from "@sentry/nextjs";

import { site } from "@/site.config";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Off until a DSN is set, so local dev and previews without keys stay quiet.
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  initialScope: { tags: { site: site.name } },
  tracesSampleRate: 0.1,
});
