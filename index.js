const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');

const router = {
	tjyy8: require('./src/tjyy8'),
};

let bot = new Wechat();

bot.on('uuid', uuid => {
  // uuid事件，获取二维码
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid);
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

bot.on('login', () => {
  console.log('登录成功')
})

var e = {
	"Uin": 0,
  "UserName": "",
  "NickName": "",
  "HeadImgUrl": "",
  "ContactFlag": 3,
  "MemberCount": 0,
  "MemberList": [],
  "RemarkName": "",
  "HideInputBarFlag": 0,
  "Sex": 0,
  "Signature": "",
  "VerifyFlag": 8,
  "OwnerUin": 0,
  "PYInitial": "",
  "PYQuanPin": "",
  "RemarkPYInitial": "",
  "RemarkPYQuanPin": "",
  "StarFriend": 0,
  "AppAccountFlag": 0,
  "Statues": 0,
  "AttrStatus": 0,
  "Province": "",
  "City": "",
  "Alias": "Urinxs",
  "SnsFlag": 0,
  "UniFriend": 0,
  "DisplayName": "",
  "ChatRoomId": 0,
  "KeyWord": "gh_",
  "EncryChatRoomId": ""
};
e = Object.keys(e);

bot.on('message', msg => {
	let fromUser = msg.FromUserName;

	e.forEach(key=>{
		if(bot.contacts[fromUser][key].constructor == Function)
			console.log(key + '    ' + bot.contacts[fromUser][key]());
		else
			console.log(key + '    ' + bot.contacts[fromUser][key]);
	})
	console.log();

	switch (msg.MsgType) {
		case bot.CONF.MSGTYPE_TEXT:
			let id = msg.Content;
			console.log(id);

			// router.tjyy8.getDetail(id)
			// .then(res=>{
			// 	bot.sendMsg(res, fromUser);
			// })
			break;
	}
})

bot.start();