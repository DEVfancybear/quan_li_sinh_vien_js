function sinhVien(masv, hoten, cmnd, email, sdt) {
  this.MaSV = masv;
  this.HoTen = hoten;
  this.Cmnd = cmnd;
  this.Email = email;
  this.Sdt = sdt;
}
function danhSachSinhVien() {
  this.DSSV = []; // chứa danh sách sinh viên nhập vào
  this.ThemSinhVien = function(svthem) {
    this.DSSV.push(svthem);
  };
  this.XoaSinhVien = function(svxoa) {
    for (let i = 0; i < svxoa.length; i++) {
      for (let j = 0; j < this.DSSV.length; j++) {
        var sinhvien = this.DSSV[j];
        if (svxoa[i] == sinhvien.MaSV) {
          this.DSSV.splice(j, 1);
        }
      }
    }
  };
  this.SuaSinhVien = function(svCapNhat) {
    for (let i = 0; i < this.DSSV.length; i++) {
      var svUpdate = this.DSSV[i];
      if (svCapNhat.MaSV == svUpdate.MaSV) {
        svUpdate.HoTen = svCapNhat.HoTen;
        svUpdate.Email = svCapNhat.Email;
        svUpdate.Sdt = svCapNhat.Sdt;
        svUpdate.Cmnd = svCapNhat.Cmnd;
      }
    }
  };
  this.timKiemSinhVien = function(tukhoa) {
    // list kết quả tìm kiếm
    var kqTimKiem = new danhSachSinhVien();
    for (let i = 0; i < this.DSSV.length; i++) {
      var sinhvien = this.DSSV[i];
      if (
        sinhvien.HoTen.toLowerCase()
          .trim()
          .search(tukhoa.toLowerCase().trim()) != -1
      ) {
        kqTimKiem.ThemSinhVien(sinhvien);
      }
    }
    return kqTimKiem;
  };
  this.timSinhVienTheoMa = function(masv) {
    for (let i = 0; i < this.DSSV.length; i++) {
      var sv = this.DSSV[i];
      if (sv.MaSV === masv) {
        return sv;
      }
    }
    return null; //k tìm thấy trả về null
  };
}
function domID(id) {
  var element = document.getElementById(id);
  return element;
}
// thêm sinh viên vào bảng
var danhSachSinhVien = new danhSachSinhVien(); //tạo đối tượng danh sách sinh viên
// getStorage(); //lưu dữ liệu để load lại trang web k bị mất dữ liệu
var service = new SinhVienService();
service.LayDanhSachSinhVien();

function kiemTraDauVao() {
  // kiểm tra đầu vào
  this.kiemTraRong = function(value) {
    if (value.trim() === "") {
      // trim() là phương thức bỏ khoảng trống đầu cuối
      return true;
    }
    return false;
  };
  // kiểm tra hợp lệ đầu vào khi nhập email(regex email javascript)
  this.kiemTraEmail = function(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase());
  };
  this.kiemTraSoDienThoai = function(value) {
    var reg = /^\d+$/;
    if (reg.test(value) && value.length >= 10) {
      // độ dài của các số nhập vào luôn phải lớn hơn 10
      return true;
    }
    return false;
  };
}
var validate = new kiemTraDauVao();
// bổ sung thuộc tính prototype
sinhVien.prototype.DiemToan = "";
sinhVien.prototype.DiemLi = "";
sinhVien.prototype.DiemHoa = "";
sinhVien.prototype.DTB = "";
sinhVien.prototype.loai = "";
// thêm phương thức mà k cần chỉnh file gốc
sinhVien.prototype.DTB = function() {
  this.DTB =
    Math.round((Number(this.DiemToan) + Number(this.DiemHoa) + Number(this.DiemLi)) / 3);
};
sinhVien.prototype.loai = function() {
  if (this.DTB <= 10 && this.DTB >= 8) {
    this.loai = "Xếp Loại Giỏi";
  } else if (this.DTB < 8 && this.DTB >= 6.5) {
    this.loai = "Xếp Loại Khá";
  } else if (this.DTB < 6.5 && this.DTB >= 5) {
    this.loai = "Xếp Loại Trung Bình";
  } else {
    this.loai = "Xếp Loại Yếu";
  }
};
function ThemSinhVien() {
  // lấy dữ liệu khi người dùng nhập vào
  var masv = domID("masv").value;
  var hoten = domID("hoten").value;
  var cmnd = domID("cmnd").value;
  var email = domID("email").value;
  var sdt = domID("sdt").value;
  var loi = 0;
  // kiểm tra đầu vào hợp lệ của dữ liệu
  if (kiemTraDauVaoRong("masv", masv) == true) {
    loi++;
  }
  if (kiemTraDauVaoRong("hoten", hoten) == true) {
    loi++;
  }
  if (kiemTraDauVaoRong("cmnd", cmnd) == true) {
    loi++;
  }
  if (validate.kiemTraEmail(email)) {
    document.getElementById("email").style.borderColor = "green";
  } else {
    document.getElementById("email").style.borderColor = "red";
    loi++;
  }
  if (validate.kiemTraSoDienThoai(sdt)) {
    document.getElementById("sdt").style.borderColor = "green";
  } else {
    document.getElementById("sdt").style.borderColor = "red";
    loi++;
  }
  if (loi != 0) {
    return false;
  }
  // Thêm sinh viên
  // Khởi tạo đối tượng sinh viên
  var sinhvien = new sinhVien(masv, hoten, cmnd, email, sdt);
  sinhvien.DiemToan = domID("Toan").value;
  sinhvien.DiemLi = domID("Li").value;
  sinhvien.DiemHoa = domID("Hoa").value;
  sinhvien.DTB();
  sinhvien.loai();
  // lấy danh sách sinh viên
  danhSachSinhVien.ThemSinhVien(sinhvien);
  capNhatDanhSachSinhVien(danhSachSinhVien);
  console.log(danhSachSinhVien);
  service.ThemSinhVien(sinhvien);
}
function kiemTraDauVaoRong(ID, value) {
  // kiểm tra mã sinh viên rỗng
  if (validate.kiemTraRong(value) == true) {
    domID(ID).style.borderColor = "red";
  } else {
    domID(ID).style.borderColor = "green";
  }
}
function capNhatDanhSachSinhVien(DanhSachSinhVien) {
  var listSV = domID("dataSinhVien");
  listSV.innerHTML = ""; // clear thẻ tr
  // duyệt danh sách sinh viên dữ liệu truyền vào
  for (let i = 0; i < DanhSachSinhVien.DSSV.length; i++) {
    // mảng sinh viên
    //lấy thông tin sinh viên từ trong mảng sinh viên
    var sv = DanhSachSinhVien.DSSV[i];
    //tạo thẻ tr
    var trSinhVien = document.createElement("tr");
    // thêm id, class vào các thẻ tr
    trSinhVien.id = sv.MaSV;
    trSinhVien.className = "trSinhVien";
    // thêm vào mỗi thẻ tr là 1 sự kiện
    trSinhVien.setAttribute("onclick", "chinhSuaSinhVien('" + sv.MaSV + "')");
    // tạo thẻ td và filter dữ liệu sinh viên thứ [i] nhập vào
    var tdCheckBox = document.createElement("td");
    var cbkMaSinhVien = document.createElement("input");
    console.log(cbkMaSinhVien);
    cbkMaSinhVien.setAttribute("class", "checkMaSV");
    cbkMaSinhVien.setAttribute("type", "checkbox");
    cbkMaSinhVien.setAttribute("value", sv.MaSV);
    tdCheckBox.appendChild(cbkMaSinhVien);
    // gọi hàm tạo thẻ td
    var tdMaSv = taoTheTd("MaSV", sv.MaSV);
    var tdHoTen = taoTheTd("HoTen", sv.HoTen);
    var tdCmnd = taoTheTd("CMND", sv.Cmnd);
    var tdEmail = taoTheTd("Email", sv.Email);
    var tdSdt = taoTheTd("Sdt", sv.Sdt);
    // tạo td DTB và xếp loại
    var tdTB = taoTheTd("DTB", sv.DTB);
    var tdXepLoai = taoTheTd("XepLoai", sv.loai);

    // append các thẻ tr vào td
    trSinhVien.appendChild(tdCheckBox);
    trSinhVien.appendChild(tdMaSv);
    trSinhVien.appendChild(tdHoTen);
    trSinhVien.appendChild(tdCmnd);
    trSinhVien.appendChild(tdEmail);
    trSinhVien.appendChild(tdSdt);
    trSinhVien.appendChild(tdTB);
    trSinhVien.appendChild(tdXepLoai);
    // appned các thẻ td vào tbody
    listSV.appendChild(trSinhVien);
  }
}
// tạo thẻ ad
function taoTheTd(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  // bắt giá trị
  return td;
}
//lưu data vào local storage
function setStorage() {
  // biến mảng danh sách sinh viên thành chuỗi json
  var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
  // đêm chuỗi json lưu vào local storage
  // setItem() là gán
  localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}
// lấy data ra khỏi local storage
function getStorage() {
  // getItem() là lấy
  var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
  // lấy ra chuỗi json là mảng danh sách sinh viên
  var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
  danhSachSinhVien.DSSV = mangDSSV;
  // gọi lại hàm cập nhật danh sách sinh viên
  capNhatDanhSachSinhVien(danhSachSinhVien);
}
// xóa sinh viên
function delSinhVien() {
  // mảng check box
  var lstMaSV = document.getElementsByClassName("checkMaSV");
  // mảng mã sinh viên dc chọn
  var lstSinhVienDuocChon = [];
  // kiểm tra phần tử check box đó đã được chọn hay chưa
  for (let i = 0; i < lstMaSV.length; i++) {
    console.log(lstMaSV[i]);
    if (lstMaSV[i].checked) {
      lstSinhVienDuocChon.push(lstMaSV[i].value);
      service.XoaSinhVien(lstMaSV[i].value);
    }
  }
  danhSachSinhVien.XoaSinhVien(lstSinhVienDuocChon);
  capNhatDanhSachSinhVien(danhSachSinhVien);
}
// tìm kiếm sinh viên
function timKiemSinhVien() {
  var search = domID("tukhoa").value;
  var nhanKetQua = danhSachSinhVien.timKiemSinhVien(search);
  capNhatDanhSachSinhVien(nhanKetQua);
}
function chinhSuaSinhVien(masv) {
  var sinhvien = danhSachSinhVien.timSinhVienTheoMa(masv);
  if (sinhvien != null) {
    domID("masv").value = sinhvien.MaSV;
    domID("hoten").value = sinhvien.HoTen;
    domID("cmnd").value = sinhvien.Cmnd;
    domID("email").value = sinhvien.Email;
    domID("sdt").value = sinhvien.Sdt;
  }
}
//gửi vào danh sách những thay đổi
function luuThongTin() {
  // lấy dữ liệu khi người dùng nhập vào
  var masv = domID("masv").value;
  var hoten = domID("hoten").value;
  var cmnd = domID("cmnd").value;
  var email = domID("email").value;
  var sdt = domID("sdt").value;
  var loi = 0;
  // kiểm tra đầu vào hợp lệ của dữ liệu
  if (kiemTraDauVaoRong("masv", masv) == true) {
    loi++;
  }
  if (kiemTraDauVaoRong("hoten", hoten) == true) {
    loi++;
  }
  if (kiemTraDauVaoRong("cmnd", cmnd) == true) {
    loi++;
  }
  if (validate.kiemTraEmail(email)) {
    document.getElementById("email").style.borderColor = "green";
  } else {
    document.getElementById("email").style.borderColor = "red";
    loi++;
  }
  if (validate.kiemTraSoDienThoai(sdt)) {
    document.getElementById("sdt").style.borderColor = "green";
  } else {
    document.getElementById("sdt").style.borderColor = "red";
    loi++;
  }
  if (loi != 0) {
    return false;
  }
  // Thêm sinh viên
  // Khởi tạo đối tượng sinh viên
  var sinhvien = new sinhVien(masv, hoten, cmnd, email, sdt);
  sinhvien.DiemToan = domID("Toan").value;
  sinhvien.DiemLi = domID("Li").value;
  sinhvien.DiemHoa = domID("Hoa").value;
  sinhvien.DTB();
  sinhvien.loai();
  // lấy danh sách sinh viên
  danhSachSinhVien.SuaSinhVien(sinhvien);
  capNhatDanhSachSinhVien(danhSachSinhVien);
  service.CapNhatThongTinSinhVien(sinhvien);
}
