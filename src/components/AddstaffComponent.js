import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const selected = (val) => val != "Select";
const maxValue = (max) => (val) => !val || val <= max;
const minValue = (min) => (val) => val && val >= min;
const isNumber = (val) => !isNaN(Number(val));

class AddstaffComponent extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      staffs: props.staffs,
      newStaff: { image: "/assets/images/alberto.png" },
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addStaff(
      values.name,
      values.doB,
      values.startDate,
      values.department,
      values.salaryScale,
      values.annualLeave,
      values.overTime
    );
  }

  render() {
    return (
      <div className="col-lg-6 col-md-6 col-2">
        <Button
          className="fa fa-plus"
          color="secondary"
          onClick={this.toggleModal}
        ></Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Control.text
                    type="date"
                    model=".doB"
                    id="doB"
                    name="doB"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control.text
                    type="date"
                    model=".startDate"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    className="form-control"
                    validators={{
                      selected,
                    }}
                  >
                    <option>Select</option>
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".department"
                    show="touched"
                    messages={{
                      selected: "Please select",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                      minValue: minValue(1),
                      maxValue: maxValue(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a number",
                      minValue: "Must be greater than 1.0",
                      maxValue: "Must be 3.0 or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a number",
                    }}
                  />
                </Col>
              </Row>
              <Button type="submit" color="primary" onClick={this.toggleModal}>
                Thêm
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddstaffComponent;
