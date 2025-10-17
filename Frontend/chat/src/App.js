import { useState } from "react";
import { WaitingRoom } from "./components/WaitingRoom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import { Chat } from "./components/Chat";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messeges, setMessges] = useState([]);

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5031/chat")
        .withAutomaticReconnect()
        .build();

        connection.on("ReceiveMessage", (userName, messege) => {
          setMessges((messeges) => [...messeges, {userName, messege}]);
        });
      try{
        await connection.start();
        await connection.invoke("JoinChat", { userName, chatRoom });

        setConnection(connection);
        setChatRoom(chatRoom);
      }
      catch(error){
        console.log(error);
      }
  };

  const sendMessege = (messege) => {
    if (!connection) {
        console.warn("Сначала присоединитесь к чату");
        return;
    }
    connection.invoke("SendMessage", messege)
        .catch(err => console.error("Ошибка отправки сообщения:", err));
}

  const closeChat = async () => {
    await connection.stop();
    setConnection(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {connection ? <Chat messeges={messeges} chatRoom={chatRoom} sendMessege={sendMessege} closeChat={closeChat}/> : <WaitingRoom joinChat={joinChat}/>}
    </div>
  );
}

export default App;
