import { type TCommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonDataFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 * Common formats includes: json, xml, csv, sql, db, sqlite, log, txt, yaml, yml, ini, cfg, conf, properties, env, tsv, dat, dbf, mdb, accdb, xlsx, xls, ods, parquet, avro, jsonl, ndjson.
 * Extended formats includes: sav, dta, por, sas7bdat, xpt, rdata, rds, feather, hdf5, h5, nc, cdf, mat, pickle, pkl, msgpack, bson, cbor, protobuf, pb, arff, weka, libsvm, svmlight, tfrecord, lmdb, leveldb, rocksdb, bdb, gdbm, dbm, ndbm, qdbm, tc, tch, fdb, realm, sqlite3, db3, s3db, sl3, dump, backup, bak
 *
 * @param       {TCommonFileExtensionsSettings}           [settings={}]         Settings to customize the function behavior
 * @return      {Array<String>}                           The array of extensions
 *
 * @setting     {boolean}         [dot=false]         If true, the dot will be added to the extension
 * @setting     {Array<String>}   [exclude=[]]        An array of extensions to exclude
 * @setting     {boolean}         [extended=false]    If true, the extended formats will be included *
 *
 * @snippet         __commonDataFileExtensions()
 *
 * @example         js
 * import { __commonDataFileExtensions } from '@blackbyte/sugar/extension';
 * const extensions = __commonDataFileExtensions();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __commonDataFileExtensions(
  settings: Partial<TCommonFileExtensionsSettings> = {},
): string[] {
  const finalSettings: TCommonFileExtensionsSettings = {
    dot: false,
    exclude: [],
    extended: false,
    ...settings,
  };

  const commons = [
    'json',
    'xml',
    'csv',
    'sql',
    'db',
    'sqlite',
    'log',
    'txt',
    'yaml',
    'yml',
    'ini',
    'cfg',
    'conf',
    'properties',
    'env',
    'tsv',
    'dat',
    'dbf',
    'mdb',
    'accdb',
    'xlsx',
    'xls',
    'ods',
    'parquet',
    'avro',
    'jsonl',
    'ndjson',
  ];

  const extended = [
    'sav',
    'dta',
    'por',
    'sas7bdat',
    'xpt',
    'rdata',
    'rds',
    'feather',
    'hdf5',
    'h5',
    'nc',
    'cdf',
    'mat',
    'pickle',
    'pkl',
    'msgpack',
    'bson',
    'cbor',
    'protobuf',
    'pb',
    'arff',
    'weka',
    'libsvm',
    'svmlight',
    'tfrecord',
    'lmdb',
    'leveldb',
    'rocksdb',
    'bdb',
    'gdbm',
    'dbm',
    'ndbm',
    'qdbm',
    'tc',
    'tch',
    'fdb',
    'realm',
    'sqlite3',
    'db3',
    's3db',
    'sl3',
    'dump',
    'backup',
    'bak',
  ];

  return [...commons, ...(finalSettings.extended ? extended : [])]
    .filter((ext) => !finalSettings.exclude.includes(ext))
    .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
