import React, { Component } from "react";
import { NhiemSacThe } from "../js/nhiemsacthe";
import { classrooms, subjects, teachers } from "../js/db";

export default class Scheduling extends Component {
    constructor(props) {
        super(props);

        this.nst = new NhiemSacThe();
        this.nst.ListLopHoc(classrooms);
        // this.nst.ListGiaoVien(teachers);
        this.nst.ListMonHoc(subjects);
        this.nst.PhanLichMonHoc();
        // this.nst.PhanGiaoVien();
        // this.nst.TinhDoThichNghi();

        this.state = {
            data: this.nst,
            report: [],
        };
    }

    handleMutate = () => {
        this.nst.TienHoa();
        console.log(this.nst);
        this.saveReport();
    };

    handleEvolution = () => {
        for (var i = 0; i < 10000; i++) {
            this.nst.TienHoa();
            this.saveReport();
        }

        // do {
        //     this.nst.TienHoa();
        //     console.log(this.nst);
        // } while (this.nst.HeSoThichNghi != 1);
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
        });
    };

    componentDidMount() {
        this.saveReport();
    }

    fetchReport = () => {
        if (this.state.report.length > 0) {
            return this.state.report.map((nst, i) => {
                return (
                    <div
                        className="d-flex justify-content-start align-items-center"
                        key={i}
                    >
                        <div className="widget-row-header">{i + 1}</div>
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
            return this.state.data.DSLop.map((lop, i) => {
                return (
                    <div key={i}>
                        <h6>{lop.TenLop}</h6>
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
                                                console.log();
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

                    {/* <button
                        className="btn btn-default ml-3"
                        onClick={this.handleStop}
                    >
                        Dừng
                    </button> */}
                </div>
                <div className="row">
                    <div className="col-md-4">
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
                    <div className="col-md-8 text-center">
                        <h5>Danh sách thời khóa biểu khối 6</h5>
                        {this.fetch()}
                    </div>
                </div>
            </>
        );
    }
}
