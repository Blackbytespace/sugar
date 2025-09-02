import childProcess from 'child_process';
import fs from 'fs';
import * as semver from 'semver';
import readJsonSync from '../fs/readJsonSync.js';
import writeJsonSync from '../fs/writeJsonSync.js';
import packageRootDir from './packageRootDir.js';

/**
 * @name                    addPackageDependencies
 * @namespace               node.package
 * @type                    Function
 * @platform                node
 * @status                  beta
 * @async
 *
 * This function allows you to add some dependencies to a package.json file
 *
 * @param       {Object}        deps                    The dependencies to add
 * @param       {TAddPackageDependenciesSettings}     [settings={}]       Some settings to configure your process
 * @return      {Promise<any>}                      A promise with the package.json content as object
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [dev=false]               Specify if you want to add the dependencies to the devDependencies
 * @setting     {Boolean}       [global=false]            Specify if you want to add the dependencies to the global package.json
 * @setting     {Boolean}       [install=false]           Specify if you want to install the dependencies after adding them
 * @setting     {Boolean}       [override=false]          Specify if you want to override the dependencies if they already exists
 *
 * @snippet         addPackageDependencies($1, $2)
 *
 * @example         js
 * import { addPackageDependencies } from '@blackbyte/sugar/package`;
 * addPackageDependencies('lodash');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TAddPackageDependenciesSettings = {
  cwd: string;
  dev: boolean;
  global: boolean;
  install: boolean;
  override: boolean;
};

export default function addPackageDependencies(
  deps: Record<string, string>,
  settings: Partial<TAddPackageDependenciesSettings>,
): any {
  settings = {
    cwd: process.cwd(),
    dev: false,
    global: false,
    install: false,
    ...(settings ?? {}),
  };

  return new Promise((resolve, reject) => {
    // get the package.json file path
    const packageJsonPath = `${packageRootDir(settings.cwd)}/package.json`;

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(
        `No package.json file found at "<yellow>${packageJsonPath}</yellow>"`,
      );
    }

    // read the current package.json file
    const packageJson = readJsonSync(packageJsonPath);

    const depProp = settings.dev
      ? 'devDependencies'
      : settings.global
      ? 'globalDependencies'
      : 'dependencies';

    // loop on the deps to add
    for (let [name, version] of Object.entries(deps)) {
      // make sure requested stack exists
      if (!packageJson[depProp]) {
        packageJson[depProp] = {};
      }

      // if the dependency des not exists, add it
      if (!packageJson[depProp][name]) {
        packageJson[depProp][name] = version;
        continue;
      }

      // if override
      if (settings.override) {
        packageJson[depProp][name] = version;
        continue;
      }

      const componentVersion = semver.minVersion(version),
        projectVersion = semver.coerce(packageJson[depProp][name]);

      // check if the dependency satifdy the semver range
      if (
        componentVersion &&
        projectVersion &&
        componentVersion.major < projectVersion.major
      ) {
        throw new Error(
          `The dependency "<yellow>${name}</yellow>"@<magenta>${version}</magenta> that you want to add already exists in the package.json and does not satisfy the version <magenta>${packageJson[depProp][name]}</magenta> required by the project...`,
        );
      }
    }

    // write the new package.json file
    writeJsonSync(packageJsonPath, packageJson);

    // check if we need to install the dependencies
    if (settings.install) {
      const res = childProcess.spawnSync('npm install', [], {
        cwd: packageRootDir(settings.cwd),
        shell: true,
      });
      if (res.stderr.toString() !== '') {
        throw new Error(res.stderr.toString());
      }
    }

    // resolve the promise with the new package.json content
    resolve(packageJson);
  });
}
