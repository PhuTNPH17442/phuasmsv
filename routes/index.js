var express = require('express');
var router = express.Router();
var db = 'mongodb+srv://faker:12032001a@cluster0.lm8ru.mongodb.net/name?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
/* GET home page. */
router.get('/', function (req, res, next) {
  // lấy danh sách students
  Image.find({}, function (err, data) {
    // trả về 1 file ejs.
    res.render('index', {pagename: 'Home', message: '',data: data})
  })
});
router.get('/add', function (req, res) {
  res.render('add', {message: ''})
});
router.get('/update', function (req, res) {
  res.render('update', {message: ''})
});
router.get('/delete', function (req, res) {
  res.render('delete', {message: ''})
});

var Img = new mongoose.Schema({
  nd: 'string',
  date: 'string',
  link: 'string'
});
// b2 : khai báo Schema với thư viện mongosee
var Image = mongoose.model('student', Img);

router.post('/add', function (request, response) {

  var nd = request.body.nd;
  var date = request.body.date;
  var link = request.body.link;

  const data = new Image({
    nd: nd,
    date: date,
    link: link,
  });
  data.save(function (error) {
    var mes;
    if (error == null) {
      mes = 'Them thanh cong'
      console.log('them thanh cong')
    } else mes = error
    response.render('add', {message: mes})
  })
});
router.post('/update', async function (request, response) {

  var nd = request.body.nd;
  var date = request.body.date;
  var link = request.body.link;

  const filter = {nd: nd};
  const update = {date: date, link: link};
  let ketqua = await Image.findOneAndUpdate(filter, update, {
    new: true

  });
  Image.find({}, function (err, data) {
    // trả về 1 file ejs.
    res.render('index', {pagename: 'Home', message: '',data: data})
  })
});
router.post('/delete', async function (req, res) {
  // lấy tham số ra
  var nd = req.body.nd;
  // in ra log để kiểm tra


// câu lệnh cập nhật
  const filter = {nd:nd};

  let xoa = await Image.deleteOne(filter)
  Image.find({}, function (err, data) {
    // trả về 1 file ejs.
    res.render('index', {pagename: 'Home', message: '',data: data})
  })
});
module.exports = router;