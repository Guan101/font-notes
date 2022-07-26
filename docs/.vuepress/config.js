// module.exports = {
//   title: "首页", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
//   description: "guan的前端记录", // meta 中的描述文字，用于SEO
//   // 注入到当前页面的 HTML <head> 中的标签
//   head: [
//     [
//       "link",
//       { rel: "icon", href: "/lufi.jpg" },
//       //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
//     ],
//   ],
//   themeConfig: {
//     logo: "/lufi.jpg", //网页顶端导航栏左上角的图标
//     //顶部导航栏
//     nav: [
//       //格式一：直接跳转，'/'为不添加路由，跳转至首页
//       { text: "首页", link: "/" },

//       //格式二：添加下拉菜单，link指向的文件路径
//       // {
//       //     text: '分类',  //默认显示
//       //     ariaLabel: '分类',   //用于识别的label
//       //     items: [
//       //         // { text: '文章', link: '/pages/folder1/test1.md' },
//       //         //点击标签会跳转至link的markdown文件生成的页面
//       //         // { text: '琐碎', link: '/pages/folder2/test4.md' },
//       //     ]
//       // },
//       // { text: '功能演示', link: '/pages/folder1/test3.md' },
//       //格式三：跳转至外部网页，需http/https前缀
//       // { text: 'Github', link: 'https://github.com/Guan101/font-notes' },
//     ],
//     //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
//     // sidebar: [
//     //   {
//     //     title: "TS", // 一级菜单名称
//     //     Push:"/docs/pages/TS",
//     //     collapsable: true, // false为默认展开菜单, 默认值true是折叠,
//     //     // sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
//     //     children: [
//     //       ["基础类型.md", "基础类型"], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
//     //       ["test2.md", "test2"],
//     //     ],
//     //   },
//     //   {
//     //     title: "其他", // 一级菜单名称
//     //     Push:"/docs/pages/folder2",
//     //     collapsable: true, // false为默认展开菜单, 默认值true是折叠,
//     //     // sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
//     //     children: [
//     //       ["test2.md", "test4"], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
//     //     ],
//     //   },
//     // ],
//     sidebar: {
//       "/index/": [
//         // 侧边栏在 /index/ 目录上
//         {
//           title: "TS",
//           collapsable: true,
//           children: [
//         {"/index/TS/基础类型.md" ,'基础类型'
//     }   ,        { "/index/TS/test2.md" ,'test2'},
//           ],
//         },

//         // 侧边栏在 /others/ 目录上
//         {
//           title: "其它",
//           collapsable: true,
//           children: ["/index/others/test4.md"],
//         },
//       ],
//     },
//   },
// };
module.exports = {
    title: '前端乐园',
    description: '牛魔王的博客',
    head: [],
    plugins: [],
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '生活', link: '/life/'},
            { text: '学习',
                items: [
                    { text: '数学', link: '/study/math/math1' },
                ]
            }
			],
        sidebar: {
            '/study/': [
                {
                    title: 'TS',
                    collapsable: true,
                    children: [
                        { title: '基础类型', path: '/study/TS/基础类型' },
                        { title: '任意类型', path: '/study/TS/任意类型' },
                    ]
                },
                {
                    title: '其他',
                    collapsable: true,
                    children: [
                        { title: '阿松大', path: '/study/math/math1' },
                    ]
                }
            ],
        },
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated'
    }
}