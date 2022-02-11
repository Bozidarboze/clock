import "./LengthControl.styles.scss";

interface LengthControlProps {
  label: string;
  time: number;
  handleLengthControl: Function;
}

const LengthControl = ({ label, time, handleLengthControl }: LengthControlProps) => {
  const timeToChange = label === "Break Length" ? "break" : "session";
  const labelId = label === "Break Length" ? "break-label" : "session-label";
  const incrementId = label === "Break Length" ? "break-increment" : "session-increment";
  const decremendId = label === "Break Length" ? "break-decrement" : "session-decrement";
  const timeId = label === "Break Length" ? "break-length" : "session-length";

  return (
    <div className='length-control'>
      <span id={labelId}>{label}</span>
      <div className='length-controls'>
        <div id={incrementId} className='btn up-arrow' onClick={() => handleLengthControl("up", timeToChange)}></div>
        <span id={timeId}>{time}</span>
        <div id={decremendId} className='btn down-arrow' onClick={() => handleLengthControl("down", timeToChange)}></div>
      </div>
    </div>
  );
};

export default LengthControl;
