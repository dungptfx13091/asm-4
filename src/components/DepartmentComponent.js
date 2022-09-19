import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Loading } from "./LoadingComponent";

class Department extends Component {
  render() {
    const departments = this.props.departments.map((department) => {
      return (
        <div
          key={department.id}
          className="col-lg-4 col-sm-6 col-12 mt-2 ml-2 mr-2 mb-2 border rounded"
        >
          <h4>{department.name}</h4>
          <p>Số lượng nhân viên: {department.numberOfStaff}</p>
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
          <div className="col-lg-4 col-sm-6 col-12">
            <Breadcrumb>
              <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">{departments}</div>
        </div>
      );
  }
}
export default Department;
