interface User {
    id: number;
    name: string;
    email: string;
}
interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}
export declare const fetchUser: import("@reduxjs/toolkit").AsyncThunk<any, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
declare const _default: import("redux").Reducer<UserState>;
export default _default;
