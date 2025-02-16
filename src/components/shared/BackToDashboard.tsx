import { useNavigate } from "react-router-dom";
import "./BackToDashboard.scss";

export default function BackToDashboard() {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <button className="back-button" onClick={handleNavigateToDashboard}>
      &#8592; Back to dashboard
    </button>
  );
}
