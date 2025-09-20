const namesLS = {
  token: 'token',
  username: 'username',
}

const defaultValues = {
  message: '',
  channelName: '',
}

const socketEvents = {
  addNewChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
  newMessage: 'newMessage',
  removeMessage: 'removeMessage',
  renameMessage: 'renameMessage',
}

const clientRoutes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  channels: '/channels',
}

const chatApi = {
  home: '/api/v1/',
  login: '/api/v1/login',
  signup: '/api/v1/signup',
  channels: '/api/v1/channels',
  messages: '/api/v1/messages',
}

const modalBodyType = {
  add: "addChannel",
  remove: 'removeChannel',
  rename: 'renameChannel',
}

export { namesLS, defaultValues, socketEvents, clientRoutes, chatApi, modalBodyType }
