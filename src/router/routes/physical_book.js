export default [
  {
    path: '/apps/physical_book',
    name: 'apps-physical_book',
    component: () => import('@/views/physicalBook/vue-good-table/GoodTableAdvanceSearch'),
    meta: {
      pageTitle: 'Physical Book',
    },
  },
  {
    path: '/apps/physical_book/create',
    name: 'createPhysicalBook ',
    component: () => import('@/views/physicalBook/create'),
    meta: {
      pageTitle: 'Create Physical  Book',
    },
  },

]
