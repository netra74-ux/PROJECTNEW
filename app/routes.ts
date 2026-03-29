import { type RouteConfig, index, route, layout, prefix } from '@react-router/dev/routes';

const devRoutes = import.meta.env.DEV ? prefix('dev', [route('components', 'dev/components.tsx')]) : [];

export default [
  layout('components/app-layout/app-layout.tsx', [
    index('routes/home.tsx'),
    route('contacts', 'routes/contacts.tsx'),
    route('logs', 'routes/logs.tsx'),
    route('settings', 'routes/settings.tsx'),
  ]),
  ...devRoutes,
] satisfies RouteConfig;
