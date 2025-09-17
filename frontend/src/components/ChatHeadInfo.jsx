function ChatHeadInfo(props) {
  const { channel, count } = props;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      {channel && (
        <>
          <p className="m-0">
            <b>{`# ${channel.name}`}</b>
          </p>
          <span className="text-muted">{`${count} сообщений`}</span>
        </>
      )}
    </div>
  );
}

export default ChatHeadInfo;
