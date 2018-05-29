import Mock from 'mockjs'
let debug = 1;
if (debug) {
  Mock.mock(/login/, {
    "data": {
      userId: "@integer(1,10)",
      "userName|1": ["鲁班七号", "典韦", "蔡文姬", "王昭君", "妲己", "铠"]
    },
    "msg": "Success",
    "status": "YQ-000"
  })
  Mock.mock(/getMenu/, {
    "data": {
      menu: [
       /* {
          name: '项目管理',
          name_en: 'Projects',
          router: '',
          icon: 'el-icon-time',
          children: [{
            name: '开发备忘',
            name_en: 'Notes',
            router: '/project-info',
            icon: 'el-icon-date'
          }, {
            name: '关于作者',
            name_en: 'About',
            router: '/enroll-list',
            icon: 'el-icon-document'
          }]
        }, {
          name: '天气预报',
          name_en: 'Weather',
          router: '/weather',
          icon: 'el-icon-picture-outline',
          children: []
        }, {
          name: '魔幻立方',
          name_en: 'Cube',
          router: '/cube',
          icon: 'el-icon-menu',
          children: []
        }, {
          name: '魔幻立方1',
          name_en: 'Cube1',
          router: '/cube1',
          icon: 'el-icon-menu',
          children: []
        },*/
        {
          name: '物品列表',
          name_en: 'Articles',
          router: '/article-list',
          icon: 'el-icon-time',
          children: []
        }
        , {
          name: '物品借用',
          name_en: 'Borrow',
          router: '/borrow/borrowlist',
          icon: 'el-icon-time',
          children: []
        }, {
          name: '用户管理',
          name_en: 'User',
          router: '/user/userlist',
          icon: 'el-icon-time',
          children: []
        }
      ]
    },
    "msg": "Success",
    "status": "YQ-000"
  })
}
