"use client";

import { Participant, Track } from "livekit-client";
import { useRef, useState, useEffect } from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    const video = videoRef.current as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
          webkitExitFullscreen?: () => void;
          webkitDisplayingFullscreen?: boolean;
        })
      | null;

    if (isFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (video?.webkitDisplayingFullscreen) {
        video.webkitExitFullscreen?.();
      }
      return;
    }

    if (wrapper?.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (wrapper?.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    } else if (video?.webkitEnterFullscreen) {
      // iOS Safari only supports fullscreen on the <video> element itself
      video.webkitEnterFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onBeginFullscreen = () => setIsFullscreen(true);
    const onEndFullscreen = () => setIsFullscreen(false);

    video.addEventListener("webkitbeginfullscreen", onBeginFullscreen);
    video.addEventListener("webkitendfullscreen", onEndFullscreen);

    return () => {
      video.removeEventListener("webkitbeginfullscreen", onBeginFullscreen);
      video.removeEventListener("webkitendfullscreen", onEndFullscreen);
    };
  }, []);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};
