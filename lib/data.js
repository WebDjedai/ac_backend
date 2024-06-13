let products = [
	{
		id: 1,
		imageURL: 'https://dostavka.magnit.ru/resize/420x420/uf/398/398bc8c0e662681ccce49ff152e80fa3/846bb90d703ef34346d5f3e21e1c512f.jpeg',
		title: 'Конфеты Raffaello с цельным миндальным орехом в кокосовой обсыпке 150г',
		price: 300,
		discount: 10,
		body: '',
		barcode: '',
		category_id: 1,
	},
	{
		id: 2,
		imageURL: 'https://dostavka.magnit.ru/resize/420x420/uf/c7f/c7f799a4a72298d5f4c2c7a5d9a02c25/3b45e9b0f53a6586090c48588920b66a.jpeg',
		title: 'Рыбное филе Vici Приорити Дальневосточное 300г',
		price: 200,
		discount: 10,
		body: 'Рыбное филе Vici Приорити Дальневосточное 300г — это панированная рыбная продукция, которая быстро готовится на разогретой с маслом сковороде. Она имеет приятный вкус и аромат и способна быстро утолить чувство голода. Филе очень хорошо сочетается с различными соусами и кетчупами, а также подходит к таким гарнирам, как гречка, картофель, макароны, рис и овощи. Для его приготовления используется отборное филе минтая, в котором содержится большое количество витаминов и микроэлементов. Рыба обязательно должна присутствовать в рационе благодаря содержанию витаминов, минералов, омега-3 жирных кислот, а также фолиевой кислоты, которые благотворно воздействую на кровеносную систему, нормализуют обмен веществ. Срок годности такого продукта составляет 12 месяцев от даты производства.',
		barcode: '',
		category_id: 1,
	},
	{
		id: 3,
		imageURL: 'https://dostavka.magnit.ru/resize/420x420/uf/4b7/4b729e3f2ef5b2ab169cfe07d2b8ab24/48e8884b2c0e3d1979e75be300a4ae1c.jpeg',
		title: 'Хлеб Harrys пшеничный 470г',
		price: 120,
		discount: 10,
		body: 'Пшеничный хлеб идеален для приготовления сендвичей и бутербродов. Для удобства использования он нарезан. В составе нет вредных примесей и ГМО.',
		barcode: '',
		category_id: 1,
	},
	{
		id: 4,
		imageURL: 'https://dostavka.magnit.ru/resize/420x420/uf/006/006cab7234b40db298b3c4cfa1d2cbf4/6a6262e261f9b3752fa20753e400d63e.jpeg',
		title: 'Тараллини Nina Farina с чесноком 180г',
		price: 60,
		discount: 10,
		body: 'Миниатюрные рассыпчатые сушки. В составе тараллини (итальянские сушки диаметром 25 мм) только натуральные ингредиенты: мука высшего сорта, подсоленная вода, высокоолеиновое подсолнечное масло и сушеный чеснок. Итальянская сушка не содержит сахара, чего не скажешь о ее русской родственнице. В составе тараллини нет пальмового масла и консервантов. Тараллини – вкусный и полезный перекус для любителей похрустеть любого возраста.',
		barcode: '',
		category_id: 1,
	},
]

let categories = [
	{
		id: 1,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/chaj-kofe-kakao.jpgg',
		title: 'Чай, кофе, какао',
		parent_id: 1,
	},
	{
		id: 2,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/frukty-ovoshi.jpg',
		title: 'Фрукты, овощи',
		parent_id: 2,
	},
	{
		id: 3,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/categories-imgs/gigiena-i-uhod.png',
		title: 'Гигиена и уход',
		parent_id: 3,
	},
	{
		id: 4,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/gotovaya-eda.jpg',
		title: 'Готовая еда',
		parent_id: 4,
	},
	{
		id: 5,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/kolbasy-sosiski.jpg',
		title: 'Колбаса, сосиски',
		parent_id: 5,
	},
	{
		id: 6,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/kuhnya.png',
		title: 'Кухня',
		parent_id: 6,
	},
	{
		id: 7,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/myaso-ptica.png',
		title: 'Мясо, птица',
		parent_id: 7,
	},
	{
		id: 9,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/napitki.jpg',
		title: 'Напитки',
		parent_id: 9,
	},
	{
		id: 10,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/odezhda-obuv.png',
		title: 'Одеждаб обувь',
		parent_id: 10,
	},
	{
		id: 11,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/ryba-moreprodukty.png',
		title: 'Рыба, морепродукты',
		parent_id: 11,
	},
	{
		id: 12,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/syry-yajca-moloko.jpg',
		title: 'Сыры, яйца, молоко',
		parent_id: 12,
	},
	{
		id: 13,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/vipechka.png',
		title: 'Выпечка',
		parent_id: 13,
	},
	{
		id: 14,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/zootovari.jpg',
		title: 'Зоотовары',
		parent_id: 14,
	},
	{
		id: 15,
		imageURL: 'https://5.35.91.31:3000/categories-imgs/prochee.png',
		title: 'Прочее',
		parent_id: 15,
	},
]

let users = [
	{
		id: 1,
		imageURL: 'https://5.35.91.31:3000/users-imgs/user-1.jpg',
		name: 'Алексей',
		surname: 'Мерзляков',
		data_birth: '',
		email: 'aleksej.merzlyakov.90@mail.ru',
		password: 'miha12alko',
		is_employee: true,
		is_admin: true
	},
	{
		id: 2,
		imageURL: 'https://5.35.91.31:3000/users-imgs/user-2.jpg',
		name: 'Дмитрий',
		surname: 'Губерников',
		data_birth: '',
		email: '1224234@mail.ru',
		password: 'miha12alko',
		is_employee: true,
		is_admin: true
	},
	{
		id: 3,
		imageURL: 'https://5.35.91.31:3000/users-imgs/user-3.jpg',
		name: 'Василий',
		surname: 'Миронов',
		data_birth: '',
		email: '1232444@mail.ru',
		password: 'miha12alko',
		is_employee: true,
		is_admin: true
	},
	{
		id: 4,
		imageURL: 'https://5.35.91.31:3000/users-imgs/user-4.jpg',
		name: 'Анна',
		surname: 'Напольских',
		data_birth: '',
		email: '12323414@mail.ru',
		password: 'miha12alko',
		is_employee: true,
		is_admin: true
	},
]

let comments = [
	{
		id: 1,
		product_id: 1,
		user_id: 1,
		rate: 5,
		body: 'Лучший товар категории!',
		date_published: '',
		parent_comment_id: 1
	},
	{
		id: 2,
		product_id: 2,
		user_id: 1,
		rate: 5,
		body: 'Лучший товар категории!',
		date_published: '',
		parent_comment_id: 2
	},
	{
		id: 3,
		product_id: 3,
		user_id: 1,
		rate: 5,
		body: 'Лучший товар категории!',
		date_published: '',
		parent_comment_id: 3
	},
	{
		id: 4,
		product_id: 4,
		user_id: 1,
		rate: 5,
		body: 'Лучший товар категории!',
		date_published: '',
		parent_comment_id: 4
	},
]

let favorites = [
	{
		id: 1,
		user_id: 1,
		product_id: 1,
	}
]

module.exports = {
	products,
	categories,
	users,
	comments,
	favorites,
}