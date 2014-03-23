//server:

var user = {
    nickname: 'string',
    password: 'string',
    email: 'string',
    auth_source: 'string',//QQ google czmin other...
    open_id: 'string',//用户统一ID
    create_at: 'timestamp',
    location: [location],
    auth: [oAuth]
};
var location = {
    city: 'string',
    country: 'string',
    countryCode: 'string',
    isp: 'string',
    lat: 'string',
    lon: 'string',
    org: 'string china telecom fujian',
    ip: '218.66.59.108'
};
var auth = {
    auth_key: 'string',//随机数由客户端生成guid保存到服务端
    access_token: 'string',//
    expires_in: 'string',
    refresh_token: 'string',
    ip: 'string',
    create_at: 'timestamp'
};
var user_data1 = {
    open_id: 'string',
    auth_source: 'string',//QQ google czmin other...
    content: 'string',// json to string
    category: 'string',//bookmark,blog,shop,note
    create_at: 'timestamp'
};

//client:
var user_data = {
    categories: [
        {
            name: 'string',
            gid: 'string',
            items: [
                {
                    title: 'string',
                    url: 'string',
                    logo: 'string',
                    backgroundColor: 'string'
                }
            ]
        }
    ],
    products: [
        {
            id: 'string',
            title: 'string',
            desc: 'string',
            from: 'string',//平台
            url: 'http://www.jd.com/123456.html',
            picture: 'string',
            prices: [
                {
                    date: 'timestamp',
                    price: '12.5',
                    unit: 'yuan',
                    symbol: '￥'//http://zh.wikipedia.org/wiki/%E8%B4%A7%E5%B8%81%E7%AC%A6%E5%8F%B7
                }
            ],
            create_at: 'timestamp'
        }
    ],
    article: [
        {
            title: 'string',
            url: 'string',
            desc: 'string',
            create_at: 'timestamp'
        }
    ],
    note: {
        content: 'string',
        update_at: 'timestamp'
    }
};

var config = {
    user: {
        nickname: 'string',
        gid: 'string',
        from: 'string qq google'
    },
    background: {
        bgColor: 'string #f60',
        bgImage: 'string'
    },
    location: {
        city: 'string',
        country: 'string',
        countryCode: 'string',
        isp: 'string',
        lat: 'string',
        lon: 'string',
        ip: 'string'
    },
    isLogin: 'boolean',
    lastCustom: {
        categoryId: 'string',//记录分类ID用于二次打开滚动位置
        tool: 'string', //最后选择的工具
        toolScrollTop: 'string',//最后工具滚动高度
        sliderWidth: 'string'//记录左侧栏最后宽度
    },
    version:'v1.0.0.0'
};
var notification = {

};
