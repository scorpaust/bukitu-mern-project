import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchUsers = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/utilizadores"
      );

      if (responseData) {
        setLoadedUsers(responseData.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
