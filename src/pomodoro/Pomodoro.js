import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from "../utils/duration";
import InSession from "./InSession";
import Duration from "./Duration";
import {secondsToDuration} from "../utils/duration";

const BREAK_MAX = 15;
const BREAK_MIN = 1;
const BREAK_STEP = 1;
const FOCUS_MAX = 60;
const FOCUS_MIN = 5;
const FOCUS_STEP = 5;

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  const elapsedSeconds = prevState.timeTotal - timeRemaining;
  return {
    ...prevState,
    timeRemaining,
    percentComplete: (elapsedSeconds / prevState.timeTotal) * 100,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        duration: minutesToDuration(breakDuration),
        timeTotal: breakDuration * 60,
        timeRemaining: breakDuration * 60,
        percentComplete: 0,
      };
    }
    return {
      label: "Focusing",
      duration: minutesToDuration(focusDuration),
      timeTotal: focusDuration * 60,
      timeRemaining: focusDuration * 60,
      percentComplete: 0,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [session, setSession] = useState(null);
 

  // function timerDecrement(){
  //   nextSession(focusDuration, breakDuration)
  //   nextTick(session);
  //   console.log(session)
    
  // }

    function playPause() {
      setIsTimerRunning((prevState) => { 
        const nextState = !prevState
        if (nextState) {
          setSession((prevStateSesssion) => {
            if (prevStateSesssion === null) {
              return {
                label: "Focusing",
                duration: minutesToDuration(focusDuration),
                timeTotal: focusDuration * 60,
                timeRemaining: focusDuration * 60,
                percentComplete: 0,
              };
            }
            return prevStateSesssion;
          });
        }
        return nextState;
      })
    }



  function handleDecrementFocus(){
     if(isTimerRunning === true){
       return;
     }
    setFocusDuration((prevState) => Math.max(FOCUS_MIN, prevState - FOCUS_STEP)
      //if(prevState - FOCUS_STEP < FOCUS_MIN){
         //return prevState;
       //}
       //return prevState-FOCUS_STEP;
    )
  }

  function handleIncrementFocus(){
     if(isTimerRunning === true){
       return;
     }
    setFocusDuration((prevState) => Math.min(FOCUS_MAX, prevState + FOCUS_STEP)
      //  if(prevState + FOCUS_STEP > FOCUS_MAX){
      //    return prevState;
      //  }
      //  return prevState + FOCUS_STEP;
    )
  }

  function handleIncrementBreak(){
     if(isTimerRunning === true){
       return;
     }
    setBreakDuration((prevState) => Math.min(BREAK_MAX, prevState + BREAK_STEP)
      //  if(prevState + BREAK_STEP > BREAK_MAX){
      //    return prevState;
      //  }
      //  return prevState + BREAK_STEP;
    )
  }

  function handleDecrementBreak(){
     if(isTimerRunning === true){
      return;
     }
    setBreakDuration((prevState) => Math.max(BREAK_MIN, prevState - BREAK_STEP)
      //  if(prevState - BREAK_STEP < BREAK_MIN){
      //    return prevState;
      //  }
      //  return prevState - BREAK_STEP;
    )
  }

  function handleStop(){
    setIsTimerRunning(false);
    setSession(null);
  }
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      //console.log(session)
      if(session.timeRemaining === 0){
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        return setSession(nextSession(focusDuration, breakDuration))
      }
      return setSession(nextTick)
    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Duration 
            label={`Focus Duration: ${minutesToDuration(focusDuration)}`}
            onDecrease={handleDecrementFocus}
            onIncrease={handleIncrementFocus}
            testid="focus"
          />
        </div>
        <div className="col">
          <div className="float-right">
            <Duration 
              label={`Break Duration: ${minutesToDuration(breakDuration)}`}
              onDecrease={handleDecrementBreak}
              onIncrease={handleIncrementBreak}
              testid="break"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <InSession session={session} isPaused={!isTimerRunning}/>
    </div>
  );
}

export default Pomodoro;
