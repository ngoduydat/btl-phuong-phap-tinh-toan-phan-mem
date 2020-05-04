const teachers = [
    {
        IDGV: 1,
        TenGV: "Ngô Duy Đạt",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 1,
        TenMH: "Toán",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 2,
        TenGV: "Bùi Duy Đông",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 2,
        TenMH: "Văn",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 3,
        TenGV: "Nguyễn Văn Minh",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 3,
        TenMH: "Anh văn",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 4,
        TenGV: "Nguyễn Văn Sơn",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 4,
        TenMH: "Lịch sử",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 5,
        TenGV: "Chu Trọng Sơn",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 5,
        TenMH: "Địa lý",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 6,
        TenGV: "Cao Việt Bách",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 6,
        TenMH: "Sinh học",
        ChuyenKhoi: 6,
    },

    {
        IDGV: 7,
        TenGV: "Đặng Quang Anh",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 7,
        TenMH: "Tin học",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 8,
        TenGV: "Phạm Thị Lệ",
        NamSinh: "28/5/1998",
        GioiTinh: "Nữ",
        SoTiet: 9,
        IDMon: 8,
        TenMH: "Mỹ thuật",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 9,
        TenGV: "Đỗ Thúy Hường",
        NamSinh: "28/5/1998",
        GioiTinh: "Nữ",
        SoTiet: 9,
        IDMon: 9,
        TenMH: "Âm nhạc",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 10,
        TenGV: "Vũ Thị Phương",
        NamSinh: "28/5/1998",
        GioiTinh: "Nữ",
        SoTiet: 12,
        IDMon: 10,
        TenMH: "Thể dục",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 11,
        TenGV: "Nguyễn Thị Toan",
        NamSinh: "28/5/1998",
        GioiTinh: "Nữ",
        SoTiet: 12,
        IDMon: 11,
        TenMH: "Công nghệ",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 12,
        TenGV: "Đỗ Xuân Doanh",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 12,
        TenMH: "GDCD",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 13,
        TenGV: "Nguyễn Bá Hải",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 12,
        IDMon: 13,
        TenMH: "Vật lý",
        ChuyenKhoi: 6,
    },
    {
        IDGV: 13,
        TenGV: "Nông Hải Hà",
        NamSinh: "28/5/1998",
        GioiTinh: "Nam",
        SoTiet: 19,
        IDMon: 2,
        TenMH: "Văn",
        ChuyenKhoi: 6,
    },
];

const subjects = [
    {
        IDMon: 1,
        TenMH: "Toán",
        SoTietK6: 4,
        SoBuoiK6: 2,
        TietKep: true,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 2,
        TenMH: "Văn",
        SoTietK6: 4,
        SoBuoiK6: 2,
        TietKep: true,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 3,
        TenMH: "Anh văn",
        SoTietK6: 4,
        SoBuoiK6: 3,
        TietKep: true,
        TietPhu: false,
        Khoi6: true,
    },

    {
        IDMon: 4,
        TenMH: "Lịch sử",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 5,
        TenMH: "Địa lý",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 6,
        TenMH: "Sinh học",
        SoTietK6: 2,
        SoBuoiK6: 2,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 7,
        TenMH: "Tin học",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 8,
        TenMH: "Mỹ thuật",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 9,
        TenMH: "Âm nhạc",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },

    {
        IDMon: 10,
        TenMH: "Công nghệ",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: true,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 11,
        TenMH: "GDCD",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    {
        IDMon: 12,
        TenMH: "Vật lý",
        SoTietK6: 1,
        SoBuoiK6: 1,
        TietKep: false,
        TietPhu: false,
        Khoi6: true,
    },
    // {
    //     IDMon: 10,
    //     TenMH: "Thể dục",
    //     SoTietK6: 2,
    //     SoBuoiK6: 1,
    //     TietKep: true,
    //     TietPhu: true,
    //     Khoi6: true,
    // },
];

const classrooms = [
    {
        IDLop: 1,
        TenLop: "6A",
        SiSo: 48,
        BuoiHoc: 1,
        IDGV: 1,
        TenGV: "Ngô Duy Đạt",
        Khoi: 6,
    },
    {
        IDLop: 2,
        TenLop: "6B",
        SiSo: 47,
        BuoiHoc: 1,
        IDGV: 1,
        TenGV: "Ngô Duy Đạt",
        Khoi: 6,
    },
    {
        IDLop: 3,
        TenLop: "6C",
        SiSo: 45,
        BuoiHoc: 1,
        IDGV: 1,
        TenGV: "Ngô Duy Đạt",
        Khoi: 6,
    },
];

module.exports = {
    classrooms,
    subjects,
    teachers,
};
