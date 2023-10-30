import Spinner from "./Spinner";

const SubmitButton = ({ text, className, loading }) => {
  return (
    <button
      type="submit"
      className={`w-full py-3 font-bold text-white bg-primary rounded-2xl hover:bg-hover flex flex-col items-center ${className}`}
    >
      {loading ? <Spinner /> : <span className="text-center">{text}</span>}
    </button>
  );
};

export default SubmitButton;
