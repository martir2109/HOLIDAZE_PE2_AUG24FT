export type MessageType = "error" | "success" | "warning" | "info";

const messageClasses: Record<MessageType, string> = {
  error: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",
  success:
    "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
  warning:
    "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded",
  info: "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded",
};

interface MessageBannerProps {
  messageType: MessageType;
  message: string;
}

/**
 * Displays a styled message banner for feedback to the user.
 *
 * @param messageType The type of message: "error", "success", "warning", or "info".
 * @param message The text to display in the banner.
 * @returns A styled banner with colors matching the message type.
 */
export function MessageBanner({ messageType, message }: MessageBannerProps) {
  const classes = messageClasses[messageType] ?? messageClasses.info;
  return <div className={`mb-2 mt-2 ${classes}`}>{message}</div>;
}
