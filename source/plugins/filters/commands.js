module.exports.filterCommands = async ({ client, category }) => {
  let cmds = client.commands.filter((cmd) => cmd.category == category);
  let results = await cmds.map((cmd) => cmd.name).join(" , ");

  return results;
};

module.exports.filterSlash = async ({ client, category }) => {
  let cmds = client.slash.filter((cmd) => cmd.category == category);
  let results = await cmds.map((cmd) => cmd.name).join(" , ");

  return results;
};
