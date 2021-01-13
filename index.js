const path = require('path');
const fs = require('fs');

const APP_ROOT_WORDS_DB = path.join(__dirname, '../../words.js');

if (!fs.existsSync(APP_ROOT_WORDS_DB)) fs.copyFileSync(path.join(__dirname, 'words.js'), APP_ROOT_WORDS_DB);

const randomIndex = length => Math.floor(Math.random() * length);

const addNumber = word =>
{
  const lettersWithNumberReps = [ 'a', 'b', 'e', 'i', 'o', 's' ];
  const numberAlts = [ 9, 6, 3, 1, 0, 5 ];

  for (let i = 0; i < lettersWithNumberReps.length; i++)
  {
    if (word.includes(lettersWithNumberReps[i]))
    {
      return word.replace(lettersWithNumberReps[i], numberAlts[i]);
    }
  }

  return word;
};

const capitalizeALetter = word =>
{
  if (word.includes('l')) return word.replace('l', 'L');

  const index = randomIndex(word.length);
  
  return word.replace(word[index], word[index].toUpperCase());
};

module.exports = class
{
  static words = require(APP_ROOT_WORDS_DB);

  static generate()
  {
    const randomIndex1 = randomIndex(this.words.length);
    let randomIndex2 = randomIndex(this.words.length);

    while (randomIndex2 === randomIndex1) randomIndex2 = randomIndex(this.words.length);

    return (addNumber(this.words[randomIndex1]) + '-' + capitalizeALetter(this.words[randomIndex2]));
  };

  static deleteWord(word)
  {
    if (this.words.indexOf(word.trim().toLowerCase()) >= 0)
    {
      const updatedWordsArray = this.words.filter(w => w !== word);
      fs.writeFileSync(APP_ROOT_WORDS_DB, 'module.exports = ' + JSON.stringify(updatedWordsArray));
      this.words = updatedWordsArray;
      
      return `"${word}" has been deleted.`;
    }

    return `"${word}" NOT found in the dictionary. nothing to delete.`;
  };
};