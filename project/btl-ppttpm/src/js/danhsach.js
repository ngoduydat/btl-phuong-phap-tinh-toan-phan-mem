// Phan vi tri tiet hoc
class ViTriTietHoc {
    constructor(thu = 0, tiet = 0) {
        this.Thu = thu;
        this.Tiet = tiet;
    }
}

class DanhSachViTriTietHoc {
    constructor() {
        this.danhsach = []; // list ViTriTietHoc
    }
    Add(vt) {
        this.danhsach.push(vt);
    }
    GetViTri(index) {
        if (this.danhsach.length > 0 && this.danhsach.length > index) {
            return this.danhsach[index];
        } else {
            return null;
        }
    }
    GetDanhSach() {
        return this.danhsach;
    }
}

class ViTriNgauNhien {
    constructor() {
        this.danhsach = []; //list ViTriTietHoc
        for (var thu = AppContant.Thu2; thu <= AppContant.Thu7; thu++)
            for (
                var tiet = AppContant.Tiet1;
                tiet <= AppContant.Tiet5;
                tiet++
            ) {
                var point = new ViTriTietHoc(thu, tiet);
                this.danhsach.push(point);
            }
        this.viTri = 0;
        this.Count = this.danhsach.length;

        this.TronNgauNhien();
    }

    TronNgauNhien() {
        var danhsach = this.danhsach;
        this.viTri = 0;

        var vitriDau, vitriCuoi;
        for (var thu = AppContant.Thu2; thu <= AppContant.Thu7; thu++)
            for (
                var tiet = AppContant.Tiet1;
                tiet <= AppContant.Tiet5;
                tiet++
            ) {
                vitriDau = Math.floor(Math.random() * 30 + 1); // 30 tiết trong tuần
                vitriCuoi = Math.floor(Math.random() * 30 + 1); // 30 tiết trong tuần
                var tmp = new ViTriTietHoc();
                if (vitriDau !== vitriCuoi) {
                    //swap vị trí

                    if (
                        typeof danhsach[vitriDau] !== "undefined" &&
                        typeof danhsach[vitriCuoi] !== "undefined"
                    ) {
                        tmp.Thu = danhsach[vitriDau].Thu;
                        tmp.Tiet = danhsach[vitriDau].Tiet;

                        danhsach[vitriDau].Thu = danhsach[vitriCuoi].Thu;
                        danhsach[vitriDau].Tiet = danhsach[vitriCuoi].Tiet;

                        danhsach[vitriCuoi].Thu = tmp.Thu;
                        danhsach[vitriCuoi].Tiet = tmp.Tiet;
                    }
                }
            }
        this.danhsach = danhsach;
    }

    GetNextViTri() {
        if (this.danhsach.length > 0 && this.danhsach.length > this.viTri) {
            return this.danhsach[this.viTri++];
        } else return null;
    }

    GetViTri(index) {
        if (this.danhsach.length > 0 && this.danhsach.length > index)
            return this.danhsach[index];
        else return null;
    }

    GetDanhSach() {
        return this.danhsach;
    }
}

/**
 * Class thể hiện gia trị hằng
 * Author: NDDAT(19/4/2020)
 */
class AppContant {
    static BuoiSang = 1;
    static BuoiChieu = 2;

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

    static BinhThuong = 1;
    static ChaoCo = 2;
    static SinhHoat = 3;
    static TheDuc = 4;
    static KhongHoc = 5;
}

/**
 * Class thể hiện các loại vi phạm điều kiện
 * Author: NDDAT(19/4/2020)
 */
class LoaiViPham {
    constructor(value) {
        this.Value = value;
    }

    static KhongViPham = 1;
    static QuaSoTiet = 2;
    static QuaSoBuoi = 3;
    static ThieuSoBuoi = 4;
    static TrungLichGiaoVien = 5;
    static ThieuGiaoVien = 6;
    static DangXuLy = 7;
}

class Tiet {
    constructor(index, thu) {
        this.Loai = LoaiTiet.BinhThuong;
        this.LoaiViPham = LoaiViPham.KhongViPham;
        this.Thu = thu;
        this.Index = index;
        this.IDMon = 0;
        this.IDGV = 0;
        this.TenGV = "";
        this.TenMon = "";
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

        this.DSDayHoc = new DanhSachGVDayMH(); //giáo viên dạy những môn học của lớp dc phân ngẫu nhiên ở NST
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
            });

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

        return res;
    }

    //hàm tính vi phạm số buổi
    ViPhamSoBuoi(mon) {
        var tongBuoi = 0;

        this.Thu.forEach((thu) => {
            thu.Tiet.forEach((tiet) => {
                if (tiet.IDMon == mon.IDMon) {
                    tongBuoi++;
                }
            });
        });

        var vp = LoaiViPham.KhongViPham;
        if (this.Khoi == 6 && tongBuoi > mon.SoBuoiK6)
            vp = LoaiViPham.QuaSoBuoi;
        else if (this.Khoi == 6 && tongBuoi < mon.SoBuoiK6)
            vp = LoaiViPham.ThieuSoBuoi;
        else if (this.Khoi == 7 && tongBuoi > mon.SoBuoiK7)
            vp = LoaiViPham.QuaSoBuoi;
        else if (this.Khoi == 7 && tongBuoi < mon.SoBuoiK7)
            vp = LoaiViPham.ThieuSoBuoi;
        else if (this.Khoi == 8 && tongBuoi > mon.SoBuoiK8)
            vp = LoaiViPham.QuaSoBuoi;
        else if (this.Khoi == 8 && tongBuoi < mon.SoBuoiK8)
            vp = LoaiViPham.ThieuSoBuoi;
        else if (this.Khoi == 9 && tongBuoi > mon.SoBuoiK9)
            vp = LoaiViPham.QuaSoBuoi;
        else if (this.Khoi == 9 && tongBuoi < mon.SoBuoiK9)
            vp = LoaiViPham.ThieuSoBuoi;

        if (vp != LoaiViPham.KhongViPham) {
            this.Thu.forEach((thu) => {
                thu.Tiet.forEach((tiet) => {
                    if (tiet.IDMon == mon.IDMon) tiet.LoaiViPham = vp;
                });
            });
        }

        return vp != LoaiViPham.KhongViPham;
    }

    //hàm tính số tiết vi phạm
    TinhSoTietViPham() {
        var viPham = 0;
        this.Thu.forEach((thu) => {
            thu.Tiet.forEach((tiet) => {
                if (tiet.LoaiViPham != LoaiViPham.KhongViPham) {
                    viPham++;
                }
            });
        });

        this.TongTietViPham = viPham;
        this.TongTietHopLe = this.TongTiet - viPham;
    }

    //hàm ghép buổi
    GhepBuoi(tiet) {
        let rndVT = new ViTriNgauNhien();
        var vt = new ViTriTietHoc(); //ViTriTietHoc
        var tmp = new Tiet();
        var tietA;
        var tietB = new Tiet();
        //Chọn một vị trí tiết học bất kỳ đủ điều kiện để ghép
        do {
            vt = rndVT.GetNextViTri();

            if (vt == null) break; //ko chọn đc

            tmp = this.Thu[vt.Thu].Tiet[vt.Tiet];

            if (tmp.Loai == LoaiTiet.BinhThuong)
                if (tmp.IDMon == tiet.IDMon && tmp != tiet) {
                    tietA = tmp;
                    break; //chọn một tiết bất kỳ cùng môn
                }
        } while (true);

        // Chọn tiết khác cùng buổi để thay đổi vị trí
        if (tiet.Index == AppContant.Tiet1)
            tietB = this.Thu[tiet.Thu].Tiet[AppContant.Tiet2];
        else if (tiet.Index == AppContant.Tiet5)
            tietB = this.Thu[tiet.Thu].Tiet[AppContant.Tiet4];
        else if (
            this.Thu[tiet.Thu].Tiet[tiet.Index + 1].Loai == LoaiTiet.BinhThuong
        )
            tietB = this.Thu[tiet.Thu].Tiet[tiet.Index + 1];
        else if (
            this.Thu[tiet.Thu].Tiet[tiet.Index - 1].Loai == LoaiTiet.BinhThuong
        )
            tietB = this.Thu[tiet.Thu].Tiet[tiet.Index - 1];

        if (tietA != null && tietB != null) {
            //hoán đổi nội dung (Môn, GV)

            var temp = new Tiet(0, 0); // khai báo instant Tiet()
            temp.IDMon = tietA.IDMon;
            temp.TenMon = tietA.TenMon;
            temp.IDGV = tietA.IDGV;
            temp.TenGV = tietA.TenGV;
            temp.TietKep = tietA.TietKep;
            temp.TietPhu = tietA.TietPhu;

            tietA.IDMon = tietB.IDMon;
            tietA.TenMon = tietB.TenMon;
            tietA.IDGV = tietB.IDGV;
            tietA.TenGV = tietB.TenGV;
            tietA.TietKep = tietB.TietKep;
            tietA.TietPhu = tietB.TietPhu;

            tietB.IDMon = temp.IDMon;
            tietB.TenMon = temp.TenMon;
            tietB.IDGV = temp.IDGV;
            tietB.TenGV = temp.TenGV;
            tietB.TietKep = temp.TietKep;
            tietB.TietPhu = temp.TietPhu;

            //thay đổi lại loại vi phạm
            tietA.LoaiViPham = LoaiViPham.DangXuLy;
            tietB.LoaiViPham = LoaiViPham.DangXuLy;
        }
    }

    //hàm tách buổi
    TachBuoi(tiet) {
        var rndVT = new ViTriNgauNhien();
        var vt; //ViTriTietHoc
        var tmp = new Tiet();
        var tietA = new Tiet();

        //Chọn một vị trí tiết học bất kỳ đủ điều kiện để tách
        do {
            vt = rndVT.GetNextViTri();
            if (vt == null) break; //ko chọn đc
            tmp = this.Thu[vt.Thu].Tiet[vt.Tiet];

            if (tmp.Loai == LoaiTiet.BinhThuong)
                if (tmp.Thu != tiet.Thu && tmp.IDMon != tiet.IDMon) {
                    tietA = tmp;
                    break; //chọn một tiết bất kỳ không vi phạm, không phải tiết kép, khác thứ, khác môn
                }
        } while (true);

        if (tietA != null) {
            //hoán đổi nội dung (Môn, GV)

            // tietA.SwapNoiDungTiet(tiet);

            var temp = new Tiet(0, 0); // khai báo instant Tiet()
            temp.IDMon = tietA.IDMon;
            temp.TenMon = tietA.TenMon;
            temp.IDGV = tietA.IDGV;
            temp.TenGV = tietA.TenGV;
            temp.TietKep = tietA.TietKep;
            temp.TietPhu = tietA.TietPhu;

            tietA.IDMon = tiet.IDMon;
            tietA.TenMon = tiet.TenMon;
            tietA.IDGV = tiet.IDGV;
            tietA.TenGV = tiet.TenGV;
            tietA.TietKep = tiet.TietKep;
            tietA.TietPhu = tiet.TietPhu;

            tiet.IDMon = temp.IDMon;
            tiet.TenMon = temp.TenMon;
            tiet.IDGV = temp.IDGV;
            tiet.TenGV = temp.TenGV;
            tiet.TietKep = temp.TietKep;
            tiet.TietPhu = temp.TietPhu;

            tietA.LoaiViPham = LoaiViPham.DangXuLy;
            tiet.LoaiViPham = LoaiViPham.DangXuLy;
        }
    }
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
        this.TenMon = "";
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
            if (gv.IDMon === idMon && gv.SoTietChuaDay >= soTiet) dsGV.push(gv);
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
                dsGV.push(gv);
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

        this.Khoi6 = false;
        this.Khoi7 = false;
        this.Khoi8 = false;
        this.Khoi9 = false;

        this.SoTietK6 = 0;
        this.SoTietK7 = 0;
        this.SoTietK8 = 0;
        this.SoTietK9 = 0;

        this.SoBuoiK6 = 0;
        this.SoBuoiK7 = 0;
        this.SoBuoiK8 = 0;
        this.SoBuoiK9 = 0;

        this.TietKep = false;
        this.TietPhu = false;
    }

    GetSoTiet(khoi) {
        if (khoi === 6) return this.SoTietK6;
        else if (khoi === 7) return this.SoTietK7;
        else if (khoi === 8) return this.SoTietK8;
        else if (khoi === 9) return this.SoTietK9;
        else return 0;
    }

    GetSoBuoi(khoi) {
        if (khoi === 6) return this.SoBuoiK6;
        else if (khoi === 7) return this.SoBuoiK7;
        else if (khoi === 8) return this.SoBuoiK8;
        else if (khoi === 9) return this.SoBuoiK9;
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

    ViTriNgauNhien,
    ViTriTietHoc,
    DanhSachViTriTietHoc,
};
