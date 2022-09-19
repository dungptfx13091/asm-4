import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Loading } from "./LoadingComponent";

class StaffsSalary extends Component {
  render() {
    const staffs = this.props.staffs.map((staff) => {
      const salary = (
        staff.salaryScale * 3000000 +
        staff.overTime * 200000
      ).toFixed(0);
      return (
        <div
          key={staff.id}
          className="col-lg-4 col-sm-6 col-12 mt-2 ml-2 mr-2 mb-2 border rounded"
        >
          <h4>{staff.name}</h4>
          <p>Mã nhân viên: {staff.id}</p>
          <p>Hệ số lương: {staff.salaryScale}</p>
          <p>Số ngày làm thêm: {staff.overTime}</p>
          <input
            className="w-100"
            type="text"
            id="salary"
            name="salary"
            value={"Lương: " + salary}
            disabled
          />
        </div>
      );
    });

    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else
      return (
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
          </Breadcrumb>
          <div className="row">{staffs}</div>
        </div>
      );
  }
}
export default StaffsSalary;
