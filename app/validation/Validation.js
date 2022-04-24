function Validation() {
  this.kiemTraRong = function (value, errorID, errorMessage) {
    if (value === "") {
      getEle(errorID).innerHTML = "(*) " + errorMessage + " không được rỗng";
      getEle(errorID).style.display = "block";
      return false;
    } else {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
  };

  this.kiemTraDoDaiKiTu = function (value, errorID, errorMessage, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      // trim() : bo? ki tu khoang trang
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = "(*) " + errorMessage;
    getEle(errorID).style.display = "block";
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, errorID, errorMessage) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = "(*) " + errorMessage;
    getEle(errorID).style.display = "block";
    return false;
  };

  this.kiemTraEmail = function (value, errorID, errorMessage) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = "(*) " + errorMessage;
    getEle(errorID).style.display = "block";
    return false;
  };

  this.kiemTraMatKhau = function (value, errorID, errorMessage) {
    var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
    if (value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = "(*) " + errorMessage;
    getEle(errorID).style.display = "block";
    return false;
  };
}
