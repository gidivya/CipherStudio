const { exec, spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TEMP_DIR = path.join(__dirname, '../../temp');

// Ensure temp directory exists
const ensureTempDir = async () => {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating temp directory:', error);
  }
};

// Clean up temp files
const cleanup = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

// Execute code
const executeCode = async (code, language, input = '') => {
  await ensureTempDir();
  const filename = uuidv4();
  
  let command;
  let filePath;
  let ext;

  switch (language.toLowerCase()) {
    case 'python':
    case 'py':
      ext = 'py';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      command = `python3 "${filePath}"`;
      break;

    case 'cpp':
    case 'c++':
      ext = 'cpp';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      const outputPath = path.join(TEMP_DIR, filename);
      command = `g++ -o "${outputPath}" "${filePath}" && echo "${input}" | "${outputPath}"`;
      break;

    case 'c':
      ext = 'c';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      const outputPathC = path.join(TEMP_DIR, filename);
      command = `gcc -o "${outputPathC}" "${filePath}" && echo "${input}" | "${outputPathC}"`;
      break;

    case 'java':
      ext = 'java';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      // Extract class name from code
      const classNameMatch = code.match(/public class (\w+)/);
      const className = classNameMatch ? classNameMatch[1] : filename;
      const javaFilePath = path.join(TEMP_DIR, `${className}.java`);
      await fs.writeFile(javaFilePath, code);
      command = `cd "${TEMP_DIR}" && javac ${className}.java && echo "${input}" | java ${className}`;
      break;

    case 'javascript':
    case 'js':
      ext = 'js';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      command = `node "${filePath}"`;
      break;

    default:
      throw new Error(`Unsupported language: ${language}`);
  }

  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    exec(command, { timeout: 10000, maxBuffer: 1024 * 1024 * 10 }, async (error, stdout, stderr) => {
      const executionTime = Date.now() - startTime;
      
      // Cleanup temp files
      try {
        if (filePath) await cleanup(filePath);
        if (language === 'cpp' || language === 'c++' || language === 'c') {
          const exePath = path.join(TEMP_DIR, filename);
          await cleanup(exePath);
        }
        if (language === 'java') {
          const classFile = path.join(TEMP_DIR, filename + '.class');
          await cleanup(classFile);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }

      if (error) {
        resolve({
          status: 'error',
          output: '',
          error: stderr || error.message,
          executionTime
        });
        return;
      }

      resolve({
        status: 'success',
        output: stdout,
        error: '',
        executionTime
      });
    });
  });
};

// Compile code (compile only, don't execute)
const compileCode = async (code, language) => {
  await ensureTempDir();
  const filename = uuidv4();
  let filePath, ext;

  switch (language.toLowerCase()) {
    case 'cpp':
    case 'c++':
      ext = 'cpp';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      const outputPath = path.join(TEMP_DIR, filename);
      const command = `g++ -o "${outputPath}" "${filePath}"`;
      
      return new Promise((resolve) => {
        exec(command, { timeout: 10000 }, async (error, stdout, stderr) => {
          try {
            await cleanup(filePath);
            const exePath = path.join(TEMP_DIR, filename);
            await cleanup(exePath);
          } catch {}
          
          if (error) {
            resolve({
              status: 'error',
              error: stderr || error.message
            });
            return;
          }
          resolve({ status: 'success', message: 'Compilation successful' });
        });
      });

    case 'java':
      ext = 'java';
      filePath = path.join(TEMP_DIR, `${filename}.${ext}`);
      await fs.writeFile(filePath, code);
      
      return new Promise((resolve) => {
        exec(`javac "${filePath}"`, { timeout: 10000 }, async (error, stdout, stderr) => {
          try {
            await cleanup(filePath);
            const classFile = path.join(TEMP_DIR, filename + '.class');
            await cleanup(classFile);
          } catch {}
          
          if (error) {
            resolve({
              status: 'error',
              error: stderr || error.message
            });
            return;
          }
          resolve({ status: 'success', message: 'Compilation successful' });
        });
      });

    default:
      return {
        status: 'success',
        message: 'No compilation needed for interpreted languages'
      };
  }
};

module.exports = {
  executeCode,
  compileCode
};

