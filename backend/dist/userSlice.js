"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.fetchUser = (0, toolkit_1.createAsyncThunk)('user/fetchUser', async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
});
const userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
            .addCase(exports.fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        });
    },
});
exports.default = userSlice.reducer;
//# sourceMappingURL=userSlice.js.map