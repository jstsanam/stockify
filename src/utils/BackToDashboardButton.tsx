import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function BackToDashboard() {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handleNavigateToDashboard}
      className="back-button"
      variant="text"
      color="secondary"
      style={{margin: "0.6rem 0 0 0.6rem"}}
    >
      &#8592; Back to dashboard
    </Button>
  );
}
