import Image from "next/image";

const SelectTime = () => (
    <div className="flex w-[100%] justify-between my-[0.25rem]">
        <div className="flex w-[75%] p-1 rounded-full border-primary-tint-90 border-[1px]">
            <Image className="bg-primary-tint-100 h-7 font-lufga w-7 p-[0.35rem] rounded-full" src='/icons/alarm-fill.svg' width={30} height={30} />
            <select className="w-[100%] text-[0.9rem] outline-none text-grey-primary">
                <option selected disabled>Select Time</option>
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
        <select className="w-[22%] outline-none  text-[0.9rem] py-1 px-2 rounded-full border-primary-tint-90 border-[1px] text-grey-primary">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
    </div>
);

export default SelectTime;