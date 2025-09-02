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
export default function addPackageDependencies(deps: Record<string, string>, settings: Partial<TAddPackageDependenciesSettings>): any;
