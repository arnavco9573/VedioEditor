# Video Editor Assignment

## Overview
This project is a simple video/photo editor where users can upload media, place it on a canvas, and manipulate its size and visibility based on a timer.

## Deployment Consideration
When deploying to **Vercel**, note that the maximum request payload size is **4.5 MB**. This means **videos larger than 4.5 MB cannot be uploaded**. To ensure functionality, only upload video files that are **4.5 MB or smaller**.

## Features
### Required Functionalities
1. **Add Media**: Users can upload a video or photo and place it on the canvas.
2. **Drag & Resize**: Users can move and resize the media on the canvas.
3. **Dynamic Width/Height**: Inputs in the left menu allow users to modify the width and height of the selected media.
4. **Start & End Time**: Users can define when the media appears and disappears using a start and end time. When the play button is pressed, a timer starts, and the media is visible only within the defined time range.

## Usage Instructions
1. Upload an image or video (ensure it is **less than 4.5 MB**).
2. Drag and resize it on the canvas.
3. Adjust width and height using the left menu.
4. Set the start and end time to control its visibility.
5. Press the **play button** to start the timer and see the effect.

## Known Limitations
- Due to **Vercel's request size limitation (4.5 MB)**, larger videos **will not upload**.
- Consider using **Cloudinary** for direct uploads to bypass this limitation.

## Tech Stack
- **Next.js (App Router)**
- **React & Zustand (State Management)**
- **Tailwind CSS (Styling)**
- **Cloudinary (Media Hosting)**


