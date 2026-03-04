import fs from 'fs';
import __packageRootDir from '../../package/packageRootDir/packageRootDir.js';
function parseVersion(versionString) {
    // Remove common prefixes like ^ and ~
    const cleanVersion = versionString.replace(/^[\^~]/, '');
    // Handle complex versions like "1.2.3-beta.1" by taking only the numeric part
    const numericVersion = cleanVersion.split('-')[0];
    const parts = numericVersion.split('.');
    return {
        cleanVersion: numericVersion,
        major: parseInt(parts[0]) || 0,
        minor: parseInt(parts[1]) || 0,
        fix: parseInt(parts[2]) || 0,
    };
}
export default function detectProjectType(cwd = process.cwd()) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    let packageJson = {}, composerJson = {};
    // First try to use the exact cwd, then fall back to packageRootDir
    let searchDir = cwd;
    // If we have a package.json in the exact cwd, use it
    if (!fs.existsSync(`${cwd}/package.json`) && !fs.existsSync(`${cwd}/composer.json`)) {
        // No local files, try to find package root
        const foundPackageRootDir = __packageRootDir(cwd);
        if (foundPackageRootDir && foundPackageRootDir !== false) {
            searchDir = foundPackageRootDir;
        }
    }
    try {
        packageJson = JSON.parse(fs.readFileSync(`${searchDir}/package.json`, 'utf8').toString());
    }
    catch (e) { }
    try {
        composerJson = JSON.parse(fs.readFileSync(`${searchDir}/composer.json`, 'utf8').toString());
    }
    catch (e) { }
    // detecting the package type laravel
    if ((_a = composerJson.require) === null || _a === void 0 ? void 0 : _a['laravel/framework']) {
        const rawVersion = composerJson.require['laravel/framework'];
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'laravel',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    // detecting the package type next
    if (fs.existsSync(`${searchDir}/next.config.js`) ||
        fs.existsSync(`${searchDir}/next.config.mjs`) ||
        fs.existsSync(`${searchDir}/next.config.ts`)) {
        const rawVersion = (_b = packageJson.dependencies) === null || _b === void 0 ? void 0 : _b.next;
        if (!rawVersion) {
            // Check devDependencies as well
            const devVersion = (_c = packageJson.devDependencies) === null || _c === void 0 ? void 0 : _c.next;
            if (!devVersion) {
                throw new Error('Next.js config found but no next dependency in package.json');
            }
            const { cleanVersion, major, minor, fix } = parseVersion(devVersion);
            return {
                type: 'next',
                version: cleanVersion,
                rawVersion: devVersion,
                major,
                minor,
                fix,
            };
        }
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'next',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    // detecting the package type nuxt
    if (fs.existsSync(`${searchDir}/nuxt.config.js`) ||
        fs.existsSync(`${searchDir}/nuxt.config.mjs`) ||
        fs.existsSync(`${searchDir}/nuxt.config.ts`)) {
        const rawVersion = ((_d = packageJson.dependencies) === null || _d === void 0 ? void 0 : _d.nuxt) || ((_e = packageJson.devDependencies) === null || _e === void 0 ? void 0 : _e.nuxt);
        if (!rawVersion) {
            throw new Error('Nuxt.js config found but no nuxt dependency in package.json');
        }
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'nuxt',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    // detecting the package type svelte
    if (fs.existsSync(`${searchDir}/svelte.config.js`) ||
        fs.existsSync(`${searchDir}/svelte.config.mjs`) ||
        fs.existsSync(`${searchDir}/svelte.config.ts`)) {
        const rawVersion = ((_f = packageJson.dependencies) === null || _f === void 0 ? void 0 : _f['@sveltejs/kit']) || ((_g = packageJson.devDependencies) === null || _g === void 0 ? void 0 : _g['@sveltejs/kit']);
        if (!rawVersion) {
            throw new Error('SvelteKit config found but no @sveltejs/kit dependency in package.json');
        }
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'sveltekit',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    // detecting the package type astro
    if (fs.existsSync(`${searchDir}/astro.config.js`) ||
        fs.existsSync(`${searchDir}/astro.config.mjs`) ||
        fs.existsSync(`${searchDir}/astro.config.ts`)) {
        const rawVersion = ((_h = packageJson.dependencies) === null || _h === void 0 ? void 0 : _h.astro) || ((_j = packageJson.devDependencies) === null || _j === void 0 ? void 0 : _j.astro);
        if (!rawVersion) {
            throw new Error('Astro config found but no astro dependency in package.json');
        }
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'astro',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    // detecting the package type remix
    if (((_k = packageJson.dependencies) === null || _k === void 0 ? void 0 : _k['@remix-run/serve']) || ((_l = packageJson.devDependencies) === null || _l === void 0 ? void 0 : _l['@remix-run/serve'])) {
        const rawVersion = ((_m = packageJson.dependencies) === null || _m === void 0 ? void 0 : _m['@remix-run/serve']) || ((_o = packageJson.devDependencies) === null || _o === void 0 ? void 0 : _o['@remix-run/serve']);
        const { cleanVersion, major, minor, fix } = parseVersion(rawVersion);
        return {
            type: 'remix',
            version: cleanVersion,
            rawVersion,
            major,
            minor,
            fix,
        };
    }
    return {
        type: 'unknown',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
//# sourceMappingURL=detectProjectType.js.map