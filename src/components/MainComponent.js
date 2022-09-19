import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Staffs from "./StaffComponent";
import StaffDetail from "./StaffDetailComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Department from "./DepartmentComponent";
import Payroll from "./PayRollComponent";
import { connect } from "react-redux";
import { addStaff } from "../redux/ActionCreators";
import { fetchStaffs } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
    staffs: state.staffs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaff: (
    name,
    doB,
    startDate,
    department,
    salaryScale,
    annualLeave,
    overTime
  ) =>
    dispatch(
      addStaff(
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
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
    };
  }

  componentDidMount() {
    this.props.fetchStaffs();
  }

  render() {
    const StaffWithID = ({ match }) => {
      console.log(this.props);
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };

    console.log(this.props);
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
                addStaff={this.props.addStaff}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
              />
            )}
          />
          <Route exact path="/staff/:staffId" component={StaffWithID} />
          <Route exact path="/department" component={Department} />
          <Route exact path="/payroll" component={Payroll} />

          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
