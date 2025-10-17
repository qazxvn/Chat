export const Messege = ({messegeInfo}) => {
  return(
    <div className="w-fit">
      <span className="text-sm text-gray-600">{messegeInfo.userName}</span>
      <div className="p-2 bg-gray-100 rounded-lg shadow-md">
        {messegeInfo.messege}
      </div>
    </div>
  );
};