function RoomCard({ room, user }) {
  console.log(room, user);
  return <>{user && user.displayName}</>;
}

export default RoomCard;
