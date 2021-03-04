import React, { useState } from "react";
import Progress from "./Progress"
import {secondsToDuration} from "../utils/duration"

function inSession({session, isPaused}) {
    if(session ===null){
        return null;
    }
    if(isPaused === true){
       return ( <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {`${session.label} for ${session.duration} minutes`}
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
           {`${secondsToDuration(session.timeRemaining)} remaining`}
          </p>
          <h3>Paused</h3>
        </div>
      </div>
      
         <Progress percentComplete={session.percentComplete} session={session}/>
      
    </div>
  );
    }
  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {`${session.label} for ${session.duration} minutes`}
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
           {`${secondsToDuration(session.timeRemaining)} remaining`}
          </p>
          
        </div>
      </div>
      
         <Progress percentComplete={session.percentComplete} session={session}/>
      
    </div>
  );
}


export default inSession;