/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import userContext from "../context/users/userContext"
import AdminSidebar from "./AdminSidebar";
import loaderContext from "../context/loadingBar/loderContext";


const AdminOptions = () => {
    const usCon = useContext(userContext);
    const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
    const loadCon = useContext(loaderContext);
    const {setProgress} = loadCon;

    useEffect(() => {
      setProgress(100);
    }, []);
    
    
  return (
    <>
     <>
      {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {blogAdminAccess && (
                <>Blog</>
              )}
              {libraryAdminAccess && (
                <>Elibrary</>
              )}
              {userAdminAccess && (
                <>User</>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-center text-3xl">Unauthorised</p>
        </div>
      )}
    </> 
    </>
  )
}

export default AdminOptions
