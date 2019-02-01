/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-02-01T15:56:39+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  readFile,
  exists,
  readdir,
  removeSync,
} from 'fs-extra'
import program from 'commander'

import packageJson from '../package.json'

program
  .version(packageJson.version)
  .description('Remove files except ignored.')
  .option('-d, --delete', 'delete files, otherwise only prints matching files')
  .action(async (options) => {
    if (!await exists('./.rmignore')) {
      console.error('.rmignore doesn\'t exist in current folder, aborting... ')
      process.exit(-1)
    }

    var ignoreList = (await readFile('./.rmignore'))
      .toString()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)

    ignoreList = ignoreList.concat([
      '.rmignore',
    ])

    console.log('Ignored files:', ignoreList)
    const fileNameList = await readdir('./')
    fileNameList.forEach(fileName => {
      if (ignoreList.indexOf(fileName) === -1) {
        console.log(`${options.delete ? 'removing ' : ''}${fileName}`)
        options.delete && removeSync(fileName)
      }
    })
  })

program.parse(process.argv)
