import { fetchJson, patchJson } from '@/lib/api';
import { ApiNotification, NotificationResponse } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<ApiNotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const loadNotifications = async () => {
        setLoading(true);

        try {
            const response = await fetchJson<NotificationResponse>('/api/notifications');
            setNotifications(response.data);
            setUnreadCount(response.unread_count);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const unreadItems = useMemo(
        () => notifications.filter((notification) => !notification.is_read),
        [notifications],
    );

    const markAsRead = async (notificationId: number) => {
        await patchJson(`/api/notifications/${notificationId}/read`);
        await loadNotifications();
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="relative rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
            >
                Notifications
                {unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-20 mt-3 w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Notifications</p>
                            <p className="text-xs text-slate-500">{unreadItems.length} unread</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-xs text-slate-500"
                        >
                            Close
                        </button>
                    </div>

                    <div className="space-y-3">
                        {loading && <p className="text-sm text-slate-500">Loading notifications...</p>}

                        {!loading && notifications.length === 0 && (
                            <p className="text-sm text-slate-500">No notifications yet.</p>
                        )}

                        {!loading && notifications.map((notification) => (
                            <button
                                type="button"
                                key={notification.id}
                                onClick={() => !notification.is_read && markAsRead(notification.id)}
                                className={`block w-full rounded-xl border p-3 text-left transition ${
                                    notification.is_read
                                        ? 'border-slate-200 bg-slate-50'
                                        : 'border-emerald-200 bg-emerald-50'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                                        <p className="mt-1 text-sm text-slate-600">{notification.body}</p>
                                    </div>
                                    {!notification.is_read && (
                                        <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                                            New
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
