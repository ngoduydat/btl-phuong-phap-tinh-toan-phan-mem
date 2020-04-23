import React, { Component } from "react";
import { classrooms } from "../js/db";

export default class Classroom extends Component {
    fetchRows = (data) => {
        if (data.length > 0) {
            return data.map((ele, i) => {
                return (
                    <tr key={ele.IDLopHoc}>
                        <th scope="row">{ele.IDLopHoc}</th>
                        <td>{ele.TenLopHoc}</td>
                        <td>{ele.SiSo}</td>
                        <td>{ele.BuoiHoc}</td>
                    </tr>
                );
            });
        }
    };
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Mã lớp</th>
                        <th scope="col">Tên lớp</th>
                        <th scope="col">Sĩ số</th>
                        <th scope="col">Buổi học</th>
                    </tr>
                </thead>
                <tbody>{this.fetchRows(classrooms)}</tbody>
            </table>
        );
    }
}
