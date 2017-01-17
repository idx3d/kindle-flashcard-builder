let fs = require('fs')
let sqlite3 = require('sqlite3')
let wordnet = require('wordnet')

let db = new sqlite3.Database("./vocab.db")
let query = 'SELECT words.id, words.stem, lookups.word_key, lookups.usage FROM WORDS INNER JOIN LOOKUPS ON words.id = lookups.word_key;'
let vocabDeckWStream = fs.createWriteStream('./vocab-deck.tsv')

db.all(query, transformRecord)

function transformRecord(err, rows) {
    if (err) throw err;

    let uniqueWords = new Map()

    rows.forEach(function (row) {
        if (!uniqueWords.has(getNormalizedWord(row))) {
            uniqueWords.set(getNormalizedWord(row), row)
        }
    })

    uniqueWords.forEach(function (row) {
        wordnet.lookup(row.stem, function(err, definitions) {
            if (err) console.log(err)

            let accumulatedDefinitions = ''

            if (definitions) {
                definitions.forEach(function (definition) {
                    accumulatedDefinitions = `${accumulatedDefinitions} \n ${definition.glossary}`
                })
            }

            vocabDeckWStream.write(`${getNormalizedWord(row)} (${row.word_key.split(':')[1]})\t ${accumulatedDefinitions.replace(/\n/g, " ").replace(/"/g, "'")}  ####  ${row.usage.replace(/"/g, "'")}  #### \n`)
        })
    })
}


function getNormalizedWord(row) {
    return row.stem.toLowerCase()
}
