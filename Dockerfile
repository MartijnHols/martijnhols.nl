# Based on: https://nextjs.org/docs/deployment

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# image cache
RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

USER nextjs

EXPOSE 3000
ENV PORT 3000

# For some reason next.js can't find this by itself. To verify this, see the
# logs for this Docker container whenever an uncached image is requested. If
# sharp is not detected properly, next.js will suggest installing it.
ENV NEXT_SHARP_PATH /app/node_modules/sharp

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]

COPY ./.env ./next.config.js ./sm.json ./
# TODO: output standalone https://nextjs.org/docs/advanced-features/output-file-tracing
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json
COPY ./public ./public
COPY --chown=nextjs:nodejs ./.next ./.next
