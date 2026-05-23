import type { INotification } from "@/features/profile/interfaces/notification.interface";

const newLoginTitle = "New login detected from a new device";
const newLoginDescription =
  "We noticed a login to your account from a Chrome browser on a Mac. If this was you, you can safely ignore this message. If not, please secure your account immediately.";

export const notificationMocks: INotification[] = [
  {
    id: "notif-1",
    date: "16.04.2026",
    time: "12:45",
    title: newLoginTitle,
    description: newLoginDescription,
    read: false,
  },
  {
    id: "notif-2",
    date: "16.04.2026",
    time: "12:45",
    title: newLoginTitle,
    description: newLoginDescription,
    read: false,
  },
  {
    id: "notif-3",
    date: "16.04.2026",
    time: "12:45",
    title: newLoginTitle,
    description: newLoginDescription,
    read: true,
  },
  {
    id: "notif-4",
    date: "16.04.2026",
    time: "12:45",
    title: newLoginTitle,
    description: newLoginDescription,
    read: true,
  },
  {
    id: "notif-5",
    date: "16.04.2026",
    time: "12:45",
    title: newLoginTitle,
    description: newLoginDescription,
    read: true,
  },
];
