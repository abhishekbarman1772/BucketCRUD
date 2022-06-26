const { Storage } = require('megajs');
const fs = require('fs');
const { MEGA_EMAIL, MEGA_PASSWORD } = require('../../config/const');

const uploadMega = async ({ size, filename, path }) => {
  try {
    const storage = new Storage({
      email: MEGA_EMAIL,
      password: MEGA_PASSWORD,
      userAgent: 'ExampleClient/1.0',
    });
    await storage.ready;
    const file = await storage.upload({
      name: filename,
      size,
    }, fs.createReadStream(path)).complete;
    await storage.close();
    fs.unlinkSync(path);
    return file;
  } catch (error) {
    return error;
  }
};

const getFileURL = async (fileName) => {
  const storage = new Storage({
    email: MEGA_EMAIL,
    password: MEGA_PASSWORD,
    userAgent: 'ExampleClient/1.0',
  });
  await storage.ready;
  const file = storage.root.children.find((fileDetails) => fileDetails.name === fileName);
  const URL = await file.link({ __folderKey: false });
  await storage.close();
  return URL;
};
module.exports = {
  uploadMega,
  getFileURL,
};
