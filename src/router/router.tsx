import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import Home from '../pages/Home';
import Details from '../pages/Details';

// Your existing root route
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

// ✅ Make sure this is present
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

// ✅ Add routes to tree
const routeTree = rootRoute.addChildren([indexRoute, detailsRoute]);

// ✅ Export router
export const router = createRouter({ routeTree });

// Required for type inference
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
