// useNotifications.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useNotifications(tasks) {
    const [permission, setPermission] = useState(Notification.permission);
    const [enabled, setEnabled] = useState(true);

    const requestPermission = async () => {
        if (permission !== "granted") {
            const result = await Notification.requestPermission();
            setPermission(result);
            if (result === "granted") {
                setEnabled(true);
                toast.success("Notifications enabled ✓");
            } else {
                toast.error("Notifications blocked by browser");
            }
        } else {
            // toggle
            setEnabled(prev => {
                toast(prev ? "Notifications paused" : "Notifications resumed", {
                    icon: prev ? "🔕" : "🔔",
                });
                return !prev;
            });
        }
    };

    useEffect(() => {
        if (permission !== "granted" || !enabled) return;

        const check = () => {
            const now = new Date();
            const today = now.toISOString().split("T")[0];

            tasks.forEach(task => {
                const t = task.attributes || task;
                if (t.date !== today) return;

                if (t.time) {
                    const [th, tm] = t.time.split(":").map(Number);
                    if (th === now.getHours() && tm === now.getMinutes()) {
                        new Notification(`⏰ ${t.title}`, {
                            body: t.description || "Task due now!",
                            icon: "/favicon.ico",
                            badge: "/favicon.ico",
                        });
                    }
                } else {
                    if (now.getHours() === 9 && now.getMinutes() === 0) {
                        new Notification(`📅 Today: ${t.title}`, {
                            body: t.description || "You have a task today",
                            icon: "/favicon.ico",
                        });
                    }
                }
            });
        };

        check();
        const interval = setInterval(check, 60000);
        return () => clearInterval(interval);
    }, [tasks, permission, enabled]);

    return { permission, enabled, requestPermission };
}