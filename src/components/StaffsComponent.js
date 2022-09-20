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
import AddstaffComponent from "./AddstaffComponent";
import { Loading } from "./LoadingComponent";

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: this.props.staffs,
    };

    this.handleSearching = this.handleSearching.bind(this);
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

  render() {
    console.log("Staffs Component Props", this.props);
    const staffs = this.state.staffs.map((staff) => {
      return (
        <div
          key={staff.id}
          className="col-lg-2 col-sm-4 col-6 mt-2 border rounded"
        >
          <Link to={`/staff/${staff.id}`}>
            <div tag="li" className="list-unstyled text-center">
              <div>
                <Media object src={staff.image} alt={staff.name} />
              </div>
              <Media body>
                <h5 heading>{staff.name}</h5>
              </Media>
            </div>
          </Link>
        </div>
      );
    });

    if (this.props.staffsLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffsErrMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.staffsErrMess}</h4>
          </div>
        </div>
      );
    } else
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
                  <AddstaffComponent
                    staffs={this.props.staffs}
                    addStaffToServer={this.props.addStaffToServer}
                  />
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
                  onclick={this.handleSearching}
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
