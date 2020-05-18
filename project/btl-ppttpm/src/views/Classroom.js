import React, { Component } from "react";
import { classrooms } from "../js/db1";

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <tr key={this.props.obj.IDLop}>
                <th scope="row">{this.props.obj.IDLop}</th>
                <td>{this.props.obj.TenLop}</td>

                <td>{this.props.obj.SiSo}</td>
                <td>{this.props.obj.BuoiHoc === 1 ? "Sáng" : "Chiều"}</td>
                <td>{this.props.obj.TenGV}</td>
                <td>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) =>
                            this.props._handleEdit(this.props.obj.IDLop)
                        }
                        data-toggle="modal"
                        data-target="#editModal"
                    >
                        Sửa
                    </button>
                    <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={(e) =>
                            this.props._handleDelete(this.props.obj.IDLop)
                        }
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
export default class Classroom extends Component {
    constructor(prop) {
        super(prop);

        var subjects = JSON.parse(localStorage.getItem("subjects"));
        var classrooms = JSON.parse(localStorage.getItem("classrooms"));
        var teachers = JSON.parse(localStorage.getItem("teachers"));

        this.state = {
            classrooms: classrooms,
            teachers: teachers,
            subjects: subjects,

            BuoiHoc: 1,
            IDGV: null,
            IDLop: null,
            Khoi: 6,
            SiSo: 0,
            TenGV: "",
            TenLop: "",
        };
    }

    fetchRows = (data) => {
        if (this.state.classrooms.length > 0) {
            return this.state.classrooms.map((ele, i) => {
                return (
                    <Row
                        key={ele.IDLop}
                        obj={ele}
                        classrooms={this.state.classrooms}
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

    generateIDLop = (data) => {
        var lastID = data[data.length - 1].IDLop;
        return parseInt(lastID) + 1;
    };

    getTenGV = (ID) => {
        var teacher = this.state.teachers.filter(
            (ele) => ele.IDGV === parseInt(ID)
        );
        if (teacher.length > 0) {
            return teacher[0].TenGV;
        }
        return null;
    };

    _handleAdd = async () => {
        try {
            var data = {
                BuoiHoc: parseInt(this.state.BuoiHoc),
                IDGV: parseInt(this.state.IDGV),
                IDLop: this.generateIDLop(this.state.classrooms),
                Khoi: this.state.Khoi,
                SiSo: parseInt(this.state.SiSo),
                TenGV: this.getTenGV(this.state.IDGV),
                TenLop: this.state.TenLop,
            };
            await this.addToStorage(data);
            await this.getFromStorage();
            alert("Thêm lớp thành công !");
        } catch (error) {
            alert("Lỗi! Vui Lòng liên hệ để được trợ giúp.");
        }
    };

    _handleEdit = (id) => {
        var classrooms = Object.assign([], this.state.classrooms);
        console.log(classrooms);
        var classroom = classrooms.filter((ele) => ele.IDLop == id);
        if (classroom.length > 0) {
            this.setState({
                BuoiHocEdit: classroom[0].BuoiHoc,
                IDGVEdit: classroom[0].IDGV,
                IDLopEdit: classroom[0].IDLop,
                KhoiEdit: classroom[0].Khoi,
                SiSoEdit: classroom[0].SiSo,
                TenGVEdit: classroom[0].TenGV,
                TenLopEdit: classroom[0].TenLop,
            });
        }
    };

    _handleUpdate = async () => {
        try {
            var data = {
                BuoiHoc: parseInt(this.state.BuoiHocEdit),
                IDGV: parseInt(this.state.IDGVEdit),
                IDLop: parseInt(this.state.IDLopEdit),
                Khoi: parseInt(this.state.KhoiEdit),
                SiSo: parseInt(this.state.SiSoEdit),
                TenGV: this.getTenGV(this.state.IDGVEdit),
                TenLop: this.state.TenLopEdit,
            };
            await this.EditStorage(data);
            await this.getFromStorage();
            alert("Cập nhật lớp thành công !");
        } catch (error) {
            alert("Lỗi! Vui Lòng liên hệ để được trợ giúp.");
        }
    };

    _handleDelete = async (id) => {
        var check = window.confirm("Bạn có muốn xóa lớp này không?");
        if (check) {
            await this.deleteFromStorage(id);
            await this.getFromStorage();
            alert("Xóa lớp thành công!");
        }
    };

    addToStorage = (data) => {
        var currentArr = this.state.classrooms;
        currentArr.push(data);
        localStorage.setItem("classrooms", JSON.stringify(currentArr));
    };

    EditStorage = (data) => {
        var classrooms = this.state.classrooms;

        console.log(data.IdLop);
        var index = classrooms.findIndex((ele) => ele.IDLop === data.IDLop);
        Object.assign(classrooms[index], data);

        localStorage.setItem("classrooms", JSON.stringify(classrooms));
    };

    deleteFromStorage = (id) => {
        var currentArr = this.state.classrooms.filter(
            (ele) => ele.IDLop !== id
        );
        localStorage.setItem("classrooms", JSON.stringify(currentArr));
    };

    getFromStorage = () => {
        var classrooms = JSON.parse(localStorage.getItem("classrooms"));
        this.setState({ classrooms: classrooms });
    };

    render() {
        console.log(this.state);
        return (
            <>
                <div className="mb-3">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        Thêm lớp
                    </button>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Mã lớp</th>
                            <th scope="col">Tên lớp</th>
                            <th scope="col">Sĩ số</th>
                            <th scope="col">Buổi học</th>
                            <th scope="col">Giáo viên chủ nhiệm</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>{this.fetchRows(classrooms)}</tbody>
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
                                    Thêm mới lớp
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
                                        Tên lớp:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtTenGV"
                                        placeholder="Nhập tên lớp"
                                        onChange={this._onChange}
                                        name="TenLop"
                                        className="form-control"
                                        value={this.state.TenLop}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Giáo viên chủ nhiệm:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="IDGV"
                                    >
                                        {this.state.teachers.map((ele) => (
                                            <option
                                                value={ele.IDGV}
                                                key={ele.IDGV}
                                            >
                                                {ele.TenGV}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slChuyenKhoi"
                                        className="text-bold"
                                    >
                                        Khối:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="Khoi"
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
                                        Sĩ Số:
                                    </label>
                                    <input
                                        type="number"
                                        id="txtSoTiet"
                                        placeholder="Nhập sĩ số lớp"
                                        onChange={this._onChange}
                                        name="SiSo"
                                        className="form-control"
                                        value={this.state.SiSo}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="slGioiTinh"
                                        className="text-bold"
                                    >
                                        Buổi học:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="BuoiHoc"
                                        id="slGioiTinh"
                                        value={this.state.BuoiHoc}
                                    >
                                        <option value="1">Sáng</option>
                                        <option value="0">Chiều</option>
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
                                    Cập nhật lớp
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
                                        Tên lớp:
                                    </label>
                                    <input
                                        type="text"
                                        id="txtTenGV"
                                        placeholder="Nhập tên lớp"
                                        onChange={this._onChange}
                                        name="TenLopEdit"
                                        className="form-control"
                                        value={this.state.TenLopEdit}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="txtTenGV"
                                        className="text-bold"
                                    >
                                        Giáo viên chủ nhiệm:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="IDGVEdit"
                                        value={this.state.IDGVEdit}
                                    >
                                        {this.state.teachers.map((ele) => (
                                            <option
                                                value={ele.IDGV}
                                                key={ele.IDGV}
                                            >
                                                {ele.TenGV}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slChuyenKhoi"
                                        className="text-bold"
                                    >
                                        Khối:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="KhoiEdit"
                                        value={this.state.KhoiEdit}
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
                                        Sĩ số:
                                    </label>
                                    <input
                                        type="number"
                                        id="txtSoTiet"
                                        placeholder="Nhập sĩ số lớp"
                                        onChange={this._onChange}
                                        name="SiSoEdit"
                                        className="form-control"
                                        value={this.state.SiSoEdit}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="slGioiTinh"
                                        className="text-bold"
                                    >
                                        Buổi học:
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={this._onChange}
                                        name="BuoiHocEdit"
                                        id="slGioiTinh"
                                        value={this.state.BuoiHocEdit}
                                    >
                                        <option value="1">Sáng</option>
                                        <option value="0">Chiều</option>
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
