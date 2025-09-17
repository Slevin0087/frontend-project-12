import { useState } from "react";
import { headers } from "./helpers/helper";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unshowRemoveChannel } from "../store/modalsSlice.js";
import {
  setActiveChannel,
  setModifiedChannel,
} from "../store/channelsSlice.js";
import { chatApi } from "../routes.js";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

function ModalRemoveChannel() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { show } = useSelector((state) => state.modals.removeChannel);
  const channels = useSelector((state) => state.channels);
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();

  const notify = () => toast.success(t('notifications.deleted'));
  const handleUnshow = () => {
    dispatch(setModifiedChannel(null));
    dispatch(unshowRemoveChannel());
  };

  const handleRemove = async (channel) => {
    setDisabled(true);
    try {
      await axios.delete(
        `${chatApi.channels}/${channel.id}`,
        headers(token)
      );
      notify();
    } catch (error) {
      console.error("remove failed:", error);
    } finally {
      dispatch(setModifiedChannel(null));
      dispatch(setActiveChannel(channels.channels[0]));
      setDisabled(false);
      dispatch(unshowRemoveChannel());
    }
  };

  return (
    <Modal show={show} centered>
      <Modal.Header className="btn" closeButton onClick={() => handleUnshow()}>
        <Modal.Title>{t("modals.removeChannel.removeChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("modals.removeChannel.confirmation")}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2 btn btn-secondary"
            disabled={disabled}
            onClick={() => handleUnshow()}
          >
            {t("modals.removeChannel.cancel")}
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            disabled={disabled}
            onClick={() => handleRemove(channels.modifiedChannel)}
          >
            {t("modals.removeChannel.remove")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRemoveChannel;
