import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFF: //Add newStaff
      var newStaff = action.payload;
      newStaff.image = "/assets/images/alberto.png";
      console.log("newStaff", newStaff);
      return { ...state, staffs: state.staffs.concat(newStaff) };

    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };
    default:
      console.log("newstate", state);

      return state;
  }
};
