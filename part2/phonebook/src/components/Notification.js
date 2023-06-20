const Notification = (props) => {
  console.log('props',props.notification);
  const color = props.notification && props.notification.includes("404") ? 'red' : 'green';

  const notificationStyle = {    
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const displayNotification = props.notification ? notificationStyle : null

  return (
    <div style={displayNotification}>
      {props.notification}
    </div>
  )
}
  
  export default Notification