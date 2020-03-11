// To know more about ducks, see https://github.com/erikras/ducks-modular-redux

import { Action } from "redux-actions";

// State

// To know more about Record type, see https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt
export type LoadingState = Record<string, "pending" | "fufilled" | "rejected">;

// Reducer

export default (
  state: LoadingState = {},
  action: Action<any>
): LoadingState => {
  const { type } = action;

  const matches = /(.*)\/(pending|fulfilled|rejected)/.exec(type);

  // Ignore non-routine actions:
  //   A routine action should have one of three suffixes:
  //   ['/REQUEST', '/SUCCESS', '/FAILURE']
  if (!matches) return state;

  const [, routineType, status] = matches;
  return {
    ...state,
    // Set loading state to true only when the status is "REQUEST"
    //    Otherwise set the loading state to false
    [routineType]: status as "pending" | "fufilled" | "rejected"
  };
};

// Selectors

// Select the whole loading state object
export const selectLoadingState = (state: any) => state.ui.loading;

// Select whether a given routine is loading
export const selectLoading = (routineType: string) => (state: any) => {
  return Boolean(state.ui.loading[routineType]);
};

// Select whether any routine is loading
export const selectAnyLoading = (state: any) =>
  Object.values(state.ui.loading).some(Boolean);

// Select whether any of a given set of routines is loading
export const selectSomeLoading = (routineTypes: string[]) => (state: any) => {
  return routineTypes.some(routineType =>
    Boolean(state.ui.loading[routineType])
  );
};
