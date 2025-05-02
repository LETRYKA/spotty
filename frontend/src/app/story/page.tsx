"use client";
import StoryPic from "./_mobile/StoryPic";
import StoryProfile from "./_mobile/StoryProfile";
const Story = () => {
  return (
    <div className="w-full h-screen">
      {/* <div className="responsive">
                <StoryPic/>
            </div> */}
      <div className="absolute z-20 top-0 w-full">
        <StoryProfile />
      </div>
    </div>
  );
};
export default Story;
