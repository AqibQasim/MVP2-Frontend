function Dot({ className, onClick }) {
  return (
    <div
      className={`${className} do size-1.5 rounded-full bg-grey-primary-tint-40`}
      onClick={onClick}
    ></div>
  );
}

export default Dot;
