import React, { Component } from "react";
import { teachers } from "../js/db1.js";

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        };
    }

    _handleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };

    _onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value.toString(),
        });
    };

    _handleSave = () => {
        var newObj = {
            IDGV: this.props.obj.IDGV,
            TenGV: this.state.TenGV,
            NamSinh: this.state.NamSinh,
            GioiTinh: this.state.GioiTinh,
            SoTiet: this.state.SoTiet,
            IDMon: this.state.IDMon,
            TenMH: this.state.TenMH,
            ChuyenKhoi: this.state.ChuyenKhoi,
        };

        
    };

    render() {
        if (this.state.isEdit) {
            return (
                <tr key={this.props.obj.IDGV}>
                    <th scope="row">{this.props.obj.IDGV}</th>
                    <td>
                        <input
                            type="text"
                            onChange={this._onChange}
                            name="TenGV"
                            className="form-control"
                            value={this.props.obj.TenGV}
                        />
                    </td>
                    <td>
                        <select
                            className="form-control"
                            onChange={this._onChange}
                            name="IDMon"
                        >
                            {this.props.subjects.map((ele) => (
                                <option value={ele.IDMon}>{ele.TenMH}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select
                            className="form-control"
                            onChange={this._onChange}
                            name="ChuyenKhoi"
                        >
                            <option value="6">Khối 6</option>
                            <option value="7">Khối 7</option>
                            <option value="8">Khối 8</option>
                            <option value="9">Khối 9</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            onChange={this._onChange}
                            name="SoTiet"
                            className="form-control"
                            value={this.props.obj.SoTiet}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            onChange={this._onChange}
                            name="NamSinh"
                            className="form-control"
                            value={this.props.obj.NamSinh}
                        />
                    </td>
                    <td>
                        <select
                            className="form-control"
                            onChange={this._onChange}
                            name="GioiTinh"
                            value={this.props.obj.GioiTinh}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </td>
                    <td>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={this._handleSave}
                        >
                            Lưu
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={this._handleEdit}
                        >
                            Đóng
                        </button>
                    </td>
                </tr>
            );
        } else {
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
                            onClick={this._handleEdit}
                        >
                            Sửa
                        </button>
                        <button className="btn btn-danger btn-sm ml-2">
                            Xóa
                        </button>
                    </td>
                </tr>
            );
        }
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
        };
    }

    fetchRows = (data) => {
        if (this.state.teachers.length > 0) {
            return this.state.teachers.map((ele, i) => {
                return (
                    <Row
                        obj={ele}
                        subjects={this.state.subjects}
                        teachers={this.state.teachers}
                    />
                );
            });
        }
    };

    render() {
        return (
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
        );
    }
}
