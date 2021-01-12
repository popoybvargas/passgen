const fs = require('fs');

if (!fs.existsSync('./words.js'))
{
  const initialWordsArray = require('./node_modules/zv-passgen/words.js');
  fs.copyFileSync('./node_modules/zv-passgen/words.js', './words.js');
}

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

class pass
{
  constructor()
  {
    this.words = require('./words');
  };

  generate()
  {
    const randomIndex1 = randomIndex(this.words.length);
    let randomIndex2 = randomIndex(this.words.length);

    while (randomIndex2 === randomIndex1) randomIndex2 = randomIndex(this.words.length);

    return (addNumber(this.words[randomIndex1]) + '-' + capitalizeALetter(this.words[randomIndex2]));
  };

  deleteWord(word)
  {
    if (this.words.includes(word.toLowerCase()))
    {
      this.words.splice(this.words.indexOf(word.toLowerCase()), 1);
      fs.writeFileSync('./words.js', 'module.exports = ' + JSON.stringify(this.words));
      
      return `"${word}" has been removed from the dictionary`;
    }
    else
    {
      return `"${word}" not found in the dictionary (NOTHING TO DELETE)`;
    }
  };
}

module.exports = new pass();