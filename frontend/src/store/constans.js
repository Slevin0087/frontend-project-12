const namesLS = {
  token: "token",
  username: "username",
};

const defaultValues = {
  message: "",
  channelName: "",
};

const socketEvents = {
  addNewChannel: "newChannel",
  removeChannel: "removeChannel",
  renameChannel: "renameChannel",
  newMessage: "newMessage",
  removeMessage: "removeMessage",
  renameMessage: "renameMessage",
};

export { namesLS, defaultValues, socketEvents };
