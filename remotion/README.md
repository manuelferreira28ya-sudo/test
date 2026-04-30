# SailorPiece Wiki Walkthrough (Remotion)

This composition renders a 60-second (1800 frame @ 30fps) cinematic walkthrough.

## Setup

1. Add media files into `public/assets`:
   - `sailorpiece-home.jpg`
   - `sailorpiece-characters.jpg`
   - `sailorpiece-lore.jpg`
   - `sailorpiece-community.jpg`
   - `ambient-tech.mp3`
2. Install deps and run:
   - `npm install`
   - `npm run start`
3. Render:
   - `npm run build`

## One-command mobile share

Run this command locally:

- `npm run share`

It will:
1. install dependencies (if needed)
2. render `out/sailorpiece-walkthrough.mp4`
3. upload the MP4 to `transfer.sh`
4. print a public download URL you can open on your phone
