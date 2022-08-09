var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const {Schema} = mongoose;
const uri = "mongodb+srv://admin:Y9sUSM0fSrNyhwoQ@cluster0.onoec.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('abc ' + err));
// định nghĩa khung, model hay  gọi là Schema cho đối tượng sinh viên
// thư viện mongoose này dùng Schema để đọc, ghép, thêm dữ liệu vào DB
const SinhVien = new Schema({
    name: String,
    age: Number,
    address: String
})

/* GET home page. */
router.get('/', function (req, res) {
    const sinhVienList = mongoose.model('students', SinhVien);

    sinhVienList.find({}, function (error, result) {
        res.render('index', {data: result})
    })
});

router.post('/add', async function (req, res) {
    // lấy ra các tham số
    var tenSV = req.body.tenSV;
    var tuoiSV = req.body.tuoiSV;
    var diaChiSV = req.body.diaChiSV;
    console.log(tenSV + tuoiSV + diaChiSV);
    // thêm vào mongoDB
    // định nghĩa kiểu dữ liệu or định nghĩa khung (model) của dữ liệu
    // định nghĩa Schema của model - SinhVien
    const SV = mongoose.model('students', SinhVien);

    const sinhVien = new SV({
        name: tenSV,
        age: tuoiSV,
        address: diaChiSV
    })
    await sinhVien.save();

    // lấy lại danh sách và hiển thị trên trang index
    SV.find({}, function (error, result) {
        res.render('index', {data: result})
    })

})

router.get('/delete', async function (req, res) {
    var id = req.query.id;
    const SV = mongoose.model('students', SinhVien);
    await SV.deleteOne({_id: id})
    //sau khi xoa xong lay danh sach SV va hien thi trang index
    // lấy lại danh sách và hiển thị trên trang index
    SV.find({}, function (error, result) {
        res.render('index', {data: result})
    })
})

router.get('/update', function (req, res) {
    var id = req.query.id;
    const SV = mongoose.model('students', SinhVien);
    SV.findOne({id: id}, function (error, result) {
        res.render('updateForm', {sinhvien: result})
    })
})

router.post('/updateConfirm', async function (req, res) {
    // lấy ra các tham số
    var id = req.body.id;
    var tenSV = req.body.tenSV;
    var tuoiSV = req.body.tuoiSV;
    var diaChiSV = req.body.diaChiSV;
    console.log(tenSV + tuoiSV + diaChiSV);
    const SV = mongoose.model('students', SinhVien);
    const sinhVien = new SV({
        name: tenSV,
        age: tuoiSV,
        address: diaChiSV
    })

    await sinhVien.update({_id: id});

    SV.find({}, function (error, result) {
        res.render('index', {data: result})
    })

})

router.post('/createUser', async function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;

    const SV = mongoose.model('students', SinhVien);
    const sinhVien = new SV({
        name: name,
        age: age,
        address: address
    })
    await sinhVien.save();

    res.send({
        statusCode : 200,
        message : 'Thang Cong!!!'
    });

})

router.get('/getUsers', function (req, res) {

    const sinhVienList = mongoose.model('students', SinhVien);

    sinhVienList.find({}, function (error, result) {
        res.send(result);
    })
})

router.post('createStudent', function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;

    // truy van va them sinh vien

    // thanh cong
    res.send({
        statusCode: 200,
        message: 'Thanh Cong'
    });

})


module.exports = router;
