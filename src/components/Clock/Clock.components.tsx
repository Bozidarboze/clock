import { useEffect, useState } from "react";

import LengthControl from "../LengthControl/LengthControl.component";

import "./Clock.styles.scss";

const Clock = () => {
  const initialSessionTime: string = new Date(1500 * 1000).toISOString().slice(14, 19);
  const audio: any = document.getElementById("beep");

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [displayTime, setDisplayTime] = useState(initialSessionTime);
  const [sessionSeconds, setSessionSeconds] = useState(1500);
  const [breakSeconds, setBreakSeconds] = useState(300);
  const [intervalId, setIntrevalId]: any = useState(null);
  const [timeLabel, setTimeLabel] = useState("Session");

  const changeDisplayTime = (seconds: number) => {
    seconds !== 3600
      ? setDisplayTime(new Date(seconds * 1000).toISOString().slice(14, 19))
      : setDisplayTime(new Date(seconds * 1000).toISOString().slice(12, 19));
  };

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setDisplayTime(initialSessionTime);
    setSessionSeconds(1500);
    setBreakSeconds(300);
    clearInterval(intervalId);
    setIntrevalId(null);
    setTimeLabel("Session");
    audio.pause();
    audio.currentTime = 0;
  };

  const handleLengthControl = (control: string, displayTime: string) => {
    if (control === "up") {
      if (displayTime === "break" && breakLength !== 60) {
        intervalId !== null && reset();
        setBreakLength(breakLength + 1);
        setBreakSeconds(breakLength * 60 + 60);
      } else if (displayTime === "session" && sessionLength !== 60) {
        intervalId !== null && reset();
        setSessionLength(sessionLength + 1);
        setSessionSeconds(sessionLength * 60 + 60);
      }
    } else if (control === "down") {
      if (displayTime === "break" && breakLength !== 1) {
        intervalId !== null && reset();
        setBreakLength(breakLength - 1);
        setBreakSeconds(breakLength * 60 - 60);
      } else if (displayTime === "session" && sessionLength !== 1) {
        intervalId !== null && reset();
        setSessionLength(sessionLength - 1);
        setSessionSeconds(sessionLength * 60 - 60);
      }
    }
  };

  const startSession = () => {
    setTimeLabel("Session");
    let seconds = sessionSeconds;
    let id = setInterval(() => {
      seconds--;
      setSessionSeconds(seconds);
      changeDisplayTime(seconds);
    }, 1000);
    setIntrevalId(id);
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntrevalId(null);
  };

  const startBreak = () => {
    setTimeLabel("Break");
    let seconds = breakSeconds;
    let id = setInterval(() => {
      seconds--;
      setBreakSeconds(seconds);
      changeDisplayTime(seconds);
    }, 1000);
    setIntrevalId(id);
  };

  const handleClockControl = (control: string) => {
    if (control === "reset") {
      reset();
    } else if (control === "play-pause") {
      intervalId === null ? (timeLabel === "Session" ? startSession() : startBreak()) : stopInterval();
    }
  };

  useEffect(() => {
    changeDisplayTime(sessionSeconds);
    if (sessionSeconds === 0) {
      setSessionSeconds(sessionLength * 60);
      stopInterval();
      startBreak();
      audio.play();
    }
  }, [sessionSeconds]);

  useEffect(() => {
    if (breakSeconds === 0) {
      setBreakSeconds(breakLength * 60);
      stopInterval();
      startSession();
      audio.play();
    }
  }, [breakSeconds]);

  return (
    <div className='clock'>
      <h1>25 + 5 Clock</h1>
      <div className='length-container'>
        <LengthControl label='Break Length' time={breakLength} handleLengthControl={handleLengthControl} />
        <LengthControl label='Session Length' time={sessionLength} handleLengthControl={handleLengthControl} />
      </div>
      <div className={`session ${timeLabel === "Break" && "red"}`}>
        <span id='timer-label'>{timeLabel}</span>
        <span id='time-left' className='big'>
          {displayTime}
        </span>
      </div>
      <div className='clock-controls'>
        <div id='start-stop' className='btn play-pause' onClick={() => handleClockControl("play-pause")}></div>
        <div id='reset' className='btn reset' onClick={() => handleClockControl("reset")}></div>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
};

export default Clock;
