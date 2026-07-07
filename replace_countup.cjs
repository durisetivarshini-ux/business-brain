const fs = require('fs');
const path = require('path');

const directory = 'C:/Users/varsh/business-brain/src';

const searchRegex = /import CountUp from 'react-countup';/g;
const replaceString = `import { SafeCountUp as CountUp } from '@/components/ui/SafeCountUp';`;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedFiles = 0;
walkDir(directory, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.includes("import CountUp from 'react-countup';")) {
      console.log(`Replacing in ${filePath}`);
      fileContent = fileContent.replace(searchRegex, replaceString);
      
      // Also need to adjust the import path to match relative distance if needed
      // Actually, since we're using '@' alias for 'src', it works perfectly everywhere!
      // But let's check if the project resolves '@'. 
      // In src/routes/index.jsx they use '@' so it does!
      
      fs.writeFileSync(filePath, fileContent, 'utf8');
      modifiedFiles++;
    }
  }
});

console.log(`Modified ${modifiedFiles} files.`);
