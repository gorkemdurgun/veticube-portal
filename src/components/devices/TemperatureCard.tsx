type TemperatureCardProps = {
  temperature: number;
  time: string;
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temperature, time }) => {
  return (
    <div className="w-full">
      <h1>TemperatureCard</h1>
      <h2>Temperature: {temperature}</h2>
      <h3>Time: {time}</h3>
    </div>
  );
};

export default TemperatureCard;