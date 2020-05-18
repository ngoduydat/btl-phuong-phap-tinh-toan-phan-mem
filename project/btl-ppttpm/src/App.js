import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
import Teacher from "./views/Teacher";
import Classroom from "./views/Classroom";
import Subject from "./views/Subject";
import Scheduling from "./views/Scheduling";
import TimeTable from "./views/TimeTable";
import { classrooms, subjects, teachers } from "./js/db";

class App extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        localStorage.setItem("subjects", JSON.stringify(subjects));
        localStorage.setItem("classrooms", JSON.stringify(classrooms));
    }

    render() {
        return (
            <Router>
                <div className="container header-fixed">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarTogglerDemo01"
                            aria-controls="navbarTogglerDemo01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarTogglerDemo01"
                        >
                            <a className="navbar-brand" href="/">
                                Nhóm 6
                            </a>
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        to="/teacher"
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        Giáo viên
                                    </NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink
                                        to="/classroom"
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        Lớp học
                                    </NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink
                                        to="/subject"
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        Môn học
                                    </NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink
                                        to="/scheduling"
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        Phân lịch
                                    </NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink
                                        to="/time-table"
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        Thời khóa biểu
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="container my-3">
                    <Switch>
                        <Route exact path="/teacher" component={Teacher} />
                        <Route exact path="/classroom" component={Classroom} />
                        <Route exact path="/subject" component={Subject} />
                        <Route
                            exact
                            path="/scheduling"
                            component={Scheduling}
                        />
                        <Route exact path="/time-table" component={TimeTable} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
