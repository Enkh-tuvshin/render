import axios from "axios";
import style from "../styles/CreatePlaylist.module.css";
import { useState } from "react";

const baseUrl = "http://localhost:3001/";

export const CreatePlaylist = () => {
  const [playlist, setPlaylist] = useState(null);

  axios.get(baseUrl + "playlists").then((response) => {
    setPlaylist(response.data);
    console.log(response.data);
  });

  axios
    .post(baseUrl + "playlists", {
      name: "",
      description: "",
    })
    .then((response) => {
      setPlaylist(response.data);
      console.log(response.data);
    });

  return (
    <div className={style.createPlaylist}>
      {playlist.map((play, index) => {
        return <div></div>;
      })}
    </div>
  );
};
