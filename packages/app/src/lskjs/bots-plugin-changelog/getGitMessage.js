import fs from 'fs';

export default (filename) => {
  if (!filename) throw '!filename';
  try {
    const raw = fs.readFileSync(filename).toString();
    const lines = raw.split('\n');
    const id = lines[0].split(' ')[1];
    const author = lines[1].split(': ')[1].split(' <')[0];
    const date = new Date(lines[2].split(': ')[1].trim());
    const message = lines.slice(4, lines.length - 1).join('\n');
    const isFlood = ['fix', 'quickfix', 'quick fix'].includes(message.trim()) || message.trim().substr(0, 3) === 'fix';
    const isNew = new Date() - 20 * 60 * 1000 < Date;

    return {
      raw,
      id,
      author,
      date,
      message,
      isFlood,
      isNew,
    };
  } catch (err) {
    console.error('getGitCommit', err);
    return null;
  }
};
