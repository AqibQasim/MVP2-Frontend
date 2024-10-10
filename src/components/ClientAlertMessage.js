import SvgIconWork from "@/svgs/SvgIconWork";
import styles from "../styles/SuccessMessage.module.css";
import ButtonCapsule from "./ButtonCapsule";
import Capsule from "./Capsule";
import ButtonCapsuleWhite from "./ButtonCapsuleWhite";

const ClientAlertMessage = ({ showMessage, msgText, onAccept, onReject, is_accepted, buttonType, notification_id }) => {
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
                    {
                        (is_accepted===null && (notification_id!=buttonType.notification_id)) && (

                            <div className="pr-4">
                                <ButtonCapsule onPress={onAccept} className={'w-[8rem]'}>Accept</ButtonCapsule>
                                <ButtonCapsule onPress={onReject} className={'bg-slate-100 ml-2 w-[8rem]'}>
                                    <div className="text-black">Decline</div>
                                </ButtonCapsule>
                            </div>
                        )
                    }
                    {
                        (is_accepted===true || (buttonType.type === 'accept'&& buttonType.notification_id===notification_id)) && (
                            <ButtonCapsule className={'w-[8rem]'}>Accepted</ButtonCapsule>
                        )
                    }
                    {
                        (is_accepted===false || (buttonType.type === 'reject'&& buttonType.notification_id===notification_id)) && (
                            <ButtonCapsule className={'bg-slate-100 ml-2 w-[8rem]'}>
                                <div className="text-black">Declined</div>
                            </ButtonCapsule>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ClientAlertMessage;
