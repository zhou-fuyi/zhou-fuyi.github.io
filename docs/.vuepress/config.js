module.exports = {
  title: '边见众生，边见自己',
  description: '夫轻诺必寡信，多易必多难！',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  // 博客配置
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'Github', link: 'https://github.com/thread-zhou', icon: 'reco-github' },
    ],
    // 自动形成侧边导航
    sidebar: 'auto',
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    // 导航左侧logo
    logo: '/logo.png',
    // 首页头像
    authorAvatar: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 4,
    displayAllHeaders: true, // 显示所有页面的标题链接
    // string | boolean  最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'fuyi',
    // 备案号
    record: '浙ICP备20000064号',
    // 项目开始时间，只填写年份
    startYear: '2020',
    // 友链
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: '一款简洁而优雅的 vuepress 博客 & 文档 主题。',
        link: 'https://vuepress-theme-reco.recoluan.com/'
      }
    ]
  }
}
