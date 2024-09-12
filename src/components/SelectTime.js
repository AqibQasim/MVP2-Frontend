import Image from "next/image";

const SelectTime = () => (
  <div className="my-[0.25rem] flex w-[100%] justify-between">
    <div className="flex w-[75%] rounded-full border-[1px] border-primary-tint-90 p-1">
      <Image
        alt="Alarm icon"
        className="h-7 w-7 rounded-full bg-primary-tint-100 p-[0.35rem] font-lufga"
        src="/icons/alarm-fill.svg"
        width={30}
        height={30}
      />
      <select className="w-[100%] text-[0.9rem] text-grey-primary outline-none">
        <option selected disabled>
          Select Time
        </option>
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
    <select className="w-[22%] rounded-full border-[1px] border-primary-tint-90 px-2 py-1 text-[0.9rem] text-grey-primary outline-none">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  </div>
);

export default SelectTime;
