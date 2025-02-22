import { useEffect, useState } from "react";
import "./Notifications.scss";
import { getSocket } from "../../../utils/socket";

interface NotificationsType {
  currentStock: any;
}

export default function Notifications({ currentStock }: NotificationsType) {
  const socket = getSocket();

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    socket.on("transactionUpdate", (data: any) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("transactionUpdate");
    };
  }, []);

  useEffect(() => {
    if (currentStock?._id) {
      setNotifications([]);
    }
  }, [currentStock?._id]);

  return (
    <div className="notifications-box">
      <div className="notifications-title">NOTIFICATIONS 🔔</div>
      {notifications.length === 0 ? (
        <div style={{ marginLeft: "0.5rem", color: "#a2a2a2" }}>
          No notifications available for this stock.
        </div>
      ) : (
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-card">
              <div>{notification.message}</div>
              <div>
                {new Date(notification.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
