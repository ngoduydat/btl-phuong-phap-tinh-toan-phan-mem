import React, { Component } from "react";
import { subjects } from "../js/db1";

export default class Subject extends Component {
    fetchRows = (data) => {
        if (data.length > 0) {
            return data.map((ele, i) => {
                return (
                    <tr key={ele.IDMon}>
                        <th scope="row">{ele.IDMon}</th>
                        <td>{ele.TenMH}</td>
                        <td>{ele.SoTietK6}</td>
                        <td>{ele.SoBuoiK6}</td>
                        <td>{ele.TietKep ? "Có" : "Không"}</td>
                        <td>{ele.TietPhu ? "Có" : "Không"}</td>
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
                        <th scope="col">Mã môn</th>
                        <th scope="col">Tên môn</th>
                        <th scope="col">Số tiết</th>
                        <th scope="col">/Buổi</th>
                        <th scope="col">Tiết kép</th>
                        <th scope="col">Tiết phụ</th>
                    </tr>
                </thead>
                <tbody>{this.fetchRows(subjects)}</tbody>
            </table>
        );
    }
}
