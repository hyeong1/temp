"use client";
import React, { useRef, useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import { StreamManager } from "openvidu-browser";

// todo: 소켓 리코일에서 꺼내쓰기
export default function UserVideoComponent(props: {
  streamManager: StreamManager;
  socket: any;
}) {
  const streamComponentRef = useRef<HTMLDivElement>(null);
  const rawData = props.streamManager.stream.connection.data;

  // 데이터를 구분자로 분리
  const [jsonString] = rawData.split("%/%");

  // JSON 문자열을 파싱
  let nickname = "";
  nickname = JSON.parse(jsonString).clientData;
  // console.log(rawData)

  useEffect(() => {
    if (streamComponentRef.current) {
      streamComponentRef.current.id = nickname;
    }
  }, []);

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent" ref={streamComponentRef}>
          <div className="arrow-container hidden" id="arrow">
            <div className="arrow-body">
              <div className="arrow-head"></div>
            </div>
          </div>
          <OpenViduVideoComponent
            streamManager={props.streamManager}
            socket={props.socket}
          />
          <div>
            <p className="nickname">{nickname}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
