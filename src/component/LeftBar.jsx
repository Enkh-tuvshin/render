import { Button, Container } from "react-bootstrap";
import { ImHome } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { BiHeartSquare } from "react-icons/bi";
import style from "../styles/LeftBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export const LeftBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        console.log(user);
        console.log(uid);
        navigate("/");
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className={style.section}>
      <Container>
        <div className={style.cost}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "50px",
            }}
          >
            <Link to="/">
              <p style={{ color: "white", fontSize: "27px" }}>
                <FaSpotify /> Spotify˚{" "}
              </p>
            </Link>
          </div>
          {/* a */}
          <Link to="/">
            <h4 style={{ cursor: "pointer" }}>
              <ImHome />
              Home
            </h4>
          </Link>
          <Link to="/search">
            <h4 style={{ cursor: "pointer" }}>
              <BsSearch />
              Search
            </h4>
          </Link>
          <Link to="/collection/playlists">
            <h4 style={{ cursor: "pointer" }}>
              <MdLibraryMusic /> Your Library{" "}
            </h4>
          </Link>
          {/* b */}

          <div style={{ height: "10px" }}></div>

          {/* c */}

          <Link to="playlist">
            <h4 style={{ cursor: "pointer" }}>
              <BsPlusSquare /> Create Playlist{" "}
            </h4>
          </Link>
          <Link to="/collection/tracks">
            <h4 style={{ cursor: "pointer" }}>
              <BiHeartSquare /> Liked Songs{" "}
            </h4>
          </Link>

          <div className={style.footer}>
            <Link to="/Signup">
              <button
                style={{
                  border: "1px solid black",
                  backgroundColor: "#000",
                  cursor: "pointer",
                }}
              >
                <h4>Sign Up</h4>
              </button>
            </Link>

<hr></hr>

            <Link to="/Login">
              <button
                style={{
                  backgroundColor: "#000",
                  border: "1px solid #000",
                  cursor: "pointer",
                }}
              >
                <h4>Log in</h4>
              </button>
            </Link>

<hr></hr>

            <Button
              style={{
                border: "1px solid #000 ",
                backgroundColor: "#000",
                cursor: "pointer",
              }}
              className={style.logOut}
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("sign out");
                    navigate("/login");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
            >
              <h4>Log out</h4>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
