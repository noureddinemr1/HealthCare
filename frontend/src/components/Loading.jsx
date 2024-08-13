import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color={"#2dd4bf"} loading={true} size={150} />
    </div>
  );
}
