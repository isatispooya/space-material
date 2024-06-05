import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
    {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
    children:[ 
      {
    title: 'data1',
    path: '/products',
    icon: icon('ic_cart')
  },
    {title: 'data2',
    path: '/products',
    icon: icon('ic_cart'),
    children:[
      {
        title: 'data3',
        path: '/products',
        icon: icon('ic_cart'),
        children:[

          {title: 'data4',
          path: '/products',
          icon: icon('ic_cart'),
          children:[

            {title: 'data5',
            path: '/products',
            icon: icon('ic_cart'),}
          ]
        }

        ]

      },
    ]
  }
  ]
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
