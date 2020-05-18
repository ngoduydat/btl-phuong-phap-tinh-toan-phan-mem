import React, { Component } from "react";
import { teachers } from "../js/db1.js";

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // _handleEdit = () => {
    //     this.setState({
    //         isEdit: !this.state.isEdit,
    //     });
    // };

    // _onChange = (event) => {
    //     var name = event.target.name;
    //     var value = event.target.value;
    //     this.setState({
    //         [name]: value.toString(),
    //     });
    // };

    // _handleSave = () => {
    //     var newObj = {
    //         IDGV: this.props.obj.IDGV,
    //         TenGV: this.state.TenGV,
    //         NamSinh: this.state.NamSinh,
    //         GioiTinh: this.state.GioiTinh,
    //         SoTiet: this.state.SoTiet,
    //         IDMon: this.state.IDMon,
    //         TenMH: this.state.TenMH,
    //         ChuyenKhoi: this.state.ChuyenKhoi,
    //     };
    // };

    render() {
        return (
            <tr key={this.props.obj.IDGV}>
                <th scope="row">{this.props.obj.IDGV}</th>
                <td>{this.props.obj.TenGV}</td>

                <td>{this.props.obj.TenMH}</td>
                <td>{this.props.obj.ChuyenKhoi}</td>
                <td>{this.props.obj.SoTiet}</td>
                <td>{this.props.obj.NamSinh}</td>
                <td>{this.props.obj.GioiTinh}</td>
                <td>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) =>
                            this.props._handleEdit(this.props.obj.IDGV)
                        }
                        data-toggle="modal"
                        data-target="#editModal"
                    >
                        Sửa
                    </button>
                    <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={(e) =>
                            this.props._handleDelete(this.props.obj.IDGV)
                        }
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
export default class Teacher extends Component {
    constructor(prop) {
        super(prop);

        var subjects = JSON.parse(localStorage.getItem("subjects"));
        var classrooms = JSON.parse(localStorage.getItem("classrooms"));
        var teachers = JSON.parse(localStorage.getItem("teachers"));

        this.state = {
            classrooms: classrooms,
            teachers: teachers,
            subjects: subjects,

            ChuyenKhoi: 0,
            GioiTinh: "",
            IDGV: null,
            IDMon: 0,
            NamSinh: "",
            SoTiet: 0,
            TenGV: "",
            TenMH: "",

            isEdit: false,
            ChuyenKhoiEdit: 0,
            GioiTinhEdit: "",
            IDGVEdit: null,
            IDMonEdit: 0,
            NamSinhEdit: "",
            SoTietEdit: 0,
            TenGVEdit: "",
            TenMHEdit: "",
        };
    }

    _onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value.toString(),
        });
    };

    fetchRows = (data) => {
        if (this.state.teachers.length > 0) {
            return this.state.teachers.map((ele, i) => {
                return (
                    <Row
                        key={ele.IDGV}
                        obj={ele}
                        subjects={this.state.subjects}
                        teachers={this.state.teachers}
                        _handleDelete={this._handleDelete}
                        _handleEdit={this._handleEdit}
                    />
                );
            });
        }
    };

    _onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value.toString(),
        });
    };

    generateIDGV = (data) => {
        var lastID = data[data.length - 1].IDGV;
        return parseInt(lastID) + 1;
    };

    getTenMH = (IDMon) => {
        var mon = this.state.subjects.filter(
            (ele) => ele.IDMon === parseInt(IDMon)
        );
        if (mon.length > 0) {
            return mon[0].TenMH;
        }
        return null;
    };

    _handleAdd = async () => {
        try {
            var data = {
                ChuyenKhoi: this.state.ChuyenKhoi,
                GioiTinh: this.state.GioiTinh,
                IDGV: this.generateIDGV(this.state.teachers),
                IDMon: parseInt(this.state.IDMon),
                NamSinh: this.state.NamSinh,
                SoTiet: parseInt(this.state.SoTiet),
                TenGV: this.state.TenGV,
                TenMH: this.getTenMH(this.state.IDMon),
            };
            await this.addToStorage(data);
            await this.getFromStorage();
            alert("Thêm giáo viên thành công !");
        } catch (error) {
            alert("Lỗi! Vui Lòng liên hệ để được trợ giúp.");
        }
    };

    _handleEdit = (id) => {
        var teachers = Object.assign([], this.state.teachers);
        console.log(teachers);
        var teacher = teachers.filter((ele) => ele.IDGV == id);
        if (teacher.length > 0) {
            this.setState({
                IDGVEdit: teacher[0].IDGV,
                TenGVEdit: teacher[0].TenGV,
                NamSinhEdit: teacher[0].NamSinh,
                GioiTinhEdit: teacher[0].GioiTinh,
                SoTietEdit: teacher[0].SoTiet,
                IDMonEdit: teacher[0].IDMon,
                TenMHEdit: teacher[0].TenMH,
                ChuyenKhoiEdit: teacher[0].ChuyenKhoi,
            });
        }
    };

    _handleUpdate = async () => {
        try {
            var data = {
                ChuyenKhoi: this.state.ChuyenKhoiEdit,
                GioiTinh: this.state.GioiTinhEdit,
                IDGV: parseInt(this.state.IDGVEdit),
                IDMon: parseInt(this.state.IDMonEdit),
                NamSinh: this.state.NamSinhEdit,
                SoTiet: parseInt(this.state.SoTietEdit),
                TenGV: this.state.TenGVEdit,
                TenMH: this.getTenMH(this.state.IDMonEdit),
            };
            await this.EditStorage(data);
            await this.getFromStorage();
            alert("Cập nhật giáo viên thành công !");
        } catch (error) {
            alert("Lỗi! Vui Lòng liên hệ để được trợ giúp.");
        }
    };

    _handleDelete = async (id) => {
        var check = window.confirm("Bạn có muốn xóa giáo viên này không?");
        if (check) {
            await this.deleteFromStorage(id);
            await this.getFromStorage();
            alert("Xóa giáo viên thành công!");
        }
    };

    addToStorage = (data) => {
        var currentArr = this.state.teachers;
        currentArr.push(data);
        localStorage.setItem("teachers", JSON.stringify(currentArr));
    };

    EditStorage = (data) => {
        var teachers = this.state.teachers;
        var index = teachers.findIndex((ele) => ele.IDGV === data.IDGV);
        Object.assign(teachers[index], data);

        localStorage.setItem("teachers", JSON.stringify(teachers));
    };

    deleteFromStorage = (id) => {
        var currentArr = this.state.teachers.filter((ele) => ele.IDGV !== id);
        localStorage.setItem("teachers", JSON.stringify(currentArr));
    };

    getFromStorage = () => {
        var teachers = JSON.parse(localStorage.getItem("teachers"));
        this.setState({ teachers: teachers });
    };

    render() {
        return (
            <>
                <div className="mb-3">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        Thêm giáo viên
                    </button>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Mã giáo viên</th>
                            <th scope="col">Tên giáo viên</th>
                            <th scope="col">Chuyên môn</th>
                            <th scope="col">Chuyên khối</th>
                            <th scope="col">Số tiết</th>
                            <th scope="col">Năm sinh</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>{this.fetchRows(teachers)}</tbody>
                </table>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Thêm mới giáo viên
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Tên giáo viên:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtTenGV"
                                        placeholder="Nhập tên giáo viên"
                                        onChange={this._onChange}
                                        name="TenGV"
                                        className="form-control"
                                        value={this.state.TenGV}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Chuyên môn:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="IDMon"
                                    >
                                        {this.state.subjects.map((ele) => (
                                            <option
                                                value={ele.IDMon}
                                                key={ele.IDMon}
                                            >
                                                {ele.TenMH}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slChuyenKhoi"
                                        className="text-bold"
                                    >
                                        Chuyên khối:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="ChuyenKhoi"
                                        id="slChuyenKhoi"
                                    >
                                        <option value="6">Khối 6</option>
                                        <option value="7">Khối 7</option>
                                        <option value="8">Khối 8</option>
                                        <option value="9">Khối 9</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtSoTiet"
                                        className="text-bold"
                                    >
                                        Số tiết:
                                    </label>
                                    <input
                                        type="number"
                                        id="txtSoTiet"
                                        placeholder="Nhập số tiết dạy tối đa"
                                        onChange={this._onChange}
                                        name="SoTiet"
                                        className="form-control"
                                        value={this.state.SoTiet}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtNamSinh"
                                        className="text-bold"
                                    >
                                        Năm sinh:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtNamSinh"
                                        placeholder="Nhập ngày/tháng/năm sinh"
                                        onChange={this._onChange}
                                        name="NamSinh"
                                        className="form-control"
                                        value={this.state.NamSinh}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slGioiTinh"
                                        className="text-bold"
                                    >
                                        Giới tính:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="GioiTinh"
                                        id="slGioiTinh"
                                        value={this.state.GioiTinh}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this._handleAdd}
                                    data-dismiss="modal"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="modal fade"
                    id="editModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="editModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">
                                    Thêm mới giáo viên
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Tên giáo viên:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtTenGV"
                                        placeholder="Nhập tên giáo viên"
                                        onChange={this._onChange}
                                        name="TenGVEdit"
                                        className="form-control"
                                        value={this.state.TenGVEdit}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Chuyên môn:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="IDMonEdit"
                                        value={this.state.IDMonEdit}
                                    >
                                        {this.state.subjects.map((ele) => (
                                            <option
                                                value={ele.IDMon}
                                                key={ele.IDMon}
                                            >
                                                {ele.TenMH}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slChuyenKhoi"
                                        className="text-bold"
                                    >
                                        Chuyên khối:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="ChuyenKhoiEdit"
                                        value={this.state.ChuyenKhoiEdit}
                                        id="slChuyenKhoi"
                                    >
                                        <option value="6">Khối 6</option>
                                        <option value="7">Khối 7</option>
                                        <option value="8">Khối 8</option>
                                        <option value="9">Khối 9</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtSoTiet"
                                        className="text-bold"
                                    >
                                        Số tiết:
                                    </label>
                                    <input
                                        type="number"
                                        id="txtSoTiet"
                                        placeholder="Nhập số tiết dạy tối đa"
                                        onChange={this._onChange}
                                        name="SoTietEdit"
                                        className="form-control"
                                        value={this.state.SoTietEdit}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtNamSinh"
                                        className="text-bold"
                                    >
                                        Năm sinh:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtNamSinh"
                                        placeholder="Nhập ngày/tháng/năm sinh"
                                        onChange={this._onChange}
                                        name="NamSinhEdit"
                                        className="form-control"
                                        value={this.state.NamSinhEdit}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slGioiTinh"
                                        className="text-bold"
                                    >
                                        Giới tính:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="GioiTinhEdit"
                                        id="slGioiTinh"
                                        value={this.state.GioiTinhEdit}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this._handleUpdate}
                                    data-dismiss="modal"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
