import { useEffect, useState } from "react";
import { api } from "../api/axios";
import {useDispatch, useSelector} from "react-redux";
import {types} from "../redux/types";

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("auth");
  const [isLoading, setIsLoading] = useState(true);
  const [getUser, setGetUser] = useState ({});
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.auth);

const fetchUser = async () =>{
    await api.get(`/users/${user.id}`).then((res) => dispatch({
        type: res.login,
        payload:res.data,
    })
    .catch((err) => console.log(err));
};

    useEffect(() => {
        if (user.id) fetchUser();
        else setIsLoading(false);

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, []);  
    useEffect(() => {
        if (userSelector.id) setIsLoading(false);
    }, [userSelector]);
  return ([isLoading, setIsLoading] = useState(true));
};
// redux
// refresh => app.jsx => cek localstorage => id
// id => get ke api sesuai id user => dispatch
// dispatch = setstate => waktu
// waktu tidak bisa dipredikisi
// setelah beberapa waktu maka useSelector keisi
