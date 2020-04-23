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
        this.IDPH = 0;
        this.TenLop = "";
        this.Khoi = 0;
        this.SiSo = 0;
        this.BuoiHoc = 0;

        this.TongThu = 6;
        this.Thu = [];

        for (var i = 0; i < this.TongThu; i++) {
            Thu[i] = new Thu(i);
        }

        this.DSDayHoc = new DanhSachGVDayMH();
    }

    /**
     * Hàm cập nhật lại giáo viện dạy môn học
     * @param {int} IDMon
     * @param {GiaoVien} gv
     */
    UpdateGVDayMonHoc(IDMon, gv) {
        this.Thu.forEach((thu) => {
            thu.Tiet.forEach((tiet) => {
                if (tiet.IDMon == IDMon) {
                    tiet.IDGV = gv.IDGV;
                    tiet.TenGV = gv.TenGV;
                }
            });
        });
    }

    //tính vi pham so tiet
    //tính vi phạm số buổi
}

class DanhSachLopHoc {
    constructor() {
        var danhsach = []; // list LopHoc[]
        var Count = danhsach.length;
    }

    /**
     * hàm thêm danh sách lớp
     */
    Add(lop) {
        danhsach.push(lop);
    }

    /**
     * lấy lớp theo vị trí
     */
    GetLopHoc(vitri) {
        if (danhsach.length > 0 && danhsach.length > vitri)
            return danhsach[vitri];
        else return null;
    }

    /**
     * hàm lấy danh sách lớp học
     */
    GetDanhSach() {
        return danhsach;
    }
}

class GVDayMonHoc {
    constructor() {
        IDGV = 0;
        IDMon = 0;
        IDLop = 0;
        SoTiet = 0;
        TenGV = "";
        TenMon = "";
        TenLop = "";
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
        danhsach.push(mh);
    }

    /**
     * Hàm lấy môn học theo vị trí
     * @param {int} vitri
     */
    GetItem(vitri) {
        if (this.danhsach.length > 0 && this.danhsach.length > vitri)
            return danhsach[vitri];
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
    DanhSachGVDayMH,
    DanhSachLopHoc,
    GVDayMonHoc,
    LoaiTiet,
    LoaiViPham,
    LopHoc,
    Tiet,
    Thu,
};
