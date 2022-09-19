import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import uiElements from './routes/ui-elements/index'
import dashboard from './routes/dashboard'
import eResources from './routes/eResources'
import databaseUI from './routes/databaseUI'
import meetings from './routes/meetings'
import library_documents from './routes/library_documents'
import book_requirements from './routes/book_requirements'
import library_concerns from './routes/library_concerns'
import library_resource_concerns from './routes/library_resource_concerns'
import service_concerns from './routes/physical_book'
import pages from './routes/pages'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'apps-eResources' } },
    ...dashboard,
    ...library_concerns,
    ...library_resource_concerns,
    ...service_concerns,
    ...eResources,
    ...databaseUI,
    ...library_documents,
    ...meetings,
    ...book_requirements,
    ...uiElements,
    ...pages,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

export default router
