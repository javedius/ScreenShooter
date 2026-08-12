export async function createImagePdf(jpegBlob, width, height) {
  const encoder = new TextEncoder();
  const image = new Uint8Array(await jpegBlob.arrayBuffer());
  const scale = Math.min(1, 14400 / width, 14400 / height);
  const pageWidth = round(width * scale);
  const pageHeight = round(height * scale);
  const content = encoder.encode(`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`);
  const writer = createPdfWriter(encoder);

  writer.push("%PDF-1.4\n%ScreenShooter\n");
  writer.object(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  writer.object(2, ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"]);
  writer.object(3, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`]);
  writer.object(4, [`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`, image, "\nendstream"]);
  writer.object(5, [`<< /Length ${content.length} >>\nstream\n`, content, "endstream"]);
  return writer.finish();
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function createPdfWriter(encoder) {
  const parts = [];
  const offsets = [0];
  let length = 0;
  const push = (value) => {
    const bytes = typeof value === "string" ? encoder.encode(value) : value;
    parts.push(bytes);
    length += bytes.length;
  };
  const object = (number, bodyParts) => {
    offsets[number] = length;
    push(`${number} 0 obj\n`);
    bodyParts.forEach(push);
    push("\nendobj\n");
  };
  const finish = () => {
    const xrefOffset = length;
    push("xref\n0 6\n0000000000 65535 f \n");
    for (let index = 1; index <= 5; index += 1) push(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
    push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
    return new Blob(parts, { type: "application/pdf" });
  };
  return { push, object, finish };
}
