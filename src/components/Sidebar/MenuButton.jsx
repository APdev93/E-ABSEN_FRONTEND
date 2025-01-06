const MenuButton = ({ iconClass, label, isActive, onClick }) => {
	return (
		<li className={isActive ? "active" : ""} onClick={onClick}>
			<i className={iconClass}></i> {label && <span>{label}</span>}
		</li>
	);
};

export default MenuButton;
