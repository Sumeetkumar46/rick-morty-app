import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import Home from '../pages/Home';
import Details from '../pages/Details';

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <h1
        style={{
          textAlign: 'center',
          textDecoration: 'underline',
          marginTop: '1.5rem',
          fontSize: '2rem',
        }}
      >
        Rick & Morty App
      </h1>
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/details/$id',
  component: Details,
});

const routeTree = rootRoute.addChildren([indexRoute, detailsRoute]);

// ✅ Add basepath for GitHub Pages deployment
export const router = createRouter({
  routeTree,
  basepath: '/rick-morty-app', // 👈 Required for GitHub Pages
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
