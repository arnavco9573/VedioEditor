"use client";
import { useState, useEffect, useRef } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { FaPlay, FaPause, FaExpand } from "react-icons/fa";
import axios from "axios";
import useMediaStore from "../store/useMediaStore";
import { Rnd } from "react-rnd";
import { SiBuildkite } from "react-icons/si";
import { CiSettings, CiVideoOn } from "react-icons/ci";
import { IoIosPhotos } from "react-icons/io";
import { CiText } from "react-icons/ci";
import { SiElementary } from "react-icons/si";

export default function Editor() {
  const {
    media,
    setMedia,
    width,
    height,
    setDimensions,
    startTime,
    endTime,
    setTimeRange,
    setPosition,
    x,
    y,
  } = useMediaStore();

  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(startTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1); // Zoom level for the timeline
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData);
      setMedia(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync Timer & Video Playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
      }

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= endTime) {
            clearInterval(interval);
            setIsPlaying(false);
            videoRef.current.pause();
            return startTime;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      if (videoRef.current) videoRef.current.pause();
    }
    return () => clearInterval(interval);
  }, [isPlaying, startTime, endTime, currentTime]);

  // Handle Timeline Click
  const handleTimelineClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = Math.round(
      (clickX / rect.width) * (endTime - startTime) + startTime
    );
    setCurrentTime(newTime);
    if (videoRef.current) videoRef.current.currentTime = newTime;
  };
  const formatTime = (time) => {
    const h = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return h !== "00" ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 text-black">
        {/* sidebar */}

        <aside className="w-16 h-screen bg-white shadow-md flex flex-col items-center py-4">
          {/* Brand Logo */}
          <div className="mb-4 p-2">
            <div className="bg-gray-200 p-2 rounded-md">
              <span className="font-bold text-lg">
                <img src="/logo.png" alt="Logo" width="50" height="50" />
              </span>
            </div>
          </div>

          {/* Sidebar Items */}
          {[
            { name: "Brand Kit", icon: <SiBuildkite /> },
            { name: "Video", icon: <CiVideoOn />, active: true },
            { name: "Photo", icon: <IoIosPhotos /> },
            { name: "Text", icon: <CiText /> },
            { name: "Elements", icon: <SiElementary /> },
            { name: "Settings", icon: <CiSettings /> },
          ].map((item, index) => (
            <div
              key={index}
              className={`w-full flex flex-col items-center mb-4 cursor-pointer ${
                item.active ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  item.active ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </div>
          ))}
        </aside>
        <aside className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Media Controls</h2>

          <label className="block mb-2 text-sm">Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setDimensions(Number(e.target.value), height)}
            className="w-full p-2 bg-white border rounded"
          />

          <label className="block mt-4 mb-2 text-sm">Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setDimensions(width, Number(e.target.value))}
            className="w-full p-2 bg-white border rounded"
          />

          <label className="block mt-4 mb-2 text-sm">Start Time:</label>
          <input
            type="number"
            value={startTime}
            onChange={(e) => setTimeRange(Number(e.target.value), endTime)}
            className="w-full p-2 bg-white border rounded"
          />

          <label className="block mt-4 mb-2 text-sm">End Time:</label>
          <input
            type="number"
            value={endTime}
            onChange={(e) => setTimeRange(startTime, Number(e.target.value))}
            className="w-full p-2 bg-white border rounded"
          />

          <label className="block mt-4 mb-2 text-sm">Upload Media:</label>
          <input
            type="file"
            accept="image/*, video/*"
            className="w-full p-2 bg-white border rounded"
            onChange={handleUpload}
          />
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 flex flex-col justify-start items-center bg-gray-100 relative pt-0">
          {/* Top bar with Project Name, Description, and Buttons */}
          <div className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-lg">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                VideoDubber.ai
              </h2>
              <p className="text-sm text-gray-500">
                Create your awesome project with us!
              </p>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="relative w-[1000px] h-[600px] bg-gray-800 border rounded-2xl border-gray-400 shadow-lg mt-4">
            {loading ? (
              <p className="text-white text-center absolute inset-0 flex items-center justify-center">
                Uploading...
              </p>
            ) : media ? (
              <Rnd
                size={{ width, height }}
                position={{ x, y }}
                onDragStop={(e, d) => setPosition(d.x, d.y)}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setDimensions(
                    parseInt(ref.style.width),
                    parseInt(ref.style.height)
                  );
                  setPosition(position.x, position.y);
                }}
                bounds="parent"
                className="absolute border border-gray-400"
              >
                {media.includes("video") ? (
                  <video
                    ref={videoRef}
                    src={media}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={media}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                )}
              </Rnd>
            ) : (
              <p className="text-gray-300 text-center absolute inset-0 flex items-center justify-center">
                Upload a file to get started
              </p>
            )}
          </div>
        </main>

        {/* Timeline */}
      </div>
      <footer className="fixed bottom-0 left-16 w-[92rem] bg-gray-200 p-2 text-center pb-5">
        <div className="flex justify-between items-center">
          {/* Play & Pause Controls */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setIsPlaying(true)}
              className=" cursor-pointer"
            >
              <FaPlay size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(false)}
              className="cursor-pointer"
            >
              <FaPause size={18} />
            </button>
          </div>

          {/* Current Time Counter */}
          <div className="text-sm font-medium">
            {formatTime(currentTime)} / {formatTime(endTime)}
          </div>
        </div>

        {/* Timeline Bar */}
        <div
          ref={progressRef}
          className="relative bg-gray-400 h-3 rounded cursor-pointer mt-4"
          style={{ width: `${zoom * 100}%`, margin: "auto" }}
          onClick={handleTimelineClick}
        >
          {/* Progress */}
          <div
            className="bg-blue-500 h-3 absolute"
            style={{
              width: `${
                ((currentTime - startTime) / (endTime - startTime)) * 100
              }%`,
            }}
          />

          {/* Playhead */}
          <div
            className="absolute bg-white w-2 h-6 rounded"
            style={{
              left: `${
                ((currentTime - startTime) / (endTime - startTime)) * 100
              }%`,
              top: "-2px",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </footer>
    </>
  );
}
