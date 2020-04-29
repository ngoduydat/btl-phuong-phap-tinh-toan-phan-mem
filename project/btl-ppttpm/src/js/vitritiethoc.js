const { AppContant } = require("./danhsach");
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

    async TronNgauNhien() {
        var danhsach = await this.danhsach;
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
    }

    GetNextViTri() {
        if (this.danhsach.length > 0 && this.danhsach.length > this.viTri)
            return this.danhsach[this.viTri++];
        else return null;
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

module.exports = {
    DanhSachViTriTietHoc,
    ViTriNgauNhien,
    ViTriTietHoc,
};
