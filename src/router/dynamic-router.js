//需要权限判断的路由
export const dynamicRoutes = [
  {
    path: 'orgManage',
    name: 'OrgManage',
    component: () => import('@/views/orgManage/layout'),
    meta: { title: '机构管理', icon: '', activeIcon: '' },
    children: [{
      path: 'businessOrgManage',
      name: 'BusinessOrgManage',
      component: () => import('@/views/orgManage/businessOrgManage/index'),
      meta: { title: '业务机构管理', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'permissionManage',
    name: 'PermissionManage',
    component: () => import('@/views/permissionManage/layout'),
    meta: { title: '权限管理', icon: '', activeIcon: '' },
    children: [{
      path: 'userManage',
      name: 'UserManage',
      component: () => import('@/views/permissionManage/userManage/index'),
      meta: { title: '用户管理', icon: '', activeIcon: '' }
    },
    {
      path: 'menuManage',
      name: 'MenuManage',
      component: () => import('@/views/permissionManage/menuManage/index'),
      meta: { title: '菜单管理', icon: '', activeIcon: '' }
    },
    {
      path: 'roleManage',
      name: 'RoleManage',
      component: () => import('@/views/permissionManage/roleManage/index'),
      meta: { title: '角色管理', icon: '', activeIcon: '' }
    },
    {
      path: 'userRoleAllocation',
      name: 'UserRoleAllocation',
      component: () => import('@/views/permissionManage/userRoleAllocation/index'),
      meta: { title: '用户角色分配', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'bannerManage',
    name: 'BannerManage',
    component: () => import('@/views/bannerManage/layout'),
    meta: { title: '轮播图管理', icon: '', activeIcon: '' },
    children: [{
      path: 'index',
      name: 'SwiperIndex',
      component: () => import('@/views/bannerManage/index'),
      meta: { title: '轮播图管理', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'newsManage',
    name: 'NewsManage',
    component: () => import('@/views/newsManage/layout'),
    meta: { title: '资讯管理', icon: '', activeIcon: '' },
    children: [{
      path: 'index',
      name: 'NewsIndex',
      component: () => import('@/views/newsManage/index'),
      meta: { title: '资讯列表', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'videoManage',
    name: 'VideoManage',
    component: () => import('@/views/videoCategoryManage/layout'),
    meta: { title: '视频管理', icon: '', activeIcon: '' },
    children: [{
      path: 'category',
      name: 'CategoryManage',
      component: () => import('@/views/videoCategoryManage/categoryManage/index'),
      meta: { title: '分类管理', icon: '', activeIcon: '' }
    },
    {
      path: 'video',
      name: 'Video',
      component: () => import('@/views/videoCategoryManage/videoManage/Manage'),
      meta: { title: '视频管理', icon: '', activeIcon: '' }
    },
    {
      path: 'upload',
      name: 'VideoUpload',
      component: () => import('@/views/videoCategoryManage/videoManage/Upload'),
      meta: { title: '视频上传', icon: '', activeIcon: '' },
      hidden: true
    }]
  },
  {
    path: 'partnerManage',
    name: 'PartnerManage',
    component: () => import('@/views/partnerManage/layout'),
    meta: { title: '合伙人管理', icon: '', activeIcon: '' },
    children: [{
      path: 'list',
      name: 'Partner',
      component: () => import('@/views/partnerManage/partner/Index'),
      meta: { title: '合伙人管理', icon: '', activeIcon: '' },
    }, {
      path: 'edit/:id',
      name: 'PartnerEdit',
      hidden: true,
      component: () => import('@/views/partnerManage/partner/Edit'),
      meta: { title: '合伙人编辑', icon: '', activeIcon: '' }
    }, {
      path: 'infoCheck',
      name: 'PartnerInfoCheck',
      component: () => import('@/views/partnerManage/check/InfoCheck.vue'),
      meta: { title: '合伙人信息审核', icon: '', activeIcon: '' }
    }, {
      path: 'checkDetail/:id',
      name: 'PartnerInfoCheckDetail',
      hidden: true,
      component: () => import('@/views/partnerManage/check/Detail'),
      meta: { title: '审核详细', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'expertManage',
    name: 'ExpertManage',
    component: () => import('@/views/expertManage/layout'),
    meta: { title: '专家管理', icon: '', activeIcon: '' },
    children: [{
      path: 'list',
      name: 'Expert',
      component: () => import('@/views/expertManage/expert/Index'),
      meta: { title: '专家成员管理', icon: '', activeIcon: '' }
    }, {
      path: 'edit/:id',
      name: 'ExpertEdit',
      hidden: true,
      component: () => import('@/views/expertManage/expert/Edit'),
      meta: { title: '编辑专家', icon: '', activeIcon: '' }
    }, {
      path: 'check',
      name: 'ExpertInfoCheck',
      component: () => import('@/views/expertManage/check/Index'),
      meta: { title: '专家信息审核', icon: '', activeIcon: '' }
    }, {
      path: 'checkDetail/:id',
      name: 'ExpertInfoCheckDetail',
      hidden: true,
      component: () => import('@/views/expertManage/check/Detail'),
      meta: { title: '审核详细', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'customManage',
    name: 'CustomManage',
    component: () => import('@/views/customManage/layout'),
    meta: { title: '客户管理', icon: '', activeIcon: '' },
    children: [{
      path: 'list',
      name: 'Custom',
      component: () => import('@/views/customManage/custom/Index'),
      meta: { title: '客户管理', icon: '', activeIcon: '' }
    }, {
      path: 'edit/:id',
      name: 'CustomEdit',
      hidden: true,
      component: () => import('@/views/customManage/custom/Edit'),
      meta: { title: '编辑客户', icon: '', activeIcon: '' }
    }, {
      path: 'check',
      name: 'CustomInfoCheck',
      hidden: true,
      component: () => import('@/views/customManage/check/Index'),
      meta: { title: '客户信息审核', icon: '', activeIcon: '' }
    }, {
      path: 'checkDetail/:id',
      name: 'CustomInfoCheckDetail',
      hidden: true,
      component: () => import('@/views/customManage/check/Detail'),
      meta: { title: '审核详细', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'businessManage',
    name: 'BusinessManage',
    component: () => import('@/views/businessManage/layout'),
    meta: { title: '业务管理', icon: '', activeIcon: '' },
    children: [{
      path: 'list',
      name: 'Business',
      component: () => import('@/views/businessManage/business/Index'),
      meta: { title: '业务管理', icon: '', activeIcon: '' }
    },{
      path: 'edit/:id',
      name: 'BusinessEdit',
      hidden: true,
      component: () => import('@/views/businessManage/business/Edit'),
      meta: { title: '修改业务', icon: '', activeIcon: '' }
    }]
  },
  {
    path: 'serviceManage',
    name: 'ServiceManage',
    component: () => import('@/views/serviceManage/layout'),
    meta: { title: '服务管理', icon: '', activeIcon: '' },
    children: [{
      path: 'category/list',
      name: 'Category',
      component: () => import('@/views/serviceManage/category/Index'),
      meta: { title: '服务类别管理', icon: '', activeIcon: '' }
    }, {
      path: 'category/edit/:id',
      name: 'CategoryEdit',
      hidden: true,
      component: () => import('@/views/serviceManage/category/Edit'),
      meta: { title: '编辑服务类别', icon: '', activeIcon: '' }
    }, {
      path: 'template/list',
      name: 'Template',
      component: () => import('@/views/serviceManage/template/Index'),
      meta: { title: '合同模版管理', icon: '', activeIcon: '' }
    }, {
      path: 'template/edit/:id',
      name: 'TemplateEdit',
      hidden: true,
      component: () => import('@/views/serviceManage/template/Edit'),
      meta: { title: '编辑合同模版', icon: '', activeIcon: '' }
    }, {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/serviceManage/info/Index'),
      meta: { title: '服务信息管理', icon: '', activeIcon: '' }
    }, {
      path: 'info/edit/:id',
      name: 'InfoEdit',
      hidden: true,
      component: () => import('@/views/serviceManage/info/Edit'),
      meta: { title: '修改客户服务申请', icon: '', activeIcon: '' }
    }, {
      path: 'info/detail/:id',
      name: 'InfoDetail',
      hidden: true,
      component: () => import('@/views/serviceManage/info/Detail'),
      meta: { title: '查看客户服务申请详情', icon: '', activeIcon: '' }
    },
    {
      path: 'stageManage',
      name: 'stageManage',
      component: () => import('@/views/serviceManage/layout'),
      meta: { title: '服务阶段管理', icon: '', activeIcon: '' },
      children: [
        {
          path: 'start',
          name: 'Start',
          component: () => import('@/views/serviceManage/start/Index'),
          meta: { title: '服务启动管理', icon: '', activeIcon: '' }
        }, {
          path: 'start/detail/:id',
          name: 'StartDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/start/Detail'),
          meta: { title: '服务启动管理详情', icon: '', activeIcon: '' }
        },
        {
          path: 'negotiation',
          name: 'Negotiation',
          component: () => import('@/views/serviceManage/negotiation/Index'),
          meta: { title: '服务洽谈管理', icon: '', activeIcon: '' }
        }, {
          path: 'negotiation/detail/:id',
          name: 'NegotiationDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/negotiation/Detail'),
          meta: { title: '服务洽谈管理详情', icon: '', activeIcon: '' }
        }, {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/views/serviceManage/signup/Index'),
          meta: { title: '服务签约管理', icon: '', activeIcon: '' }
        }, {
          path: 'signup/detail/:id',
          name: 'SignupDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/signup/Detail'),
          meta: { title: '服务签约管理详情', icon: '', activeIcon: '' }
        }, {
          path: 'design',
          name: 'Design',
          component: () => import('@/views/serviceManage/design/Index'),
          meta: { title: '服务设计管理', icon: '', activeIcon: '' }
        }, {
          path: 'design/detail/:id',
          name: 'DesignDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/design/Detail'),
          meta: { title: '服务设计管理详情', icon: '', activeIcon: '' }
        }, {
          path: 'implement',
          name: 'Implement',
          component: () => import('@/views/serviceManage/implement/Index'),
          meta: { title: '服务实施管理', icon: '', activeIcon: '' }
        }, {
          path: 'implement/detail/:id',
          name: 'ImplementDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/implement/Detail'),
          meta: { title: '服务实施管理详情', icon: '', activeIcon: '' }
        }, {
          path: 'reach',
          name: 'Reach',
          component: () => import('@/views/serviceManage/reach/Index'),
          meta: { title: '服务达成管理', icon: '', activeIcon: '' }
        }, {
          path: 'reach/detail/:id',
          name: 'ReachDetail',
          hidden: true,
          component: () => import('@/views/serviceManage/reach/Detail'),
          meta: { title: '服务达成管理详情', icon: '', activeIcon: '' }
        }
      ]
    }]
  },
]
