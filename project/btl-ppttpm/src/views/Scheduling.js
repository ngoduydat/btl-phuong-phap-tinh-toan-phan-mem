import React, { Component } from "react";

export default class Scheduling extends Component {
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
                        <th scope="col">Thế hệ</th>
                        <th scope="col">Số tiết hợp lệ</th>
                        <th scope="col">Số tiết vi phạm</th>
                        <th scope="col">Hệ số thích nghi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    }
}
