// import MobileEventCreate from "./_components/mobileEventCreate";
import WebEventCreate from "./_components/webEventCreate";

const event = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div>
        <div className="hidden sm:block">
          <WebEventCreate />
        </div>
        <div className="block sm:hidden">
        </div>
      </div>
    </div>
  )
}
export default event;