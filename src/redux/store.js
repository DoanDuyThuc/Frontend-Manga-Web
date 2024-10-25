// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import counterReducer from './counter/counterSlice';
import adminReducer from './admin/adminSlice';

const persistConfig = {
    key: 'manga', // khóa lưu trữ
    storage,
    whitelist: ['username', 'avatar', 'isLogin'], // chỉ lưu trữ reducer 'user'
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        counter: counterReducer, // Giảm thiểu cho counter sẽ không được lưu trữ
        admin: adminReducer,
        user: persistedUserReducer, // Chỉ lưu trữ thông tin người dùng
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Bỏ qua kiểm tra tuần tự cho redux-persist
            },
        }),
});

export const persistor = persistStore(store);