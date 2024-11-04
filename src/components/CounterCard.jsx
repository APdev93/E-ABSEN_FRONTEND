const CounterCard = ({ total, label }) => {
	return (
		<div className="border bg-white gap-3 w-100 p-2 rounded d-flex">
			<div className="border p-3 fs-1 rounded count">{total}</div>
			<div className="data-info">
				<h3>{label}
			</h3>
			</div>
		</div>
	);
};

export default CounterCard;
