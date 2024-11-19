import React from "react";
import { Toaster, toast } from 'sonner'

import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import Friend from "../components/friend/Friend.jsx";
import useAppStore from "../store/app.js";
import getFileLink from "../utils/file.js";


export default function Friends() {
    const app = useAppStore();

    const handleAction = () => {
        navigator.clipboard.writeText(`https://t.me/nodeloper_bot/black_wallet?startapp=${app.user.telegramId}`);
        toast('Invite link copied');
    }

    return (
        <>
            <Toaster position="top-center" />

            <UIStatus
                friends={120}
                user={{
                    firstName: app.user.firstName,
                    profileImage: app.profileImage
                }}
            />

            <UIPageIndicator page="Friends" />

            <div className="tasks max-h-[350px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
                {
                    app.friends.map((friend, index) => {
                        return (
                            <Friend
                                key={index}
                                friendName={friend.firstName}
                                money={100}
                                clock={friend.time}
                                date={friend.date}
                            />
                        );
                    })
                }
            </div>

            <div className="btn-container">
                <button onClick={() => handleAction()} className="show-btn">Invite Friend</button>
            </div>
        </>
    );
}
