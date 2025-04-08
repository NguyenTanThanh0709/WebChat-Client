import { useEffect, useRef, useState } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";

// Kiểu dữ liệu
interface User {
  _id: string;
  name: string;
}

interface Message {
  senderId: string;
  text: string;
  createdAt: string;
  fileUrl?: string;
  fileName?: string;
}


interface Chat {
  _id: string;
  members: string[];
}

// Dữ liệu mặc định
const defaultUser: User = { _id: "u1", name: "Nguyễn Tấn Thành" };

const defaultChat: Chat = {
  _id: "chat1",
  members: ["u1", "u2"],
};

const defaultMessages: Message[] = [
    {
      senderId: "u1",
      text: "Chào bạn!",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Xin chào! Bạn cần hỗ trợ gì không?",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Mình muốn hỏi về đơn hàng #1234.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Đơn hàng đó đang được giao nhé!",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Khoảng bao lâu sẽ tới?",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Dự kiến là trong vòng 2-3 ngày làm việc.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Ok cảm ơn bạn nhiều.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Không có gì ạ! Cần thêm thông tin gì cứ hỏi nhé.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Bên bạn có hỗ trợ đổi hàng không?",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Có ạ! Trong vòng 7 ngày kể từ khi nhận hàng.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Nếu mình không thích thì được hoàn tiền không?",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Dạ được, bên em có chính sách hoàn tiền đầy đủ.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Rất tốt. Mình sẽ yên tâm hơn khi mua.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Bên em luôn đặt trải nghiệm khách hàng lên hàng đầu.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Cảm ơn bạn nha.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Dạ không có gì, chúc anh một ngày vui vẻ!",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Bạn tên gì nhỉ?",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Em là Linh ạ.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u1",
      text: "Ok Linh, mình lưu ý rồi nhé.",
      createdAt: new Date().toISOString(),
    },
    {
      senderId: "u2",
      text: "Dạ vâng, cảm ơn anh nhiều ạ!",
      createdAt: new Date().toISOString(),
    },
  ];
  

const defaultRecipient: User = { _id: "u2", name: "Nguyễn Văn B" };

const ChatBox: React.FC = () => {
  const user = defaultUser;
  const currentChat = defaultChat;
  const recipientUser = defaultRecipient;

  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [textMessage, setTextMessage] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendTextMessage = (
    message: string,
    sender: User,
    chatId: string,
    clearInput: (msg: string) => void
  ) => {
    if (!message.trim()) return;
    const newMsg: Message = {
      senderId: sender._id,
      text: message,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    clearInput("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const fileUrl = URL.createObjectURL(file);
  
    const newMsg: Message = {
      senderId: user._id,
      text: "",
      createdAt: new Date().toISOString(),
      fileUrl,
      fileName: file.name,
    };
  
    setMessages((prev) => [...prev, newMsg]);
  };
  

  return (
<div className="max-w-2xl mx-auto h-[90vh] flex flex-col border rounded-xl shadow-md overflow-hidden bg-white">
  {/* Header */}
  <div className="flex justify-between items-center p-4 bg-green-50 border-b font-semibold text-gray-800">
    <span>💬 {recipientUser.name}</span>
    <div className="flex items-center gap-3">
      <button
        onClick={() => alert("Đang gọi thoại...")}
        title="Gọi thoại"
        className="hover:bg-green-100 p-2 rounded-full transition"
      >
        📞
      </button>
      <button
        onClick={() => alert("Đang gọi video...")}
        title="Gọi video"
        className="hover:bg-green-100 p-2 rounded-full transition"
      >
        🎥
      </button>
      <button
        onClick={() => setMessages([])}
        title="Xoá tất cả tin nhắn"
        className="hover:bg-red-100 p-2 rounded-full transition"
      >
        🗑️
      </button>
    </div>
  </div>

  {/* Chat body */}
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
    {messages.map((message, index) => (
      <div
        key={index}
        ref={scroll}
        className={`max-w-[70%] p-3 rounded-xl text-sm shadow-sm ${
          message.senderId === user._id
            ? "ml-auto bg-green-500 text-white"
            : "mr-auto bg-white border"
        }`}
      >
        {message.fileUrl ? (
          <div className="mb-1">
            <a
              href={message.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sm"
            >
              📎 {message.fileName}
            </a>
          </div>
        ) : null}
        <span>{message.text}</span>
        <div className="text-[10px] text-right text-gray-300 mt-1">
          {moment(message.createdAt).calendar(undefined, {
            sameDay: "HH:mm",
            lastDay: "[Hôm qua] HH:mm",
            lastWeek: "dddd HH:mm",
            sameElse: "DD/MM/YYYY HH:mm",
          })}
        </div>
      </div>
    ))}
  </div>

  {/* Input */}
  <div className="flex items-center gap-2 p-3 border-t bg-white">
    {/* File upload */}
    <div className="relative">
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div
        title="Gửi file"
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full cursor-pointer transition"
      >
        📎
      </div>
    </div>

    {/* Input emoji */}
    <div className="flex-grow">
    <InputEmoji
              value={textMessage}
              onChange={setTextMessage}
              fontFamily="Oswald"
              borderColor="rgba(10, 200, 10, 0.5)"
              placeholder="Nhập tin nhắn..."
              shouldReturn={true}
              shouldConvertEmojiToImage={false}
              onEnter={() =>
                sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
              }
            />
    </div>

    {/* Send button */}
    <button
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      onClick={() =>
        sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
      }
    >
      Gửi
    </button>
  </div>
</div>

  );
};

export default ChatBox;
