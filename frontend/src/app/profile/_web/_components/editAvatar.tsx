import { motion } from "framer-motion";
import { useUserStore } from "@/app/profile/_web/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditAvatar = () => {
  const { userData, setUserData } = useUserStore() || {};
  const hasStories = (userData?.stories ?? []).length > 0;

  return (
    <div>
      <div className="relative">
        <motion.div
          className="flex gap-1 justify-center absolute items-center ml-28"
          style={{ willChange: "transform" }}
          animate={{
            y: ["0%", "-10%", "0%"],
            rotate: [0, 2, -2, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2.8,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
            delay: 0.3,
          }}
        >
          <motion.div
            className="rounded-full w-2 h-2 bg-black -mb-4"
            animate={{ y: [0, -2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="rounded-full w-3 h-3 bg-black -mb-1 -ml-1"
            animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: 0.2,
            }}
          />
          <motion.p
            className="font-semibold text-center rounded-2xl -ml-4 -mt-2 px-2 py-1 w-30 text-white text-xs bg-black"
            animate={{
              opacity: [1, 0.9, 1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
          >
            {userData?.moodStatus}
          </motion.p>
        </motion.div>

        {hasStories ? (
          <div className="-mt-16 p-[0.2rem] rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-full">
            <Avatar className="w-full h-full">
              <AvatarImage
                className="rounded-full border-3 border-black object-cover"
                src={userData?.avatarImage}
                alt="User Profile"
              />
              <AvatarFallback>Spotty</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Avatar className="-mt-16 w-[128px] h-[128px]">
            <AvatarImage
              className="rounded-full border-3 border-black object-cover"
              src={userData?.avatarImage}
              alt="User Profile"
            />
            <AvatarFallback>Spotty</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default EditAvatar;
