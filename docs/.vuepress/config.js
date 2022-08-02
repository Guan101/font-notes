module.exports = {
  title: "前端乐园",
  description: "",
  head: [["script", { src: "/js/base.js" }]],
  plugins: [],
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
    ],
    sidebar: {
      "/study/": [
        {
          title: "TS",
          collapsable: true,
          children: [
            { title: "基础类型", path: "/study/TS/基础类型" },
            { title: "任意类型", path: "/study/TS/任意类型" },
            { title: "接口和对象类型", path: "/study/TS/接口和对象类型" },
            { title: "数组类型", path: "/study/TS/数组类型" },
            { title: "函数扩展", path: "/study/TS/函数扩展" },
          ],
        },
        {
          title: "红宝书",
          collapsable: true,
          children: [
            {
              title: "前言",
              path: "/study/红宝书/前言",
            },
            {
              title: "什么是JavaScript?",
              path: "/study/红宝书/什么是JavaScript",
            },
            {
              title: "HTML中的JavaScript",
              path: "/study/红宝书/HTML中的JavaScript",
            },
          ],
        },
      ],
    },
    sidebarDepth: 0, //左侧导航显示的层级
    lastUpdated: "最后更新时间：",
    lastUpdated: "Last Updated",
  },
};
