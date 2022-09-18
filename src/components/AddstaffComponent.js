import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";
import { DEPARTMENTS } from "../shared/staffs";

class AddStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
      newStaff: { image: "/assets/images/alberto.png" },
      isModalOpen: false,
      touched: {
        name: false,
        doB: false,
        startDate: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const deptValue = DEPARTMENTS.filter((dept) => dept.name === target.value);
    const value = target.name === "department" ? deptValue[0] : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      newStaff: {
        ...prevState.newStaff,
        [name]: value,
      },
    }));
  }

  handleAddStaff(event) {
    // if()
    this.props.handleAddStaff(this.state.newStaff);
    event.preventDefault();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate() {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };
    //Validate name
    if (
      this.state.touched.name &&
      this.state.newStaff.name &&
      this.state.newStaff.name.length < 3
    )
      errors.name = "Tên phải chứa >= 3 ký tự";
    else if (
      this.state.touched.name &&
      this.state.newStaff.name &&
      this.state.newStaff.name.length > 30
    )
      errors.name = "Tên phải chứa <= 30 ký tự";

    //Validate doB && startDate

    if (this.state.touched.doB && !this.state.newStaff.doB)
      errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && !this.state.newStaff.startDate)
      errors.startDate = "Yêu cầu nhập";

    const reg = /^\d+$/;
    //Validate salaryScale
    if (this.state.touched.salaryScale && this.state.newStaff.salaryScale < 1)
      errors.salaryScale = "Hệ số lương nằm trong khoảng 1.0 -> 3.0";
    else if (
      this.state.touched.salaryScale &&
      this.state.newStaff.salaryScale > 3
    )
      errors.salaryScale = "Hệ số lương nằm trong khoảng 1.0 -> 3.0";
    if (
      this.state.touched.salaryScale &&
      !reg.test(this.state.newStaff.salaryScale)
    )
      errors.salaryScale = "Xin hãy nhập một con số";

    //validate annualLeave
    if (
      this.state.touched.annualLeave &&
      !reg.test(this.state.newStaff.annualLeave)
    )
      errors.annualLeave = "Xin hãy nhập một con số";
    if (this.state.touched.overTime && !reg.test(this.state.newStaff.overTime))
      errors.overTime = "Xin hãy nhập một con số";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );
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
            <Form onSubmit={this.handleAddStaff}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    //name="name"
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    name="department"
                    // value={this.state.contactType}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </FormGroup>
              <Button type="submit" color="primary" onClick={this.toggleModal}>
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddStaff;
