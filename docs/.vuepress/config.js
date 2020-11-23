module.exports = {
    title: '边见众生，边见自己',
    description: '我可以从天黑睡到天亮，再从天亮睡到天黑',
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
            { text: 'Github', link: 'https://github.com/thread-zhou' },
        ],
        // 自动形成侧边导航
        sidebar: 'auto',
        // sidebar: {
        //     '/fell/': [
        //         '',
        //         'index'
        //     ],
        //     '/socket/': [
        //       '',
        //       'simple_example'
        //     ],
        //     '/': [
        //         '',
        //     ],
        //   },
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
        logo: '/logo.png',
        authorAvatar: '/logo.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        sidebarDepth: 4,
        displayAllHeaders: true, // 显示所有页面的标题链接
        // string | boolean  最后更新时间
        lastUpdated: 'Last Updated', 
        // 作者
        author: '拂衣',
        // 备案号
        record: '浙ICP备20000064号',
        // 项目开始时间，只填写年份
        startYear: '2020',
        // 友链
        friendLink: [
            {
                title: 'ZhouJian 的个人博客',
                desc: '边见众生，边见自己，日拱一卒，不期速成！',
                email: 'thread_zhou@126.com',
                link: 'http://blog.zhoujian.site/'
            }
        ]
    }
}
