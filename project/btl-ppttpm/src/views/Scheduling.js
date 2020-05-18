import React, { Component } from "react";
import { NhiemSacThe } from "../js/nhiemsacthe";

export default class Scheduling extends Component {
    constructor(props) {
        super(props);

        var subjects = JSON.parse(localStorage.getItem("subjects"));
        var classrooms = JSON.parse(localStorage.getItem("classrooms"));
        var teachers = JSON.parse(localStorage.getItem("teachers"));

        this.nst = new NhiemSacThe();
        this.nst.ListLopHoc(classrooms);
        this.nst.ListGiaoVien(teachers);
        this.nst.ListMonHoc(subjects);
        this.nst.PhanLichMonHoc();
        this.nst.PhanGiaoVien();
        this.nst.TinhDoThichNghi();

        console.log(this.nst);

        this.state = {
            data: this.nst,
            report: [],
            isSuccess: false,
        };
    }

    handleMutate = () => {
        this.nst.TienHoa();
        console.log(this.nst);
        this.saveReport();
    };

    handleEvolution = () => {
        do {
            this.nst.TienHoa();
            this.saveReport();
        } while (this.nst.HeSoThichNghi != 1);
    };

    saveReport = () => {
        var { TheHe, TongTietHopLe, TongTietViPham, HeSoThichNghi } = this.nst;
        var obj = {
            TheHe,
            TongTietHopLe,
            TongTietViPham,
            HeSoThichNghi,
        };
        var newReport = this.state.report;
        newReport.push(obj);
        this.setState({
            data: this.nst,
            report: newReport,
            isSuccess: obj.HeSoThichNghi === 1 ? true : false,
            isShow: 0,
        });
    };

    _onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value.toString(),
        });
    };

    componentDidMount() {
        this.saveReport();
    }

    fetchReport = () => {
        if (this.state.report.length > 0) {
            return this.state.report.reverse().map((nst, i) => {
                return (
                    <div
                        className="d-flex justify-content-start align-items-center"
                        key={i}
                    >
                        <div className="widget-row-header">
                            {Math.abs(this.state.report.length - i)}
                        </div>
                        <div className="widget-row-header">
                            {nst.TongTietHopLe}
                        </div>
                        <div className="widget-row-header">
                            {nst.TongTietViPham}
                        </div>
                        <div className="widget-row-header">
                            {Math.round(nst.HeSoThichNghi * 10000) / 10000}
                        </div>
                    </div>
                );
            });
        }
    };

    fetch = () => {
        if (this.state.data !== null) {
            return this.state.data.DSLop.danhsach.map((lop, i) => {
                return (
                    <div key={i}>
                        <h6 className="my-4">{lop.TenLop}</h6>
                        <div className=" d-flex flex-column">
                            <div className="d-flex justify-content-start align-items-center">
                                <div className="widget-row-header">Tiết</div>
                                <div className="widget-row-header">Thứ 2</div>
                                <div className="widget-row-header">Thứ 3</div>
                                <div className="widget-row-header">Thứ 4</div>
                                <div className="widget-row-header">Thứ 5</div>
                                <div className="widget-row-header">Thứ 6</div>
                                <div className="widget-row-header">Thứ 7</div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center">
                                <div className="border  widget-fix text-bold">
                                    <div className="widget-row">1</div>
                                    <div className="widget-row">2</div>
                                    <div className="widget-row">3</div>
                                    <div className="widget-row">4</div>
                                    <div className="widget-row">5</div>
                                </div>
                                {lop.Thu.map((thu, i) => {
                                    return (
                                        <div
                                            className="border  widget-fix"
                                            key={i}
                                        >
                                            {thu.Tiet.map((tiet, i) => {
                                                var tenGV = "";
                                                var filtered = this.state.data.DSGiaoVien.danhsach.filter(
                                                    (ele) => {
                                                        if (
                                                            ele.IDGV ===
                                                            tiet.IDGV
                                                        ) {
                                                            return true;
                                                        }
                                                    }
                                                );

                                                return (
                                                    <div
                                                        className={
                                                            tiet.LoaiViPham ===
                                                            1
                                                                ? "widget-row"
                                                                : "widget-row mark"
                                                        }
                                                        key={i}
                                                    >
                                                        {tiet.TenMon}
                                                        {filtered.length ===
                                                            1 &&
                                                        parseInt(
                                                            this.state.isShow
                                                        ) === 1
                                                            ? `( ${filtered[0].TenGV} )`
                                                            : ""}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    handleSaveTimetable = () => {
        localStorage.setItem("data", JSON.stringify(this.state.data));
        this.props.history.push("/time-table");
    };

    render() {
        return (
            <>
                <div className="mb-3">
                    <button
                        className="btn btn-success"
                        onClick={this.handleMutate}
                    >
                        Tiến hóa
                    </button>

                    <button
                        className="btn btn-danger ml-3"
                        onClick={this.handleEvolution}
                    >
                        Tiến hóa hết
                    </button>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="scroll-data">
                            <div className="d-flex justify-content-start align-items-center">
                                <div className="widget-row-header-1">
                                    Thế hệ
                                </div>
                                <div className="widget-row-header-1">
                                    Số tiết hợp lệ
                                </div>
                                <div className="widget-row-header-1">
                                    Số tiết vi phạm
                                </div>
                                <div className="widget-row-header-1">
                                    H/s thích nghi
                                </div>
                            </div>
                            {this.fetchReport()}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-center">
                        <h5 className="my-5">
                            Danh sách thời khóa biểu khối 6, 7
                        </h5>
                        <div className="row text-right">
                            <div className="col-6">
                                <select
                                    style={{ width: 200 }}
                                    className="form-control"
                                    onChange={this._onChange}
                                    name="isShow"
                                    value={this.state.isShow}
                                >
                                    <option value="1">
                                        Hiển thị tên giáo viên
                                    </option>
                                    <option value="0">
                                        Không hiển thị tên giáo viên
                                    </option>
                                </select>
                            </div>
                            <div className="col-6">
                                {this.state.isSuccess && (
                                    <button
                                        className="btn btn-success ml-3"
                                        onClick={this.handleSaveTimetable}
                                    >
                                        Lưu thời khóa biểu
                                    </button>
                                )}
                            </div>
                        </div>
                        {this.fetch()}
                    </div>
                </div>
            </>
        );
    }
}
