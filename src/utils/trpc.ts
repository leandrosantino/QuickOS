import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../electron/server/routers/index';
export const api = createTRPCReact<AppRouter>();