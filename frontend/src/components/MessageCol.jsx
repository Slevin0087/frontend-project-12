import { useSelector } from "react-redux";
import ChatHeadInfo from "./ChatHeadInfo.jsx";
import MessagesBox from "./MessagesBox.jsx";
import MessageForm from "./MessageForm.jsx";
import Col from "react-bootstrap/Col";

function MessageCol() {
  console.log("КОМПОНЕНТ MessageCol");

  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => state.messages);
  const messagesForActiveChannel = messages.messages.filter(
    (message) => message.channelId === activeChannel.id
  );
  const count = messagesForActiveChannel?.length || 0;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeadInfo channel={activeChannel} count={count} />
        <MessagesBox messages={messagesForActiveChannel} />
        <div className="mt-auto px-5 py-3">
          <MessageForm channels={channels} />
        </div>
      </div>
    </Col>
  );
}

export default MessageCol;
