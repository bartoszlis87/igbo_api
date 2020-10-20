import fs from 'fs';
import shell from 'shelljs';
import { flatten } from 'lodash';
import {
  DICTIONARIES_DIR,
  BUILD_DICTIONARIES_DIR,
} from '../shared/constants/parseFileLocations';
import dictionary from './ig-en/ig-en_expanded.json';

const updateJSONDictionary = () => {
  if (!fs.existsSync(DICTIONARIES_DIR)) {
    shell.mkdir('-p', DICTIONARIES_DIR);
  }

  if (process.env.NODE_ENV !== 'test' && !fs.existsSync(BUILD_DICTIONARIES_DIR)) {
    shell.mkdir('-p', BUILD_DICTIONARIES_DIR);
  }

  const dictionaryFilePaths = [
    [`${DICTIONARIES_DIR}/ig-en_1000_common.json`, JSON.stringify(dictionary, null, 4)],
    [`${DICTIONARIES_DIR}/ig-en_expanded.json`, JSON.stringify(dictionary, null, 4)],
    [`${DICTIONARIES_DIR}/ig-en_new_expanded.json`, JSON.stringify(dictionary, null, 4)],
    [`${DICTIONARIES_DIR}/ig-en_normalized_expanded.json`, JSON.stringify(dictionary, null, 4)],
    [`${DICTIONARIES_DIR}/ig-en.json`, JSON.stringify(dictionary)],
  ];

  const buildDictionaryFilePaths = process.env.NODE_ENV === 'build'
    ? [
      [`${BUILD_DICTIONARIES_DIR}/ig-en_1000_common.json`, JSON.stringify(dictionary, null, 4)],
      [`${BUILD_DICTIONARIES_DIR}/ig-en_expanded.json`, JSON.stringify(dictionary, null, 4)],
      [`${BUILD_DICTIONARIES_DIR}/ig-en_new_expanded.json`, JSON.stringify(dictionary, null, 4)],
      [`${BUILD_DICTIONARIES_DIR}/ig-en_normalized_expanded.json`, JSON.stringify(dictionary, null, 4)],
      [`${BUILD_DICTIONARIES_DIR}/ig-en.json`, JSON.stringify(dictionary)],
    ] : [];

  flatten([dictionaryFilePaths, buildDictionaryFilePaths]).forEach((config) => {
    fs.writeFileSync(...config, () => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`${config[0]} has been updated`);
      }
    });
  });
};

updateJSONDictionary();
