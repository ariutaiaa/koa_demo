const Router = require('koa-router');
const fs = require('fs');
const multer=require('@koa/multer');
//设置保存路径
const upload = multer({
    dest: './public/uploads'
})

const router = new Router();

router.prefix('/index');

//普通get请求
router.get('/home', async ctx => {
    let str=ctx.request.query;
    let title=str.title;
    ctx.body={message: "ok"};
});

//上传文件
router.post('/addfile',upload.single('file'), async ctx => {

    let file = ctx.request.file;
    switch (file.mimetype) {
        case "audio/mpeg":
            add_Audio(file.filename);
            break;
        case "image/png":
            add_Image(file.filename);
            break;
        case "video/mp4":
            add_video(file.filename);
            break;
        default:{
            ctx.body={message: "error"};
            return ;
        }
    }
    ctx.body={message: "ok"};
});

function add_Audio(str){
    fs.renameSync('./public/uploads/' + str, './public/music/' + str + '.mp3');
}
function add_Image(str){
    fs.renameSync('./public/uploads/' + str, './public/image/' + str + '.png');
}
function add_video(str){
    fs.renameSync('./public/uploads/' + str, './public/video/' + str + '.mp4');
}

module.exports = router;
