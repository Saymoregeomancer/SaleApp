import "./addLink.sass";
import { Fade } from "react-awesome-reveal";
import { useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";


const AddLink = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const {token} = useContext(AuthContext)

  const pressHandler = async (event) => {
    try {
      const data = await request(
        "/api/link/addlink",
        "POST",
        { from: link },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (e) {}
  };


  return (
    <div className="container">
      <div className="addForm">
        <Fade direction="up" duration={1500}>
          <div className="addForm-box">
            <h2 className="addForm_title">Create new link</h2>
            <div className="addForm-wrap">
              <span className="addForm_label">url:</span>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                className="addForm_input"
              />
            </div>

            <button onClick={pressHandler} className="addForm_button">
              Create
            </button>
          </div>
        </Fade>
      </div>
    </div>
  );
};
export default AddLink;
