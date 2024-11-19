import React, {useState, useEffect, useCallback} from "react";

import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";

import useAppStore from "../store/app.js";
import Profile from "../components/profile/Profile.jsx";
import Countdown from "../components/countdown/Countdown.jsx";

import {useTonConnectUI} from "@tonconnect/ui-react";
import {connectWallet, dissconnectWallet} from "../api/index.js";


export default function Wallet() {
    const app = useAppStore();

    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleWalletConnection = useCallback(async (address) => {
        setIsLoading(true)
        await connectWallet(app.user.id, address).then(() => {
            setIsLoading(false);
            setTonWalletAddress(address);
        });
        console.log("Wallet connected successfully!");
    }, []);

    const handleWalletDisconnection = useCallback(async () => {
        setIsLoading(true)
        await dissconnectWallet(app.user.id).then(() => {
            setIsLoading(false)
            setTonWalletAddress(null);
        });
        console.log("Wallet disconnected successfully!");
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                await handleWalletConnection(tonConnectUI.account?.address);
            } else {
                await handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet) {
                await handleWalletConnection(wallet.account.address);
            } else {
                await handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };


    return <>
        <UIStatus friends={120} user={{
            firstName: app.user.firstName,
            balance: app.user.balance,
            profileImage: app.profileImage
        }}/>

        <UIPageIndicator page="Wallet"/>

        {
            app.status === true && (
                <Countdown/>
            )
        }

        {
            app.status == false && (
                <div className="after-countdown mt-[12%]">
                    <Profile user={app.user} profileImage={app.profileImage}/>
                </div>
            )
        }


        <div className="btn-container">

            {
                app.status && (
                    <button disabled={!tonWalletAddress} onClick={() => console.log("invite")} className="show-btn">Cash
                        withdrawal</button>
                )
            }

            {
                tonWalletAddress ?
                    <button onClick={handleWalletAction} className="show-btn disconnect">
                        {isLoading ? "Loading" : "Disconnect your wallet"}
                    </button>
                    : <button onClick={handleWalletAction} className="show-btn">
                        {isLoading ? "Loading" : "Connect your wallet"}
                    </button>
            }
        </div>
    </>
}

