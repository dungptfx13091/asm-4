import React, { Component } from "react";
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import AddStaff from "./AddstaffComponent";

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
      newStaff: { image: "/assets/images/alberto.png" },
    };

    this.handleSearching = this.handleSearching.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  handleSearching() {
    const searchResult = this.props.staffs.filter((staff) => {
      return staff.name
        .toLowerCase()
        .includes(this.keyword.value.toLowerCase());
    });

    this.setState({
      staffs: searchResult,
    });
  }

  handleAddStaff(staff) {
    const newStaff = {
      id: this.state.staffs.length,
      ...staff,
    };
    console.log(newStaff);
    this.props.staffAdded(newStaff);
  }

  render() {
    const staffs = this.state.staffs.map((staff) => {
      return (
        <div
          key={staff.id}
          className="col-lg-2 col-sm-4 col-6 mt-5 border rounded"
        >
          <Link to={`/staff/${staff.id}`}>
            <Media tag="li" className="list-unstyled">
              <Media left middle>
                <Media
                  className="w-100"
                  object
                  src={staff.image}
                  alt={staff.name}
                />
              </Media>
              <Media body className="ml-5">
                <Media heading>{staff.name}</Media>
              </Media>
            </Media>
          </Link>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="container col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-10">
                <Breadcrumb>
                  <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="col-lg-6 col-md-6 col-2">
                <AddStaff handleAddStaff={this.handleAddStaff} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputGroup onKeyDown={this.handleSearching}>
              <Input
                type="text"
                id="keyword"
                name="keyword"
                innerRef={(input) => (this.keyword = input)}
              />
              <Button
                type="submit"
                color="primary"
                onClick={this.handleSearching}
              >
                Tìm
              </Button>
            </InputGroup>
          </div>

          {staffs}
        </div>
      </div>
    );
  }
}

export default Staffs;
