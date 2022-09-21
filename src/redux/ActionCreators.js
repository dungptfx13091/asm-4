import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const addStaffToServer =
  (name, doB, startDate, department, salaryScale, annualLeave, overTime) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      startDate: startDate,
      department: department,
      salaryScale: salaryScale,
      annualLeave: annualLeave,
      overTime: overTime,
      image: "/assets/images/alberto.png",
    };
    console.log("newStaff", newStaff);
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error" + response.status + ":" + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addStaff(response)))
      .catch((error) => {
        console.log("Add staff", error.message);
        alert("Failed to add staff! \n" + "Error" + error.message);
      });
  };

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});
