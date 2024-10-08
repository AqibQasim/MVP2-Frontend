import SvgIconWork from "@/svgs/SvgIconWork";
import styles from "../styles/SuccessMessage.module.css";
import ButtonCapsule from "./ButtonCapsule";
import Capsule from "./Capsule";
import ButtonCapsuleWhite from "./ButtonCapsuleWhite";

const ClientAlertMessage = ({ showMessage, msgText, onAccept, onReject }) => {
    console.log("SuccessIndicator rendering: ", showMessage);
    console.log("msgText:", msgText);

    return (
        <>
            <div className={"flex"}>
                <div
                    className={
                        //`${styles.successMsgContainer} ${styles.errorMsgContainer}`
                        'flex items-center justify-between p-2 w-full'
                    }
                >
                    <div className="flex items-center ">
                        <SvgIconWork className="relative -right-[1.3px] mr-3" />
                        <p className={'w-[30.5rem]'}>{msgText}</p>
                    </div>
                    <div className="pr-4">
                        <ButtonCapsule onPress={onAccept} className={'w-[8rem]'}>Accept</ButtonCapsule>
                        <ButtonCapsule onPress={onReject} className={'bg-slate-100 ml-2 w-[8rem]'}>
                            <div className="text-black">Decline</div>
                        </ButtonCapsule>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientAlertMessage;
