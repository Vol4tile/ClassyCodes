import React, { useEffect } from "react";
import { Listele } from "../axios";

const MainMenu = ({ user, users, setUsers }) => {
  useEffect(() => {
    Listele()
      .then((res) => {
        setUsers(res.data.user);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      burası ana sayfa {user?.fullname} hoşgeldin.
      <div>Bunlarda bizim üyelerimiz :</div>
      {users?.map((home, key) => (
        <div key={key}>{home.fullname}</div>
      ))}
    </div>
  );
};

export default MainMenu;
