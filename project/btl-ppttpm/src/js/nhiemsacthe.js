const { AppContant, LopHoc, LoaiTiet } = require("./danhsach");
const { classrooms } = require("./db");

class NhiemSacThe {
    constructor() {
        this.DSLop = []; //new DanhSachLopHoc();
        this.DSPhong = []; //new DanhSachPhongHoc();
        this.DSMon = []; //new DanhSachMonHoc();
        this.DSGiaoVien = []; //new DanhSachGiaoVien();
        this.DSDayHoc = []; //new DanhSachGVDayMH();

        this.TheHe = 0;
        this.TongTiet = 0;
        this.TongTietHopLe = 0;
        this.TongTietViPham = 0;
        this.HeSoThichNghi = 0;
    }

    ListLopHoc(dt) {
        if (dt != null) {
            dt.forEach((row) => {
                var lop = new LopHoc();
                console.log(lop);
                lop.IDLop = row["IDLop"];
                if (typeof row.IDGV !== "null") lop.IDGV = row["IDGV"];
                if (typeof row.TenGV !== "null") lop.TenGVCN = row["TenGV"];

                if (typeof row.Khoi !== "null") lop.Khoi = row["Khoi"];
                if (typeof row.TenLop !== "null") lop.TenLop = row["TenLop"];
                if (typeof row.SiSo !== "null") lop.SiSo = row["SiSo"];
                if (typeof row.BuoiHoc !== "null") lop.BuoiHoc = row["BuoiHoc"];

                //Xây dựng tiết Chào Cờ, Sinh Hoạt
                lop.Thu[AppContant.Thu7].Tiet[AppContant.Tiet5].Loai =
                    LoaiTiet.SinhHoat;
                if (lop.BuoiHoc == AppContant.BuoiSang)
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet1].Loai =
                        LoaiTiet.ChaoCo;
                else
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.ChaoCo;

                //Giáo viên chủ nhiệm ở tiết sinh hoạt
                lop.Thu[AppContant.Thu7].Tiet[AppContant.Tiet5].IDGV = lop.IDGV;

                //Lock các tiết không học
                if (lop.Khoi == 6) {
                    lop.TongTiet = 24;
                    lop.Thu[AppContant.Thu3].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu4].Tiet[AppContant.Tiet4].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu4].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet4].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu6].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                }

                this.TongTiet += lop.TongTiet;
                this.DSLop.push(lop);
            });
        }
    }
}

var nst = new NhiemSacThe();
nst.ListLopHoc(classrooms);

console.log(nst);
