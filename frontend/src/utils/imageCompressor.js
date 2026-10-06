/**
 * Compresses an image file client-side using HTML5 canvas.
 * @param {File} file - The image file to compress.
 * @param {number} maxWidth - Maximum width in pixels (default 1200).
 * @param {number} maxHeight - Maximum height in pixels (default 1200).
 * @param {number} quality - JPEG compression quality 0.0 - 1.0 (default 0.75).
 * @returns {Promise<string>} Resolves to a base64 Data URL string.
 */
export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      return reject(new Error("Neplatný formát súboru. Vyberte obrázok."));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Chyba pri čítaní súboru."));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Chyba pri načítaní obrázka."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Nepodarilo sa vytvoriť canvas kontext."));
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};
