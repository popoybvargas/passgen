# zv-passgen
Generate password that is super strong enough but still easy to memorize.

### Basic Usage
```
const pass = require('zv-passgen');

const superStrongPassword = pass.generate();
```
at the initial call of the package, a `words.js` file is copied to your project folder's root directory.

generated password is composed of two (2) random english words (which makes it still easy to memorize them) mixed with a numeric, special (i.e. "-"), and uppercase characters.

if any of the 2 random words generated are too unfamiliar (or may not even be found in regular english dictionaries), you may choose to delete it by calling:
```
pass.deleteWord(<word-to-delete>);
```
from any of your test scripts.