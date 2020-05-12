import React, { Component } from "react";
import { classrooms } from "../js/db1";

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
        };
    }

    fetchRows = (data) => {
        if (this.state.classrooms.length > 0) {
            return this.state.classrooms.map((ele, i) => {
                return (
                    <tr key={ele.IDLop}>
                        <th scope="row">{ele.IDLop}</th>
                        <td>{ele.TenLop}</td>
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
