var user = {
    nickname: 'string',
    password: 'string',
    email: 'string',
    auth_source:'string',//QQ google czmin other...
    open_id: 'string',//用户统一ID
    create_at:'timestamp',
    auth: [oAuth]
};
var auth = {
    auth_key: 'string',//随机数由客户端生成guid保存到服务端
    access_token: 'string',//
    expires_in: 'string',
    refresh_token: 'string',
    ip:'string',
    create_at:'timestamp'
};
var user_data = {
    open_id:'string',
    auth_source:'string',//QQ google czmin other...
    content:'string',// json to string
    category:'string',//bookmark,blog,shop,note
    create_at:'timestamp'
};
