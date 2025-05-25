const fs = require('fs');
const { exec } = require('child_process');
const { transformToAngryError } = require('../utils/angryErrorTransformer');

exports.compileCode = (req, res) => {
  const userCode = req.body.code;

  // Save code to a temporary file (C example)
  fs.writeFileSync('temp.c', userCode);

  // Compile and run using GCC
  exec('gcc temp.c -o temp && ./temp', (error, stdout, stderr) => {
    if (error) {
      const angryMsg = transformToAngryError(stderr);
      return res.status(200).json({ success: false, output: angryMsg });
    }

    // Success — return actual output
    return res.status(200).json({ success: true, output: stdout });
  });
};
