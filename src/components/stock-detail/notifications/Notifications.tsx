import "./Notifications.scss";

export default function Notifications() {
  return (
    <div className="notifications-box">
      <div className="notifications-title">NOTIFICATIONS 🔔</div>
      <div style={{ marginLeft: "0.5rem", color: "#a2a2a2" }}>
        No notifications available for this stock.
      </div>
    </div>
  );
}
