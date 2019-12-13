function SinhVienService() {
  this.LayDanhSachSinhVien = function() {
    //urlAPI
    var urlAPI = `http://localhost:3000/users`;
    $.ajax({
      type: "GET",
      url: urlAPI,
      success: function(ketqua) {
        var DSSV = JSON.stringify(ketqua);
        localStorage.setItem("DanhSachSV", DSSV);
      },
      error: function(error) {
        console.log();
      }
    });
  };
  this.ThemSinhVien = function(sinhvien) {
    //urlAPI
    var urlAPI = `http://localhost:3000/users`;
    $.ajax({
      type: "POST",
      url: urlAPI,
      dataType:"json",
      data: sinhvien,
      success: function(ketqua) {
       console.log(ketqua);
      },
      error: function(error) {
        console.log();
      }
    });
  };
  this.XoaSinhVien = function(masv)
  {
      var urlAPI = `http://localhost:3000/users/${masv}`;
      $.ajax({
          type:"DELETE",
          url: urlAPI,
   
          success: function(ketqua)
          {
              console.log(ketqua);
          },
          error:function(error)
          {
              console.log();
          }
      });     
  }
  this.CapNhatThongTinSinhVien = function(sinhvien)
  {      
    
      var urlAPI = `http://localhost:3000/users`;
      $.ajax({
          type:"put",
          url: urlAPI,
          dataType:"json",
          data:sinhvien,
          success: function(ketqua)
          {
              console.log(ketqua);
          },
          error:function(error)
          {
              console.log();
          }
      });     
  }
}
