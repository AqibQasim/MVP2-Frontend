import SvgIconWork from "@/svgs/SvgIconWork";
import styles from "../styles/SuccessMessage.module.css";
import ButtonCapsule from "./ButtonCapsule";
import Capsule from "./Capsule";
import ButtonCapsuleWhite from "./ButtonCapsuleWhite";

const ClientAlertMessage = ({ showResponseMessage, showMessage, msgText, onAccept, onReject }) => {
    console.log("SuccessIndicator rendering: ", showMessage);
    console.log("msgText:", msgText);

    return (
        <>
            <div className={showResponseMessage ? "flex fixed justify-center w-full z-[9999]" : styles.hide}>
                <div
                    className={`${styles.successMsgContainer} ${styles.errorMsgContainer}`}
                >
                    <SvgIconWork className="relative -right-[1.3px]" />
                    <p className={styles.successMessage}>{msgText}</p>
                    <div className="justify-between">
                        <ButtonCapsule onPress={onAccept}>Accept</ButtonCapsule>
                        <ButtonCapsule className={'bg-slate-100'}>
                            <div className="text-black">Decline</div>
                        </ButtonCapsule>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientAlertMessage;
