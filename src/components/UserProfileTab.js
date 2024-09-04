const UserProfileTab = ({ name, designation }) => (
    <div className="names">
        <p className="font-lufga text-[0.75rem] font-medium">{name}</p>
        <p className="text-[0.75rem]  font-medium text-grey-primary-shade-30">{designation}</p>
    </div>
);

export default UserProfileTab;