import * as ActionTypes from "./ActionTypes";
import { STAFFS } from "../shared/staffs";
import { actionTypes } from "react-redux-form";

export const addStaff = (
  name,
  doB,
  startDate,
  department,
  salaryScale,
  annualLeave,
  overTime
) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    name: name,
    doB: doB,
    startDate: startDate,
    department: department,
    salaryScale: salaryScale,
    annualLeave: annualLeave,
    overTime: overTime,
  },
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  setTimeout(() => {
    dispatch(addStaffs(STAFFS));
  }, 2000);
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: actionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: actionTypes.ADD_STAFFS,
  payload: staffs,
});
