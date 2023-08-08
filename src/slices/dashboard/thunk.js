import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReceiptDataApi,
  updateReceiptStatusApi,
} from "../../helpers/fakebackend_helper";

export const getReceiptData = createAsyncThunk(
  "receipt/getReceiptList",
  async () => {
    return await getReceiptDataApi();
  }
);

export const updateReceiptStatus = createAsyncThunk(
  "receipt/updateReceiptStatus",
  async (payload, thunkApi) => {
    try {
      const record = await updateReceiptStatusApi(payload);
      // thunkApi.dispatch(getReceiptData());
      return record;
    } catch (error) {
      throw error;
    }
  }
);
