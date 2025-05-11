import WebEventCreate from "./_components/webEventCreate";
import PinInput from "./_components/pin-input";

const event = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div>
        <div className="hidden sm:block">
          {/* <WebEventCreate /> */}
          <PinInput />
        </div>
        <div className="block sm:hidden"></div>
      </div>
    </div>
  );
};
export default event;
