import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { StoreState } from "../../store";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type UserState = {
  username: string;
  address: string;
  position: { latitude: number; longitude: number };
  status: "idle" | "loading" | "failed";
  error?: string;
};

const initialState: UserState = {
  username: "",
  address: "",
  position: { latitude: 0, longitude: 0 },
  status: "idle",
};

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = (await getPosition()) as {
    coords: { latitude: number; longitude: number };
  };
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // Payload of fullfilled state
  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.address = action.payload.address;
      state.position = action.payload.position;
    });
    builder.addCase(fetchAddress.rejected, (state) => {
      state.status = "failed";
      state.error =
        "There was problem getting your address. Make sure to fill this field!";
    });
  },
});

// type UpdateNameAction = ReturnType<typeof userSlice.actions.updateName>;

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state: StoreState) => state.user.username;
