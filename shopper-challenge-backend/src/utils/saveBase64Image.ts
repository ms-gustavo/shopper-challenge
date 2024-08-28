import fs from "fs";
import path from "path";

export const saveBase64Image = (
  base64Image: string,
  filePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filePath);
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.log("err ao criar diretório", err);
        return reject(err);
      }
      const imageBuffer = Buffer.from(base64Image, "base64");
      fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) {
          console.log("err ao escrever arquivo", err);
          return reject(err);
        }
        resolve();
      });
    });
  });
};
