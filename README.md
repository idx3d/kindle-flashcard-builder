#### Kindle Flashcard builder

This simple script allows you to transform your kindle vocabulary (which you can simply copy from /Volumes/Kindle/system/vocabulary/vocab.db) to Flashcards Hero acceptable format to import

**How it works:**

Actually Kindle Vocabulary Builder (on the device itsef) saves all of your unknown words alongside the usage from a book and it's stem.
Kindle Flashcard builder script reads SQLite database and populate words form vocabulary, skipping duplicates and use wordnet to retrieve definition from dictionary.
After all steps get completed it simply writes vocab-deck.tsv which can be imported by Flashcard Hero application (File - > Import from -> tsv or csv file).

This is JavaScript file which should be executed by node.js (tested on v7.3.0):
1. Copy your vocab.db to the Kindle Flashcard Builder folder.
2. `npm i` to install deps
3. `node app` to run
4. Import `vocab-deck.tsv` to your empty deck from Flashcard Hero app. 

Have a nice time with language learning using Kindle and flashcards.
Denys Lieu
