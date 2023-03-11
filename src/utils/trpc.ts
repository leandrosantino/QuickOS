import { createTRPCReact, createTRPCProxyClient, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../server/routers/index';
export const api = createTRPCReact<AppRouter>();

export const fetch = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:9999/trpc',
        }),
    ],
});