import "../../../styles/style.min.css";
import { useNavigate } from "react-router-dom";

const DeleteRider = () => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Delete Rider</h2>
        <p>Are you sure you want to delete this rider?</p>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteRider;
