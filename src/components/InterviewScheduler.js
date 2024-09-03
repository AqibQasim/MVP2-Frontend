import Image from "next/image";


const InterViewScheduler = async () => {

    return (
        <>
            <div className="w-[100%] flex flex-col items-center">
                <div className="w-[95%] flex flex-col  ">
                    <div className="flex items-center w-[100%] gap-[1rem]">
                        <div
                            className={`relative size-12 overflow-hidden rounded-full bg-bg-avatar`}
                        >
                            <Image
                                src='/avatars/avatar-1.png'
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                alt="an avatar image"
                            />
                        </div>
                        <div className="names">
                            <p className="font-lufga text-sm font-medium"> {"Sohaib"} </p>
                            <p className="text-sm font-medium text-grey-primary-shade-30">
                                {" "}
                                {"Account Executive - AE"}{" "}
                            </p>
                        </div>
                    </div>

                    <span className="text-[0.8rem] my-[1rem] font-lufga text-grey-primary-shade-30">
                        Interview has been scheduled with <span className="font-bold">Sohaib</span>.
                    </span>


                    <div className="flex w-[100%] gap-[1rem] justify-between items-center bg-primary-tint-100 p-2 rounded-full">
                        <div className="flex gap-[1rem] items-center">
                            <div
                                className={`relative size-12 overflow-hidden rounded-full bg-bg-avatar`}
                            >
                                <Image
                                    src='/avatars/avatar-1.png'
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                    alt="an avatar image"
                                />
                            </div>
                            <div className="names">
                                <p className="font-lufga text-sm font-medium"> {"Sohaib"} </p>
                                <p className="text-sm font-medium text-grey-primary-shade-30">
                                    {" "}
                                    {"Software Engineer"}{" "}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-[0.3rem] items-center font-lufga">
                            <Image src='/icons/internet.svg' width={30} height={30} alt="Internet icon" />
                            <span className="text-grey-primary-shade-30 font-medium">Asia/Karachi</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-[0.8rem] my-[0.4rem]">Time</span>
                        <div className="flex w-[100%] justify-between  ">
                            <div className="flex w-[75%] p-2 rounded-full border-primary-tint-90 border-[1px]">
                                <Image src='/icons/alarm-fill.svg' width={20} height={20} />
                                <select className="w-[100%]">
                                    <option disabled>Select Time</option>
                                    <option value="12:00">12:00</option>
                                    <option value="1:00">1:00</option>
                                    <option value="2:00">2:00</option>
                                    <option value="3:00">3:00</option>
                                    <option value="4:00">4:00</option>
                                    <option value="5:00">5:00</option>
                                    <option value="6:00">6:00</option>
                                    <option value="7:00">7:00</option>
                                    <option value="8:00">8:00</option>
                                    <option value="9:00">9:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                </select>
                            </div>
                            <select className="w-[20%] p-2 rounded-full border-primary-tint-90 border-[1px]">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default InterViewScheduler;