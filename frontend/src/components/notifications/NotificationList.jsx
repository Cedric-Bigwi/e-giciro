import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { timeAgo } from '../../utils/helpers';

export default function NotificationList() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
        <h3 className="font-semibold text-sm">Notifications</h3>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-xs font-medium text-primary-600 hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink/50">
            You have no notifications yet. We&apos;ll let you know when a matching offer appears.
          </p>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => !n.is_read && markAsRead(n.id)}
              className={`block w-full text-left px-4 py-3 border-b border-black/5 last:border-0 transition ${
                n.is_read ? 'bg-white' : 'bg-primary-50/60 hover:bg-primary-50'
              }`}
            >
              <p className="text-sm text-ink/90 leading-snug">{n.message}</p>
              <p className="mt-1 text-xs text-ink/40">{timeAgo(n.created_at)}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
