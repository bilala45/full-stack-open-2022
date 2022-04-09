const Notification = ({ status }) => {
  const notifStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  };
  if (status) {
    return <div style={notifStyle}>{status}</div>;
  }
};

export default Notification;
