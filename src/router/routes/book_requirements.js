export default [
  {
    path: '/apps/book_requirements',
    name: 'apps-book_requirements',
    component: () => import('@/views/bookRequirements/vue-good-table/GoodTableAdvanceSearch'),
    meta: {
      pageTitle: 'Book Requirements',
      breadcrumb: [
        {
          text: 'Requirements',
        },
        {
          text: 'Book Requirements',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/bookRequirements/creat_book_requirements',
    name: 'creatBookRequirements',
    component: () => import('@/views/bookRequirements/createResources'),
    meta: {
      pageTitle: 'Creat Book Requirements',
    },
  },
  {
    path: '/apps/bookRequirements/edit_book_requirements/:id',
    name: 'editBookRequirements',
    component: () => import('@/views/bookRequirements/editResources'),
    meta: {
      pageTitle: 'Edit Book Requirements',
    },
  },
]
