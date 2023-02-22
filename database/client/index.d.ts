
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export interface PrismaPromise<A> extends Promise<A> {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Nature
 * 
 */
export type Nature = {
  id: number
  name: string
}

/**
 * Model Machine
 * 
 */
export type Machine = {
  id: number
  tag: string
  ute: string
  technology: string
}

/**
 * Model Worker
 * 
 */
export type Worker = {
  id: number
  registration: number
  name: string
  class: string
}

/**
 * Model PreventiveActionTaken
 * 
 */
export type PreventiveActionTaken = {
  id: number
  date: Date
  osId: number
  actionId: number
  weekCode: string
}

/**
 * Model PreventiveAction
 * 
 */
export type PreventiveAction = {
  id: number
  description: string
  machineId: number
  excution: string
  frequency: number
  nextExecution: string
  preventiveOSId: number | null
  natureId: number
  ignore: boolean
}

/**
 * Model PreventiveOS
 * 
 */
export type PreventiveOS = {
  id: number
  machineId: number
  weekCode: string
  date: Date | null
  natureId: number
  actionsUniqueKey: string
  duration: number | null
  concluded: boolean | null
  startTime: Date | null
  finishTime: Date | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Natures
 * const natures = await prisma.nature.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Natures
   * const natures = await prisma.nature.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.nature`: Exposes CRUD operations for the **Nature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Natures
    * const natures = await prisma.nature.findMany()
    * ```
    */
  get nature(): Prisma.NatureDelegate<GlobalReject>;

  /**
   * `prisma.machine`: Exposes CRUD operations for the **Machine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Machines
    * const machines = await prisma.machine.findMany()
    * ```
    */
  get machine(): Prisma.MachineDelegate<GlobalReject>;

  /**
   * `prisma.worker`: Exposes CRUD operations for the **Worker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workers
    * const workers = await prisma.worker.findMany()
    * ```
    */
  get worker(): Prisma.WorkerDelegate<GlobalReject>;

  /**
   * `prisma.preventiveActionTaken`: Exposes CRUD operations for the **PreventiveActionTaken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventiveActionTakens
    * const preventiveActionTakens = await prisma.preventiveActionTaken.findMany()
    * ```
    */
  get preventiveActionTaken(): Prisma.PreventiveActionTakenDelegate<GlobalReject>;

  /**
   * `prisma.preventiveAction`: Exposes CRUD operations for the **PreventiveAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventiveActions
    * const preventiveActions = await prisma.preventiveAction.findMany()
    * ```
    */
  get preventiveAction(): Prisma.PreventiveActionDelegate<GlobalReject>;

  /**
   * `prisma.preventiveOS`: Exposes CRUD operations for the **PreventiveOS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventiveOS
    * const preventiveOS = await prisma.preventiveOS.findMany()
    * ```
    */
  get preventiveOS(): Prisma.PreventiveOSDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.9.0
   * Query Engine version: ceb5c99003b99c9ee2c1d2e618e359c14aef2ea5
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Nature: 'Nature',
    Machine: 'Machine',
    Worker: 'Worker',
    PreventiveActionTaken: 'PreventiveActionTaken',
    PreventiveAction: 'PreventiveAction',
    PreventiveOS: 'PreventiveOS'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type NatureCountOutputType
   */


  export type NatureCountOutputType = {
    PreventiveOS: number
    PreventiveAction: number
  }

  export type NatureCountOutputTypeSelect = {
    PreventiveOS?: boolean
    PreventiveAction?: boolean
  }

  export type NatureCountOutputTypeGetPayload<S extends boolean | null | undefined | NatureCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? NatureCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (NatureCountOutputTypeArgs)
    ? NatureCountOutputType 
    : S extends { select: any } & (NatureCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof NatureCountOutputType ? NatureCountOutputType[P] : never
  } 
      : NatureCountOutputType




  // Custom InputTypes

  /**
   * NatureCountOutputType without action
   */
  export type NatureCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the NatureCountOutputType
     */
    select?: NatureCountOutputTypeSelect | null
  }



  /**
   * Count Type MachineCountOutputType
   */


  export type MachineCountOutputType = {
    PreventiveOS: number
    PreventiveAction: number
  }

  export type MachineCountOutputTypeSelect = {
    PreventiveOS?: boolean
    PreventiveAction?: boolean
  }

  export type MachineCountOutputTypeGetPayload<S extends boolean | null | undefined | MachineCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MachineCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (MachineCountOutputTypeArgs)
    ? MachineCountOutputType 
    : S extends { select: any } & (MachineCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof MachineCountOutputType ? MachineCountOutputType[P] : never
  } 
      : MachineCountOutputType




  // Custom InputTypes

  /**
   * MachineCountOutputType without action
   */
  export type MachineCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the MachineCountOutputType
     */
    select?: MachineCountOutputTypeSelect | null
  }



  /**
   * Count Type WorkerCountOutputType
   */


  export type WorkerCountOutputType = {
    PreventiveOs: number
  }

  export type WorkerCountOutputTypeSelect = {
    PreventiveOs?: boolean
  }

  export type WorkerCountOutputTypeGetPayload<S extends boolean | null | undefined | WorkerCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? WorkerCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (WorkerCountOutputTypeArgs)
    ? WorkerCountOutputType 
    : S extends { select: any } & (WorkerCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof WorkerCountOutputType ? WorkerCountOutputType[P] : never
  } 
      : WorkerCountOutputType




  // Custom InputTypes

  /**
   * WorkerCountOutputType without action
   */
  export type WorkerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WorkerCountOutputType
     */
    select?: WorkerCountOutputTypeSelect | null
  }



  /**
   * Count Type PreventiveActionCountOutputType
   */


  export type PreventiveActionCountOutputType = {
    actionsTaken: number
  }

  export type PreventiveActionCountOutputTypeSelect = {
    actionsTaken?: boolean
  }

  export type PreventiveActionCountOutputTypeGetPayload<S extends boolean | null | undefined | PreventiveActionCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PreventiveActionCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (PreventiveActionCountOutputTypeArgs)
    ? PreventiveActionCountOutputType 
    : S extends { select: any } & (PreventiveActionCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PreventiveActionCountOutputType ? PreventiveActionCountOutputType[P] : never
  } 
      : PreventiveActionCountOutputType




  // Custom InputTypes

  /**
   * PreventiveActionCountOutputType without action
   */
  export type PreventiveActionCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionCountOutputType
     */
    select?: PreventiveActionCountOutputTypeSelect | null
  }



  /**
   * Count Type PreventiveOSCountOutputType
   */


  export type PreventiveOSCountOutputType = {
    actions: number
    responsible: number
    actionsTaken: number
  }

  export type PreventiveOSCountOutputTypeSelect = {
    actions?: boolean
    responsible?: boolean
    actionsTaken?: boolean
  }

  export type PreventiveOSCountOutputTypeGetPayload<S extends boolean | null | undefined | PreventiveOSCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PreventiveOSCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (PreventiveOSCountOutputTypeArgs)
    ? PreventiveOSCountOutputType 
    : S extends { select: any } & (PreventiveOSCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PreventiveOSCountOutputType ? PreventiveOSCountOutputType[P] : never
  } 
      : PreventiveOSCountOutputType




  // Custom InputTypes

  /**
   * PreventiveOSCountOutputType without action
   */
  export type PreventiveOSCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOSCountOutputType
     */
    select?: PreventiveOSCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Nature
   */


  export type AggregateNature = {
    _count: NatureCountAggregateOutputType | null
    _avg: NatureAvgAggregateOutputType | null
    _sum: NatureSumAggregateOutputType | null
    _min: NatureMinAggregateOutputType | null
    _max: NatureMaxAggregateOutputType | null
  }

  export type NatureAvgAggregateOutputType = {
    id: number | null
  }

  export type NatureSumAggregateOutputType = {
    id: number | null
  }

  export type NatureMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type NatureMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type NatureCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type NatureAvgAggregateInputType = {
    id?: true
  }

  export type NatureSumAggregateInputType = {
    id?: true
  }

  export type NatureMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type NatureMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type NatureCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type NatureAggregateArgs = {
    /**
     * Filter which Nature to aggregate.
     */
    where?: NatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Natures to fetch.
     */
    orderBy?: Enumerable<NatureOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Natures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Natures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Natures
    **/
    _count?: true | NatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NatureMaxAggregateInputType
  }

  export type GetNatureAggregateType<T extends NatureAggregateArgs> = {
        [P in keyof T & keyof AggregateNature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNature[P]>
      : GetScalarType<T[P], AggregateNature[P]>
  }




  export type NatureGroupByArgs = {
    where?: NatureWhereInput
    orderBy?: Enumerable<NatureOrderByWithAggregationInput>
    by: NatureScalarFieldEnum[]
    having?: NatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NatureCountAggregateInputType | true
    _avg?: NatureAvgAggregateInputType
    _sum?: NatureSumAggregateInputType
    _min?: NatureMinAggregateInputType
    _max?: NatureMaxAggregateInputType
  }


  export type NatureGroupByOutputType = {
    id: number
    name: string
    _count: NatureCountAggregateOutputType | null
    _avg: NatureAvgAggregateOutputType | null
    _sum: NatureSumAggregateOutputType | null
    _min: NatureMinAggregateOutputType | null
    _max: NatureMaxAggregateOutputType | null
  }

  type GetNatureGroupByPayload<T extends NatureGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NatureGroupByOutputType[P]>
            : GetScalarType<T[P], NatureGroupByOutputType[P]>
        }
      >
    >


  export type NatureSelect = {
    id?: boolean
    name?: boolean
    PreventiveOS?: boolean | Nature$PreventiveOSArgs
    PreventiveAction?: boolean | Nature$PreventiveActionArgs
    _count?: boolean | NatureCountOutputTypeArgs
  }


  export type NatureInclude = {
    PreventiveOS?: boolean | Nature$PreventiveOSArgs
    PreventiveAction?: boolean | Nature$PreventiveActionArgs
    _count?: boolean | NatureCountOutputTypeArgs
  }

  export type NatureGetPayload<S extends boolean | null | undefined | NatureArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Nature :
    S extends undefined ? never :
    S extends { include: any } & (NatureArgs | NatureFindManyArgs)
    ? Nature  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'PreventiveOS' ? Array < PreventiveOSGetPayload<S['include'][P]>>  :
        P extends 'PreventiveAction' ? Array < PreventiveActionGetPayload<S['include'][P]>>  :
        P extends '_count' ? NatureCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (NatureArgs | NatureFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'PreventiveOS' ? Array < PreventiveOSGetPayload<S['select'][P]>>  :
        P extends 'PreventiveAction' ? Array < PreventiveActionGetPayload<S['select'][P]>>  :
        P extends '_count' ? NatureCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Nature ? Nature[P] : never
  } 
      : Nature


  type NatureCountArgs = 
    Omit<NatureFindManyArgs, 'select' | 'include'> & {
      select?: NatureCountAggregateInputType | true
    }

  export interface NatureDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Nature that matches the filter.
     * @param {NatureFindUniqueArgs} args - Arguments to find a Nature
     * @example
     * // Get one Nature
     * const nature = await prisma.nature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NatureFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NatureFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Nature'> extends True ? Prisma__NatureClient<NatureGetPayload<T>> : Prisma__NatureClient<NatureGetPayload<T> | null, null>

    /**
     * Find one Nature that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {NatureFindUniqueOrThrowArgs} args - Arguments to find a Nature
     * @example
     * // Get one Nature
     * const nature = await prisma.nature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NatureFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NatureFindUniqueOrThrowArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Find the first Nature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureFindFirstArgs} args - Arguments to find a Nature
     * @example
     * // Get one Nature
     * const nature = await prisma.nature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NatureFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NatureFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Nature'> extends True ? Prisma__NatureClient<NatureGetPayload<T>> : Prisma__NatureClient<NatureGetPayload<T> | null, null>

    /**
     * Find the first Nature that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureFindFirstOrThrowArgs} args - Arguments to find a Nature
     * @example
     * // Get one Nature
     * const nature = await prisma.nature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NatureFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NatureFindFirstOrThrowArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Find zero or more Natures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Natures
     * const natures = await prisma.nature.findMany()
     * 
     * // Get first 10 Natures
     * const natures = await prisma.nature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const natureWithIdOnly = await prisma.nature.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NatureFindManyArgs>(
      args?: SelectSubset<T, NatureFindManyArgs>
    ): PrismaPromise<Array<NatureGetPayload<T>>>

    /**
     * Create a Nature.
     * @param {NatureCreateArgs} args - Arguments to create a Nature.
     * @example
     * // Create one Nature
     * const Nature = await prisma.nature.create({
     *   data: {
     *     // ... data to create a Nature
     *   }
     * })
     * 
    **/
    create<T extends NatureCreateArgs>(
      args: SelectSubset<T, NatureCreateArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Delete a Nature.
     * @param {NatureDeleteArgs} args - Arguments to delete one Nature.
     * @example
     * // Delete one Nature
     * const Nature = await prisma.nature.delete({
     *   where: {
     *     // ... filter to delete one Nature
     *   }
     * })
     * 
    **/
    delete<T extends NatureDeleteArgs>(
      args: SelectSubset<T, NatureDeleteArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Update one Nature.
     * @param {NatureUpdateArgs} args - Arguments to update one Nature.
     * @example
     * // Update one Nature
     * const nature = await prisma.nature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NatureUpdateArgs>(
      args: SelectSubset<T, NatureUpdateArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Delete zero or more Natures.
     * @param {NatureDeleteManyArgs} args - Arguments to filter Natures to delete.
     * @example
     * // Delete a few Natures
     * const { count } = await prisma.nature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NatureDeleteManyArgs>(
      args?: SelectSubset<T, NatureDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Natures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Natures
     * const nature = await prisma.nature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NatureUpdateManyArgs>(
      args: SelectSubset<T, NatureUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Nature.
     * @param {NatureUpsertArgs} args - Arguments to update or create a Nature.
     * @example
     * // Update or create a Nature
     * const nature = await prisma.nature.upsert({
     *   create: {
     *     // ... data to create a Nature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nature we want to update
     *   }
     * })
    **/
    upsert<T extends NatureUpsertArgs>(
      args: SelectSubset<T, NatureUpsertArgs>
    ): Prisma__NatureClient<NatureGetPayload<T>>

    /**
     * Count the number of Natures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureCountArgs} args - Arguments to filter Natures to count.
     * @example
     * // Count the number of Natures
     * const count = await prisma.nature.count({
     *   where: {
     *     // ... the filter for the Natures we want to count
     *   }
     * })
    **/
    count<T extends NatureCountArgs>(
      args?: Subset<T, NatureCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NatureAggregateArgs>(args: Subset<T, NatureAggregateArgs>): PrismaPromise<GetNatureAggregateType<T>>

    /**
     * Group by Nature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NatureGroupByArgs['orderBy'] }
        : { orderBy?: NatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNatureGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Nature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NatureClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    PreventiveOS<T extends Nature$PreventiveOSArgs= {}>(args?: Subset<T, Nature$PreventiveOSArgs>): PrismaPromise<Array<PreventiveOSGetPayload<T>>| Null>;

    PreventiveAction<T extends Nature$PreventiveActionArgs= {}>(args?: Subset<T, Nature$PreventiveActionArgs>): PrismaPromise<Array<PreventiveActionGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Nature base type for findUnique actions
   */
  export type NatureFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter, which Nature to fetch.
     */
    where: NatureWhereUniqueInput
  }

  /**
   * Nature findUnique
   */
  export interface NatureFindUniqueArgs extends NatureFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Nature findUniqueOrThrow
   */
  export type NatureFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter, which Nature to fetch.
     */
    where: NatureWhereUniqueInput
  }


  /**
   * Nature base type for findFirst actions
   */
  export type NatureFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter, which Nature to fetch.
     */
    where?: NatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Natures to fetch.
     */
    orderBy?: Enumerable<NatureOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Natures.
     */
    cursor?: NatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Natures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Natures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Natures.
     */
    distinct?: Enumerable<NatureScalarFieldEnum>
  }

  /**
   * Nature findFirst
   */
  export interface NatureFindFirstArgs extends NatureFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Nature findFirstOrThrow
   */
  export type NatureFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter, which Nature to fetch.
     */
    where?: NatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Natures to fetch.
     */
    orderBy?: Enumerable<NatureOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Natures.
     */
    cursor?: NatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Natures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Natures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Natures.
     */
    distinct?: Enumerable<NatureScalarFieldEnum>
  }


  /**
   * Nature findMany
   */
  export type NatureFindManyArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter, which Natures to fetch.
     */
    where?: NatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Natures to fetch.
     */
    orderBy?: Enumerable<NatureOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Natures.
     */
    cursor?: NatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Natures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Natures.
     */
    skip?: number
    distinct?: Enumerable<NatureScalarFieldEnum>
  }


  /**
   * Nature create
   */
  export type NatureCreateArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * The data needed to create a Nature.
     */
    data: XOR<NatureCreateInput, NatureUncheckedCreateInput>
  }


  /**
   * Nature update
   */
  export type NatureUpdateArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * The data needed to update a Nature.
     */
    data: XOR<NatureUpdateInput, NatureUncheckedUpdateInput>
    /**
     * Choose, which Nature to update.
     */
    where: NatureWhereUniqueInput
  }


  /**
   * Nature updateMany
   */
  export type NatureUpdateManyArgs = {
    /**
     * The data used to update Natures.
     */
    data: XOR<NatureUpdateManyMutationInput, NatureUncheckedUpdateManyInput>
    /**
     * Filter which Natures to update
     */
    where?: NatureWhereInput
  }


  /**
   * Nature upsert
   */
  export type NatureUpsertArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * The filter to search for the Nature to update in case it exists.
     */
    where: NatureWhereUniqueInput
    /**
     * In case the Nature found by the `where` argument doesn't exist, create a new Nature with this data.
     */
    create: XOR<NatureCreateInput, NatureUncheckedCreateInput>
    /**
     * In case the Nature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NatureUpdateInput, NatureUncheckedUpdateInput>
  }


  /**
   * Nature delete
   */
  export type NatureDeleteArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
    /**
     * Filter which Nature to delete.
     */
    where: NatureWhereUniqueInput
  }


  /**
   * Nature deleteMany
   */
  export type NatureDeleteManyArgs = {
    /**
     * Filter which Natures to delete
     */
    where?: NatureWhereInput
  }


  /**
   * Nature.PreventiveOS
   */
  export type Nature$PreventiveOSArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    where?: PreventiveOSWhereInput
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    cursor?: PreventiveOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }


  /**
   * Nature.PreventiveAction
   */
  export type Nature$PreventiveActionArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    where?: PreventiveActionWhereInput
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    cursor?: PreventiveActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }


  /**
   * Nature without action
   */
  export type NatureArgs = {
    /**
     * Select specific fields to fetch from the Nature
     */
    select?: NatureSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NatureInclude | null
  }



  /**
   * Model Machine
   */


  export type AggregateMachine = {
    _count: MachineCountAggregateOutputType | null
    _avg: MachineAvgAggregateOutputType | null
    _sum: MachineSumAggregateOutputType | null
    _min: MachineMinAggregateOutputType | null
    _max: MachineMaxAggregateOutputType | null
  }

  export type MachineAvgAggregateOutputType = {
    id: number | null
  }

  export type MachineSumAggregateOutputType = {
    id: number | null
  }

  export type MachineMinAggregateOutputType = {
    id: number | null
    tag: string | null
    ute: string | null
    technology: string | null
  }

  export type MachineMaxAggregateOutputType = {
    id: number | null
    tag: string | null
    ute: string | null
    technology: string | null
  }

  export type MachineCountAggregateOutputType = {
    id: number
    tag: number
    ute: number
    technology: number
    _all: number
  }


  export type MachineAvgAggregateInputType = {
    id?: true
  }

  export type MachineSumAggregateInputType = {
    id?: true
  }

  export type MachineMinAggregateInputType = {
    id?: true
    tag?: true
    ute?: true
    technology?: true
  }

  export type MachineMaxAggregateInputType = {
    id?: true
    tag?: true
    ute?: true
    technology?: true
  }

  export type MachineCountAggregateInputType = {
    id?: true
    tag?: true
    ute?: true
    technology?: true
    _all?: true
  }

  export type MachineAggregateArgs = {
    /**
     * Filter which Machine to aggregate.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: Enumerable<MachineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Machines
    **/
    _count?: true | MachineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MachineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MachineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MachineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MachineMaxAggregateInputType
  }

  export type GetMachineAggregateType<T extends MachineAggregateArgs> = {
        [P in keyof T & keyof AggregateMachine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMachine[P]>
      : GetScalarType<T[P], AggregateMachine[P]>
  }




  export type MachineGroupByArgs = {
    where?: MachineWhereInput
    orderBy?: Enumerable<MachineOrderByWithAggregationInput>
    by: MachineScalarFieldEnum[]
    having?: MachineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MachineCountAggregateInputType | true
    _avg?: MachineAvgAggregateInputType
    _sum?: MachineSumAggregateInputType
    _min?: MachineMinAggregateInputType
    _max?: MachineMaxAggregateInputType
  }


  export type MachineGroupByOutputType = {
    id: number
    tag: string
    ute: string
    technology: string
    _count: MachineCountAggregateOutputType | null
    _avg: MachineAvgAggregateOutputType | null
    _sum: MachineSumAggregateOutputType | null
    _min: MachineMinAggregateOutputType | null
    _max: MachineMaxAggregateOutputType | null
  }

  type GetMachineGroupByPayload<T extends MachineGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MachineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MachineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MachineGroupByOutputType[P]>
            : GetScalarType<T[P], MachineGroupByOutputType[P]>
        }
      >
    >


  export type MachineSelect = {
    id?: boolean
    tag?: boolean
    ute?: boolean
    technology?: boolean
    PreventiveOS?: boolean | Machine$PreventiveOSArgs
    PreventiveAction?: boolean | Machine$PreventiveActionArgs
    _count?: boolean | MachineCountOutputTypeArgs
  }


  export type MachineInclude = {
    PreventiveOS?: boolean | Machine$PreventiveOSArgs
    PreventiveAction?: boolean | Machine$PreventiveActionArgs
    _count?: boolean | MachineCountOutputTypeArgs
  }

  export type MachineGetPayload<S extends boolean | null | undefined | MachineArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Machine :
    S extends undefined ? never :
    S extends { include: any } & (MachineArgs | MachineFindManyArgs)
    ? Machine  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'PreventiveOS' ? Array < PreventiveOSGetPayload<S['include'][P]>>  :
        P extends 'PreventiveAction' ? Array < PreventiveActionGetPayload<S['include'][P]>>  :
        P extends '_count' ? MachineCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (MachineArgs | MachineFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'PreventiveOS' ? Array < PreventiveOSGetPayload<S['select'][P]>>  :
        P extends 'PreventiveAction' ? Array < PreventiveActionGetPayload<S['select'][P]>>  :
        P extends '_count' ? MachineCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Machine ? Machine[P] : never
  } 
      : Machine


  type MachineCountArgs = 
    Omit<MachineFindManyArgs, 'select' | 'include'> & {
      select?: MachineCountAggregateInputType | true
    }

  export interface MachineDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Machine that matches the filter.
     * @param {MachineFindUniqueArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MachineFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MachineFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Machine'> extends True ? Prisma__MachineClient<MachineGetPayload<T>> : Prisma__MachineClient<MachineGetPayload<T> | null, null>

    /**
     * Find one Machine that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MachineFindUniqueOrThrowArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MachineFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MachineFindUniqueOrThrowArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Find the first Machine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindFirstArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MachineFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MachineFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Machine'> extends True ? Prisma__MachineClient<MachineGetPayload<T>> : Prisma__MachineClient<MachineGetPayload<T> | null, null>

    /**
     * Find the first Machine that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindFirstOrThrowArgs} args - Arguments to find a Machine
     * @example
     * // Get one Machine
     * const machine = await prisma.machine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MachineFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MachineFindFirstOrThrowArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Find zero or more Machines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Machines
     * const machines = await prisma.machine.findMany()
     * 
     * // Get first 10 Machines
     * const machines = await prisma.machine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const machineWithIdOnly = await prisma.machine.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MachineFindManyArgs>(
      args?: SelectSubset<T, MachineFindManyArgs>
    ): PrismaPromise<Array<MachineGetPayload<T>>>

    /**
     * Create a Machine.
     * @param {MachineCreateArgs} args - Arguments to create a Machine.
     * @example
     * // Create one Machine
     * const Machine = await prisma.machine.create({
     *   data: {
     *     // ... data to create a Machine
     *   }
     * })
     * 
    **/
    create<T extends MachineCreateArgs>(
      args: SelectSubset<T, MachineCreateArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Delete a Machine.
     * @param {MachineDeleteArgs} args - Arguments to delete one Machine.
     * @example
     * // Delete one Machine
     * const Machine = await prisma.machine.delete({
     *   where: {
     *     // ... filter to delete one Machine
     *   }
     * })
     * 
    **/
    delete<T extends MachineDeleteArgs>(
      args: SelectSubset<T, MachineDeleteArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Update one Machine.
     * @param {MachineUpdateArgs} args - Arguments to update one Machine.
     * @example
     * // Update one Machine
     * const machine = await prisma.machine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MachineUpdateArgs>(
      args: SelectSubset<T, MachineUpdateArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Delete zero or more Machines.
     * @param {MachineDeleteManyArgs} args - Arguments to filter Machines to delete.
     * @example
     * // Delete a few Machines
     * const { count } = await prisma.machine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MachineDeleteManyArgs>(
      args?: SelectSubset<T, MachineDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Machines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Machines
     * const machine = await prisma.machine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MachineUpdateManyArgs>(
      args: SelectSubset<T, MachineUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Machine.
     * @param {MachineUpsertArgs} args - Arguments to update or create a Machine.
     * @example
     * // Update or create a Machine
     * const machine = await prisma.machine.upsert({
     *   create: {
     *     // ... data to create a Machine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Machine we want to update
     *   }
     * })
    **/
    upsert<T extends MachineUpsertArgs>(
      args: SelectSubset<T, MachineUpsertArgs>
    ): Prisma__MachineClient<MachineGetPayload<T>>

    /**
     * Count the number of Machines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineCountArgs} args - Arguments to filter Machines to count.
     * @example
     * // Count the number of Machines
     * const count = await prisma.machine.count({
     *   where: {
     *     // ... the filter for the Machines we want to count
     *   }
     * })
    **/
    count<T extends MachineCountArgs>(
      args?: Subset<T, MachineCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MachineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Machine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MachineAggregateArgs>(args: Subset<T, MachineAggregateArgs>): PrismaPromise<GetMachineAggregateType<T>>

    /**
     * Group by Machine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MachineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MachineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MachineGroupByArgs['orderBy'] }
        : { orderBy?: MachineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MachineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMachineGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Machine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MachineClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    PreventiveOS<T extends Machine$PreventiveOSArgs= {}>(args?: Subset<T, Machine$PreventiveOSArgs>): PrismaPromise<Array<PreventiveOSGetPayload<T>>| Null>;

    PreventiveAction<T extends Machine$PreventiveActionArgs= {}>(args?: Subset<T, Machine$PreventiveActionArgs>): PrismaPromise<Array<PreventiveActionGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Machine base type for findUnique actions
   */
  export type MachineFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter, which Machine to fetch.
     */
    where: MachineWhereUniqueInput
  }

  /**
   * Machine findUnique
   */
  export interface MachineFindUniqueArgs extends MachineFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Machine findUniqueOrThrow
   */
  export type MachineFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter, which Machine to fetch.
     */
    where: MachineWhereUniqueInput
  }


  /**
   * Machine base type for findFirst actions
   */
  export type MachineFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter, which Machine to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: Enumerable<MachineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Machines.
     */
    distinct?: Enumerable<MachineScalarFieldEnum>
  }

  /**
   * Machine findFirst
   */
  export interface MachineFindFirstArgs extends MachineFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Machine findFirstOrThrow
   */
  export type MachineFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter, which Machine to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: Enumerable<MachineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Machines.
     */
    distinct?: Enumerable<MachineScalarFieldEnum>
  }


  /**
   * Machine findMany
   */
  export type MachineFindManyArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter, which Machines to fetch.
     */
    where?: MachineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Machines to fetch.
     */
    orderBy?: Enumerable<MachineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Machines.
     */
    cursor?: MachineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Machines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Machines.
     */
    skip?: number
    distinct?: Enumerable<MachineScalarFieldEnum>
  }


  /**
   * Machine create
   */
  export type MachineCreateArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * The data needed to create a Machine.
     */
    data: XOR<MachineCreateInput, MachineUncheckedCreateInput>
  }


  /**
   * Machine update
   */
  export type MachineUpdateArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * The data needed to update a Machine.
     */
    data: XOR<MachineUpdateInput, MachineUncheckedUpdateInput>
    /**
     * Choose, which Machine to update.
     */
    where: MachineWhereUniqueInput
  }


  /**
   * Machine updateMany
   */
  export type MachineUpdateManyArgs = {
    /**
     * The data used to update Machines.
     */
    data: XOR<MachineUpdateManyMutationInput, MachineUncheckedUpdateManyInput>
    /**
     * Filter which Machines to update
     */
    where?: MachineWhereInput
  }


  /**
   * Machine upsert
   */
  export type MachineUpsertArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * The filter to search for the Machine to update in case it exists.
     */
    where: MachineWhereUniqueInput
    /**
     * In case the Machine found by the `where` argument doesn't exist, create a new Machine with this data.
     */
    create: XOR<MachineCreateInput, MachineUncheckedCreateInput>
    /**
     * In case the Machine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MachineUpdateInput, MachineUncheckedUpdateInput>
  }


  /**
   * Machine delete
   */
  export type MachineDeleteArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
    /**
     * Filter which Machine to delete.
     */
    where: MachineWhereUniqueInput
  }


  /**
   * Machine deleteMany
   */
  export type MachineDeleteManyArgs = {
    /**
     * Filter which Machines to delete
     */
    where?: MachineWhereInput
  }


  /**
   * Machine.PreventiveOS
   */
  export type Machine$PreventiveOSArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    where?: PreventiveOSWhereInput
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    cursor?: PreventiveOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }


  /**
   * Machine.PreventiveAction
   */
  export type Machine$PreventiveActionArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    where?: PreventiveActionWhereInput
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    cursor?: PreventiveActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }


  /**
   * Machine without action
   */
  export type MachineArgs = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: MachineSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MachineInclude | null
  }



  /**
   * Model Worker
   */


  export type AggregateWorker = {
    _count: WorkerCountAggregateOutputType | null
    _avg: WorkerAvgAggregateOutputType | null
    _sum: WorkerSumAggregateOutputType | null
    _min: WorkerMinAggregateOutputType | null
    _max: WorkerMaxAggregateOutputType | null
  }

  export type WorkerAvgAggregateOutputType = {
    id: number | null
    registration: number | null
  }

  export type WorkerSumAggregateOutputType = {
    id: number | null
    registration: number | null
  }

  export type WorkerMinAggregateOutputType = {
    id: number | null
    registration: number | null
    name: string | null
    class: string | null
  }

  export type WorkerMaxAggregateOutputType = {
    id: number | null
    registration: number | null
    name: string | null
    class: string | null
  }

  export type WorkerCountAggregateOutputType = {
    id: number
    registration: number
    name: number
    class: number
    _all: number
  }


  export type WorkerAvgAggregateInputType = {
    id?: true
    registration?: true
  }

  export type WorkerSumAggregateInputType = {
    id?: true
    registration?: true
  }

  export type WorkerMinAggregateInputType = {
    id?: true
    registration?: true
    name?: true
    class?: true
  }

  export type WorkerMaxAggregateInputType = {
    id?: true
    registration?: true
    name?: true
    class?: true
  }

  export type WorkerCountAggregateInputType = {
    id?: true
    registration?: true
    name?: true
    class?: true
    _all?: true
  }

  export type WorkerAggregateArgs = {
    /**
     * Filter which Worker to aggregate.
     */
    where?: WorkerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workers to fetch.
     */
    orderBy?: Enumerable<WorkerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workers
    **/
    _count?: true | WorkerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkerMaxAggregateInputType
  }

  export type GetWorkerAggregateType<T extends WorkerAggregateArgs> = {
        [P in keyof T & keyof AggregateWorker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorker[P]>
      : GetScalarType<T[P], AggregateWorker[P]>
  }




  export type WorkerGroupByArgs = {
    where?: WorkerWhereInput
    orderBy?: Enumerable<WorkerOrderByWithAggregationInput>
    by: WorkerScalarFieldEnum[]
    having?: WorkerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkerCountAggregateInputType | true
    _avg?: WorkerAvgAggregateInputType
    _sum?: WorkerSumAggregateInputType
    _min?: WorkerMinAggregateInputType
    _max?: WorkerMaxAggregateInputType
  }


  export type WorkerGroupByOutputType = {
    id: number
    registration: number
    name: string
    class: string
    _count: WorkerCountAggregateOutputType | null
    _avg: WorkerAvgAggregateOutputType | null
    _sum: WorkerSumAggregateOutputType | null
    _min: WorkerMinAggregateOutputType | null
    _max: WorkerMaxAggregateOutputType | null
  }

  type GetWorkerGroupByPayload<T extends WorkerGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WorkerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkerGroupByOutputType[P]>
            : GetScalarType<T[P], WorkerGroupByOutputType[P]>
        }
      >
    >


  export type WorkerSelect = {
    id?: boolean
    registration?: boolean
    name?: boolean
    class?: boolean
    PreventiveOs?: boolean | Worker$PreventiveOsArgs
    _count?: boolean | WorkerCountOutputTypeArgs
  }


  export type WorkerInclude = {
    PreventiveOs?: boolean | Worker$PreventiveOsArgs
    _count?: boolean | WorkerCountOutputTypeArgs
  }

  export type WorkerGetPayload<S extends boolean | null | undefined | WorkerArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Worker :
    S extends undefined ? never :
    S extends { include: any } & (WorkerArgs | WorkerFindManyArgs)
    ? Worker  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'PreventiveOs' ? Array < PreventiveOSGetPayload<S['include'][P]>>  :
        P extends '_count' ? WorkerCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (WorkerArgs | WorkerFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'PreventiveOs' ? Array < PreventiveOSGetPayload<S['select'][P]>>  :
        P extends '_count' ? WorkerCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Worker ? Worker[P] : never
  } 
      : Worker


  type WorkerCountArgs = 
    Omit<WorkerFindManyArgs, 'select' | 'include'> & {
      select?: WorkerCountAggregateInputType | true
    }

  export interface WorkerDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Worker that matches the filter.
     * @param {WorkerFindUniqueArgs} args - Arguments to find a Worker
     * @example
     * // Get one Worker
     * const worker = await prisma.worker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WorkerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Worker'> extends True ? Prisma__WorkerClient<WorkerGetPayload<T>> : Prisma__WorkerClient<WorkerGetPayload<T> | null, null>

    /**
     * Find one Worker that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WorkerFindUniqueOrThrowArgs} args - Arguments to find a Worker
     * @example
     * // Get one Worker
     * const worker = await prisma.worker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkerFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WorkerFindUniqueOrThrowArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Find the first Worker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerFindFirstArgs} args - Arguments to find a Worker
     * @example
     * // Get one Worker
     * const worker = await prisma.worker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WorkerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Worker'> extends True ? Prisma__WorkerClient<WorkerGetPayload<T>> : Prisma__WorkerClient<WorkerGetPayload<T> | null, null>

    /**
     * Find the first Worker that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerFindFirstOrThrowArgs} args - Arguments to find a Worker
     * @example
     * // Get one Worker
     * const worker = await prisma.worker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkerFindFirstOrThrowArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Find zero or more Workers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workers
     * const workers = await prisma.worker.findMany()
     * 
     * // Get first 10 Workers
     * const workers = await prisma.worker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workerWithIdOnly = await prisma.worker.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkerFindManyArgs>(
      args?: SelectSubset<T, WorkerFindManyArgs>
    ): PrismaPromise<Array<WorkerGetPayload<T>>>

    /**
     * Create a Worker.
     * @param {WorkerCreateArgs} args - Arguments to create a Worker.
     * @example
     * // Create one Worker
     * const Worker = await prisma.worker.create({
     *   data: {
     *     // ... data to create a Worker
     *   }
     * })
     * 
    **/
    create<T extends WorkerCreateArgs>(
      args: SelectSubset<T, WorkerCreateArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Delete a Worker.
     * @param {WorkerDeleteArgs} args - Arguments to delete one Worker.
     * @example
     * // Delete one Worker
     * const Worker = await prisma.worker.delete({
     *   where: {
     *     // ... filter to delete one Worker
     *   }
     * })
     * 
    **/
    delete<T extends WorkerDeleteArgs>(
      args: SelectSubset<T, WorkerDeleteArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Update one Worker.
     * @param {WorkerUpdateArgs} args - Arguments to update one Worker.
     * @example
     * // Update one Worker
     * const worker = await prisma.worker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkerUpdateArgs>(
      args: SelectSubset<T, WorkerUpdateArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Delete zero or more Workers.
     * @param {WorkerDeleteManyArgs} args - Arguments to filter Workers to delete.
     * @example
     * // Delete a few Workers
     * const { count } = await prisma.worker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkerDeleteManyArgs>(
      args?: SelectSubset<T, WorkerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workers
     * const worker = await prisma.worker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkerUpdateManyArgs>(
      args: SelectSubset<T, WorkerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Worker.
     * @param {WorkerUpsertArgs} args - Arguments to update or create a Worker.
     * @example
     * // Update or create a Worker
     * const worker = await prisma.worker.upsert({
     *   create: {
     *     // ... data to create a Worker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Worker we want to update
     *   }
     * })
    **/
    upsert<T extends WorkerUpsertArgs>(
      args: SelectSubset<T, WorkerUpsertArgs>
    ): Prisma__WorkerClient<WorkerGetPayload<T>>

    /**
     * Count the number of Workers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerCountArgs} args - Arguments to filter Workers to count.
     * @example
     * // Count the number of Workers
     * const count = await prisma.worker.count({
     *   where: {
     *     // ... the filter for the Workers we want to count
     *   }
     * })
    **/
    count<T extends WorkerCountArgs>(
      args?: Subset<T, WorkerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Worker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkerAggregateArgs>(args: Subset<T, WorkerAggregateArgs>): PrismaPromise<GetWorkerAggregateType<T>>

    /**
     * Group by Worker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkerGroupByArgs['orderBy'] }
        : { orderBy?: WorkerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkerGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Worker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WorkerClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    PreventiveOs<T extends Worker$PreventiveOsArgs= {}>(args?: Subset<T, Worker$PreventiveOsArgs>): PrismaPromise<Array<PreventiveOSGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Worker base type for findUnique actions
   */
  export type WorkerFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter, which Worker to fetch.
     */
    where: WorkerWhereUniqueInput
  }

  /**
   * Worker findUnique
   */
  export interface WorkerFindUniqueArgs extends WorkerFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Worker findUniqueOrThrow
   */
  export type WorkerFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter, which Worker to fetch.
     */
    where: WorkerWhereUniqueInput
  }


  /**
   * Worker base type for findFirst actions
   */
  export type WorkerFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter, which Worker to fetch.
     */
    where?: WorkerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workers to fetch.
     */
    orderBy?: Enumerable<WorkerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workers.
     */
    cursor?: WorkerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workers.
     */
    distinct?: Enumerable<WorkerScalarFieldEnum>
  }

  /**
   * Worker findFirst
   */
  export interface WorkerFindFirstArgs extends WorkerFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Worker findFirstOrThrow
   */
  export type WorkerFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter, which Worker to fetch.
     */
    where?: WorkerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workers to fetch.
     */
    orderBy?: Enumerable<WorkerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workers.
     */
    cursor?: WorkerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workers.
     */
    distinct?: Enumerable<WorkerScalarFieldEnum>
  }


  /**
   * Worker findMany
   */
  export type WorkerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter, which Workers to fetch.
     */
    where?: WorkerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workers to fetch.
     */
    orderBy?: Enumerable<WorkerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workers.
     */
    cursor?: WorkerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workers.
     */
    skip?: number
    distinct?: Enumerable<WorkerScalarFieldEnum>
  }


  /**
   * Worker create
   */
  export type WorkerCreateArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * The data needed to create a Worker.
     */
    data: XOR<WorkerCreateInput, WorkerUncheckedCreateInput>
  }


  /**
   * Worker update
   */
  export type WorkerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * The data needed to update a Worker.
     */
    data: XOR<WorkerUpdateInput, WorkerUncheckedUpdateInput>
    /**
     * Choose, which Worker to update.
     */
    where: WorkerWhereUniqueInput
  }


  /**
   * Worker updateMany
   */
  export type WorkerUpdateManyArgs = {
    /**
     * The data used to update Workers.
     */
    data: XOR<WorkerUpdateManyMutationInput, WorkerUncheckedUpdateManyInput>
    /**
     * Filter which Workers to update
     */
    where?: WorkerWhereInput
  }


  /**
   * Worker upsert
   */
  export type WorkerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * The filter to search for the Worker to update in case it exists.
     */
    where: WorkerWhereUniqueInput
    /**
     * In case the Worker found by the `where` argument doesn't exist, create a new Worker with this data.
     */
    create: XOR<WorkerCreateInput, WorkerUncheckedCreateInput>
    /**
     * In case the Worker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkerUpdateInput, WorkerUncheckedUpdateInput>
  }


  /**
   * Worker delete
   */
  export type WorkerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    /**
     * Filter which Worker to delete.
     */
    where: WorkerWhereUniqueInput
  }


  /**
   * Worker deleteMany
   */
  export type WorkerDeleteManyArgs = {
    /**
     * Filter which Workers to delete
     */
    where?: WorkerWhereInput
  }


  /**
   * Worker.PreventiveOs
   */
  export type Worker$PreventiveOsArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    where?: PreventiveOSWhereInput
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    cursor?: PreventiveOSWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }


  /**
   * Worker without action
   */
  export type WorkerArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
  }



  /**
   * Model PreventiveActionTaken
   */


  export type AggregatePreventiveActionTaken = {
    _count: PreventiveActionTakenCountAggregateOutputType | null
    _avg: PreventiveActionTakenAvgAggregateOutputType | null
    _sum: PreventiveActionTakenSumAggregateOutputType | null
    _min: PreventiveActionTakenMinAggregateOutputType | null
    _max: PreventiveActionTakenMaxAggregateOutputType | null
  }

  export type PreventiveActionTakenAvgAggregateOutputType = {
    id: number | null
    osId: number | null
    actionId: number | null
  }

  export type PreventiveActionTakenSumAggregateOutputType = {
    id: number | null
    osId: number | null
    actionId: number | null
  }

  export type PreventiveActionTakenMinAggregateOutputType = {
    id: number | null
    date: Date | null
    osId: number | null
    actionId: number | null
    weekCode: string | null
  }

  export type PreventiveActionTakenMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    osId: number | null
    actionId: number | null
    weekCode: string | null
  }

  export type PreventiveActionTakenCountAggregateOutputType = {
    id: number
    date: number
    osId: number
    actionId: number
    weekCode: number
    _all: number
  }


  export type PreventiveActionTakenAvgAggregateInputType = {
    id?: true
    osId?: true
    actionId?: true
  }

  export type PreventiveActionTakenSumAggregateInputType = {
    id?: true
    osId?: true
    actionId?: true
  }

  export type PreventiveActionTakenMinAggregateInputType = {
    id?: true
    date?: true
    osId?: true
    actionId?: true
    weekCode?: true
  }

  export type PreventiveActionTakenMaxAggregateInputType = {
    id?: true
    date?: true
    osId?: true
    actionId?: true
    weekCode?: true
  }

  export type PreventiveActionTakenCountAggregateInputType = {
    id?: true
    date?: true
    osId?: true
    actionId?: true
    weekCode?: true
    _all?: true
  }

  export type PreventiveActionTakenAggregateArgs = {
    /**
     * Filter which PreventiveActionTaken to aggregate.
     */
    where?: PreventiveActionTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActionTakens to fetch.
     */
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventiveActionTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActionTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActionTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventiveActionTakens
    **/
    _count?: true | PreventiveActionTakenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventiveActionTakenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventiveActionTakenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventiveActionTakenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventiveActionTakenMaxAggregateInputType
  }

  export type GetPreventiveActionTakenAggregateType<T extends PreventiveActionTakenAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventiveActionTaken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventiveActionTaken[P]>
      : GetScalarType<T[P], AggregatePreventiveActionTaken[P]>
  }




  export type PreventiveActionTakenGroupByArgs = {
    where?: PreventiveActionTakenWhereInput
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithAggregationInput>
    by: PreventiveActionTakenScalarFieldEnum[]
    having?: PreventiveActionTakenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventiveActionTakenCountAggregateInputType | true
    _avg?: PreventiveActionTakenAvgAggregateInputType
    _sum?: PreventiveActionTakenSumAggregateInputType
    _min?: PreventiveActionTakenMinAggregateInputType
    _max?: PreventiveActionTakenMaxAggregateInputType
  }


  export type PreventiveActionTakenGroupByOutputType = {
    id: number
    date: Date
    osId: number
    actionId: number
    weekCode: string
    _count: PreventiveActionTakenCountAggregateOutputType | null
    _avg: PreventiveActionTakenAvgAggregateOutputType | null
    _sum: PreventiveActionTakenSumAggregateOutputType | null
    _min: PreventiveActionTakenMinAggregateOutputType | null
    _max: PreventiveActionTakenMaxAggregateOutputType | null
  }

  type GetPreventiveActionTakenGroupByPayload<T extends PreventiveActionTakenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PreventiveActionTakenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventiveActionTakenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventiveActionTakenGroupByOutputType[P]>
            : GetScalarType<T[P], PreventiveActionTakenGroupByOutputType[P]>
        }
      >
    >


  export type PreventiveActionTakenSelect = {
    id?: boolean
    date?: boolean
    osId?: boolean
    actionId?: boolean
    weekCode?: boolean
    action?: boolean | PreventiveActionArgs
    os?: boolean | PreventiveOSArgs
  }


  export type PreventiveActionTakenInclude = {
    action?: boolean | PreventiveActionArgs
    os?: boolean | PreventiveOSArgs
  }

  export type PreventiveActionTakenGetPayload<S extends boolean | null | undefined | PreventiveActionTakenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PreventiveActionTaken :
    S extends undefined ? never :
    S extends { include: any } & (PreventiveActionTakenArgs | PreventiveActionTakenFindManyArgs)
    ? PreventiveActionTaken  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'action' ? PreventiveActionGetPayload<S['include'][P]> :
        P extends 'os' ? PreventiveOSGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PreventiveActionTakenArgs | PreventiveActionTakenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'action' ? PreventiveActionGetPayload<S['select'][P]> :
        P extends 'os' ? PreventiveOSGetPayload<S['select'][P]> :  P extends keyof PreventiveActionTaken ? PreventiveActionTaken[P] : never
  } 
      : PreventiveActionTaken


  type PreventiveActionTakenCountArgs = 
    Omit<PreventiveActionTakenFindManyArgs, 'select' | 'include'> & {
      select?: PreventiveActionTakenCountAggregateInputType | true
    }

  export interface PreventiveActionTakenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one PreventiveActionTaken that matches the filter.
     * @param {PreventiveActionTakenFindUniqueArgs} args - Arguments to find a PreventiveActionTaken
     * @example
     * // Get one PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PreventiveActionTakenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PreventiveActionTakenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PreventiveActionTaken'> extends True ? Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>> : Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T> | null, null>

    /**
     * Find one PreventiveActionTaken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PreventiveActionTakenFindUniqueOrThrowArgs} args - Arguments to find a PreventiveActionTaken
     * @example
     * // Get one PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PreventiveActionTakenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PreventiveActionTakenFindUniqueOrThrowArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Find the first PreventiveActionTaken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenFindFirstArgs} args - Arguments to find a PreventiveActionTaken
     * @example
     * // Get one PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PreventiveActionTakenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PreventiveActionTakenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PreventiveActionTaken'> extends True ? Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>> : Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T> | null, null>

    /**
     * Find the first PreventiveActionTaken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenFindFirstOrThrowArgs} args - Arguments to find a PreventiveActionTaken
     * @example
     * // Get one PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PreventiveActionTakenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PreventiveActionTakenFindFirstOrThrowArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Find zero or more PreventiveActionTakens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventiveActionTakens
     * const preventiveActionTakens = await prisma.preventiveActionTaken.findMany()
     * 
     * // Get first 10 PreventiveActionTakens
     * const preventiveActionTakens = await prisma.preventiveActionTaken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventiveActionTakenWithIdOnly = await prisma.preventiveActionTaken.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PreventiveActionTakenFindManyArgs>(
      args?: SelectSubset<T, PreventiveActionTakenFindManyArgs>
    ): PrismaPromise<Array<PreventiveActionTakenGetPayload<T>>>

    /**
     * Create a PreventiveActionTaken.
     * @param {PreventiveActionTakenCreateArgs} args - Arguments to create a PreventiveActionTaken.
     * @example
     * // Create one PreventiveActionTaken
     * const PreventiveActionTaken = await prisma.preventiveActionTaken.create({
     *   data: {
     *     // ... data to create a PreventiveActionTaken
     *   }
     * })
     * 
    **/
    create<T extends PreventiveActionTakenCreateArgs>(
      args: SelectSubset<T, PreventiveActionTakenCreateArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Delete a PreventiveActionTaken.
     * @param {PreventiveActionTakenDeleteArgs} args - Arguments to delete one PreventiveActionTaken.
     * @example
     * // Delete one PreventiveActionTaken
     * const PreventiveActionTaken = await prisma.preventiveActionTaken.delete({
     *   where: {
     *     // ... filter to delete one PreventiveActionTaken
     *   }
     * })
     * 
    **/
    delete<T extends PreventiveActionTakenDeleteArgs>(
      args: SelectSubset<T, PreventiveActionTakenDeleteArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Update one PreventiveActionTaken.
     * @param {PreventiveActionTakenUpdateArgs} args - Arguments to update one PreventiveActionTaken.
     * @example
     * // Update one PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PreventiveActionTakenUpdateArgs>(
      args: SelectSubset<T, PreventiveActionTakenUpdateArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Delete zero or more PreventiveActionTakens.
     * @param {PreventiveActionTakenDeleteManyArgs} args - Arguments to filter PreventiveActionTakens to delete.
     * @example
     * // Delete a few PreventiveActionTakens
     * const { count } = await prisma.preventiveActionTaken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PreventiveActionTakenDeleteManyArgs>(
      args?: SelectSubset<T, PreventiveActionTakenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventiveActionTakens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventiveActionTakens
     * const preventiveActionTaken = await prisma.preventiveActionTaken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PreventiveActionTakenUpdateManyArgs>(
      args: SelectSubset<T, PreventiveActionTakenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PreventiveActionTaken.
     * @param {PreventiveActionTakenUpsertArgs} args - Arguments to update or create a PreventiveActionTaken.
     * @example
     * // Update or create a PreventiveActionTaken
     * const preventiveActionTaken = await prisma.preventiveActionTaken.upsert({
     *   create: {
     *     // ... data to create a PreventiveActionTaken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventiveActionTaken we want to update
     *   }
     * })
    **/
    upsert<T extends PreventiveActionTakenUpsertArgs>(
      args: SelectSubset<T, PreventiveActionTakenUpsertArgs>
    ): Prisma__PreventiveActionTakenClient<PreventiveActionTakenGetPayload<T>>

    /**
     * Count the number of PreventiveActionTakens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenCountArgs} args - Arguments to filter PreventiveActionTakens to count.
     * @example
     * // Count the number of PreventiveActionTakens
     * const count = await prisma.preventiveActionTaken.count({
     *   where: {
     *     // ... the filter for the PreventiveActionTakens we want to count
     *   }
     * })
    **/
    count<T extends PreventiveActionTakenCountArgs>(
      args?: Subset<T, PreventiveActionTakenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventiveActionTakenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventiveActionTaken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventiveActionTakenAggregateArgs>(args: Subset<T, PreventiveActionTakenAggregateArgs>): PrismaPromise<GetPreventiveActionTakenAggregateType<T>>

    /**
     * Group by PreventiveActionTaken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionTakenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventiveActionTakenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventiveActionTakenGroupByArgs['orderBy'] }
        : { orderBy?: PreventiveActionTakenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventiveActionTakenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventiveActionTakenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventiveActionTaken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PreventiveActionTakenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    action<T extends PreventiveActionArgs= {}>(args?: Subset<T, PreventiveActionArgs>): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T> | Null>;

    os<T extends PreventiveOSArgs= {}>(args?: Subset<T, PreventiveOSArgs>): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PreventiveActionTaken base type for findUnique actions
   */
  export type PreventiveActionTakenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter, which PreventiveActionTaken to fetch.
     */
    where: PreventiveActionTakenWhereUniqueInput
  }

  /**
   * PreventiveActionTaken findUnique
   */
  export interface PreventiveActionTakenFindUniqueArgs extends PreventiveActionTakenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveActionTaken findUniqueOrThrow
   */
  export type PreventiveActionTakenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter, which PreventiveActionTaken to fetch.
     */
    where: PreventiveActionTakenWhereUniqueInput
  }


  /**
   * PreventiveActionTaken base type for findFirst actions
   */
  export type PreventiveActionTakenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter, which PreventiveActionTaken to fetch.
     */
    where?: PreventiveActionTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActionTakens to fetch.
     */
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveActionTakens.
     */
    cursor?: PreventiveActionTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActionTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActionTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveActionTakens.
     */
    distinct?: Enumerable<PreventiveActionTakenScalarFieldEnum>
  }

  /**
   * PreventiveActionTaken findFirst
   */
  export interface PreventiveActionTakenFindFirstArgs extends PreventiveActionTakenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveActionTaken findFirstOrThrow
   */
  export type PreventiveActionTakenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter, which PreventiveActionTaken to fetch.
     */
    where?: PreventiveActionTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActionTakens to fetch.
     */
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveActionTakens.
     */
    cursor?: PreventiveActionTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActionTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActionTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveActionTakens.
     */
    distinct?: Enumerable<PreventiveActionTakenScalarFieldEnum>
  }


  /**
   * PreventiveActionTaken findMany
   */
  export type PreventiveActionTakenFindManyArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter, which PreventiveActionTakens to fetch.
     */
    where?: PreventiveActionTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActionTakens to fetch.
     */
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventiveActionTakens.
     */
    cursor?: PreventiveActionTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActionTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActionTakens.
     */
    skip?: number
    distinct?: Enumerable<PreventiveActionTakenScalarFieldEnum>
  }


  /**
   * PreventiveActionTaken create
   */
  export type PreventiveActionTakenCreateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * The data needed to create a PreventiveActionTaken.
     */
    data: XOR<PreventiveActionTakenCreateInput, PreventiveActionTakenUncheckedCreateInput>
  }


  /**
   * PreventiveActionTaken update
   */
  export type PreventiveActionTakenUpdateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * The data needed to update a PreventiveActionTaken.
     */
    data: XOR<PreventiveActionTakenUpdateInput, PreventiveActionTakenUncheckedUpdateInput>
    /**
     * Choose, which PreventiveActionTaken to update.
     */
    where: PreventiveActionTakenWhereUniqueInput
  }


  /**
   * PreventiveActionTaken updateMany
   */
  export type PreventiveActionTakenUpdateManyArgs = {
    /**
     * The data used to update PreventiveActionTakens.
     */
    data: XOR<PreventiveActionTakenUpdateManyMutationInput, PreventiveActionTakenUncheckedUpdateManyInput>
    /**
     * Filter which PreventiveActionTakens to update
     */
    where?: PreventiveActionTakenWhereInput
  }


  /**
   * PreventiveActionTaken upsert
   */
  export type PreventiveActionTakenUpsertArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * The filter to search for the PreventiveActionTaken to update in case it exists.
     */
    where: PreventiveActionTakenWhereUniqueInput
    /**
     * In case the PreventiveActionTaken found by the `where` argument doesn't exist, create a new PreventiveActionTaken with this data.
     */
    create: XOR<PreventiveActionTakenCreateInput, PreventiveActionTakenUncheckedCreateInput>
    /**
     * In case the PreventiveActionTaken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventiveActionTakenUpdateInput, PreventiveActionTakenUncheckedUpdateInput>
  }


  /**
   * PreventiveActionTaken delete
   */
  export type PreventiveActionTakenDeleteArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    /**
     * Filter which PreventiveActionTaken to delete.
     */
    where: PreventiveActionTakenWhereUniqueInput
  }


  /**
   * PreventiveActionTaken deleteMany
   */
  export type PreventiveActionTakenDeleteManyArgs = {
    /**
     * Filter which PreventiveActionTakens to delete
     */
    where?: PreventiveActionTakenWhereInput
  }


  /**
   * PreventiveActionTaken without action
   */
  export type PreventiveActionTakenArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
  }



  /**
   * Model PreventiveAction
   */


  export type AggregatePreventiveAction = {
    _count: PreventiveActionCountAggregateOutputType | null
    _avg: PreventiveActionAvgAggregateOutputType | null
    _sum: PreventiveActionSumAggregateOutputType | null
    _min: PreventiveActionMinAggregateOutputType | null
    _max: PreventiveActionMaxAggregateOutputType | null
  }

  export type PreventiveActionAvgAggregateOutputType = {
    id: number | null
    machineId: number | null
    frequency: number | null
    preventiveOSId: number | null
    natureId: number | null
  }

  export type PreventiveActionSumAggregateOutputType = {
    id: number | null
    machineId: number | null
    frequency: number | null
    preventiveOSId: number | null
    natureId: number | null
  }

  export type PreventiveActionMinAggregateOutputType = {
    id: number | null
    description: string | null
    machineId: number | null
    excution: string | null
    frequency: number | null
    nextExecution: string | null
    preventiveOSId: number | null
    natureId: number | null
    ignore: boolean | null
  }

  export type PreventiveActionMaxAggregateOutputType = {
    id: number | null
    description: string | null
    machineId: number | null
    excution: string | null
    frequency: number | null
    nextExecution: string | null
    preventiveOSId: number | null
    natureId: number | null
    ignore: boolean | null
  }

  export type PreventiveActionCountAggregateOutputType = {
    id: number
    description: number
    machineId: number
    excution: number
    frequency: number
    nextExecution: number
    preventiveOSId: number
    natureId: number
    ignore: number
    _all: number
  }


  export type PreventiveActionAvgAggregateInputType = {
    id?: true
    machineId?: true
    frequency?: true
    preventiveOSId?: true
    natureId?: true
  }

  export type PreventiveActionSumAggregateInputType = {
    id?: true
    machineId?: true
    frequency?: true
    preventiveOSId?: true
    natureId?: true
  }

  export type PreventiveActionMinAggregateInputType = {
    id?: true
    description?: true
    machineId?: true
    excution?: true
    frequency?: true
    nextExecution?: true
    preventiveOSId?: true
    natureId?: true
    ignore?: true
  }

  export type PreventiveActionMaxAggregateInputType = {
    id?: true
    description?: true
    machineId?: true
    excution?: true
    frequency?: true
    nextExecution?: true
    preventiveOSId?: true
    natureId?: true
    ignore?: true
  }

  export type PreventiveActionCountAggregateInputType = {
    id?: true
    description?: true
    machineId?: true
    excution?: true
    frequency?: true
    nextExecution?: true
    preventiveOSId?: true
    natureId?: true
    ignore?: true
    _all?: true
  }

  export type PreventiveActionAggregateArgs = {
    /**
     * Filter which PreventiveAction to aggregate.
     */
    where?: PreventiveActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActions to fetch.
     */
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventiveActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventiveActions
    **/
    _count?: true | PreventiveActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventiveActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventiveActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventiveActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventiveActionMaxAggregateInputType
  }

  export type GetPreventiveActionAggregateType<T extends PreventiveActionAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventiveAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventiveAction[P]>
      : GetScalarType<T[P], AggregatePreventiveAction[P]>
  }




  export type PreventiveActionGroupByArgs = {
    where?: PreventiveActionWhereInput
    orderBy?: Enumerable<PreventiveActionOrderByWithAggregationInput>
    by: PreventiveActionScalarFieldEnum[]
    having?: PreventiveActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventiveActionCountAggregateInputType | true
    _avg?: PreventiveActionAvgAggregateInputType
    _sum?: PreventiveActionSumAggregateInputType
    _min?: PreventiveActionMinAggregateInputType
    _max?: PreventiveActionMaxAggregateInputType
  }


  export type PreventiveActionGroupByOutputType = {
    id: number
    description: string
    machineId: number
    excution: string
    frequency: number
    nextExecution: string
    preventiveOSId: number | null
    natureId: number
    ignore: boolean
    _count: PreventiveActionCountAggregateOutputType | null
    _avg: PreventiveActionAvgAggregateOutputType | null
    _sum: PreventiveActionSumAggregateOutputType | null
    _min: PreventiveActionMinAggregateOutputType | null
    _max: PreventiveActionMaxAggregateOutputType | null
  }

  type GetPreventiveActionGroupByPayload<T extends PreventiveActionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PreventiveActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventiveActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventiveActionGroupByOutputType[P]>
            : GetScalarType<T[P], PreventiveActionGroupByOutputType[P]>
        }
      >
    >


  export type PreventiveActionSelect = {
    id?: boolean
    description?: boolean
    machineId?: boolean
    excution?: boolean
    frequency?: boolean
    nextExecution?: boolean
    preventiveOSId?: boolean
    natureId?: boolean
    ignore?: boolean
    machine?: boolean | MachineArgs
    PreventiveOS?: boolean | PreventiveOSArgs
    nature?: boolean | NatureArgs
    actionsTaken?: boolean | PreventiveAction$actionsTakenArgs
    _count?: boolean | PreventiveActionCountOutputTypeArgs
  }


  export type PreventiveActionInclude = {
    machine?: boolean | MachineArgs
    PreventiveOS?: boolean | PreventiveOSArgs
    nature?: boolean | NatureArgs
    actionsTaken?: boolean | PreventiveAction$actionsTakenArgs
    _count?: boolean | PreventiveActionCountOutputTypeArgs
  }

  export type PreventiveActionGetPayload<S extends boolean | null | undefined | PreventiveActionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PreventiveAction :
    S extends undefined ? never :
    S extends { include: any } & (PreventiveActionArgs | PreventiveActionFindManyArgs)
    ? PreventiveAction  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'machine' ? MachineGetPayload<S['include'][P]> :
        P extends 'PreventiveOS' ? PreventiveOSGetPayload<S['include'][P]> | null :
        P extends 'nature' ? NatureGetPayload<S['include'][P]> :
        P extends 'actionsTaken' ? Array < PreventiveActionTakenGetPayload<S['include'][P]>>  :
        P extends '_count' ? PreventiveActionCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PreventiveActionArgs | PreventiveActionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'machine' ? MachineGetPayload<S['select'][P]> :
        P extends 'PreventiveOS' ? PreventiveOSGetPayload<S['select'][P]> | null :
        P extends 'nature' ? NatureGetPayload<S['select'][P]> :
        P extends 'actionsTaken' ? Array < PreventiveActionTakenGetPayload<S['select'][P]>>  :
        P extends '_count' ? PreventiveActionCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof PreventiveAction ? PreventiveAction[P] : never
  } 
      : PreventiveAction


  type PreventiveActionCountArgs = 
    Omit<PreventiveActionFindManyArgs, 'select' | 'include'> & {
      select?: PreventiveActionCountAggregateInputType | true
    }

  export interface PreventiveActionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one PreventiveAction that matches the filter.
     * @param {PreventiveActionFindUniqueArgs} args - Arguments to find a PreventiveAction
     * @example
     * // Get one PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PreventiveActionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PreventiveActionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PreventiveAction'> extends True ? Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>> : Prisma__PreventiveActionClient<PreventiveActionGetPayload<T> | null, null>

    /**
     * Find one PreventiveAction that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PreventiveActionFindUniqueOrThrowArgs} args - Arguments to find a PreventiveAction
     * @example
     * // Get one PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PreventiveActionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PreventiveActionFindUniqueOrThrowArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Find the first PreventiveAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionFindFirstArgs} args - Arguments to find a PreventiveAction
     * @example
     * // Get one PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PreventiveActionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PreventiveActionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PreventiveAction'> extends True ? Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>> : Prisma__PreventiveActionClient<PreventiveActionGetPayload<T> | null, null>

    /**
     * Find the first PreventiveAction that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionFindFirstOrThrowArgs} args - Arguments to find a PreventiveAction
     * @example
     * // Get one PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PreventiveActionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PreventiveActionFindFirstOrThrowArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Find zero or more PreventiveActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventiveActions
     * const preventiveActions = await prisma.preventiveAction.findMany()
     * 
     * // Get first 10 PreventiveActions
     * const preventiveActions = await prisma.preventiveAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventiveActionWithIdOnly = await prisma.preventiveAction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PreventiveActionFindManyArgs>(
      args?: SelectSubset<T, PreventiveActionFindManyArgs>
    ): PrismaPromise<Array<PreventiveActionGetPayload<T>>>

    /**
     * Create a PreventiveAction.
     * @param {PreventiveActionCreateArgs} args - Arguments to create a PreventiveAction.
     * @example
     * // Create one PreventiveAction
     * const PreventiveAction = await prisma.preventiveAction.create({
     *   data: {
     *     // ... data to create a PreventiveAction
     *   }
     * })
     * 
    **/
    create<T extends PreventiveActionCreateArgs>(
      args: SelectSubset<T, PreventiveActionCreateArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Delete a PreventiveAction.
     * @param {PreventiveActionDeleteArgs} args - Arguments to delete one PreventiveAction.
     * @example
     * // Delete one PreventiveAction
     * const PreventiveAction = await prisma.preventiveAction.delete({
     *   where: {
     *     // ... filter to delete one PreventiveAction
     *   }
     * })
     * 
    **/
    delete<T extends PreventiveActionDeleteArgs>(
      args: SelectSubset<T, PreventiveActionDeleteArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Update one PreventiveAction.
     * @param {PreventiveActionUpdateArgs} args - Arguments to update one PreventiveAction.
     * @example
     * // Update one PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PreventiveActionUpdateArgs>(
      args: SelectSubset<T, PreventiveActionUpdateArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Delete zero or more PreventiveActions.
     * @param {PreventiveActionDeleteManyArgs} args - Arguments to filter PreventiveActions to delete.
     * @example
     * // Delete a few PreventiveActions
     * const { count } = await prisma.preventiveAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PreventiveActionDeleteManyArgs>(
      args?: SelectSubset<T, PreventiveActionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventiveActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventiveActions
     * const preventiveAction = await prisma.preventiveAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PreventiveActionUpdateManyArgs>(
      args: SelectSubset<T, PreventiveActionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PreventiveAction.
     * @param {PreventiveActionUpsertArgs} args - Arguments to update or create a PreventiveAction.
     * @example
     * // Update or create a PreventiveAction
     * const preventiveAction = await prisma.preventiveAction.upsert({
     *   create: {
     *     // ... data to create a PreventiveAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventiveAction we want to update
     *   }
     * })
    **/
    upsert<T extends PreventiveActionUpsertArgs>(
      args: SelectSubset<T, PreventiveActionUpsertArgs>
    ): Prisma__PreventiveActionClient<PreventiveActionGetPayload<T>>

    /**
     * Count the number of PreventiveActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionCountArgs} args - Arguments to filter PreventiveActions to count.
     * @example
     * // Count the number of PreventiveActions
     * const count = await prisma.preventiveAction.count({
     *   where: {
     *     // ... the filter for the PreventiveActions we want to count
     *   }
     * })
    **/
    count<T extends PreventiveActionCountArgs>(
      args?: Subset<T, PreventiveActionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventiveActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventiveAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventiveActionAggregateArgs>(args: Subset<T, PreventiveActionAggregateArgs>): PrismaPromise<GetPreventiveActionAggregateType<T>>

    /**
     * Group by PreventiveAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventiveActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventiveActionGroupByArgs['orderBy'] }
        : { orderBy?: PreventiveActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventiveActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventiveActionGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventiveAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PreventiveActionClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    machine<T extends MachineArgs= {}>(args?: Subset<T, MachineArgs>): Prisma__MachineClient<MachineGetPayload<T> | Null>;

    PreventiveOS<T extends PreventiveOSArgs= {}>(args?: Subset<T, PreventiveOSArgs>): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T> | Null>;

    nature<T extends NatureArgs= {}>(args?: Subset<T, NatureArgs>): Prisma__NatureClient<NatureGetPayload<T> | Null>;

    actionsTaken<T extends PreventiveAction$actionsTakenArgs= {}>(args?: Subset<T, PreventiveAction$actionsTakenArgs>): PrismaPromise<Array<PreventiveActionTakenGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PreventiveAction base type for findUnique actions
   */
  export type PreventiveActionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter, which PreventiveAction to fetch.
     */
    where: PreventiveActionWhereUniqueInput
  }

  /**
   * PreventiveAction findUnique
   */
  export interface PreventiveActionFindUniqueArgs extends PreventiveActionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveAction findUniqueOrThrow
   */
  export type PreventiveActionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter, which PreventiveAction to fetch.
     */
    where: PreventiveActionWhereUniqueInput
  }


  /**
   * PreventiveAction base type for findFirst actions
   */
  export type PreventiveActionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter, which PreventiveAction to fetch.
     */
    where?: PreventiveActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActions to fetch.
     */
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveActions.
     */
    cursor?: PreventiveActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveActions.
     */
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }

  /**
   * PreventiveAction findFirst
   */
  export interface PreventiveActionFindFirstArgs extends PreventiveActionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveAction findFirstOrThrow
   */
  export type PreventiveActionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter, which PreventiveAction to fetch.
     */
    where?: PreventiveActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActions to fetch.
     */
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveActions.
     */
    cursor?: PreventiveActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveActions.
     */
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }


  /**
   * PreventiveAction findMany
   */
  export type PreventiveActionFindManyArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter, which PreventiveActions to fetch.
     */
    where?: PreventiveActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveActions to fetch.
     */
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventiveActions.
     */
    cursor?: PreventiveActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveActions.
     */
    skip?: number
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }


  /**
   * PreventiveAction create
   */
  export type PreventiveActionCreateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * The data needed to create a PreventiveAction.
     */
    data: XOR<PreventiveActionCreateInput, PreventiveActionUncheckedCreateInput>
  }


  /**
   * PreventiveAction update
   */
  export type PreventiveActionUpdateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * The data needed to update a PreventiveAction.
     */
    data: XOR<PreventiveActionUpdateInput, PreventiveActionUncheckedUpdateInput>
    /**
     * Choose, which PreventiveAction to update.
     */
    where: PreventiveActionWhereUniqueInput
  }


  /**
   * PreventiveAction updateMany
   */
  export type PreventiveActionUpdateManyArgs = {
    /**
     * The data used to update PreventiveActions.
     */
    data: XOR<PreventiveActionUpdateManyMutationInput, PreventiveActionUncheckedUpdateManyInput>
    /**
     * Filter which PreventiveActions to update
     */
    where?: PreventiveActionWhereInput
  }


  /**
   * PreventiveAction upsert
   */
  export type PreventiveActionUpsertArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * The filter to search for the PreventiveAction to update in case it exists.
     */
    where: PreventiveActionWhereUniqueInput
    /**
     * In case the PreventiveAction found by the `where` argument doesn't exist, create a new PreventiveAction with this data.
     */
    create: XOR<PreventiveActionCreateInput, PreventiveActionUncheckedCreateInput>
    /**
     * In case the PreventiveAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventiveActionUpdateInput, PreventiveActionUncheckedUpdateInput>
  }


  /**
   * PreventiveAction delete
   */
  export type PreventiveActionDeleteArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    /**
     * Filter which PreventiveAction to delete.
     */
    where: PreventiveActionWhereUniqueInput
  }


  /**
   * PreventiveAction deleteMany
   */
  export type PreventiveActionDeleteManyArgs = {
    /**
     * Filter which PreventiveActions to delete
     */
    where?: PreventiveActionWhereInput
  }


  /**
   * PreventiveAction.actionsTaken
   */
  export type PreventiveAction$actionsTakenArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    where?: PreventiveActionTakenWhereInput
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    cursor?: PreventiveActionTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveActionTakenScalarFieldEnum>
  }


  /**
   * PreventiveAction without action
   */
  export type PreventiveActionArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
  }



  /**
   * Model PreventiveOS
   */


  export type AggregatePreventiveOS = {
    _count: PreventiveOSCountAggregateOutputType | null
    _avg: PreventiveOSAvgAggregateOutputType | null
    _sum: PreventiveOSSumAggregateOutputType | null
    _min: PreventiveOSMinAggregateOutputType | null
    _max: PreventiveOSMaxAggregateOutputType | null
  }

  export type PreventiveOSAvgAggregateOutputType = {
    id: number | null
    machineId: number | null
    natureId: number | null
    duration: number | null
  }

  export type PreventiveOSSumAggregateOutputType = {
    id: number | null
    machineId: number | null
    natureId: number | null
    duration: number | null
  }

  export type PreventiveOSMinAggregateOutputType = {
    id: number | null
    machineId: number | null
    weekCode: string | null
    date: Date | null
    natureId: number | null
    actionsUniqueKey: string | null
    duration: number | null
    concluded: boolean | null
    startTime: Date | null
    finishTime: Date | null
  }

  export type PreventiveOSMaxAggregateOutputType = {
    id: number | null
    machineId: number | null
    weekCode: string | null
    date: Date | null
    natureId: number | null
    actionsUniqueKey: string | null
    duration: number | null
    concluded: boolean | null
    startTime: Date | null
    finishTime: Date | null
  }

  export type PreventiveOSCountAggregateOutputType = {
    id: number
    machineId: number
    weekCode: number
    date: number
    natureId: number
    actionsUniqueKey: number
    duration: number
    concluded: number
    startTime: number
    finishTime: number
    _all: number
  }


  export type PreventiveOSAvgAggregateInputType = {
    id?: true
    machineId?: true
    natureId?: true
    duration?: true
  }

  export type PreventiveOSSumAggregateInputType = {
    id?: true
    machineId?: true
    natureId?: true
    duration?: true
  }

  export type PreventiveOSMinAggregateInputType = {
    id?: true
    machineId?: true
    weekCode?: true
    date?: true
    natureId?: true
    actionsUniqueKey?: true
    duration?: true
    concluded?: true
    startTime?: true
    finishTime?: true
  }

  export type PreventiveOSMaxAggregateInputType = {
    id?: true
    machineId?: true
    weekCode?: true
    date?: true
    natureId?: true
    actionsUniqueKey?: true
    duration?: true
    concluded?: true
    startTime?: true
    finishTime?: true
  }

  export type PreventiveOSCountAggregateInputType = {
    id?: true
    machineId?: true
    weekCode?: true
    date?: true
    natureId?: true
    actionsUniqueKey?: true
    duration?: true
    concluded?: true
    startTime?: true
    finishTime?: true
    _all?: true
  }

  export type PreventiveOSAggregateArgs = {
    /**
     * Filter which PreventiveOS to aggregate.
     */
    where?: PreventiveOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveOS to fetch.
     */
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventiveOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventiveOS
    **/
    _count?: true | PreventiveOSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventiveOSAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventiveOSSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventiveOSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventiveOSMaxAggregateInputType
  }

  export type GetPreventiveOSAggregateType<T extends PreventiveOSAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventiveOS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventiveOS[P]>
      : GetScalarType<T[P], AggregatePreventiveOS[P]>
  }




  export type PreventiveOSGroupByArgs = {
    where?: PreventiveOSWhereInput
    orderBy?: Enumerable<PreventiveOSOrderByWithAggregationInput>
    by: PreventiveOSScalarFieldEnum[]
    having?: PreventiveOSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventiveOSCountAggregateInputType | true
    _avg?: PreventiveOSAvgAggregateInputType
    _sum?: PreventiveOSSumAggregateInputType
    _min?: PreventiveOSMinAggregateInputType
    _max?: PreventiveOSMaxAggregateInputType
  }


  export type PreventiveOSGroupByOutputType = {
    id: number
    machineId: number
    weekCode: string
    date: Date | null
    natureId: number
    actionsUniqueKey: string
    duration: number | null
    concluded: boolean | null
    startTime: Date | null
    finishTime: Date | null
    _count: PreventiveOSCountAggregateOutputType | null
    _avg: PreventiveOSAvgAggregateOutputType | null
    _sum: PreventiveOSSumAggregateOutputType | null
    _min: PreventiveOSMinAggregateOutputType | null
    _max: PreventiveOSMaxAggregateOutputType | null
  }

  type GetPreventiveOSGroupByPayload<T extends PreventiveOSGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PreventiveOSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventiveOSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventiveOSGroupByOutputType[P]>
            : GetScalarType<T[P], PreventiveOSGroupByOutputType[P]>
        }
      >
    >


  export type PreventiveOSSelect = {
    id?: boolean
    machineId?: boolean
    weekCode?: boolean
    date?: boolean
    natureId?: boolean
    actions?: boolean | PreventiveOS$actionsArgs
    actionsUniqueKey?: boolean
    duration?: boolean
    concluded?: boolean
    startTime?: boolean
    finishTime?: boolean
    nature?: boolean | NatureArgs
    machine?: boolean | MachineArgs
    responsible?: boolean | PreventiveOS$responsibleArgs
    actionsTaken?: boolean | PreventiveOS$actionsTakenArgs
    _count?: boolean | PreventiveOSCountOutputTypeArgs
  }


  export type PreventiveOSInclude = {
    actions?: boolean | PreventiveOS$actionsArgs
    nature?: boolean | NatureArgs
    machine?: boolean | MachineArgs
    responsible?: boolean | PreventiveOS$responsibleArgs
    actionsTaken?: boolean | PreventiveOS$actionsTakenArgs
    _count?: boolean | PreventiveOSCountOutputTypeArgs
  }

  export type PreventiveOSGetPayload<S extends boolean | null | undefined | PreventiveOSArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PreventiveOS :
    S extends undefined ? never :
    S extends { include: any } & (PreventiveOSArgs | PreventiveOSFindManyArgs)
    ? PreventiveOS  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'actions' ? Array < PreventiveActionGetPayload<S['include'][P]>>  :
        P extends 'nature' ? NatureGetPayload<S['include'][P]> :
        P extends 'machine' ? MachineGetPayload<S['include'][P]> :
        P extends 'responsible' ? Array < WorkerGetPayload<S['include'][P]>>  :
        P extends 'actionsTaken' ? Array < PreventiveActionTakenGetPayload<S['include'][P]>>  :
        P extends '_count' ? PreventiveOSCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PreventiveOSArgs | PreventiveOSFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'actions' ? Array < PreventiveActionGetPayload<S['select'][P]>>  :
        P extends 'nature' ? NatureGetPayload<S['select'][P]> :
        P extends 'machine' ? MachineGetPayload<S['select'][P]> :
        P extends 'responsible' ? Array < WorkerGetPayload<S['select'][P]>>  :
        P extends 'actionsTaken' ? Array < PreventiveActionTakenGetPayload<S['select'][P]>>  :
        P extends '_count' ? PreventiveOSCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof PreventiveOS ? PreventiveOS[P] : never
  } 
      : PreventiveOS


  type PreventiveOSCountArgs = 
    Omit<PreventiveOSFindManyArgs, 'select' | 'include'> & {
      select?: PreventiveOSCountAggregateInputType | true
    }

  export interface PreventiveOSDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one PreventiveOS that matches the filter.
     * @param {PreventiveOSFindUniqueArgs} args - Arguments to find a PreventiveOS
     * @example
     * // Get one PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PreventiveOSFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PreventiveOSFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PreventiveOS'> extends True ? Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>> : Prisma__PreventiveOSClient<PreventiveOSGetPayload<T> | null, null>

    /**
     * Find one PreventiveOS that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PreventiveOSFindUniqueOrThrowArgs} args - Arguments to find a PreventiveOS
     * @example
     * // Get one PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PreventiveOSFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PreventiveOSFindUniqueOrThrowArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Find the first PreventiveOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSFindFirstArgs} args - Arguments to find a PreventiveOS
     * @example
     * // Get one PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PreventiveOSFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PreventiveOSFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PreventiveOS'> extends True ? Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>> : Prisma__PreventiveOSClient<PreventiveOSGetPayload<T> | null, null>

    /**
     * Find the first PreventiveOS that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSFindFirstOrThrowArgs} args - Arguments to find a PreventiveOS
     * @example
     * // Get one PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PreventiveOSFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PreventiveOSFindFirstOrThrowArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Find zero or more PreventiveOS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findMany()
     * 
     * // Get first 10 PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventiveOSWithIdOnly = await prisma.preventiveOS.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PreventiveOSFindManyArgs>(
      args?: SelectSubset<T, PreventiveOSFindManyArgs>
    ): PrismaPromise<Array<PreventiveOSGetPayload<T>>>

    /**
     * Create a PreventiveOS.
     * @param {PreventiveOSCreateArgs} args - Arguments to create a PreventiveOS.
     * @example
     * // Create one PreventiveOS
     * const PreventiveOS = await prisma.preventiveOS.create({
     *   data: {
     *     // ... data to create a PreventiveOS
     *   }
     * })
     * 
    **/
    create<T extends PreventiveOSCreateArgs>(
      args: SelectSubset<T, PreventiveOSCreateArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Delete a PreventiveOS.
     * @param {PreventiveOSDeleteArgs} args - Arguments to delete one PreventiveOS.
     * @example
     * // Delete one PreventiveOS
     * const PreventiveOS = await prisma.preventiveOS.delete({
     *   where: {
     *     // ... filter to delete one PreventiveOS
     *   }
     * })
     * 
    **/
    delete<T extends PreventiveOSDeleteArgs>(
      args: SelectSubset<T, PreventiveOSDeleteArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Update one PreventiveOS.
     * @param {PreventiveOSUpdateArgs} args - Arguments to update one PreventiveOS.
     * @example
     * // Update one PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PreventiveOSUpdateArgs>(
      args: SelectSubset<T, PreventiveOSUpdateArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Delete zero or more PreventiveOS.
     * @param {PreventiveOSDeleteManyArgs} args - Arguments to filter PreventiveOS to delete.
     * @example
     * // Delete a few PreventiveOS
     * const { count } = await prisma.preventiveOS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PreventiveOSDeleteManyArgs>(
      args?: SelectSubset<T, PreventiveOSDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventiveOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PreventiveOSUpdateManyArgs>(
      args: SelectSubset<T, PreventiveOSUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PreventiveOS.
     * @param {PreventiveOSUpsertArgs} args - Arguments to update or create a PreventiveOS.
     * @example
     * // Update or create a PreventiveOS
     * const preventiveOS = await prisma.preventiveOS.upsert({
     *   create: {
     *     // ... data to create a PreventiveOS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventiveOS we want to update
     *   }
     * })
    **/
    upsert<T extends PreventiveOSUpsertArgs>(
      args: SelectSubset<T, PreventiveOSUpsertArgs>
    ): Prisma__PreventiveOSClient<PreventiveOSGetPayload<T>>

    /**
     * Count the number of PreventiveOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSCountArgs} args - Arguments to filter PreventiveOS to count.
     * @example
     * // Count the number of PreventiveOS
     * const count = await prisma.preventiveOS.count({
     *   where: {
     *     // ... the filter for the PreventiveOS we want to count
     *   }
     * })
    **/
    count<T extends PreventiveOSCountArgs>(
      args?: Subset<T, PreventiveOSCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventiveOSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventiveOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventiveOSAggregateArgs>(args: Subset<T, PreventiveOSAggregateArgs>): PrismaPromise<GetPreventiveOSAggregateType<T>>

    /**
     * Group by PreventiveOS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventiveOSGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventiveOSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventiveOSGroupByArgs['orderBy'] }
        : { orderBy?: PreventiveOSGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventiveOSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventiveOSGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventiveOS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PreventiveOSClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    actions<T extends PreventiveOS$actionsArgs= {}>(args?: Subset<T, PreventiveOS$actionsArgs>): PrismaPromise<Array<PreventiveActionGetPayload<T>>| Null>;

    nature<T extends NatureArgs= {}>(args?: Subset<T, NatureArgs>): Prisma__NatureClient<NatureGetPayload<T> | Null>;

    machine<T extends MachineArgs= {}>(args?: Subset<T, MachineArgs>): Prisma__MachineClient<MachineGetPayload<T> | Null>;

    responsible<T extends PreventiveOS$responsibleArgs= {}>(args?: Subset<T, PreventiveOS$responsibleArgs>): PrismaPromise<Array<WorkerGetPayload<T>>| Null>;

    actionsTaken<T extends PreventiveOS$actionsTakenArgs= {}>(args?: Subset<T, PreventiveOS$actionsTakenArgs>): PrismaPromise<Array<PreventiveActionTakenGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PreventiveOS base type for findUnique actions
   */
  export type PreventiveOSFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter, which PreventiveOS to fetch.
     */
    where: PreventiveOSWhereUniqueInput
  }

  /**
   * PreventiveOS findUnique
   */
  export interface PreventiveOSFindUniqueArgs extends PreventiveOSFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveOS findUniqueOrThrow
   */
  export type PreventiveOSFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter, which PreventiveOS to fetch.
     */
    where: PreventiveOSWhereUniqueInput
  }


  /**
   * PreventiveOS base type for findFirst actions
   */
  export type PreventiveOSFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter, which PreventiveOS to fetch.
     */
    where?: PreventiveOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveOS to fetch.
     */
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveOS.
     */
    cursor?: PreventiveOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveOS.
     */
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }

  /**
   * PreventiveOS findFirst
   */
  export interface PreventiveOSFindFirstArgs extends PreventiveOSFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PreventiveOS findFirstOrThrow
   */
  export type PreventiveOSFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter, which PreventiveOS to fetch.
     */
    where?: PreventiveOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveOS to fetch.
     */
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventiveOS.
     */
    cursor?: PreventiveOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveOS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventiveOS.
     */
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }


  /**
   * PreventiveOS findMany
   */
  export type PreventiveOSFindManyArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter, which PreventiveOS to fetch.
     */
    where?: PreventiveOSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventiveOS to fetch.
     */
    orderBy?: Enumerable<PreventiveOSOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventiveOS.
     */
    cursor?: PreventiveOSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventiveOS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventiveOS.
     */
    skip?: number
    distinct?: Enumerable<PreventiveOSScalarFieldEnum>
  }


  /**
   * PreventiveOS create
   */
  export type PreventiveOSCreateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * The data needed to create a PreventiveOS.
     */
    data: XOR<PreventiveOSCreateInput, PreventiveOSUncheckedCreateInput>
  }


  /**
   * PreventiveOS update
   */
  export type PreventiveOSUpdateArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * The data needed to update a PreventiveOS.
     */
    data: XOR<PreventiveOSUpdateInput, PreventiveOSUncheckedUpdateInput>
    /**
     * Choose, which PreventiveOS to update.
     */
    where: PreventiveOSWhereUniqueInput
  }


  /**
   * PreventiveOS updateMany
   */
  export type PreventiveOSUpdateManyArgs = {
    /**
     * The data used to update PreventiveOS.
     */
    data: XOR<PreventiveOSUpdateManyMutationInput, PreventiveOSUncheckedUpdateManyInput>
    /**
     * Filter which PreventiveOS to update
     */
    where?: PreventiveOSWhereInput
  }


  /**
   * PreventiveOS upsert
   */
  export type PreventiveOSUpsertArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * The filter to search for the PreventiveOS to update in case it exists.
     */
    where: PreventiveOSWhereUniqueInput
    /**
     * In case the PreventiveOS found by the `where` argument doesn't exist, create a new PreventiveOS with this data.
     */
    create: XOR<PreventiveOSCreateInput, PreventiveOSUncheckedCreateInput>
    /**
     * In case the PreventiveOS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventiveOSUpdateInput, PreventiveOSUncheckedUpdateInput>
  }


  /**
   * PreventiveOS delete
   */
  export type PreventiveOSDeleteArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
    /**
     * Filter which PreventiveOS to delete.
     */
    where: PreventiveOSWhereUniqueInput
  }


  /**
   * PreventiveOS deleteMany
   */
  export type PreventiveOSDeleteManyArgs = {
    /**
     * Filter which PreventiveOS to delete
     */
    where?: PreventiveOSWhereInput
  }


  /**
   * PreventiveOS.actions
   */
  export type PreventiveOS$actionsArgs = {
    /**
     * Select specific fields to fetch from the PreventiveAction
     */
    select?: PreventiveActionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionInclude | null
    where?: PreventiveActionWhereInput
    orderBy?: Enumerable<PreventiveActionOrderByWithRelationInput>
    cursor?: PreventiveActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveActionScalarFieldEnum>
  }


  /**
   * PreventiveOS.responsible
   */
  export type PreventiveOS$responsibleArgs = {
    /**
     * Select specific fields to fetch from the Worker
     */
    select?: WorkerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkerInclude | null
    where?: WorkerWhereInput
    orderBy?: Enumerable<WorkerOrderByWithRelationInput>
    cursor?: WorkerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WorkerScalarFieldEnum>
  }


  /**
   * PreventiveOS.actionsTaken
   */
  export type PreventiveOS$actionsTakenArgs = {
    /**
     * Select specific fields to fetch from the PreventiveActionTaken
     */
    select?: PreventiveActionTakenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveActionTakenInclude | null
    where?: PreventiveActionTakenWhereInput
    orderBy?: Enumerable<PreventiveActionTakenOrderByWithRelationInput>
    cursor?: PreventiveActionTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PreventiveActionTakenScalarFieldEnum>
  }


  /**
   * PreventiveOS without action
   */
  export type PreventiveOSArgs = {
    /**
     * Select specific fields to fetch from the PreventiveOS
     */
    select?: PreventiveOSSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PreventiveOSInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const MachineScalarFieldEnum: {
    id: 'id',
    tag: 'tag',
    ute: 'ute',
    technology: 'technology'
  };

  export type MachineScalarFieldEnum = (typeof MachineScalarFieldEnum)[keyof typeof MachineScalarFieldEnum]


  export const NatureScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type NatureScalarFieldEnum = (typeof NatureScalarFieldEnum)[keyof typeof NatureScalarFieldEnum]


  export const PreventiveActionScalarFieldEnum: {
    id: 'id',
    description: 'description',
    machineId: 'machineId',
    excution: 'excution',
    frequency: 'frequency',
    nextExecution: 'nextExecution',
    preventiveOSId: 'preventiveOSId',
    natureId: 'natureId',
    ignore: 'ignore'
  };

  export type PreventiveActionScalarFieldEnum = (typeof PreventiveActionScalarFieldEnum)[keyof typeof PreventiveActionScalarFieldEnum]


  export const PreventiveActionTakenScalarFieldEnum: {
    id: 'id',
    date: 'date',
    osId: 'osId',
    actionId: 'actionId',
    weekCode: 'weekCode'
  };

  export type PreventiveActionTakenScalarFieldEnum = (typeof PreventiveActionTakenScalarFieldEnum)[keyof typeof PreventiveActionTakenScalarFieldEnum]


  export const PreventiveOSScalarFieldEnum: {
    id: 'id',
    machineId: 'machineId',
    weekCode: 'weekCode',
    date: 'date',
    natureId: 'natureId',
    actionsUniqueKey: 'actionsUniqueKey',
    duration: 'duration',
    concluded: 'concluded',
    startTime: 'startTime',
    finishTime: 'finishTime'
  };

  export type PreventiveOSScalarFieldEnum = (typeof PreventiveOSScalarFieldEnum)[keyof typeof PreventiveOSScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WorkerScalarFieldEnum: {
    id: 'id',
    registration: 'registration',
    name: 'name',
    class: 'class'
  };

  export type WorkerScalarFieldEnum = (typeof WorkerScalarFieldEnum)[keyof typeof WorkerScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type NatureWhereInput = {
    AND?: Enumerable<NatureWhereInput>
    OR?: Enumerable<NatureWhereInput>
    NOT?: Enumerable<NatureWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    PreventiveOS?: PreventiveOSListRelationFilter
    PreventiveAction?: PreventiveActionListRelationFilter
  }

  export type NatureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    PreventiveOS?: PreventiveOSOrderByRelationAggregateInput
    PreventiveAction?: PreventiveActionOrderByRelationAggregateInput
  }

  export type NatureWhereUniqueInput = {
    id?: number
  }

  export type NatureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: NatureCountOrderByAggregateInput
    _avg?: NatureAvgOrderByAggregateInput
    _max?: NatureMaxOrderByAggregateInput
    _min?: NatureMinOrderByAggregateInput
    _sum?: NatureSumOrderByAggregateInput
  }

  export type NatureScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NatureScalarWhereWithAggregatesInput>
    OR?: Enumerable<NatureScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NatureScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type MachineWhereInput = {
    AND?: Enumerable<MachineWhereInput>
    OR?: Enumerable<MachineWhereInput>
    NOT?: Enumerable<MachineWhereInput>
    id?: IntFilter | number
    tag?: StringFilter | string
    ute?: StringFilter | string
    technology?: StringFilter | string
    PreventiveOS?: PreventiveOSListRelationFilter
    PreventiveAction?: PreventiveActionListRelationFilter
  }

  export type MachineOrderByWithRelationInput = {
    id?: SortOrder
    tag?: SortOrder
    ute?: SortOrder
    technology?: SortOrder
    PreventiveOS?: PreventiveOSOrderByRelationAggregateInput
    PreventiveAction?: PreventiveActionOrderByRelationAggregateInput
  }

  export type MachineWhereUniqueInput = {
    id?: number
    tag?: string
  }

  export type MachineOrderByWithAggregationInput = {
    id?: SortOrder
    tag?: SortOrder
    ute?: SortOrder
    technology?: SortOrder
    _count?: MachineCountOrderByAggregateInput
    _avg?: MachineAvgOrderByAggregateInput
    _max?: MachineMaxOrderByAggregateInput
    _min?: MachineMinOrderByAggregateInput
    _sum?: MachineSumOrderByAggregateInput
  }

  export type MachineScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MachineScalarWhereWithAggregatesInput>
    OR?: Enumerable<MachineScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MachineScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    tag?: StringWithAggregatesFilter | string
    ute?: StringWithAggregatesFilter | string
    technology?: StringWithAggregatesFilter | string
  }

  export type WorkerWhereInput = {
    AND?: Enumerable<WorkerWhereInput>
    OR?: Enumerable<WorkerWhereInput>
    NOT?: Enumerable<WorkerWhereInput>
    id?: IntFilter | number
    registration?: IntFilter | number
    name?: StringFilter | string
    class?: StringFilter | string
    PreventiveOs?: PreventiveOSListRelationFilter
  }

  export type WorkerOrderByWithRelationInput = {
    id?: SortOrder
    registration?: SortOrder
    name?: SortOrder
    class?: SortOrder
    PreventiveOs?: PreventiveOSOrderByRelationAggregateInput
  }

  export type WorkerWhereUniqueInput = {
    id?: number
    registration?: number
  }

  export type WorkerOrderByWithAggregationInput = {
    id?: SortOrder
    registration?: SortOrder
    name?: SortOrder
    class?: SortOrder
    _count?: WorkerCountOrderByAggregateInput
    _avg?: WorkerAvgOrderByAggregateInput
    _max?: WorkerMaxOrderByAggregateInput
    _min?: WorkerMinOrderByAggregateInput
    _sum?: WorkerSumOrderByAggregateInput
  }

  export type WorkerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WorkerScalarWhereWithAggregatesInput>
    OR?: Enumerable<WorkerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WorkerScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    registration?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    class?: StringWithAggregatesFilter | string
  }

  export type PreventiveActionTakenWhereInput = {
    AND?: Enumerable<PreventiveActionTakenWhereInput>
    OR?: Enumerable<PreventiveActionTakenWhereInput>
    NOT?: Enumerable<PreventiveActionTakenWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    osId?: IntFilter | number
    actionId?: IntFilter | number
    weekCode?: StringFilter | string
    action?: XOR<PreventiveActionRelationFilter, PreventiveActionWhereInput>
    os?: XOR<PreventiveOSRelationFilter, PreventiveOSWhereInput>
  }

  export type PreventiveActionTakenOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
    weekCode?: SortOrder
    action?: PreventiveActionOrderByWithRelationInput
    os?: PreventiveOSOrderByWithRelationInput
  }

  export type PreventiveActionTakenWhereUniqueInput = {
    id?: number
  }

  export type PreventiveActionTakenOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
    weekCode?: SortOrder
    _count?: PreventiveActionTakenCountOrderByAggregateInput
    _avg?: PreventiveActionTakenAvgOrderByAggregateInput
    _max?: PreventiveActionTakenMaxOrderByAggregateInput
    _min?: PreventiveActionTakenMinOrderByAggregateInput
    _sum?: PreventiveActionTakenSumOrderByAggregateInput
  }

  export type PreventiveActionTakenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PreventiveActionTakenScalarWhereWithAggregatesInput>
    OR?: Enumerable<PreventiveActionTakenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PreventiveActionTakenScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    date?: DateTimeWithAggregatesFilter | Date | string
    osId?: IntWithAggregatesFilter | number
    actionId?: IntWithAggregatesFilter | number
    weekCode?: StringWithAggregatesFilter | string
  }

  export type PreventiveActionWhereInput = {
    AND?: Enumerable<PreventiveActionWhereInput>
    OR?: Enumerable<PreventiveActionWhereInput>
    NOT?: Enumerable<PreventiveActionWhereInput>
    id?: IntFilter | number
    description?: StringFilter | string
    machineId?: IntFilter | number
    excution?: StringFilter | string
    frequency?: IntFilter | number
    nextExecution?: StringFilter | string
    preventiveOSId?: IntNullableFilter | number | null
    natureId?: IntFilter | number
    ignore?: BoolFilter | boolean
    machine?: XOR<MachineRelationFilter, MachineWhereInput>
    PreventiveOS?: XOR<PreventiveOSRelationFilter, PreventiveOSWhereInput> | null
    nature?: XOR<NatureRelationFilter, NatureWhereInput>
    actionsTaken?: PreventiveActionTakenListRelationFilter
  }

  export type PreventiveActionOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    machineId?: SortOrder
    excution?: SortOrder
    frequency?: SortOrder
    nextExecution?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
    ignore?: SortOrder
    machine?: MachineOrderByWithRelationInput
    PreventiveOS?: PreventiveOSOrderByWithRelationInput
    nature?: NatureOrderByWithRelationInput
    actionsTaken?: PreventiveActionTakenOrderByRelationAggregateInput
  }

  export type PreventiveActionWhereUniqueInput = {
    id?: number
  }

  export type PreventiveActionOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    machineId?: SortOrder
    excution?: SortOrder
    frequency?: SortOrder
    nextExecution?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
    ignore?: SortOrder
    _count?: PreventiveActionCountOrderByAggregateInput
    _avg?: PreventiveActionAvgOrderByAggregateInput
    _max?: PreventiveActionMaxOrderByAggregateInput
    _min?: PreventiveActionMinOrderByAggregateInput
    _sum?: PreventiveActionSumOrderByAggregateInput
  }

  export type PreventiveActionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PreventiveActionScalarWhereWithAggregatesInput>
    OR?: Enumerable<PreventiveActionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PreventiveActionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    description?: StringWithAggregatesFilter | string
    machineId?: IntWithAggregatesFilter | number
    excution?: StringWithAggregatesFilter | string
    frequency?: IntWithAggregatesFilter | number
    nextExecution?: StringWithAggregatesFilter | string
    preventiveOSId?: IntNullableWithAggregatesFilter | number | null
    natureId?: IntWithAggregatesFilter | number
    ignore?: BoolWithAggregatesFilter | boolean
  }

  export type PreventiveOSWhereInput = {
    AND?: Enumerable<PreventiveOSWhereInput>
    OR?: Enumerable<PreventiveOSWhereInput>
    NOT?: Enumerable<PreventiveOSWhereInput>
    id?: IntFilter | number
    machineId?: IntFilter | number
    weekCode?: StringFilter | string
    date?: DateTimeNullableFilter | Date | string | null
    natureId?: IntFilter | number
    actions?: PreventiveActionListRelationFilter
    actionsUniqueKey?: StringFilter | string
    duration?: IntNullableFilter | number | null
    concluded?: BoolNullableFilter | boolean | null
    startTime?: DateTimeNullableFilter | Date | string | null
    finishTime?: DateTimeNullableFilter | Date | string | null
    nature?: XOR<NatureRelationFilter, NatureWhereInput>
    machine?: XOR<MachineRelationFilter, MachineWhereInput>
    responsible?: WorkerListRelationFilter
    actionsTaken?: PreventiveActionTakenListRelationFilter
  }

  export type PreventiveOSOrderByWithRelationInput = {
    id?: SortOrder
    machineId?: SortOrder
    weekCode?: SortOrder
    date?: SortOrder
    natureId?: SortOrder
    actions?: PreventiveActionOrderByRelationAggregateInput
    actionsUniqueKey?: SortOrder
    duration?: SortOrder
    concluded?: SortOrder
    startTime?: SortOrder
    finishTime?: SortOrder
    nature?: NatureOrderByWithRelationInput
    machine?: MachineOrderByWithRelationInput
    responsible?: WorkerOrderByRelationAggregateInput
    actionsTaken?: PreventiveActionTakenOrderByRelationAggregateInput
  }

  export type PreventiveOSWhereUniqueInput = {
    id?: number
    machineId_natureId_weekCode_actionsUniqueKey?: PreventiveOSMachineIdNatureIdWeekCodeActionsUniqueKeyCompoundUniqueInput
  }

  export type PreventiveOSOrderByWithAggregationInput = {
    id?: SortOrder
    machineId?: SortOrder
    weekCode?: SortOrder
    date?: SortOrder
    natureId?: SortOrder
    actionsUniqueKey?: SortOrder
    duration?: SortOrder
    concluded?: SortOrder
    startTime?: SortOrder
    finishTime?: SortOrder
    _count?: PreventiveOSCountOrderByAggregateInput
    _avg?: PreventiveOSAvgOrderByAggregateInput
    _max?: PreventiveOSMaxOrderByAggregateInput
    _min?: PreventiveOSMinOrderByAggregateInput
    _sum?: PreventiveOSSumOrderByAggregateInput
  }

  export type PreventiveOSScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PreventiveOSScalarWhereWithAggregatesInput>
    OR?: Enumerable<PreventiveOSScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PreventiveOSScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    machineId?: IntWithAggregatesFilter | number
    weekCode?: StringWithAggregatesFilter | string
    date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    natureId?: IntWithAggregatesFilter | number
    actionsUniqueKey?: StringWithAggregatesFilter | string
    duration?: IntNullableWithAggregatesFilter | number | null
    concluded?: BoolNullableWithAggregatesFilter | boolean | null
    startTime?: DateTimeNullableWithAggregatesFilter | Date | string | null
    finishTime?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type NatureCreateInput = {
    name: string
    PreventiveOS?: PreventiveOSCreateNestedManyWithoutNatureInput
    PreventiveAction?: PreventiveActionCreateNestedManyWithoutNatureInput
  }

  export type NatureUncheckedCreateInput = {
    id?: number
    name: string
    PreventiveOS?: PreventiveOSUncheckedCreateNestedManyWithoutNatureInput
    PreventiveAction?: PreventiveActionUncheckedCreateNestedManyWithoutNatureInput
  }

  export type NatureUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUpdateManyWithoutNatureNestedInput
    PreventiveAction?: PreventiveActionUpdateManyWithoutNatureNestedInput
  }

  export type NatureUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUncheckedUpdateManyWithoutNatureNestedInput
    PreventiveAction?: PreventiveActionUncheckedUpdateManyWithoutNatureNestedInput
  }

  export type NatureUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NatureUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MachineCreateInput = {
    tag: string
    ute: string
    technology: string
    PreventiveOS?: PreventiveOSCreateNestedManyWithoutMachineInput
    PreventiveAction?: PreventiveActionCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateInput = {
    id?: number
    tag: string
    ute: string
    technology: string
    PreventiveOS?: PreventiveOSUncheckedCreateNestedManyWithoutMachineInput
    PreventiveAction?: PreventiveActionUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineUpdateInput = {
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUpdateManyWithoutMachineNestedInput
    PreventiveAction?: PreventiveActionUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUncheckedUpdateManyWithoutMachineNestedInput
    PreventiveAction?: PreventiveActionUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type MachineUpdateManyMutationInput = {
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
  }

  export type MachineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerCreateInput = {
    registration: number
    name: string
    class: string
    PreventiveOs?: PreventiveOSCreateNestedManyWithoutResponsibleInput
  }

  export type WorkerUncheckedCreateInput = {
    id?: number
    registration: number
    name: string
    class: string
    PreventiveOs?: PreventiveOSUncheckedCreateNestedManyWithoutResponsibleInput
  }

  export type WorkerUpdateInput = {
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    PreventiveOs?: PreventiveOSUpdateManyWithoutResponsibleNestedInput
  }

  export type WorkerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    PreventiveOs?: PreventiveOSUncheckedUpdateManyWithoutResponsibleNestedInput
  }

  export type WorkerUpdateManyMutationInput = {
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionTakenCreateInput = {
    date: Date | string
    weekCode: string
    action: PreventiveActionCreateNestedOneWithoutActionsTakenInput
    os: PreventiveOSCreateNestedOneWithoutActionsTakenInput
  }

  export type PreventiveActionTakenUncheckedCreateInput = {
    id?: number
    date: Date | string
    osId: number
    actionId: number
    weekCode: string
  }

  export type PreventiveActionTakenUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weekCode?: StringFieldUpdateOperationsInput | string
    action?: PreventiveActionUpdateOneRequiredWithoutActionsTakenNestedInput
    os?: PreventiveOSUpdateOneRequiredWithoutActionsTakenNestedInput
  }

  export type PreventiveActionTakenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    osId?: IntFieldUpdateOperationsInput | number
    actionId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionTakenUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weekCode?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionTakenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    osId?: IntFieldUpdateOperationsInput | number
    actionId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionCreateInput = {
    description: string
    excution: string
    frequency: number
    nextExecution: string
    ignore?: boolean
    machine: MachineCreateNestedOneWithoutPreventiveActionInput
    PreventiveOS?: PreventiveOSCreateNestedOneWithoutActionsInput
    nature: NatureCreateNestedOneWithoutPreventiveActionInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionUncheckedCreateInput = {
    id?: number
    description: string
    machineId: number
    excution: string
    frequency: number
    nextExecution: string
    preventiveOSId?: number | null
    natureId: number
    ignore?: boolean
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
    machine?: MachineUpdateOneRequiredWithoutPreventiveActionNestedInput
    PreventiveOS?: PreventiveOSUpdateOneWithoutActionsNestedInput
    nature?: NatureUpdateOneRequiredWithoutPreventiveActionNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PreventiveActionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PreventiveOSCreateInput = {
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    nature: NatureCreateNestedOneWithoutPreventiveOSInput
    machine: MachineCreateNestedOneWithoutPreventiveOSInput
    responsible?: WorkerCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUncheckedCreateInput = {
    id?: number
    machineId: number
    weekCode: string
    date?: Date | string | null
    natureId: number
    actions?: PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    responsible?: WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUpdateInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nature?: NatureUpdateOneRequiredWithoutPreventiveOSNestedInput
    machine?: MachineUpdateOneRequiredWithoutPreventiveOSNestedInput
    responsible?: WorkerUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actions?: PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responsible?: WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUpdateManyMutationInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreventiveOSUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type PreventiveOSListRelationFilter = {
    every?: PreventiveOSWhereInput
    some?: PreventiveOSWhereInput
    none?: PreventiveOSWhereInput
  }

  export type PreventiveActionListRelationFilter = {
    every?: PreventiveActionWhereInput
    some?: PreventiveActionWhereInput
    none?: PreventiveActionWhereInput
  }

  export type PreventiveOSOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreventiveActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NatureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NatureAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NatureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NatureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NatureSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type MachineCountOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    ute?: SortOrder
    technology?: SortOrder
  }

  export type MachineAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MachineMaxOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    ute?: SortOrder
    technology?: SortOrder
  }

  export type MachineMinOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    ute?: SortOrder
    technology?: SortOrder
  }

  export type MachineSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WorkerCountOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    name?: SortOrder
    class?: SortOrder
  }

  export type WorkerAvgOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
  }

  export type WorkerMaxOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    name?: SortOrder
    class?: SortOrder
  }

  export type WorkerMinOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
    name?: SortOrder
    class?: SortOrder
  }

  export type WorkerSumOrderByAggregateInput = {
    id?: SortOrder
    registration?: SortOrder
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type PreventiveActionRelationFilter = {
    is?: PreventiveActionWhereInput
    isNot?: PreventiveActionWhereInput
  }

  export type PreventiveOSRelationFilter = {
    is?: PreventiveOSWhereInput | null
    isNot?: PreventiveOSWhereInput | null
  }

  export type PreventiveActionTakenCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
    weekCode?: SortOrder
  }

  export type PreventiveActionTakenAvgOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
  }

  export type PreventiveActionTakenMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
    weekCode?: SortOrder
  }

  export type PreventiveActionTakenMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
    weekCode?: SortOrder
  }

  export type PreventiveActionTakenSumOrderByAggregateInput = {
    id?: SortOrder
    osId?: SortOrder
    actionId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type MachineRelationFilter = {
    is?: MachineWhereInput
    isNot?: MachineWhereInput
  }

  export type NatureRelationFilter = {
    is?: NatureWhereInput
    isNot?: NatureWhereInput
  }

  export type PreventiveActionTakenListRelationFilter = {
    every?: PreventiveActionTakenWhereInput
    some?: PreventiveActionTakenWhereInput
    none?: PreventiveActionTakenWhereInput
  }

  export type PreventiveActionTakenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreventiveActionCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    machineId?: SortOrder
    excution?: SortOrder
    frequency?: SortOrder
    nextExecution?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
    ignore?: SortOrder
  }

  export type PreventiveActionAvgOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    frequency?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
  }

  export type PreventiveActionMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    machineId?: SortOrder
    excution?: SortOrder
    frequency?: SortOrder
    nextExecution?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
    ignore?: SortOrder
  }

  export type PreventiveActionMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    machineId?: SortOrder
    excution?: SortOrder
    frequency?: SortOrder
    nextExecution?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
    ignore?: SortOrder
  }

  export type PreventiveActionSumOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    frequency?: SortOrder
    preventiveOSId?: SortOrder
    natureId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type WorkerListRelationFilter = {
    every?: WorkerWhereInput
    some?: WorkerWhereInput
    none?: WorkerWhereInput
  }

  export type WorkerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreventiveOSMachineIdNatureIdWeekCodeActionsUniqueKeyCompoundUniqueInput = {
    machineId: number
    natureId: number
    weekCode: string
    actionsUniqueKey: string
  }

  export type PreventiveOSCountOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    weekCode?: SortOrder
    date?: SortOrder
    natureId?: SortOrder
    actionsUniqueKey?: SortOrder
    duration?: SortOrder
    concluded?: SortOrder
    startTime?: SortOrder
    finishTime?: SortOrder
  }

  export type PreventiveOSAvgOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    natureId?: SortOrder
    duration?: SortOrder
  }

  export type PreventiveOSMaxOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    weekCode?: SortOrder
    date?: SortOrder
    natureId?: SortOrder
    actionsUniqueKey?: SortOrder
    duration?: SortOrder
    concluded?: SortOrder
    startTime?: SortOrder
    finishTime?: SortOrder
  }

  export type PreventiveOSMinOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    weekCode?: SortOrder
    date?: SortOrder
    natureId?: SortOrder
    actionsUniqueKey?: SortOrder
    duration?: SortOrder
    concluded?: SortOrder
    startTime?: SortOrder
    finishTime?: SortOrder
  }

  export type PreventiveOSSumOrderByAggregateInput = {
    id?: SortOrder
    machineId?: SortOrder
    natureId?: SortOrder
    duration?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type PreventiveOSCreateNestedManyWithoutNatureInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutNatureInput>, Enumerable<PreventiveOSUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutNatureInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveActionCreateNestedManyWithoutNatureInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutNatureInput>, Enumerable<PreventiveActionUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutNatureInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type PreventiveOSUncheckedCreateNestedManyWithoutNatureInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutNatureInput>, Enumerable<PreventiveOSUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutNatureInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveActionUncheckedCreateNestedManyWithoutNatureInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutNatureInput>, Enumerable<PreventiveActionUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutNatureInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type PreventiveOSUpdateManyWithoutNatureNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutNatureInput>, Enumerable<PreventiveOSUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutNatureInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutNatureInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutNatureInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutNatureInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveActionUpdateManyWithoutNatureNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutNatureInput>, Enumerable<PreventiveActionUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutNatureInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutNatureInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutNatureInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutNatureInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PreventiveOSUncheckedUpdateManyWithoutNatureNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutNatureInput>, Enumerable<PreventiveOSUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutNatureInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutNatureInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutNatureInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutNatureInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveActionUncheckedUpdateManyWithoutNatureNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutNatureInput>, Enumerable<PreventiveActionUncheckedCreateWithoutNatureInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutNatureInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutNatureInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutNatureInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutNatureInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type PreventiveOSCreateNestedManyWithoutMachineInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutMachineInput>, Enumerable<PreventiveOSUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutMachineInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveActionCreateNestedManyWithoutMachineInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutMachineInput>, Enumerable<PreventiveActionUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutMachineInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type PreventiveOSUncheckedCreateNestedManyWithoutMachineInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutMachineInput>, Enumerable<PreventiveOSUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutMachineInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveActionUncheckedCreateNestedManyWithoutMachineInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutMachineInput>, Enumerable<PreventiveActionUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutMachineInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type PreventiveOSUpdateManyWithoutMachineNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutMachineInput>, Enumerable<PreventiveOSUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutMachineInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutMachineInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutMachineInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutMachineInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveActionUpdateManyWithoutMachineNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutMachineInput>, Enumerable<PreventiveActionUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutMachineInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutMachineInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutMachineInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutMachineInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type PreventiveOSUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutMachineInput>, Enumerable<PreventiveOSUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutMachineInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutMachineInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutMachineInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutMachineInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveActionUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutMachineInput>, Enumerable<PreventiveActionUncheckedCreateWithoutMachineInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutMachineInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutMachineInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutMachineInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutMachineInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type PreventiveOSCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutResponsibleInput>, Enumerable<PreventiveOSUncheckedCreateWithoutResponsibleInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutResponsibleInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveOSUncheckedCreateNestedManyWithoutResponsibleInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutResponsibleInput>, Enumerable<PreventiveOSUncheckedCreateWithoutResponsibleInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutResponsibleInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
  }

  export type PreventiveOSUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutResponsibleInput>, Enumerable<PreventiveOSUncheckedCreateWithoutResponsibleInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutResponsibleInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutResponsibleInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutResponsibleInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutResponsibleInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveOSUncheckedUpdateManyWithoutResponsibleNestedInput = {
    create?: XOR<Enumerable<PreventiveOSCreateWithoutResponsibleInput>, Enumerable<PreventiveOSUncheckedCreateWithoutResponsibleInput>>
    connectOrCreate?: Enumerable<PreventiveOSCreateOrConnectWithoutResponsibleInput>
    upsert?: Enumerable<PreventiveOSUpsertWithWhereUniqueWithoutResponsibleInput>
    set?: Enumerable<PreventiveOSWhereUniqueInput>
    disconnect?: Enumerable<PreventiveOSWhereUniqueInput>
    delete?: Enumerable<PreventiveOSWhereUniqueInput>
    connect?: Enumerable<PreventiveOSWhereUniqueInput>
    update?: Enumerable<PreventiveOSUpdateWithWhereUniqueWithoutResponsibleInput>
    updateMany?: Enumerable<PreventiveOSUpdateManyWithWhereWithoutResponsibleInput>
    deleteMany?: Enumerable<PreventiveOSScalarWhereInput>
  }

  export type PreventiveActionCreateNestedOneWithoutActionsTakenInput = {
    create?: XOR<PreventiveActionCreateWithoutActionsTakenInput, PreventiveActionUncheckedCreateWithoutActionsTakenInput>
    connectOrCreate?: PreventiveActionCreateOrConnectWithoutActionsTakenInput
    connect?: PreventiveActionWhereUniqueInput
  }

  export type PreventiveOSCreateNestedOneWithoutActionsTakenInput = {
    create?: XOR<PreventiveOSCreateWithoutActionsTakenInput, PreventiveOSUncheckedCreateWithoutActionsTakenInput>
    connectOrCreate?: PreventiveOSCreateOrConnectWithoutActionsTakenInput
    connect?: PreventiveOSWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PreventiveActionUpdateOneRequiredWithoutActionsTakenNestedInput = {
    create?: XOR<PreventiveActionCreateWithoutActionsTakenInput, PreventiveActionUncheckedCreateWithoutActionsTakenInput>
    connectOrCreate?: PreventiveActionCreateOrConnectWithoutActionsTakenInput
    upsert?: PreventiveActionUpsertWithoutActionsTakenInput
    connect?: PreventiveActionWhereUniqueInput
    update?: XOR<PreventiveActionUpdateWithoutActionsTakenInput, PreventiveActionUncheckedUpdateWithoutActionsTakenInput>
  }

  export type PreventiveOSUpdateOneRequiredWithoutActionsTakenNestedInput = {
    create?: XOR<PreventiveOSCreateWithoutActionsTakenInput, PreventiveOSUncheckedCreateWithoutActionsTakenInput>
    connectOrCreate?: PreventiveOSCreateOrConnectWithoutActionsTakenInput
    upsert?: PreventiveOSUpsertWithoutActionsTakenInput
    connect?: PreventiveOSWhereUniqueInput
    update?: XOR<PreventiveOSUpdateWithoutActionsTakenInput, PreventiveOSUncheckedUpdateWithoutActionsTakenInput>
  }

  export type MachineCreateNestedOneWithoutPreventiveActionInput = {
    create?: XOR<MachineCreateWithoutPreventiveActionInput, MachineUncheckedCreateWithoutPreventiveActionInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventiveActionInput
    connect?: MachineWhereUniqueInput
  }

  export type PreventiveOSCreateNestedOneWithoutActionsInput = {
    create?: XOR<PreventiveOSCreateWithoutActionsInput, PreventiveOSUncheckedCreateWithoutActionsInput>
    connectOrCreate?: PreventiveOSCreateOrConnectWithoutActionsInput
    connect?: PreventiveOSWhereUniqueInput
  }

  export type NatureCreateNestedOneWithoutPreventiveActionInput = {
    create?: XOR<NatureCreateWithoutPreventiveActionInput, NatureUncheckedCreateWithoutPreventiveActionInput>
    connectOrCreate?: NatureCreateOrConnectWithoutPreventiveActionInput
    connect?: NatureWhereUniqueInput
  }

  export type PreventiveActionTakenCreateNestedManyWithoutActionInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutActionInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutActionInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutActionInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
  }

  export type PreventiveActionTakenUncheckedCreateNestedManyWithoutActionInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutActionInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutActionInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutActionInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MachineUpdateOneRequiredWithoutPreventiveActionNestedInput = {
    create?: XOR<MachineCreateWithoutPreventiveActionInput, MachineUncheckedCreateWithoutPreventiveActionInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventiveActionInput
    upsert?: MachineUpsertWithoutPreventiveActionInput
    connect?: MachineWhereUniqueInput
    update?: XOR<MachineUpdateWithoutPreventiveActionInput, MachineUncheckedUpdateWithoutPreventiveActionInput>
  }

  export type PreventiveOSUpdateOneWithoutActionsNestedInput = {
    create?: XOR<PreventiveOSCreateWithoutActionsInput, PreventiveOSUncheckedCreateWithoutActionsInput>
    connectOrCreate?: PreventiveOSCreateOrConnectWithoutActionsInput
    upsert?: PreventiveOSUpsertWithoutActionsInput
    disconnect?: boolean
    delete?: boolean
    connect?: PreventiveOSWhereUniqueInput
    update?: XOR<PreventiveOSUpdateWithoutActionsInput, PreventiveOSUncheckedUpdateWithoutActionsInput>
  }

  export type NatureUpdateOneRequiredWithoutPreventiveActionNestedInput = {
    create?: XOR<NatureCreateWithoutPreventiveActionInput, NatureUncheckedCreateWithoutPreventiveActionInput>
    connectOrCreate?: NatureCreateOrConnectWithoutPreventiveActionInput
    upsert?: NatureUpsertWithoutPreventiveActionInput
    connect?: NatureWhereUniqueInput
    update?: XOR<NatureUpdateWithoutPreventiveActionInput, NatureUncheckedUpdateWithoutPreventiveActionInput>
  }

  export type PreventiveActionTakenUpdateManyWithoutActionNestedInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutActionInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutActionInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutActionInput>
    upsert?: Enumerable<PreventiveActionTakenUpsertWithWhereUniqueWithoutActionInput>
    set?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    delete?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    update?: Enumerable<PreventiveActionTakenUpdateWithWhereUniqueWithoutActionInput>
    updateMany?: Enumerable<PreventiveActionTakenUpdateManyWithWhereWithoutActionInput>
    deleteMany?: Enumerable<PreventiveActionTakenScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PreventiveActionTakenUncheckedUpdateManyWithoutActionNestedInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutActionInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutActionInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutActionInput>
    upsert?: Enumerable<PreventiveActionTakenUpsertWithWhereUniqueWithoutActionInput>
    set?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    delete?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    update?: Enumerable<PreventiveActionTakenUpdateWithWhereUniqueWithoutActionInput>
    updateMany?: Enumerable<PreventiveActionTakenUpdateManyWithWhereWithoutActionInput>
    deleteMany?: Enumerable<PreventiveActionTakenScalarWhereInput>
  }

  export type PreventiveActionCreateNestedManyWithoutPreventiveOSInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutPreventiveOSInput>, Enumerable<PreventiveActionUncheckedCreateWithoutPreventiveOSInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutPreventiveOSInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type NatureCreateNestedOneWithoutPreventiveOSInput = {
    create?: XOR<NatureCreateWithoutPreventiveOSInput, NatureUncheckedCreateWithoutPreventiveOSInput>
    connectOrCreate?: NatureCreateOrConnectWithoutPreventiveOSInput
    connect?: NatureWhereUniqueInput
  }

  export type MachineCreateNestedOneWithoutPreventiveOSInput = {
    create?: XOR<MachineCreateWithoutPreventiveOSInput, MachineUncheckedCreateWithoutPreventiveOSInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventiveOSInput
    connect?: MachineWhereUniqueInput
  }

  export type WorkerCreateNestedManyWithoutPreventiveOsInput = {
    create?: XOR<Enumerable<WorkerCreateWithoutPreventiveOsInput>, Enumerable<WorkerUncheckedCreateWithoutPreventiveOsInput>>
    connectOrCreate?: Enumerable<WorkerCreateOrConnectWithoutPreventiveOsInput>
    connect?: Enumerable<WorkerWhereUniqueInput>
  }

  export type PreventiveActionTakenCreateNestedManyWithoutOsInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutOsInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutOsInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutOsInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
  }

  export type PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutPreventiveOSInput>, Enumerable<PreventiveActionUncheckedCreateWithoutPreventiveOSInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutPreventiveOSInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
  }

  export type WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput = {
    create?: XOR<Enumerable<WorkerCreateWithoutPreventiveOsInput>, Enumerable<WorkerUncheckedCreateWithoutPreventiveOsInput>>
    connectOrCreate?: Enumerable<WorkerCreateOrConnectWithoutPreventiveOsInput>
    connect?: Enumerable<WorkerWhereUniqueInput>
  }

  export type PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutOsInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutOsInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutOsInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PreventiveActionUpdateManyWithoutPreventiveOSNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutPreventiveOSInput>, Enumerable<PreventiveActionUncheckedCreateWithoutPreventiveOSInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutPreventiveOSInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutPreventiveOSInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutPreventiveOSInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutPreventiveOSInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NatureUpdateOneRequiredWithoutPreventiveOSNestedInput = {
    create?: XOR<NatureCreateWithoutPreventiveOSInput, NatureUncheckedCreateWithoutPreventiveOSInput>
    connectOrCreate?: NatureCreateOrConnectWithoutPreventiveOSInput
    upsert?: NatureUpsertWithoutPreventiveOSInput
    connect?: NatureWhereUniqueInput
    update?: XOR<NatureUpdateWithoutPreventiveOSInput, NatureUncheckedUpdateWithoutPreventiveOSInput>
  }

  export type MachineUpdateOneRequiredWithoutPreventiveOSNestedInput = {
    create?: XOR<MachineCreateWithoutPreventiveOSInput, MachineUncheckedCreateWithoutPreventiveOSInput>
    connectOrCreate?: MachineCreateOrConnectWithoutPreventiveOSInput
    upsert?: MachineUpsertWithoutPreventiveOSInput
    connect?: MachineWhereUniqueInput
    update?: XOR<MachineUpdateWithoutPreventiveOSInput, MachineUncheckedUpdateWithoutPreventiveOSInput>
  }

  export type WorkerUpdateManyWithoutPreventiveOsNestedInput = {
    create?: XOR<Enumerable<WorkerCreateWithoutPreventiveOsInput>, Enumerable<WorkerUncheckedCreateWithoutPreventiveOsInput>>
    connectOrCreate?: Enumerable<WorkerCreateOrConnectWithoutPreventiveOsInput>
    upsert?: Enumerable<WorkerUpsertWithWhereUniqueWithoutPreventiveOsInput>
    set?: Enumerable<WorkerWhereUniqueInput>
    disconnect?: Enumerable<WorkerWhereUniqueInput>
    delete?: Enumerable<WorkerWhereUniqueInput>
    connect?: Enumerable<WorkerWhereUniqueInput>
    update?: Enumerable<WorkerUpdateWithWhereUniqueWithoutPreventiveOsInput>
    updateMany?: Enumerable<WorkerUpdateManyWithWhereWithoutPreventiveOsInput>
    deleteMany?: Enumerable<WorkerScalarWhereInput>
  }

  export type PreventiveActionTakenUpdateManyWithoutOsNestedInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutOsInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutOsInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutOsInput>
    upsert?: Enumerable<PreventiveActionTakenUpsertWithWhereUniqueWithoutOsInput>
    set?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    delete?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    update?: Enumerable<PreventiveActionTakenUpdateWithWhereUniqueWithoutOsInput>
    updateMany?: Enumerable<PreventiveActionTakenUpdateManyWithWhereWithoutOsInput>
    deleteMany?: Enumerable<PreventiveActionTakenScalarWhereInput>
  }

  export type PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput = {
    create?: XOR<Enumerable<PreventiveActionCreateWithoutPreventiveOSInput>, Enumerable<PreventiveActionUncheckedCreateWithoutPreventiveOSInput>>
    connectOrCreate?: Enumerable<PreventiveActionCreateOrConnectWithoutPreventiveOSInput>
    upsert?: Enumerable<PreventiveActionUpsertWithWhereUniqueWithoutPreventiveOSInput>
    set?: Enumerable<PreventiveActionWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionWhereUniqueInput>
    delete?: Enumerable<PreventiveActionWhereUniqueInput>
    connect?: Enumerable<PreventiveActionWhereUniqueInput>
    update?: Enumerable<PreventiveActionUpdateWithWhereUniqueWithoutPreventiveOSInput>
    updateMany?: Enumerable<PreventiveActionUpdateManyWithWhereWithoutPreventiveOSInput>
    deleteMany?: Enumerable<PreventiveActionScalarWhereInput>
  }

  export type WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput = {
    create?: XOR<Enumerable<WorkerCreateWithoutPreventiveOsInput>, Enumerable<WorkerUncheckedCreateWithoutPreventiveOsInput>>
    connectOrCreate?: Enumerable<WorkerCreateOrConnectWithoutPreventiveOsInput>
    upsert?: Enumerable<WorkerUpsertWithWhereUniqueWithoutPreventiveOsInput>
    set?: Enumerable<WorkerWhereUniqueInput>
    disconnect?: Enumerable<WorkerWhereUniqueInput>
    delete?: Enumerable<WorkerWhereUniqueInput>
    connect?: Enumerable<WorkerWhereUniqueInput>
    update?: Enumerable<WorkerUpdateWithWhereUniqueWithoutPreventiveOsInput>
    updateMany?: Enumerable<WorkerUpdateManyWithWhereWithoutPreventiveOsInput>
    deleteMany?: Enumerable<WorkerScalarWhereInput>
  }

  export type PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput = {
    create?: XOR<Enumerable<PreventiveActionTakenCreateWithoutOsInput>, Enumerable<PreventiveActionTakenUncheckedCreateWithoutOsInput>>
    connectOrCreate?: Enumerable<PreventiveActionTakenCreateOrConnectWithoutOsInput>
    upsert?: Enumerable<PreventiveActionTakenUpsertWithWhereUniqueWithoutOsInput>
    set?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    disconnect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    delete?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    connect?: Enumerable<PreventiveActionTakenWhereUniqueInput>
    update?: Enumerable<PreventiveActionTakenUpdateWithWhereUniqueWithoutOsInput>
    updateMany?: Enumerable<PreventiveActionTakenUpdateManyWithWhereWithoutOsInput>
    deleteMany?: Enumerable<PreventiveActionTakenScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type PreventiveOSCreateWithoutNatureInput = {
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    machine: MachineCreateNestedOneWithoutPreventiveOSInput
    responsible?: WorkerCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUncheckedCreateWithoutNatureInput = {
    id?: number
    machineId: number
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    responsible?: WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSCreateOrConnectWithoutNatureInput = {
    where: PreventiveOSWhereUniqueInput
    create: XOR<PreventiveOSCreateWithoutNatureInput, PreventiveOSUncheckedCreateWithoutNatureInput>
  }

  export type PreventiveActionCreateWithoutNatureInput = {
    description: string
    excution: string
    frequency: number
    nextExecution: string
    ignore?: boolean
    machine: MachineCreateNestedOneWithoutPreventiveActionInput
    PreventiveOS?: PreventiveOSCreateNestedOneWithoutActionsInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionUncheckedCreateWithoutNatureInput = {
    id?: number
    description: string
    machineId: number
    excution: string
    frequency: number
    nextExecution: string
    preventiveOSId?: number | null
    ignore?: boolean
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionCreateOrConnectWithoutNatureInput = {
    where: PreventiveActionWhereUniqueInput
    create: XOR<PreventiveActionCreateWithoutNatureInput, PreventiveActionUncheckedCreateWithoutNatureInput>
  }

  export type PreventiveOSUpsertWithWhereUniqueWithoutNatureInput = {
    where: PreventiveOSWhereUniqueInput
    update: XOR<PreventiveOSUpdateWithoutNatureInput, PreventiveOSUncheckedUpdateWithoutNatureInput>
    create: XOR<PreventiveOSCreateWithoutNatureInput, PreventiveOSUncheckedCreateWithoutNatureInput>
  }

  export type PreventiveOSUpdateWithWhereUniqueWithoutNatureInput = {
    where: PreventiveOSWhereUniqueInput
    data: XOR<PreventiveOSUpdateWithoutNatureInput, PreventiveOSUncheckedUpdateWithoutNatureInput>
  }

  export type PreventiveOSUpdateManyWithWhereWithoutNatureInput = {
    where: PreventiveOSScalarWhereInput
    data: XOR<PreventiveOSUpdateManyMutationInput, PreventiveOSUncheckedUpdateManyWithoutPreventiveOSInput>
  }

  export type PreventiveOSScalarWhereInput = {
    AND?: Enumerable<PreventiveOSScalarWhereInput>
    OR?: Enumerable<PreventiveOSScalarWhereInput>
    NOT?: Enumerable<PreventiveOSScalarWhereInput>
    id?: IntFilter | number
    machineId?: IntFilter | number
    weekCode?: StringFilter | string
    date?: DateTimeNullableFilter | Date | string | null
    natureId?: IntFilter | number
    actionsUniqueKey?: StringFilter | string
    duration?: IntNullableFilter | number | null
    concluded?: BoolNullableFilter | boolean | null
    startTime?: DateTimeNullableFilter | Date | string | null
    finishTime?: DateTimeNullableFilter | Date | string | null
  }

  export type PreventiveActionUpsertWithWhereUniqueWithoutNatureInput = {
    where: PreventiveActionWhereUniqueInput
    update: XOR<PreventiveActionUpdateWithoutNatureInput, PreventiveActionUncheckedUpdateWithoutNatureInput>
    create: XOR<PreventiveActionCreateWithoutNatureInput, PreventiveActionUncheckedCreateWithoutNatureInput>
  }

  export type PreventiveActionUpdateWithWhereUniqueWithoutNatureInput = {
    where: PreventiveActionWhereUniqueInput
    data: XOR<PreventiveActionUpdateWithoutNatureInput, PreventiveActionUncheckedUpdateWithoutNatureInput>
  }

  export type PreventiveActionUpdateManyWithWhereWithoutNatureInput = {
    where: PreventiveActionScalarWhereInput
    data: XOR<PreventiveActionUpdateManyMutationInput, PreventiveActionUncheckedUpdateManyWithoutPreventiveActionInput>
  }

  export type PreventiveActionScalarWhereInput = {
    AND?: Enumerable<PreventiveActionScalarWhereInput>
    OR?: Enumerable<PreventiveActionScalarWhereInput>
    NOT?: Enumerable<PreventiveActionScalarWhereInput>
    id?: IntFilter | number
    description?: StringFilter | string
    machineId?: IntFilter | number
    excution?: StringFilter | string
    frequency?: IntFilter | number
    nextExecution?: StringFilter | string
    preventiveOSId?: IntNullableFilter | number | null
    natureId?: IntFilter | number
    ignore?: BoolFilter | boolean
  }

  export type PreventiveOSCreateWithoutMachineInput = {
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    nature: NatureCreateNestedOneWithoutPreventiveOSInput
    responsible?: WorkerCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUncheckedCreateWithoutMachineInput = {
    id?: number
    weekCode: string
    date?: Date | string | null
    natureId: number
    actions?: PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    responsible?: WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSCreateOrConnectWithoutMachineInput = {
    where: PreventiveOSWhereUniqueInput
    create: XOR<PreventiveOSCreateWithoutMachineInput, PreventiveOSUncheckedCreateWithoutMachineInput>
  }

  export type PreventiveActionCreateWithoutMachineInput = {
    description: string
    excution: string
    frequency: number
    nextExecution: string
    ignore?: boolean
    PreventiveOS?: PreventiveOSCreateNestedOneWithoutActionsInput
    nature: NatureCreateNestedOneWithoutPreventiveActionInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionUncheckedCreateWithoutMachineInput = {
    id?: number
    description: string
    excution: string
    frequency: number
    nextExecution: string
    preventiveOSId?: number | null
    natureId: number
    ignore?: boolean
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionCreateOrConnectWithoutMachineInput = {
    where: PreventiveActionWhereUniqueInput
    create: XOR<PreventiveActionCreateWithoutMachineInput, PreventiveActionUncheckedCreateWithoutMachineInput>
  }

  export type PreventiveOSUpsertWithWhereUniqueWithoutMachineInput = {
    where: PreventiveOSWhereUniqueInput
    update: XOR<PreventiveOSUpdateWithoutMachineInput, PreventiveOSUncheckedUpdateWithoutMachineInput>
    create: XOR<PreventiveOSCreateWithoutMachineInput, PreventiveOSUncheckedCreateWithoutMachineInput>
  }

  export type PreventiveOSUpdateWithWhereUniqueWithoutMachineInput = {
    where: PreventiveOSWhereUniqueInput
    data: XOR<PreventiveOSUpdateWithoutMachineInput, PreventiveOSUncheckedUpdateWithoutMachineInput>
  }

  export type PreventiveOSUpdateManyWithWhereWithoutMachineInput = {
    where: PreventiveOSScalarWhereInput
    data: XOR<PreventiveOSUpdateManyMutationInput, PreventiveOSUncheckedUpdateManyWithoutPreventiveOSInput>
  }

  export type PreventiveActionUpsertWithWhereUniqueWithoutMachineInput = {
    where: PreventiveActionWhereUniqueInput
    update: XOR<PreventiveActionUpdateWithoutMachineInput, PreventiveActionUncheckedUpdateWithoutMachineInput>
    create: XOR<PreventiveActionCreateWithoutMachineInput, PreventiveActionUncheckedCreateWithoutMachineInput>
  }

  export type PreventiveActionUpdateWithWhereUniqueWithoutMachineInput = {
    where: PreventiveActionWhereUniqueInput
    data: XOR<PreventiveActionUpdateWithoutMachineInput, PreventiveActionUncheckedUpdateWithoutMachineInput>
  }

  export type PreventiveActionUpdateManyWithWhereWithoutMachineInput = {
    where: PreventiveActionScalarWhereInput
    data: XOR<PreventiveActionUpdateManyMutationInput, PreventiveActionUncheckedUpdateManyWithoutPreventiveActionInput>
  }

  export type PreventiveOSCreateWithoutResponsibleInput = {
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    nature: NatureCreateNestedOneWithoutPreventiveOSInput
    machine: MachineCreateNestedOneWithoutPreventiveOSInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUncheckedCreateWithoutResponsibleInput = {
    id?: number
    machineId: number
    weekCode: string
    date?: Date | string | null
    natureId: number
    actions?: PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSCreateOrConnectWithoutResponsibleInput = {
    where: PreventiveOSWhereUniqueInput
    create: XOR<PreventiveOSCreateWithoutResponsibleInput, PreventiveOSUncheckedCreateWithoutResponsibleInput>
  }

  export type PreventiveOSUpsertWithWhereUniqueWithoutResponsibleInput = {
    where: PreventiveOSWhereUniqueInput
    update: XOR<PreventiveOSUpdateWithoutResponsibleInput, PreventiveOSUncheckedUpdateWithoutResponsibleInput>
    create: XOR<PreventiveOSCreateWithoutResponsibleInput, PreventiveOSUncheckedCreateWithoutResponsibleInput>
  }

  export type PreventiveOSUpdateWithWhereUniqueWithoutResponsibleInput = {
    where: PreventiveOSWhereUniqueInput
    data: XOR<PreventiveOSUpdateWithoutResponsibleInput, PreventiveOSUncheckedUpdateWithoutResponsibleInput>
  }

  export type PreventiveOSUpdateManyWithWhereWithoutResponsibleInput = {
    where: PreventiveOSScalarWhereInput
    data: XOR<PreventiveOSUpdateManyMutationInput, PreventiveOSUncheckedUpdateManyWithoutPreventiveOsInput>
  }

  export type PreventiveActionCreateWithoutActionsTakenInput = {
    description: string
    excution: string
    frequency: number
    nextExecution: string
    ignore?: boolean
    machine: MachineCreateNestedOneWithoutPreventiveActionInput
    PreventiveOS?: PreventiveOSCreateNestedOneWithoutActionsInput
    nature: NatureCreateNestedOneWithoutPreventiveActionInput
  }

  export type PreventiveActionUncheckedCreateWithoutActionsTakenInput = {
    id?: number
    description: string
    machineId: number
    excution: string
    frequency: number
    nextExecution: string
    preventiveOSId?: number | null
    natureId: number
    ignore?: boolean
  }

  export type PreventiveActionCreateOrConnectWithoutActionsTakenInput = {
    where: PreventiveActionWhereUniqueInput
    create: XOR<PreventiveActionCreateWithoutActionsTakenInput, PreventiveActionUncheckedCreateWithoutActionsTakenInput>
  }

  export type PreventiveOSCreateWithoutActionsTakenInput = {
    weekCode: string
    date?: Date | string | null
    actions?: PreventiveActionCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    nature: NatureCreateNestedOneWithoutPreventiveOSInput
    machine: MachineCreateNestedOneWithoutPreventiveOSInput
    responsible?: WorkerCreateNestedManyWithoutPreventiveOsInput
  }

  export type PreventiveOSUncheckedCreateWithoutActionsTakenInput = {
    id?: number
    machineId: number
    weekCode: string
    date?: Date | string | null
    natureId: number
    actions?: PreventiveActionUncheckedCreateNestedManyWithoutPreventiveOSInput
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    responsible?: WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput
  }

  export type PreventiveOSCreateOrConnectWithoutActionsTakenInput = {
    where: PreventiveOSWhereUniqueInput
    create: XOR<PreventiveOSCreateWithoutActionsTakenInput, PreventiveOSUncheckedCreateWithoutActionsTakenInput>
  }

  export type PreventiveActionUpsertWithoutActionsTakenInput = {
    update: XOR<PreventiveActionUpdateWithoutActionsTakenInput, PreventiveActionUncheckedUpdateWithoutActionsTakenInput>
    create: XOR<PreventiveActionCreateWithoutActionsTakenInput, PreventiveActionUncheckedCreateWithoutActionsTakenInput>
  }

  export type PreventiveActionUpdateWithoutActionsTakenInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
    machine?: MachineUpdateOneRequiredWithoutPreventiveActionNestedInput
    PreventiveOS?: PreventiveOSUpdateOneWithoutActionsNestedInput
    nature?: NatureUpdateOneRequiredWithoutPreventiveActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateWithoutActionsTakenInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PreventiveOSUpsertWithoutActionsTakenInput = {
    update: XOR<PreventiveOSUpdateWithoutActionsTakenInput, PreventiveOSUncheckedUpdateWithoutActionsTakenInput>
    create: XOR<PreventiveOSCreateWithoutActionsTakenInput, PreventiveOSUncheckedCreateWithoutActionsTakenInput>
  }

  export type PreventiveOSUpdateWithoutActionsTakenInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nature?: NatureUpdateOneRequiredWithoutPreventiveOSNestedInput
    machine?: MachineUpdateOneRequiredWithoutPreventiveOSNestedInput
    responsible?: WorkerUpdateManyWithoutPreventiveOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateWithoutActionsTakenInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actions?: PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responsible?: WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput
  }

  export type MachineCreateWithoutPreventiveActionInput = {
    tag: string
    ute: string
    technology: string
    PreventiveOS?: PreventiveOSCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutPreventiveActionInput = {
    id?: number
    tag: string
    ute: string
    technology: string
    PreventiveOS?: PreventiveOSUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutPreventiveActionInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutPreventiveActionInput, MachineUncheckedCreateWithoutPreventiveActionInput>
  }

  export type PreventiveOSCreateWithoutActionsInput = {
    weekCode: string
    date?: Date | string | null
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    nature: NatureCreateNestedOneWithoutPreventiveOSInput
    machine: MachineCreateNestedOneWithoutPreventiveOSInput
    responsible?: WorkerCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSUncheckedCreateWithoutActionsInput = {
    id?: number
    machineId: number
    weekCode: string
    date?: Date | string | null
    natureId: number
    actionsUniqueKey: string
    duration?: number | null
    concluded?: boolean | null
    startTime?: Date | string | null
    finishTime?: Date | string | null
    responsible?: WorkerUncheckedCreateNestedManyWithoutPreventiveOsInput
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutOsInput
  }

  export type PreventiveOSCreateOrConnectWithoutActionsInput = {
    where: PreventiveOSWhereUniqueInput
    create: XOR<PreventiveOSCreateWithoutActionsInput, PreventiveOSUncheckedCreateWithoutActionsInput>
  }

  export type NatureCreateWithoutPreventiveActionInput = {
    name: string
    PreventiveOS?: PreventiveOSCreateNestedManyWithoutNatureInput
  }

  export type NatureUncheckedCreateWithoutPreventiveActionInput = {
    id?: number
    name: string
    PreventiveOS?: PreventiveOSUncheckedCreateNestedManyWithoutNatureInput
  }

  export type NatureCreateOrConnectWithoutPreventiveActionInput = {
    where: NatureWhereUniqueInput
    create: XOR<NatureCreateWithoutPreventiveActionInput, NatureUncheckedCreateWithoutPreventiveActionInput>
  }

  export type PreventiveActionTakenCreateWithoutActionInput = {
    date: Date | string
    weekCode: string
    os: PreventiveOSCreateNestedOneWithoutActionsTakenInput
  }

  export type PreventiveActionTakenUncheckedCreateWithoutActionInput = {
    id?: number
    date: Date | string
    osId: number
    weekCode: string
  }

  export type PreventiveActionTakenCreateOrConnectWithoutActionInput = {
    where: PreventiveActionTakenWhereUniqueInput
    create: XOR<PreventiveActionTakenCreateWithoutActionInput, PreventiveActionTakenUncheckedCreateWithoutActionInput>
  }

  export type MachineUpsertWithoutPreventiveActionInput = {
    update: XOR<MachineUpdateWithoutPreventiveActionInput, MachineUncheckedUpdateWithoutPreventiveActionInput>
    create: XOR<MachineCreateWithoutPreventiveActionInput, MachineUncheckedCreateWithoutPreventiveActionInput>
  }

  export type MachineUpdateWithoutPreventiveActionInput = {
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutPreventiveActionInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type PreventiveOSUpsertWithoutActionsInput = {
    update: XOR<PreventiveOSUpdateWithoutActionsInput, PreventiveOSUncheckedUpdateWithoutActionsInput>
    create: XOR<PreventiveOSCreateWithoutActionsInput, PreventiveOSUncheckedCreateWithoutActionsInput>
  }

  export type PreventiveOSUpdateWithoutActionsInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nature?: NatureUpdateOneRequiredWithoutPreventiveOSNestedInput
    machine?: MachineUpdateOneRequiredWithoutPreventiveOSNestedInput
    responsible?: WorkerUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateWithoutActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responsible?: WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput
  }

  export type NatureUpsertWithoutPreventiveActionInput = {
    update: XOR<NatureUpdateWithoutPreventiveActionInput, NatureUncheckedUpdateWithoutPreventiveActionInput>
    create: XOR<NatureCreateWithoutPreventiveActionInput, NatureUncheckedCreateWithoutPreventiveActionInput>
  }

  export type NatureUpdateWithoutPreventiveActionInput = {
    name?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUpdateManyWithoutNatureNestedInput
  }

  export type NatureUncheckedUpdateWithoutPreventiveActionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    PreventiveOS?: PreventiveOSUncheckedUpdateManyWithoutNatureNestedInput
  }

  export type PreventiveActionTakenUpsertWithWhereUniqueWithoutActionInput = {
    where: PreventiveActionTakenWhereUniqueInput
    update: XOR<PreventiveActionTakenUpdateWithoutActionInput, PreventiveActionTakenUncheckedUpdateWithoutActionInput>
    create: XOR<PreventiveActionTakenCreateWithoutActionInput, PreventiveActionTakenUncheckedCreateWithoutActionInput>
  }

  export type PreventiveActionTakenUpdateWithWhereUniqueWithoutActionInput = {
    where: PreventiveActionTakenWhereUniqueInput
    data: XOR<PreventiveActionTakenUpdateWithoutActionInput, PreventiveActionTakenUncheckedUpdateWithoutActionInput>
  }

  export type PreventiveActionTakenUpdateManyWithWhereWithoutActionInput = {
    where: PreventiveActionTakenScalarWhereInput
    data: XOR<PreventiveActionTakenUpdateManyMutationInput, PreventiveActionTakenUncheckedUpdateManyWithoutActionsTakenInput>
  }

  export type PreventiveActionTakenScalarWhereInput = {
    AND?: Enumerable<PreventiveActionTakenScalarWhereInput>
    OR?: Enumerable<PreventiveActionTakenScalarWhereInput>
    NOT?: Enumerable<PreventiveActionTakenScalarWhereInput>
    id?: IntFilter | number
    date?: DateTimeFilter | Date | string
    osId?: IntFilter | number
    actionId?: IntFilter | number
    weekCode?: StringFilter | string
  }

  export type PreventiveActionCreateWithoutPreventiveOSInput = {
    description: string
    excution: string
    frequency: number
    nextExecution: string
    ignore?: boolean
    machine: MachineCreateNestedOneWithoutPreventiveActionInput
    nature: NatureCreateNestedOneWithoutPreventiveActionInput
    actionsTaken?: PreventiveActionTakenCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionUncheckedCreateWithoutPreventiveOSInput = {
    id?: number
    description: string
    machineId: number
    excution: string
    frequency: number
    nextExecution: string
    natureId: number
    ignore?: boolean
    actionsTaken?: PreventiveActionTakenUncheckedCreateNestedManyWithoutActionInput
  }

  export type PreventiveActionCreateOrConnectWithoutPreventiveOSInput = {
    where: PreventiveActionWhereUniqueInput
    create: XOR<PreventiveActionCreateWithoutPreventiveOSInput, PreventiveActionUncheckedCreateWithoutPreventiveOSInput>
  }

  export type NatureCreateWithoutPreventiveOSInput = {
    name: string
    PreventiveAction?: PreventiveActionCreateNestedManyWithoutNatureInput
  }

  export type NatureUncheckedCreateWithoutPreventiveOSInput = {
    id?: number
    name: string
    PreventiveAction?: PreventiveActionUncheckedCreateNestedManyWithoutNatureInput
  }

  export type NatureCreateOrConnectWithoutPreventiveOSInput = {
    where: NatureWhereUniqueInput
    create: XOR<NatureCreateWithoutPreventiveOSInput, NatureUncheckedCreateWithoutPreventiveOSInput>
  }

  export type MachineCreateWithoutPreventiveOSInput = {
    tag: string
    ute: string
    technology: string
    PreventiveAction?: PreventiveActionCreateNestedManyWithoutMachineInput
  }

  export type MachineUncheckedCreateWithoutPreventiveOSInput = {
    id?: number
    tag: string
    ute: string
    technology: string
    PreventiveAction?: PreventiveActionUncheckedCreateNestedManyWithoutMachineInput
  }

  export type MachineCreateOrConnectWithoutPreventiveOSInput = {
    where: MachineWhereUniqueInput
    create: XOR<MachineCreateWithoutPreventiveOSInput, MachineUncheckedCreateWithoutPreventiveOSInput>
  }

  export type WorkerCreateWithoutPreventiveOsInput = {
    registration: number
    name: string
    class: string
  }

  export type WorkerUncheckedCreateWithoutPreventiveOsInput = {
    id?: number
    registration: number
    name: string
    class: string
  }

  export type WorkerCreateOrConnectWithoutPreventiveOsInput = {
    where: WorkerWhereUniqueInput
    create: XOR<WorkerCreateWithoutPreventiveOsInput, WorkerUncheckedCreateWithoutPreventiveOsInput>
  }

  export type PreventiveActionTakenCreateWithoutOsInput = {
    date: Date | string
    weekCode: string
    action: PreventiveActionCreateNestedOneWithoutActionsTakenInput
  }

  export type PreventiveActionTakenUncheckedCreateWithoutOsInput = {
    id?: number
    date: Date | string
    actionId: number
    weekCode: string
  }

  export type PreventiveActionTakenCreateOrConnectWithoutOsInput = {
    where: PreventiveActionTakenWhereUniqueInput
    create: XOR<PreventiveActionTakenCreateWithoutOsInput, PreventiveActionTakenUncheckedCreateWithoutOsInput>
  }

  export type PreventiveActionUpsertWithWhereUniqueWithoutPreventiveOSInput = {
    where: PreventiveActionWhereUniqueInput
    update: XOR<PreventiveActionUpdateWithoutPreventiveOSInput, PreventiveActionUncheckedUpdateWithoutPreventiveOSInput>
    create: XOR<PreventiveActionCreateWithoutPreventiveOSInput, PreventiveActionUncheckedCreateWithoutPreventiveOSInput>
  }

  export type PreventiveActionUpdateWithWhereUniqueWithoutPreventiveOSInput = {
    where: PreventiveActionWhereUniqueInput
    data: XOR<PreventiveActionUpdateWithoutPreventiveOSInput, PreventiveActionUncheckedUpdateWithoutPreventiveOSInput>
  }

  export type PreventiveActionUpdateManyWithWhereWithoutPreventiveOSInput = {
    where: PreventiveActionScalarWhereInput
    data: XOR<PreventiveActionUpdateManyMutationInput, PreventiveActionUncheckedUpdateManyWithoutActionsInput>
  }

  export type NatureUpsertWithoutPreventiveOSInput = {
    update: XOR<NatureUpdateWithoutPreventiveOSInput, NatureUncheckedUpdateWithoutPreventiveOSInput>
    create: XOR<NatureCreateWithoutPreventiveOSInput, NatureUncheckedCreateWithoutPreventiveOSInput>
  }

  export type NatureUpdateWithoutPreventiveOSInput = {
    name?: StringFieldUpdateOperationsInput | string
    PreventiveAction?: PreventiveActionUpdateManyWithoutNatureNestedInput
  }

  export type NatureUncheckedUpdateWithoutPreventiveOSInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    PreventiveAction?: PreventiveActionUncheckedUpdateManyWithoutNatureNestedInput
  }

  export type MachineUpsertWithoutPreventiveOSInput = {
    update: XOR<MachineUpdateWithoutPreventiveOSInput, MachineUncheckedUpdateWithoutPreventiveOSInput>
    create: XOR<MachineCreateWithoutPreventiveOSInput, MachineUncheckedCreateWithoutPreventiveOSInput>
  }

  export type MachineUpdateWithoutPreventiveOSInput = {
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveAction?: PreventiveActionUpdateManyWithoutMachineNestedInput
  }

  export type MachineUncheckedUpdateWithoutPreventiveOSInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    ute?: StringFieldUpdateOperationsInput | string
    technology?: StringFieldUpdateOperationsInput | string
    PreventiveAction?: PreventiveActionUncheckedUpdateManyWithoutMachineNestedInput
  }

  export type WorkerUpsertWithWhereUniqueWithoutPreventiveOsInput = {
    where: WorkerWhereUniqueInput
    update: XOR<WorkerUpdateWithoutPreventiveOsInput, WorkerUncheckedUpdateWithoutPreventiveOsInput>
    create: XOR<WorkerCreateWithoutPreventiveOsInput, WorkerUncheckedCreateWithoutPreventiveOsInput>
  }

  export type WorkerUpdateWithWhereUniqueWithoutPreventiveOsInput = {
    where: WorkerWhereUniqueInput
    data: XOR<WorkerUpdateWithoutPreventiveOsInput, WorkerUncheckedUpdateWithoutPreventiveOsInput>
  }

  export type WorkerUpdateManyWithWhereWithoutPreventiveOsInput = {
    where: WorkerScalarWhereInput
    data: XOR<WorkerUpdateManyMutationInput, WorkerUncheckedUpdateManyWithoutResponsibleInput>
  }

  export type WorkerScalarWhereInput = {
    AND?: Enumerable<WorkerScalarWhereInput>
    OR?: Enumerable<WorkerScalarWhereInput>
    NOT?: Enumerable<WorkerScalarWhereInput>
    id?: IntFilter | number
    registration?: IntFilter | number
    name?: StringFilter | string
    class?: StringFilter | string
  }

  export type PreventiveActionTakenUpsertWithWhereUniqueWithoutOsInput = {
    where: PreventiveActionTakenWhereUniqueInput
    update: XOR<PreventiveActionTakenUpdateWithoutOsInput, PreventiveActionTakenUncheckedUpdateWithoutOsInput>
    create: XOR<PreventiveActionTakenCreateWithoutOsInput, PreventiveActionTakenUncheckedCreateWithoutOsInput>
  }

  export type PreventiveActionTakenUpdateWithWhereUniqueWithoutOsInput = {
    where: PreventiveActionTakenWhereUniqueInput
    data: XOR<PreventiveActionTakenUpdateWithoutOsInput, PreventiveActionTakenUncheckedUpdateWithoutOsInput>
  }

  export type PreventiveActionTakenUpdateManyWithWhereWithoutOsInput = {
    where: PreventiveActionTakenScalarWhereInput
    data: XOR<PreventiveActionTakenUpdateManyMutationInput, PreventiveActionTakenUncheckedUpdateManyWithoutActionsTakenInput>
  }

  export type PreventiveOSUpdateWithoutNatureInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    machine?: MachineUpdateOneRequiredWithoutPreventiveOSNestedInput
    responsible?: WorkerUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateWithoutNatureInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responsible?: WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateManyWithoutPreventiveOSInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreventiveActionUpdateWithoutNatureInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
    machine?: MachineUpdateOneRequiredWithoutPreventiveActionNestedInput
    PreventiveOS?: PreventiveOSUpdateOneWithoutActionsNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateWithoutNatureInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    ignore?: BoolFieldUpdateOperationsInput | boolean
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateManyWithoutPreventiveActionInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    ignore?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PreventiveOSUpdateWithoutMachineInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nature?: NatureUpdateOneRequiredWithoutPreventiveOSNestedInput
    responsible?: WorkerUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateWithoutMachineInput = {
    id?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actions?: PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responsible?: WorkerUncheckedUpdateManyWithoutPreventiveOsNestedInput
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput
  }

  export type PreventiveActionUpdateWithoutMachineInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
    PreventiveOS?: PreventiveOSUpdateOneWithoutActionsNestedInput
    nature?: NatureUpdateOneRequiredWithoutPreventiveActionNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateWithoutMachineInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    preventiveOSId?: NullableIntFieldUpdateOperationsInput | number | null
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutActionNestedInput
  }

  export type PreventiveOSUpdateWithoutResponsibleInput = {
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actions?: PreventiveActionUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nature?: NatureUpdateOneRequiredWithoutPreventiveOSNestedInput
    machine?: MachineUpdateOneRequiredWithoutPreventiveOSNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateWithoutResponsibleInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actions?: PreventiveActionUncheckedUpdateManyWithoutPreventiveOSNestedInput
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutOsNestedInput
  }

  export type PreventiveOSUncheckedUpdateManyWithoutPreventiveOsInput = {
    id?: IntFieldUpdateOperationsInput | number
    machineId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    natureId?: IntFieldUpdateOperationsInput | number
    actionsUniqueKey?: StringFieldUpdateOperationsInput | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    concluded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreventiveActionTakenUpdateWithoutActionInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weekCode?: StringFieldUpdateOperationsInput | string
    os?: PreventiveOSUpdateOneRequiredWithoutActionsTakenNestedInput
  }

  export type PreventiveActionTakenUncheckedUpdateWithoutActionInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    osId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionTakenUncheckedUpdateManyWithoutActionsTakenInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    osId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionUpdateWithoutPreventiveOSInput = {
    description?: StringFieldUpdateOperationsInput | string
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    ignore?: BoolFieldUpdateOperationsInput | boolean
    machine?: MachineUpdateOneRequiredWithoutPreventiveActionNestedInput
    nature?: NatureUpdateOneRequiredWithoutPreventiveActionNestedInput
    actionsTaken?: PreventiveActionTakenUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateWithoutPreventiveOSInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
    actionsTaken?: PreventiveActionTakenUncheckedUpdateManyWithoutActionNestedInput
  }

  export type PreventiveActionUncheckedUpdateManyWithoutActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    machineId?: IntFieldUpdateOperationsInput | number
    excution?: StringFieldUpdateOperationsInput | string
    frequency?: IntFieldUpdateOperationsInput | number
    nextExecution?: StringFieldUpdateOperationsInput | string
    natureId?: IntFieldUpdateOperationsInput | number
    ignore?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WorkerUpdateWithoutPreventiveOsInput = {
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerUncheckedUpdateWithoutPreventiveOsInput = {
    id?: IntFieldUpdateOperationsInput | number
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerUncheckedUpdateManyWithoutResponsibleInput = {
    id?: IntFieldUpdateOperationsInput | number
    registration?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
  }

  export type PreventiveActionTakenUpdateWithoutOsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weekCode?: StringFieldUpdateOperationsInput | string
    action?: PreventiveActionUpdateOneRequiredWithoutActionsTakenNestedInput
  }

  export type PreventiveActionTakenUncheckedUpdateWithoutOsInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    actionId?: IntFieldUpdateOperationsInput | number
    weekCode?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}