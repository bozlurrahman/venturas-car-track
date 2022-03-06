// Imports
import Vue from 'vue'
import Router from 'vue-router'
import auth from '../middleware/auth'
import log from '../middleware/log'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Public', [
      route('Login', 'Login', '/', { middleware: log }),
    ]),
    layout('Default', [
      // Pages
      route('Dashboard', null, 'dashboard', { middleware: [log, auth] }),
      route('UserProfile', null, 'profile', { middleware: log }),

      // Components
      route('Notifications', null, 'notifications', { middleware: log }),
      route('Icons', null, 'icons', { middleware: log }),
      route('Typography', null, 'typography', { middleware: log }),

      // Tables
      route('Regular Tables', null, 'tables/regular', { middleware: log }),

      // Maps
      route('Google Maps', null, 'maps/google', { middleware: log }),
    ]),
  ],
})

// router.beforeEach((to, from, next) => {
//   return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
// })

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory (context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
