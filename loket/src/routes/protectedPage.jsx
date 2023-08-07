import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({
  children,
  needLogin = false,
  guestOnly = false,
}) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    const nav = useNavigate();
    useEffect(() => {
        if(needLogin && !user.id) return nav("/login"); //apabila pagenya wajib login dan user belum login. maka dinavigate ke login page
        else if (guestOnly && user.id) return nav("/home"); //apabila page wajib tidak login dan user sudah login. maka dinav ke homepage
    },[children])
  return children;
};

// untuk memproteksi page
// kapan page ini dapat diakses dan kapan tidak bisa diakses
