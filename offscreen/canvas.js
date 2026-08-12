import { loadImage } from "./images.js";

export async function composeCapture({ frames, width, fullHeight, crop }) {
  if (!frames.length) throw new Error("NO_CAPTURE_FRAMES");
  const images = await Promise.all(frames.map(({ dataUrl }) => loadImage(dataUrl)));
  const scale = images[0].naturalWidth / width;
  const canvas = createCanvas(images[0].naturalWidth, Math.ceil(fullHeight * scale));
  drawFrames(canvas, images, frames, scale);
  return crop ? cropCanvas(canvas, crop, scale) : canvas;
}

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
  return canvas;
}

function drawFrames(canvas, images, frames, scale) {
  const context = canvas.getContext("2d");
  frames.forEach((frame, index) => drawFrame(context, images[index], frames, index, scale));
}

function drawFrame(context, image, frames, index, scale) {
  const destinationY = Math.round(frames[index].y * scale);
  if (index === 0) {
    context.drawImage(image, 0, destinationY);
    return;
  }
  const previousY = Math.round(frames[index - 1].y * scale);
  const advancedBy = Math.max(0, destinationY - previousY);
  const overlap = Math.max(0, image.naturalHeight - advancedBy);
  const freshHeight = image.naturalHeight - overlap;
  if (freshHeight <= 0) return;
  context.drawImage(
    image,
    0, overlap, image.naturalWidth, freshHeight,
    0, destinationY + overlap, image.naturalWidth, freshHeight
  );
}

function cropCanvas(source, crop, scale) {
  const x = Math.max(0, Math.round(crop.x * scale));
  const y = Math.max(0, Math.round(crop.y * scale));
  const width = Math.min(source.width - x, Math.max(1, Math.round(crop.width * scale)));
  const height = Math.min(source.height - y, Math.max(1, Math.round(crop.height * scale)));
  const output = createCanvas(width, height);
  output.getContext("2d").drawImage(source, x, y, width, height, 0, 0, width, height);
  return output;
}
