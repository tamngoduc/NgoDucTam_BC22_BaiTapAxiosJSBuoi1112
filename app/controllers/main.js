var service = new Service();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].loaiND == "GV") {
      content += `
         <tr>
            <td>${i + 1}</td>
            <td>${data[i].taiKhoan}</td>
            <td>${data[i].matKhau}</td>
            <td>${data[i].hoTen}</td>
            <td>${data[i].email}</td>
            <td>${data[i].ngonNgu}</td>
            <td>${data[i].loaiND}</td>
            <td>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="modifyUser(${data[i].id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteUser(${data[i].id})">Xóa</button>
            </td>
        </tr>
    `;
    }
  }
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

function getListUsers() {
  var promise = service.fetchData();

  promise
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

getListUsers();

function getInfoUsers(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  isValid = validation.kiemTraRong(taiKhoan, "divErrorTaiKhoan", "Tài khoản");

  isValid &= validation.kiemTraRong(hoTen, "divErrorHoTen", "Họ Tên") && validation.kiemTraChuoiKiTu(hoTen, "divErrorHoTen", "Kí tự không hợp lệ");

  isValid &=
    validation.kiemTraRong(matKhau, "divErrorMatKhau", "Mật Khẩu") &&
    validation.kiemTraMatKhau(matKhau, "divErrorMatKhau", "Có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6 - 8");

  isValid &= validation.kiemTraRong(email, "divErrorEmail", "Email") && validation.kiemTraEmail(email, "divErrorEmail", "Email không đúng định dạng");

  isValid &= validation.kiemTraRong(hinhAnh, "divErrorHinhAnh", "Hình ảnh");

  isValid &= validation.kiemTraRong(loaiND, "divErrorLoaiNguoiDung", "Hãy chọn loại người dùng !");

  isValid &= validation.kiemTraRong(ngonNgu, "divErrorLoaiNgonNgu", "Hãy chọn loại ngôn ngữ !");

  isValid &= validation.kiemTraRong(moTa, "divErrorMoTa", "Mô tả") && validation.kiemTraDoDaiKiTu(moTa, "divErrorMoTa", "Độ dài không quá 60 kí tự", 1, 60);

  if (isValid) {
    var user = new User(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    return user;
  }
  return null;
}

function addUser(user) {
  var user = getInfoUsers("");
  if (user) {
    service
      .addUserApi(user)
      .then(function () {
        getListUsers();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";
  var footer = `<button class="btn btn-success" onclick="addUser()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function deleteUser(id) {
  service
    .deleteUser(id)
    .then(function () {
      getListUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateUsers(id) {
  var user = getInfoUsers(id);
  service
    .updateUser(user)
    .then(function () {
      getListUsers();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function modifyUser(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa thông tin";

  var footer = `<button class="btn btn-warning" onclick="updateUsers(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getUserById(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.error(error);
    });
}
