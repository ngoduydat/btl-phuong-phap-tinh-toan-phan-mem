import React, { Component } from "react";
import { teachers } from "../js/db.js";

export default class Teacher extends Component {
    constructor(prop) {
        super(prop);
        this.state = {};
    }

    fetchRows = (data) => {
        if (data.length > 0) {
            return data.map((ele, i) => {
                return (
                    <tr key={ele.IDGV}>
                        <th scope="row">{ele.IDGV}</th>
                        <td>{ele.TenGV}</td>

                        <td>{ele.TenMonHoc}</td>
                        <td>{ele.SoTiet}</td>
                        <td>{ele.NamSinh}</td>
                        <td>{ele.GioiTinh}</td>
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
                        <th scope="col">Mã giáo viên</th>
                        <th scope="col">Tên giáo viên</th>
                        <th scope="col">Chuyên môn</th>
                        <th scope="col">Số tiết</th>
                        <th scope="col">Năm sinh</th>
                        <th scope="col">Giới tính</th>
                    </tr>
                </thead>
                <tbody>{this.fetchRows(teachers)}</tbody>
            </table>
        );
    }
}
