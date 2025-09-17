import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { chatApi } from "../../routes";
import { addChannels, setActiveChannel } from "../../store/channelsSlice.js";
import { getData } from "../helpers/helper.js";
import { ToastContainer } from "react-toastify";
import { setLoginStatus } from "../../store/authSlice.js";
import ChannelsCol from "../ChannelsCol.jsx";
import ChannelsList from "../ChannelsList.jsx";
import MessageCol from "../MessageCol.jsx";
import ModalNewChannel from "../ModalNewChannel.jsx";
import ModalRemoveChannel from "../ModalRemoveChannel.jsx";
import ModalRenameChannel from "../ModalRenameChannel.jsx";

function ChatPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const channels = useSelector((state) => state.channels);

  useEffect(() => {
    console.log("useEffect в ChatPage");

    dispatch(setLoginStatus(true));
    const fetchChannels = async () => {
      try {
        const channels = await getData(chatApi.channels, token);
        dispatch(addChannels(channels));
        dispatch(setActiveChannel(channels[0]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannels();
  }, [token, dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={4}
          md={2}
          className="border-end px-0 bg-light flex-column h-100 d-flex"
        >
          <ChannelsCol />
          <ChannelsList channels={channels} />
        </Col>
        <MessageCol />
      </Row>
      <ToastContainer />
      <ModalNewChannel />
      <ModalRemoveChannel />
      <ModalRenameChannel />
    </Container>
  );
}

export default ChatPage;
