import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, { getState }) => {
    var { loading } = getState() as any;
    console.log("a", loading);
    // if (loading !== "idle") {
    //   return;
    // }

    console.log("b");
    const response: any = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log("c");
    console.log("thunk", response);
    const js = response.json();
    return js;
  }
);

// Then, handle actions in your reducers:
export const usersSlice = createSlice({
  name: "users",
  initialState: { entities: [] as any[], loading: "idle", errors: "" },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    //@ts-ignore
    [fetchUserById.pending]: (state, action) => {
      //console.log("loading");
      state.loading = "loading";
    },
    //@ts-ignore
    [fetchUserById.rejected]: (state, action) => {
      state.loading = "idle";
      state.errors = "error";
    },
    //@ts-ignore
    [fetchUserById.fulfilled]: (state, action) => {
      // Add user to the state array

      state.entities.push(action.payload);
      state.loading = "idle";
    }
  }
});

// Later, dispatch the thunk as needed in the app
