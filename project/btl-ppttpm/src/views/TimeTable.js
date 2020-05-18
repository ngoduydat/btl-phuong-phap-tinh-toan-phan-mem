import React, { Component } from "react";
import { NhiemSacThe } from "../js/nhiemsacthe";

export default class Scheduling extends Component {
    constructor(props) {
        super(props);

        var data = JSON.parse(localStorage.getItem("data"));

        this.state = {
            data: data,
            isShow: 0,
        };
    }

    _onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value.toString(),
        });
    };

    componentDidMount() {}

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

    render() {
        return (
            <>
                <div className="row text-right">
                    <div className="col-6">
                        <select
                            style={{ width: 200 }}
                            className="form-control"
                            onChange={this._onChange}
                            name="isShow"
                            value={this.state.isShow}
                        >
                            <option value="1">Hiển thị tên giáo viên</option>
                            <option value="0">
                                Không hiển thị tên giáo viên
                            </option>
                        </select>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h5 className="my-5">
                            Danh sách thời khóa biểu khối 6, 7
                        </h5>

                        {this.fetch()}
                    </div>
                </div>
            </>
        );
    }
}
