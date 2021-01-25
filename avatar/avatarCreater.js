const Avatar = require("avatar-builder");

const { promises: fs } = require("fs");
const path = require("path");

async function avatarCreate() {
  const avatar = Avatar.squareBuilder(128);

  const avatarIcon = await avatar.create("gabriel");

  const avatarName = `${Date.now()}.png`;

  const avatarPath = path.join("tmp", avatarName);
  const finalPath = path.join("public", "images", avatarName);

  await fs.writeFile(avatarPath, avatarIcon);

  await fs.copyFile(avatarPath, finalPath);

  await fs.unlink(avatarPath);

  return avatarName;
}

module.exports = { avatarCreate };
