import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Router from './router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetProfile } from './services/UserService';
import { setUserId } from './redux/user/userSlice';
import { useEffect } from 'react';

function App() {

  const user = useSelector(state => state?.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const fetchProfile = async (token) => {
    const response = await GetProfile(token);
    return response;
  }

  const { data } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => fetchProfile(token),
    keepPreviousData: true,
    enabled: !!token,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);

      dispatch(setUserId({ ...data.data, token })); // Cập nhật Redux store sau khi dữ liệu được lấy thành công
    },
    onError: (error) => {
      console.error('Error fetching player data:', error);
    },
  });


  useEffect(() => {
    if (data?.data) {
      queryClient.setQueryData('currentUser', data?.data);
      dispatch(setUserId({ ...data?.data, token }));
    }

  }, [queryClient, data, dispatch, token]);

  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
