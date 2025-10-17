import { CloseButton, Heading, Input, Button } from "@chakra-ui/react";
import { Messege } from "./Messege";
import { useState } from "react";

export const Chat = ({messeges, chatRoom, closeChat, sendMessege }) => {
  const [messege, setMessege] = useState("");

  const onSendMessege = () => {
    sendMessege(messege)
    setMessege("");
  }

  return(
    <div className="w-1/2 bg-white p-8 rounded shadow-lg">
      <div className="flex flex-row justify-between mb-5">
        <Heading size={"lg"}>{chatRoom}</Heading>
        <CloseButton onClick={closeChat}/>
      </div>
      <div className="flex flex-col overflow-auto scroll-swooth h-96 gap-3 pb-3">
        {messeges.map((messegeInfo, index) => (
          <Messege messegeInfo={messegeInfo} key={index}/>
        ))}
      </div>
      <div className="flex gap-3">
        <Input type="text" value={messege} onChange={(e) => setMessege(e.target.value)} placeholder="Введите сообщение"/>
        <Button colorScheme="blue" onClick={onSendMessege}>Отправить</Button>
      </div>
    </div>
  );
};