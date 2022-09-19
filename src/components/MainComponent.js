import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Staffs from "./StaffsComponent";
import StaffDetail from "./StaffDetailComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./DepartmentComponent";
import StaffsSalary from "./StaffsSalary";
import { connect } from "react-redux";
import { addStaffToServer } from "../redux/ActionCreators";
import { fetchStaffs, fetchDepartments } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
    staffs: state.staffs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaffToServer: (
    name,
    doB,
    startDate,
    department,
    salaryScale,
    annualLeave,
    overTime
  ) =>
    dispatch(
      addStaffToServer(
        name,
        doB,
        startDate,
        department,
        salaryScale,
        annualLeave,
        overTime
      )
    ),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          departments={this.props.departments.departments}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };

    console.log("MainComponent Props", this.props);
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <Staffs
                staffs={this.props.staffs.staffs}
                addStaffToServer={this.props.addStaffToServer}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
              />
            )}
          />
          <Route exact path="/staff/:staffId" component={StaffWithID} />
          <Route
            exact
            path="/department"
            component={() => (
              <Department
                departments={this.props.departments.departments}
                isLoading={this.props.staffs.isLoading}
                errMess={this.props.staffs.errMess}
              />
            )}
          />
          <Route
            exact
            path="/staffsSalary"
            component={() => (
              <StaffsSalary
                staffs={this.props.staffs.staffs}
                isLoading={this.props.staffs.isLoading}
                errMess={this.props.staffs.errMess}
              />
            )}
          />

          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
