import React from "react";
import { Media, Card, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

function RenderStaff({ staff }) {
  return (
    <Card className="col-lg-3 col-sm-4 col-12 m-1">
      <CardImg src={staff.image} alt={staff.name} />
    </Card>
  );
}

function RenderDetail({ staff, departments }) {
  console.log(staff.department);
  const department = departments.filter(
    (dept) => dept.id === staff.departmentId
  )[0];
  if (staff != null) {
    return (
      <div className="col-lg-9 col-sm-8 col-12 m-1">
        <Media>
          <Media body className="ml-5">
            <Media heading>Họ và tên: {staff.name}</Media>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {department.name}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày đã làm thêm: {staff.overTime}</p>
          </Media>
        </Media>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  console.log("StaffDetail props", props);
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderStaff staff={props.staff} />
          <div className="col-lg-8 col-sm-7 col-12 m-1">
            <RenderDetail staff={props.staff} departments={props.departments} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};
export default StaffDetail;
