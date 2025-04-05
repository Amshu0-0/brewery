import './StatisticCard.css';

function StatisticCard({ title, value, icon }) {
  return (
    <div className="statistic-card">
      {icon && <div className="icon">{icon}</div>}
      <div className="content">
        <h3>{title}</h3>
        <p className="value">{value}</p>
      </div>
    </div>
  );
}

export default StatisticCard;