import { useEffect, useRef, useState } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useQuery, useMutation,useQueryClient  } from '@tanstack/react-query';
import { useMessages } from 'src/contexts/MessagesContext';
import { User as UserType, GroupReponse } from 'src/types/user.type';
import { GetMessagesQuery, IMessage } from 'src/types/utils.type';
import messagesApi from 'src/apis/messages.api'
import {User} from 'src/types/user.type'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import { storage } from 'src/configs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ChatBox: React.FC = () => {

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [textMessage, setTextMessage] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const { messagesData, userData, groupResponse } = useMessages();
  // console.log(messagesData)
  // console.log(userData)
  // console.log(groupResponse)

  const { data: messageList, isLoading, error, refetch} = useQuery({
    queryKey: ['messageList', messagesData],
    queryFn: () => {
      return messagesApi.getMessage(messagesData as GetMessagesQuery)
    },
    enabled: !!messagesData,
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: profileDataLS } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });

  const PhoneSender = profileDataLS?.phone || ''


  // console.log(messageList)

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList?.data]);

  const mutationSendMessage = useMutation({
    mutationFn: (newMsg: IMessage) => messagesApi.sendMessage(newMsg),
    onSuccess: (data) => {
      // console.log("✅ Gửi thành công:", data);
      toast.success("Gửi thành công")
      refetch();
    },
    onError: (error) => {
      // console.error("❌ Gửi thất bại:", error);
      toast.error("Gửi thất bại")
    }
  });
  

  const sendTextMessage = (
    message: string,
    clearInput: (msg: string) => void
  ) => {
    if (!message.trim()) return;
    const newMsg: IMessage = {
      text: message,
      sender: PhoneSender,
      receiver: userData?.phone || '',
      is_group: false,
      content_type: 'text'
    };
    mutationSendMessage.mutate(newMsg);
    
    console.log(newMsg)
    /// api
    clearInput("");
  };

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
  const [file, setFile] = useState<File>()
  
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardItems = event.clipboardData?.items;
      if (!clipboardItems) return;

      for (const item of clipboardItems) {
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreviewImage(fileUrl);
            setFile(file)
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleSendPastedImage = async () => {
    if (!previewImage) return;

    if (file) {
      const uniqueId = uuidv4();
  
      try {
        const storageRef = ref(storage, `images/${uniqueId}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const newMsg: IMessage = {
          sender: PhoneSender,
          receiver: userData?.phone || '',
          is_group: false,
          content_type: 'image',
          
          url_file: downloadURL,
          name_file: file.name,
          size_file: file.size.toString(),
          mime_type_file: file.type,
          duration_video : "0",

        };
        mutationSendMessage.mutate(newMsg);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
        return null;
      } finally {
      }
    } else {
      alert('No file selected.');
      return null;
    }

    const newMsg: IMessage = {
      sender: PhoneSender,
      text: "",
      url_file: previewImage,
      name_file: "clipboard-image.png",
      content_type: "image",
      timestamp: new Date(),
      status: 'sent',
      receiver: userData?.phone || '',
      is_group: false,
    };

    // TODO: Replace with API call or message state update
    console.log("Send image:", newMsg);

    setPreviewImage(null);
  };

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

    {/* Nếu là ảnh thì hiển thị ảnh */}
    {message.url_file && message.content_type === 'image' && (
      <div className="mb-2">
        <img
          src={message.url_file}
          alt={message.name_file || "Image"}
          className="rounded-lg max-w-full w-[100%] max-h-[300px] object-contain"
        />
      </div>
    )}

        { (message.url_file  && (message.content_type === 'video' || message.content_type === 'file'))? (
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

     {/* Preview ảnh dán */}
     {previewImage && (
          <div className="flex flex-col items-end mt-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[200px] rounded-lg mb-2 border"
            />
            <button
              onClick={handleSendPastedImage}
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              Gửi ảnh đã dán
            </button>
          </div>
        )}
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
              onEnter={() =>
                sendTextMessage(textMessage, setTextMessage)
              }
            />
    </div>

    {/* Send button */}
    <button
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      onClick={() =>
        sendTextMessage(textMessage, setTextMessage)
      }
    >
      Gửi
    </button>
  </div>
</div>

  );
};

export default ChatBox;
