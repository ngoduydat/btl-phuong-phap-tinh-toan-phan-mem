/**
 * Class thể hiện gia trị hằng
 * Author: NDDAT(19/4/2020)
 */
class AppContant {
    static Thu2 = 0;
    static Thu3 = 1;
    static Thu4 = 2;
    static Thu5 = 3;
    static Thu6 = 4;
    static Thu7 = 5;
    static CN = 6;

    static Tiet1 = 0;
    static Tiet2 = 1;
    static Tiet3 = 2;
    static Tiet4 = 3;
    static Tiet5 = 4;
}

/**
 * Class loại tiết học
 * Author: NDDAT(19/4/2020)
 */
class LoaiTiet {
    constructor(value) {
        this.Value = value;
    }

    static BinhThuong = new LoaiTiet(1);
    static ChaoCo = new LoaiTiet(2);
    static SinhHoat = new LoaiTiet(3);
    static TheDuc = new LoaiTiet(4);
    static KhongHoc = new LoaiTiet(5);
}

/**
 * Class thể hiện các loại vi phạm điều kiện
 * Author: NDDAT(19/4/2020)
 */
class LoaiViPham {
    constructor(value) {
        this.Value = value;
    }

    static KhongViPham = new LoaiViPham(1);
    static QuaSoTiet = new LoaiViPham(2);
    static QuaSoBuoi = new LoaiViPham(3);
    static ThieuSoBuoi = new LoaiViPham(4);
    static TrungLichGiaoVien = new LoaiViPham(5);
    static ThieuGiaoVien = new LoaiViPham(6);
}

class Tiet {
    constructor(index, thu) {
        this.Loai = LoaiTiet.BinhThuong;
        this.LoaiViPham = LoaiViPham.KhongViPham;
        this.Thu = thu;
        this.Index = index;
        this.IDMon = 0;
        this.IDGV = 0;
    }

    swapNoiDungTiet(tietB) {
        var tmp = new Tiet(0, 0); // khai báo instant Tiet()
        tmp.IDMon = this.IDMon;
        tmp.TenMon = this.TenMon;
        tmp.IDGV = this.IDGV;
        tmp.TenGV = this.TenGV;
        tmp.TietKep = this.TietKep;
        tmp.TietPhu = this.TietPhu;

        this.IDMon = tietB.IDMon;
        this.TenMon = tietB.TenMon;
        this.IDGV = tietB.IDGV;
        this.TenGV = tietB.TenGV;
        this.TietKep = tietB.TietKep;
        this.TietPhu = tietB.TietPhu;

        tietB.IDMon = tmp.IDMon;
        tietB.TenMon = tmp.TenMon;
        tietB.IDGV = tmp.IDGV;
        tietB.TenGV = tmp.TenGV;
        tietB.TietKep = tmp.TietKep;
        tietB.TietPhu = tmp.TietPhu;
    }
}

/**
 * Class thể hiện các thứ trong tuần
 */
class Thu {
    constructor(index) {
        this.TongTiet = 5;
        this.Index = index;
        this.Tiet = [];
        for (var i = 0; i < this.TongTiet; i++) {
            this.Tiet[i] = new Tiet(i, this.Index);
        }
    }
}

class LopHoc {
    constructor() {
        this.IDLop = 0;
        this.IDGV = 0;
        this.TenGVCN = "";
        this.TenLop = "";
        this.Khoi = 0;
        this.SiSo = 0;
        this.BuoiHoc = 0;

        this.TongThu = 6;
        this.Thu = [];

        for (var i = 0; i < this.TongThu; i++) {
            this.Thu.push(new Thu(i));
        }

        this.DSDayHoc = new DanhSachGVDayMH(); //giáo viên dạy nhưng môn học của lớp dc phân ngẫu nhiên ở NST
        this.TongTiet = 0;
        this.TongTietHopLe = 0;
        this.TongTietViPham = 0;
    }

    /**
     * Hàm cập nhật lại giáo viện dạy môn học
     * @param {int} IDMon
     * @param {GiaoVien} gv
     */
    UpdateGVDayMonHoc(IDMon, gv) {
        this.Thu.forEach((thu) => {
            thu.Tiet.forEach((tiet) => {
                if (tiet.IDMon === IDMon) {
                    tiet.IDGV = gv.IDGV;
                    tiet.TenGV = gv.TenGV;
                }
            });
        });
    }

    //tính vi pham so tiet

    /**
     * Hàm tính vi phạm số tiết
     * @param {Mon} mon
     * return true/false
     */
    ViPhamSoTiet(mon) {
        var res = false;
        this.Thu.forEach((thu) => {
            var slTietTrongNgay = 0;
            var viPham = false;
            thu.Tiet.forEach((tiet) => {
                if (Tiet.IDMon === mon.IDMon) {
                    slTietTrongNgay++;
                }
                if (slTietTrongNgay > 1) {
                    if (!mon.TietKep) {
                        viPham = true;
                    } else if (slTietTrongNgay > 2) {
                        viPham = true;
                    }
                }

                //lưu lại vị trí tiết vi phạm
                if (viPham) {
                    res = true;
                    thu.Tiet.forEach((tiet) => {
                        if (tiet.IDMon === mon.IDMon) {
                            tiet.LoaiViPham = LoaiViPham.QuaSoTiet;
                        }
                    });
                }
            });
        });

        return res;
    }

    //hàm tính vi phạm số buổi

    //hàm tính số tiết vi phạm
    TinhSoTietViPham() {
        var viPham = 0;
        this.Thu.forEach((thu) => {
            thu.Tiet.forEach((tiet) => {
                if (LoaiViPham !== LoaiViPham.KhongViPham) viPham++;
            });
        });

        this.TongTietViPham = viPham;
        this.TongTietViPham = this.TongTiet - viPham;
    }

    //hàm ghép buổi

    //hàm tách buổi
}

class DanhSachLopHoc {
    constructor() {
        this.danhsach = []; // list LopHoc[]
        this.Count = this.danhsach.length;
    }

    /**
     * hàm thêm danh sách lớp
     */
    Add(lop) {
        this.danhsach.push(lop);
    }

    /**
     * lấy lớp theo vị trí
     */
    GetLopHoc(vitri) {
        if (this.danhsach.length > 0 && this.danhsach.length > vitri)
            return this.danhsach[vitri];
        else return null;
    }

    /**
     * hàm lấy danh sách lớp học
     */
    GetDanhSach() {
        return this.danhsach;
    }
}

class GiaoVien {
    constructor() {
        this.IDGV = 0;
        this.IDMon = 0;
        this.ChuyenKhoi = 0;
        this.TenGV = "";
        this.SoTiet = 0;
        this.SoTietDaDay = 0;
        this.SoTietChuaDay = 0;
    }
}

class DanhSachGiaoVien {
    constructor() {
        this.danhsach = []; //mảng GiaoVien
        this.Count = this.danhsach.length;
    }

    Add(gv) {
        this.danhsach.push(gv);
    }

    GetGiaoVien(vitri) {
        if (this.danhsach.length > 0 && this.danhsach.length > vitri)
            return this.danhsach[vitri];
        else return null;
    }

    GetDanhSachTheoMon(IDMon) {
        var dsGV = new DanhSachGiaoVien();
        this.danhsach.foreach((gv) => {
            if (gv.IDMon === IDMon) dsGV.Add(gv);
        });

        return dsGV;
    }

    GetDanhSachTheoMonTiet(idMon, soTiet) {
        var dsGV = new DanhSachGiaoVien();

        this.danhsach.forEach((gv) => {
            if (gv.IDMon === idMon && gv.SoTietChuaDay >= soTiet) dsGV.Add(gv);
        });
        return dsGV;
    }

    GetDanhSachTheoMonKhoiTiet(idMon, khoi, soTiet) {
        var dsGV = new DanhSachGiaoVien();
        this.danhsach.forEach((gv) => {
            if (
                gv.IDMon === idMon &&
                gv.ChuyenKhoi === khoi &&
                gv.SoTietChuaDay >= soTiet
            )
                dsGV.Add(gv);
        });

        return dsGV;
    }

    GetNgauNhienGV() {
        var gv = new GiaoVien();
        if (this.danhsach.length > 0) {
            var vt = Math.floor(Math.random() * this.Count + 1);
            gv = this.danhsach[vt];
        }
        return gv;
    }

    GetDanhSach() {
        return this.danhsach;
    }
}

class MonHoc {
    constructor() {
        this.IDMon = 0;
        this.Ten = "";
        this.SoTiet = 0;
        this.SoBuoi = 0;
        this.TietKep = false;
        this.TietPhu = false;
    }

    GetSoTiet(khoi) {
        if (khoi === 6) return this.SoTiet;
        // else if (khoi === 7) return SoTietK7;
        // else if (khoi === 8) return SoTietK8;
        // else if (khoi === 9) return SoTietK9;
        else return 0;
    }

    GetSoBuoi(khoi) {
        if (khoi === 6) return this.SoBuoi;
        // else if (khoi === 7) return SoBuoiK7;
        // else if (khoi === 8) return SoBuoiK8;
        // else if (khoi === 9) return SoBuoiK9;
        else return 0;
    }
}

class DanhSachMonHoc {
    constructor() {
        this.danhsach = []; //mảng MonHoc
        this.Count = this.danhsach.length;
    }

    Add(mh) {
        this.danhsach.push(mh);
    }

    GetMonHoc(vitri) {
        if (this.danhsach.length > 0 && this.danhsach.length > vitri)
            return this.danhsach[vitri];
        else return null;
    }

    GetDanhSach() {
        return this.danhsach;
    }
}

class GVDayMonHoc {
    constructor() {
        this.IDGV = 0;
        this.IDMon = 0;
        this.IDLop = 0;
        this.SoTiet = 0;
        this.TenGV = "";
        this.TenMon = "";
        this.TenLop = "";
    }
}

class DanhSachGVDayMH {
    constructor() {
        this.danhsach = []; //mảng  GVDayMonHoc[]
        this.Count = this.danhsach.length;
    }

    /**
     * mh(GVDayMonHoc)
     */
    Add(mh) {
        this.danhsach.push(mh);
    }

    /**
     * Hàm lấy môn học theo vị trí
     * @param {int} vitri
     */
    GetItem(vitri) {
        if (this.danhsach.length > 0 && this.danhsach.length > vitri)
            return this.danhsach[vitri];
        else return null;
    }

    /**
     * Hàm láy danh sách giáo viên dạy môn học
     */
    GetDanhSach() {
        return this.danhsach;
    }
}

module.exports = {
    AppContant,
    DanhSachGiaoVien,
    DanhSachGVDayMH,
    DanhSachLopHoc,
    GVDayMonHoc,
    GiaoVien,
    LoaiTiet,
    MonHoc,
    DanhSachMonHoc,
    LoaiViPham,
    LopHoc,
    Tiet,
    Thu,
};
