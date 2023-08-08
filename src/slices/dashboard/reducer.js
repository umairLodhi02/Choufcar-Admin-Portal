import { createSlice } from "@reduxjs/toolkit";
import { getReceiptData, updateReceiptStatus } from "./thunk";

const dummyResponseOfListApi = {
  responseCode: "00",
  responseMessage: "Returned All Receipts!",
  data: {
    newList: [],
    approvedList: [
      {
        id: 1,
        images: [],
        senderName: "hello",
        packageNumber: "123",
        adType: "abd",
        fcmToken: "adas",
        newApprovedRejected: "1",
        createdDate: "2023-07-28T23:52:16",
        updatedDate: "2023-07-28T23:52:43",
        user: {
          phoneNumber: "123",
          companyName: "asd",
          gmailToken: "ad",
          appleToken: "aba",
          latitude: "ads",
          longitude: "ad",
          city: "asd",
          country: "ad",
          fcmToken: "asd",
          roles: [],
          userVerified: true,
        },
      },
      {
        id: 2,
        images: [],
        senderName: "hello",
        packageNumber: "123",
        adType: "abasda",
        fcmToken: "asdasd",
        newApprovedRejected: "1",
        createdDate: "2023-07-28T23:52:16",
        updatedDate: "2023-07-28T23:52:43",
        user: {
          phoneNumber: "123",
          companyName: "asd",
          gmailToken: "ad",
          appleToken: "aba",
          latitude: "ads",
          longitude: "ad",
          city: "asd",
          country: "ad",
          fcmToken: "asd",
          roles: [],
          userVerified: true,
        },
      },
    ],
    rejectedList: [
      {
        id: 3,
        images: [],
        senderName: "hello",
        packageNumber: "123",
        adType: "weurhew",
        fcmToken: "kjbvj",
        newApprovedRejected: "2",
        createdDate: "2023-07-28T23:52:16",
        updatedDate: "2023-07-28T23:52:43",
        user: {
          phoneNumber: "123",
          companyName: "asd",
          gmailToken: "ad",
          appleToken: "aba",
          latitude: "ads",
          longitude: "ad",
          city: "asd",
          country: "ad",
          fcmToken: "asd",
          roles: [],
          userVerified: true,
        },
      },
    ],
  },
};

const ReceiptSlice = createSlice({
  name: "ReceiptList",
  initialState: {
    response: {},
    error: "",
    message: "",
    loading: false,
    modal: false,
  },
  reducers: {
    hideRecipeError(state, action) {
      state.error = "";
      state.message = "";
    },
    toggleModal(state, action) {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceiptData.pending, (state, action) => {
        state.loading = true;
        state.response = {};
        state.error = "";
        state.message = "";
      })
      .addCase(getReceiptData.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
        state.error = "";
        // state.message = "";
      })
      .addCase(getReceiptData.rejected, (state, action) => {
        state.response = {};
        state.loading = false;
        state.error = action.error;
        // state.message = action.error.message;
        state.modal = true;
      })
      .addCase(updateReceiptStatus.pending, (state, action) => {
        state.loading = true;
        state.error = "";
        // state.message = "";
        state.modal = true;
      })
      .addCase(updateReceiptStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.modal = true;
      })
      .addCase(updateReceiptStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        // state.message = action.error.message;
        state.modal = true;
      });
  },
});

export const { hideRecipeError, toggleModal } = ReceiptSlice.actions;

export default ReceiptSlice.reducer;
