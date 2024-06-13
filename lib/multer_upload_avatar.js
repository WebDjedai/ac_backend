const multer = require('multer');

const uploadAvatar = multer({
	storage: multer.diskStorage({
		destination: './public/users-imgs',
		filename: (req, file, cb) => {
			cb(null, file.originalname)
		}
	})
});

module.exports = uploadAvatar;