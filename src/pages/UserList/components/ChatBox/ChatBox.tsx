import { useEffect, useRef, useState } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useQuery } from '@tanstack/react-query';
import { useMessages } from 'src/contexts/MessagesContext';
import { User as UserType, GroupReponse } from 'src/types/user.type';
import { GetMessagesQuery, IMessage } from 'src/types/utils.type';
import messagesApi from 'src/apis/messages.api'
import {User} from 'src/types/user.type'



const ChatBox: React.FC = () => {


  const [textMessage, setTextMessage] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const { messagesData, userData, groupResponse } = useMessages();
  // console.log(messagesData)
  // console.log(userData)
  // console.log(groupResponse)

  const { data: messageList, isLoading, error} = useQuery({
    queryKey: ['messageList', messagesData],
    queryFn: () => {
      return messagesApi.getMessage(messagesData as GetMessagesQuery)
    },
    enabled: !!messagesData,
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: profileDataLS, refetch } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });

  const PhoneSender = profileDataLS?.phone || ''


  console.log(messageList)

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList?.data]);

  // const sendTextMessage = (
  //   message: string,
  //   sender: User,
  //   chatId: string,
  //   clearInput: (msg: string) => void
  // ) => {
  //   if (!message.trim()) return;
  //   const newMsg: Message = {
  //     senderId: sender._id,
  //     text: message,
  //     createdAt: new Date().toISOString(),
  //   };
  //   setMessages((prev) => [...prev, newMsg]);
  //   clearInput("");
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  
  //   const fileUrl = URL.createObjectURL(file);
  
  //   const newMsg: Message = {
  //     senderId: user._id,
  //     text: "",
  //     createdAt: new Date().toISOString(),
  //     fileUrl,
  //     fileName: file.name,
  //   };
  
  //   setMessages((prev) => [...prev, newMsg]);
  // };
  

  return (
<div className="max-w-2xl mx-auto h-[90vh] flex flex-col border rounded-xl shadow-md overflow-hidden bg-white">
  {/* Header */}
  <div className="flex justify-between items-center p-4 bg-green-50 border-b font-semibold text-gray-800">
    <span>💬 {userData?.name}</span>
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
        // onClick={() => setMessages([])}
        title="Xoá tất cả tin nhắn"
        className="hover:bg-red-100 p-2 rounded-full transition"
      >
        🗑️
      </button>
    </div>
  </div>

  {/* Chat body */}
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
    {messageList?.data.map((message, index) => (
      <div
        key={index}
        ref={scroll}
        className={`max-w-[70%] p-3 rounded-xl text-sm shadow-sm ${
          message.sender === profileDataLS?.phone
            ? "ml-auto bg-green-500 text-white"
            : "mr-auto bg-white border"
        }`}
      >
        { (message.url_file  && (message.content_type === 'image' || message.content_type === 'video' || message.content_type === 'file'))? (
          <div className="mb-1">
            <a
              href={message.url_file}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sm"
            >
              📎 {message.name_file}
            </a>
          </div>
        ) : null}
        <span>{message.text}</span>
        <div className="text-[10px] text-right text-gray-300 mt-1">
        {moment(message.timestamp).calendar(undefined, {
          lastDay: "[Hôm qua] HH:mm",          // Nếu là hôm qua, hiển thị "Hôm qua" và giờ
          lastWeek: "dddd HH:mm",              // Nếu là tuần trước, hiển thị tên ngày trong tuần và giờ
          sameElse: "DD/MM/YYYY HH:mm:ss",    // Nếu không phải trong các trường hợp trên, hiển thị đầy đủ ngày giờ
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
        // onChange={handleFileChange}
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
              // onEnter={() =>
              //   sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
              // }
            />
    </div>

    {/* Send button */}
    <button
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      // onClick={() =>
      //   sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
      // }
    >
      Gửi
    </button>
  </div>
</div>

  );
};

export default ChatBox;
