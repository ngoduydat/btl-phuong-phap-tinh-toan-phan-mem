const {
    AppContant,
    LopHoc,
    LoaiTiet,
    GiaoVien,
    MonHoc,
    DanhSachGiaoVien,
    DanhSachLopHoc,
    DanhSachMonHoc,
    DanhSachGVDayMH,
    GVDayMonHoc,
    LoaiViPham,
    ViTriNgauNhien,
    ViTriTietHoc,
    Tiet,
} = require("./danhsach");
const { classrooms, teachers, subjects } = require("./db1");

class NhiemSacThe {
    constructor() {
        // this.DSLop = []; //new DanhSachLopHoc();
        // this.DSPhong = []; //new DanhSachPhongHoc();
        // this.DSMon = []; //new DanhSachMonHoc();
        // this.DSGiaoVien = []; //new DanhSachGiaoVien();
        // this.DSDayHoc = []; //new DanhSachGVDayMH();

        this.DSLop = new DanhSachLopHoc();
        this.DSPhong = [];
        this.DSMon = new DanhSachMonHoc();
        this.DSGiaoVien = new DanhSachGiaoVien();
        this.DSDayHoc = new DanhSachGVDayMH();

        this.TheHe = 0;
        this.TongTiet = 0;
        this.TongTietHopLe = 0;
        this.TongTietViPham = 0;
        this.HeSoThichNghi = 0;
    }

    ListLopHoc(dt) {
        if (dt !== null) {
            dt.forEach((row) => {
                var lop = new LopHoc();

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
                lop.Thu[AppContant.Thu7].Tiet[AppContant.Tiet5].TenMon =
                    "Sinh hoạt";
                if (lop.BuoiHoc == AppContant.BuoiSang) {
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet1].Loai =
                        LoaiTiet.ChaoCo;
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet1].TenMon =
                        "Chào cờ";
                } else {
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.ChaoCo;
                    lop.Thu[AppContant.Thu2].Tiet[AppContant.Tiet5].TenMon =
                        "Chào cờ";
                }

                //Giáo viên chủ nhiệm ở tiết sinh hoạt
                lop.Thu[AppContant.Thu7].Tiet[AppContant.Tiet5].IDGV = lop.IDGV;

                //Lock các tiết không học
                if (lop.Khoi === 6) {
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
                } else if (lop.Khoi == 7) {
                    lop.TongTiet = 25;
                    lop.Thu[AppContant.Thu3].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu4].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet4].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu6].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                } else if (lop.Khoi == 8) {
                    lop.TongTiet = 27;
                    lop.Thu[AppContant.Thu4].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet4].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                } else if (lop.Khoi == 9) {
                    lop.TongTiet = 27;
                    lop.Thu[AppContant.Thu3].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet4].Loai =
                        LoaiTiet.KhongHoc;
                    lop.Thu[AppContant.Thu5].Tiet[AppContant.Tiet5].Loai =
                        LoaiTiet.KhongHoc;
                }

                this.TongTiet += lop.TongTiet;
                this.DSLop.Add(lop);
            });
        }
    }

    ListGiaoVien(dt) {
        if (dt !== null) {
            dt.forEach((row) => {
                var gv = new GiaoVien();

                gv.IDGV = row.IDGV;
                if (typeof row.TenGV !== "null") gv.TenGV = row.TenGV;
                if (typeof row.IDMon !== "null") gv.IDMon = row.IDMon;
                if (typeof row.TenMon !== "null") gv.TenMon = row.TenMH;
                if (typeof row.ChuyenKhoi !== "null")
                    gv.ChuyenKhoi = row.ChuyenKhoi;
                if (typeof row.SoTiet !== "null") gv.SoTiet = row.SoTiet;
                gv.SoTietChuaDay = gv.SoTiet;
                this.DSGiaoVien.Add(gv);
            });
        }
    }

    ListMonHoc(dt) {
        if (dt !== null) {
            dt.forEach((row) => {
                var mh = new MonHoc();

                mh.IDMon = row["IDMon"];
                if (typeof row.TenMH !== "null") mh.Ten = row["TenMH"];

                if (typeof row.Khoi6 !== "null") mh.Khoi6 = row["Khoi6"];
                if (typeof row.Khoi7 !== "null") mh.Khoi7 = row["Khoi7"];
                if (typeof row.Khoi8 !== "null") mh.Khoi8 = row["Khoi8"];
                if (typeof row.Khoi9 !== "null") mh.Khoi9 = row["Khoi9"];

                if (typeof row.SoTietK6 !== "null")
                    mh.SoTietK6 = row["SoTietK6"];
                if (typeof row.SoTietK7 !== "null")
                    mh.SoTietK7 = row["SoTietK7"];
                if (typeof row.SoTietK8 !== "null")
                    mh.SoTietK8 = row["SoTietK8"];
                if (typeof row.SoTietK9 !== "null")
                    mh.SoTietK9 = row["SoTietK9"];

                if (typeof row.SoBuoiK6 !== "null")
                    mh.SoBuoiK6 = row["SoBuoiK6"];
                if (typeof row.SoBuoiK7 !== "null")
                    mh.SoBuoiK7 = row["SoBuoiK7"];
                if (typeof row.SoBuoiK8 !== "null")
                    mh.SoBuoiK8 = row["SoBuoiK8"];
                if (typeof row.SoBuoiK9 !== "null")
                    mh.SoBuoiK9 = row["SoBuoiK9"];

                if (typeof row.TietKep !== "null") mh.TietKep = row["TietKep"];
                if (typeof row.TietPhu !== "null") mh.TietPhu = row["TietPhu"];

                this.DSMon.Add(mh);
            });
        }
    }

    PhanLichMonHoc() {
        var vt; // ViTriTietHoc
        var soTiet;

        var rndTiet = new ViTriNgauNhien();

        if (this.DSLop.danhsach.length > 0 && this.DSMon.danhsach.length > 0) {
            this.DSLop.danhsach.forEach((lop) => {
                //phân ngẫu nhiên các môn vào các tiết
                rndTiet.TronNgauNhien();
                this.DSMon.danhsach.forEach((mon) => {
                    soTiet = mon.GetSoTiet(lop.Khoi);

                    for (var i = 0; i < soTiet; i++) {
                        //Chỉ chọn những tiết trong quy định
                        do {
                            vt = rndTiet.GetNextViTri();

                            if (vt == null) break;
                        } while (
                            lop.Thu[vt.Thu].Tiet[vt.Tiet].Loai !==
                            LoaiTiet.BinhThuong
                        );

                        if (vt != null) {
                            lop.Thu[vt.Thu].Tiet[vt.Tiet].IDMon = mon.IDMon;
                            lop.Thu[vt.Thu].Tiet[vt.Tiet].TenMon = mon.Ten;
                            lop.Thu[vt.Thu].Tiet[vt.Tiet].TietKep = mon.TietKep;
                            lop.Thu[vt.Thu].Tiet[vt.Tiet].TietPhu = mon.TietPhu;
                        }
                    }
                });
            });
        }
    }

    PhanGiaoVien() {
        if (this.DSLop.danhsach.length > 0 && this.DSMon.danhsach.length > 0)
            // Có Lớp và có Môn học
            this.DSLop.danhsach.forEach((lop) => {
                this.DSMon.danhsach.forEach((mon) => {
                    var soTiet = mon.GetSoTiet(lop.Khoi);

                    if (soTiet > 0) {
                        var dsGiaoVien = new DanhSachGiaoVien();
                        //Láy danh sách giáo viên theo môn, chuyên khối

                        dsGiaoVien = this.DSGiaoVien.danhsach.filter((gv) => {
                            if (
                                gv.IDMon === mon.IDMon &&
                                gv.ChuyenKhoi === lop.Khoi &&
                                gv.SoTietChuaDay >= soTiet
                            ) {
                                return true;
                            }
                        });

                        if (dsGiaoVien.length == 0) {
                            //nếu ko còn gv thì phải láy gv khác khối
                            dsGiaoVien = this.DSGiaoVien.danhsach.filter(
                                (gv) => {
                                    if (
                                        gv.IDMon === mon.IDMon &&
                                        gv.SoTietChuaDay >= soTiet
                                    ) {
                                        return true;
                                    }
                                }
                            );
                        }

                        if (dsGiaoVien.length > 0) {
                            var rndIndexGiaoVien = Math.floor(
                                Math.random() * dsGiaoVien.length
                            );
                            var giaoVien = dsGiaoVien[rndIndexGiaoVien]; // Láy ngẫu nhiên một giáo viên

                            var day = new GVDayMonHoc();
                            day.IDLop = lop.IDLop;
                            day.IDMon = mon.IDMon;
                            day.IDGV = giaoVien.IDGV;
                            day.TenLop = lop.TenLop;
                            day.TenMon = mon.Ten;
                            day.TenGV = giaoVien.TenGV;
                            day.SoTiet = soTiet;

                            this.DSDayHoc.Add(day); //danh sách chung của NST
                            lop.DSDayHoc.Add(day); //danh sách dạy học riêng của lớp
                            lop.UpdateGVDayMonHoc(mon.IDMon, giaoVien);
                            giaoVien.SoTietDaDay += soTiet;
                            giaoVien.SoTietChuaDay -= soTiet;
                        } //else //Ghi log loi
                    } //else //Ghi log loi
                });
            });
    } //PhanGiaoVien

    KiemTraTrungLich(tietKT, lopKT) {
        var vt = new ViTriTietHoc(tietKT.Thu, tietKT.Index);

        this.DSLop.danhsach.forEach((lop) => {
            var tiet = lop.Thu[vt.Thu].Tiet[vt.Tiet]; //cùng thứ cùng tiết

            if (lop != lopKT && lop.BuoiHoc == lopKT.BuoiHoc)
                if (lop.BuoiHoc == lopKT.BuoiHoc)
                    if (tiet.Loai == LoaiTiet.BinhThuong)
                        if (tiet.IDGV == tietKT.IDGV) {
                            tiet.LoaiViPham = LoaiViPham.TrungLichGiaoVien;
                            tietKT.LoaiViPham = LoaiViPham.TrungLichGiaoVien;
                        }
        });
    }

    TinhDoThichNghi() {
        var HeSoThichNghi = 0;
        //int tongTiet, tongTietViPham;
        var TongTiet = 0;
        var TongTietHopLe = 0;
        var TongTietViPham = 0;

        if (this.DSLop.danhsach.length > 0 && this.DSMon.danhsach.length > 0) {
            // Có Lớp và có Môn học
            //Xóa hết vi phạm để tính lại
            this.DSLop.danhsach.forEach((lop) => {
                lop.Thu.forEach((thu) => {
                    thu.Tiet.forEach((tiet) => {
                        tiet.LoaiViPham = LoaiViPham.KhongViPham;
                    });
                });

                lop.TongTietHopLe = lop.TongTiet;
                lop.TongTietViPham = 0;
            });

            //Kiểm tra thiếu giáo viên
            this.DSLop.danhsach.forEach((lop) => {
                lop.Thu.forEach((thu) => {
                    thu.Tiet.forEach((tiet) => {
                        if (
                            tiet.Loai === LoaiTiet.BinhThuong &&
                            tiet.IDGV === 0
                        ) {
                            console.log("thieu giao vien");
                            tiet.LoaiViPham = LoaiViPham.ThieuGiaoVien;
                        }
                    });
                });
            });

            //Kiểm tra trùng lịch giáo viên
            this.DSLop.danhsach.forEach((lop) => {
                lop.Thu.forEach((thu) => {
                    thu.Tiet.forEach((tiet) => {
                        if (
                            tiet.Loai === LoaiTiet.BinhThuong &&
                            tiet.IDGV > 0
                        ) {
                            this.KiemTraTrungLich(tiet, lop);
                        }
                    });
                });
            });

            //Kiểm tra vi phạm số buổi và số tiết
            this.DSLop.danhsach.forEach((lop) => {
                this.DSMon.danhsach.forEach((mon) => {
                    lop.ViPhamSoTiet(mon);
                    lop.ViPhamSoBuoi(mon);
                });

                lop.TinhSoTietViPham();
                TongTiet += lop.TongTiet;
                TongTietHopLe += lop.TongTietHopLe;
                TongTietViPham += lop.TongTietViPham;
            });
        }

        if (TongTiet > 0) {
            HeSoThichNghi =
                parseFloat(TongTiet - TongTietViPham) / parseFloat(TongTiet);
            this.TongTietHopLe = TongTietHopLe;
            this.TongTietViPham = TongTietViPham;
            this.HeSoThichNghi = HeSoThichNghi;
        }
    }

    /**
     * Hàm tiến hóa
     */
    TienHoa() {
        if (this.DSLop.danhsach.length > 0 && this.DSMon.danhsach.length > 0)
            // Có Lớp và có Môn học
            this.DSLop.danhsach.forEach((lop) => {
                lop.Thu.forEach((thu) => {
                    thu.Tiet.forEach((tiet) => {
                        if (tiet.LoaiViPham !== LoaiViPham.KhongViPham)
                            if (tiet.LoaiViPham === LoaiViPham.QuaSoBuoi) {
                                lop.GhepBuoi(tiet);
                            } else if (
                                tiet.LoaiViPham === LoaiViPham.ThieuSoBuoi
                            )
                                lop.TachBuoi(tiet);
                            else if (
                                tiet.LoaiViPham === LoaiViPham.TrungLichGiaoVien
                            )
                                this.ChuyenTietTrungLich(tiet, lop);
                    });
                });
            });

        this.TinhDoThichNghi();
        this.TheHe++;
    }

    /**
     * Hàm chuyển tiết trùng lịch
     * @param {*} tiet - Tiết học
     * @param {*} lop - Lớp học
     */
    ChuyenTietTrungLich(tiet, lop) {
        var tietB; // instant Tiet
        var vt; // instant ViTriTietHoc
        var rndVT = new ViTriNgauNhien();
        while (true) {
            vt = rndVT.GetNextViTri(); //láy một vị trí tiết học bất kỳ
            if (vt == null) break;
            tietB = lop.Thu[vt.Thu].Tiet[vt.Tiet];
            if (tietB != tiet && tietB.Loai == LoaiTiet.BinhThuong)
                if (tietB.IDGV != tiet.IDGV && tietB.IDMon != tiet.IDMon)
                    if (
                        !this.TrungLichGiaoVien(
                            lop,
                            tietB.Thu,
                            tietB.Index,
                            tiet.IDGV
                        )
                    )
                        if (
                            !this.TrungLichGiaoVien(
                                lop,
                                tiet.Thu,
                                tiet.Index,
                                tietB.IDGV
                            )
                        ) {
                            //Chỉ chọn tiết bình thường và Khác tiết đang cần chuyển
                            //Khác giáo viên và môn học đang cần chuyển
                            //Không trùng lịch ở vị trí mới
                            //Không trùng lịch ở vị trí mới

                            // tiet.SwapNoiDungTiet(tietB);
                            var temp = new Tiet(0, 0); // khai báo instant Tiet()
                            temp.IDMon = tiet.IDMon;
                            temp.TenMon = tiet.TenMon;
                            temp.IDGV = tiet.IDGV;
                            temp.TenGV = tiet.TenGV;
                            temp.TietKep = tiet.TietKep;
                            temp.TietPhu = tiet.TietPhu;

                            tiet.IDMon = tietB.IDMon;
                            tiet.TenMon = tietB.TenMon;
                            tiet.IDGV = tietB.IDGV;
                            tiet.TenGV = tietB.TenGV;
                            tiet.TietKep = tietB.TietKep;
                            tiet.TietPhu = tietB.TietPhu;

                            tietB.IDMon = temp.IDMon;
                            tietB.TenMon = temp.TenMon;
                            tietB.IDGV = temp.IDGV;
                            tietB.TenGV = temp.TenGV;
                            tietB.TietKep = temp.TietKep;
                            tietB.TietPhu = temp.TietPhu;

                            tiet.LoaiViPham = LoaiViPham.DangXuLy;
                            tietB.LoaiViPham = LoaiViPham.DangXuLy;
                            break;
                        }
        }
    }

    /**
     * Hàm kiểm tra trùng lịch giáo viên
     * @param {*} lopKT - lớp kiểm tra
     * @param {*} iThu - thứ kiểm tra
     * @param {*} iTiet - tiet kiểm tra
     * @param {*} IDGV - ID giáo viên kiểm tra
     */
    TrungLichGiaoVien(lopKT, iThu, iTiet, IDGV) {
        this.DSLop.danhsach.forEach((lop) => {
            var tiet = lop.Thu[iThu].Tiet[iTiet]; //cùng thứ, cùng tiết
            if (lop != lopKT && lop.BuoiHoc == lopKT.BuoiHoc)
                if (lop.BuoiHoc == lopKT.BuoiHoc)
                    if (tiet.Loai == LoaiTiet.BinhThuong)
                        if (tiet.IDGV == IDGV)
                            // khác lớp
                            // cùng buổi học
                            //cùng 1 gv => trùng lịch
                            return true;
        });

        return false;
    }
}

module.exports = {
    NhiemSacThe,
};
