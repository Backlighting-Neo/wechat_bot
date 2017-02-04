const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
	getDetail(id) {
		var url = 'http://tjyy8.com/show/detail/'+id;

		return fetch(url)
		.then(res=>res.text())
		.then(html=>{
			let $ = cheerio.load(html);

			var breef = $('body > div.detail.operas > div > div.detail-mesright.operas > div.detail-information.operas-information > p').map((index, element)=>{
				return $(element).text().replace(/\s/g, '');
			}).get().filter(e=>e!=='').join('\n');
			var detail = $('body > div.detail-content > div > div.detail-boxleft > div.detail-boxmessage > p').map((index, element)=>{
				return $(element).text();
			}).get().filter(e=>e!=='').join('\n');
			if(detail.length > 500) detail = detail.substring(0, 500) + '.....';

			var result =  breef + '\n\n' + detail;
			return result;
		})
	},

	getList(type, page=1) {
		var url = `http://tjyy8.com/show/?type=${type}&page=${page}`;
		var result = [];

		return fetch(url)
		.then(res=>res.text())
		.then(html=>{
			let $ = cheerio.load(html);
			var listDom = $('body > div.list > div > ul > a');
			if(listDom.length == 0) return;

			var list = listDom.map((index, element)=>{
				var dom = $(element);
				return({
					id: parseInt(dom.attr('href').replace('/show/detail/','')),
					name: $('p.list-name', dom).text(),
					money: $('div.list-money', dom).text().replace(/\s/g, ''),
					time: $('div.list-time', dom).text()
				})
			}).get();
			result = list;
			return this.getList(type, page+1);
		})
		.then(array=>{
			if(array)
				return result.concat(array);
			else
				return result;
		})
	}
}
