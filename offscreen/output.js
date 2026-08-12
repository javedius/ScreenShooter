import { canvasToBlob } from "./images.js";
import { createImagePdf } from "./pdf.js";

export async function createOutputBlob(canvas, format) {
  if (format === "pdf") {
    const jpeg = await canvasToBlob(canvas, "image/jpeg", 0.94);
    return createImagePdf(jpeg, canvas.width, canvas.height);
  }
  return canvasToBlob(canvas, "image/png");
}
