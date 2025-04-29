
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model Social
 * 
 */
export type Social = $Result.DefaultSelection<Prisma.$SocialPayload>
/**
 * Model Collection
 * 
 */
export type Collection = $Result.DefaultSelection<Prisma.$CollectionPayload>
/**
 * Model FeedPost
 * 
 */
export type FeedPost = $Result.DefaultSelection<Prisma.$FeedPostPayload>
/**
 * Model FeedPostComment
 * 
 */
export type FeedPostComment = $Result.DefaultSelection<Prisma.$FeedPostCommentPayload>
/**
 * Model FeedPostLike
 * 
 */
export type FeedPostLike = $Result.DefaultSelection<Prisma.$FeedPostLikePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccountType: {
  USER: 'USER',
  CREATOR: 'CREATOR',
  ADMIN: 'ADMIN'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]

}

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.social`: Exposes CRUD operations for the **Social** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Socials
    * const socials = await prisma.social.findMany()
    * ```
    */
  get social(): Prisma.SocialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collection`: Exposes CRUD operations for the **Collection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collections
    * const collections = await prisma.collection.findMany()
    * ```
    */
  get collection(): Prisma.CollectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedPost`: Exposes CRUD operations for the **FeedPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedPosts
    * const feedPosts = await prisma.feedPost.findMany()
    * ```
    */
  get feedPost(): Prisma.FeedPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedPostComment`: Exposes CRUD operations for the **FeedPostComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedPostComments
    * const feedPostComments = await prisma.feedPostComment.findMany()
    * ```
    */
  get feedPostComment(): Prisma.FeedPostCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedPostLike`: Exposes CRUD operations for the **FeedPostLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedPostLikes
    * const feedPostLikes = await prisma.feedPostLike.findMany()
    * ```
    */
  get feedPostLike(): Prisma.FeedPostLikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Follow: 'Follow',
    Social: 'Social',
    Collection: 'Collection',
    FeedPost: 'FeedPost',
    FeedPostComment: 'FeedPostComment',
    FeedPostLike: 'FeedPostLike'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "follow" | "social" | "collection" | "feedPost" | "feedPostComment" | "feedPostLike"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      Social: {
        payload: Prisma.$SocialPayload<ExtArgs>
        fields: Prisma.SocialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          findFirst: {
            args: Prisma.SocialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          findMany: {
            args: Prisma.SocialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          create: {
            args: Prisma.SocialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          createMany: {
            args: Prisma.SocialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          delete: {
            args: Prisma.SocialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          update: {
            args: Prisma.SocialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          deleteMany: {
            args: Prisma.SocialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SocialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>[]
          }
          upsert: {
            args: Prisma.SocialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialPayload>
          }
          aggregate: {
            args: Prisma.SocialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocial>
          }
          groupBy: {
            args: Prisma.SocialGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialCountArgs<ExtArgs>
            result: $Utils.Optional<SocialCountAggregateOutputType> | number
          }
        }
      }
      Collection: {
        payload: Prisma.$CollectionPayload<ExtArgs>
        fields: Prisma.CollectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          findFirst: {
            args: Prisma.CollectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          findMany: {
            args: Prisma.CollectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>[]
          }
          create: {
            args: Prisma.CollectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          createMany: {
            args: Prisma.CollectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>[]
          }
          delete: {
            args: Prisma.CollectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          update: {
            args: Prisma.CollectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          deleteMany: {
            args: Prisma.CollectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>[]
          }
          upsert: {
            args: Prisma.CollectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectionPayload>
          }
          aggregate: {
            args: Prisma.CollectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollection>
          }
          groupBy: {
            args: Prisma.CollectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollectionCountArgs<ExtArgs>
            result: $Utils.Optional<CollectionCountAggregateOutputType> | number
          }
        }
      }
      FeedPost: {
        payload: Prisma.$FeedPostPayload<ExtArgs>
        fields: Prisma.FeedPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          findFirst: {
            args: Prisma.FeedPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          findMany: {
            args: Prisma.FeedPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>[]
          }
          create: {
            args: Prisma.FeedPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          createMany: {
            args: Prisma.FeedPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>[]
          }
          delete: {
            args: Prisma.FeedPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          update: {
            args: Prisma.FeedPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          deleteMany: {
            args: Prisma.FeedPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>[]
          }
          upsert: {
            args: Prisma.FeedPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostPayload>
          }
          aggregate: {
            args: Prisma.FeedPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedPost>
          }
          groupBy: {
            args: Prisma.FeedPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedPostCountArgs<ExtArgs>
            result: $Utils.Optional<FeedPostCountAggregateOutputType> | number
          }
        }
      }
      FeedPostComment: {
        payload: Prisma.$FeedPostCommentPayload<ExtArgs>
        fields: Prisma.FeedPostCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedPostCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedPostCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          findFirst: {
            args: Prisma.FeedPostCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedPostCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          findMany: {
            args: Prisma.FeedPostCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>[]
          }
          create: {
            args: Prisma.FeedPostCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          createMany: {
            args: Prisma.FeedPostCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedPostCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>[]
          }
          delete: {
            args: Prisma.FeedPostCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          update: {
            args: Prisma.FeedPostCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          deleteMany: {
            args: Prisma.FeedPostCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedPostCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedPostCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>[]
          }
          upsert: {
            args: Prisma.FeedPostCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostCommentPayload>
          }
          aggregate: {
            args: Prisma.FeedPostCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedPostComment>
          }
          groupBy: {
            args: Prisma.FeedPostCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedPostCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedPostCommentCountArgs<ExtArgs>
            result: $Utils.Optional<FeedPostCommentCountAggregateOutputType> | number
          }
        }
      }
      FeedPostLike: {
        payload: Prisma.$FeedPostLikePayload<ExtArgs>
        fields: Prisma.FeedPostLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedPostLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedPostLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          findFirst: {
            args: Prisma.FeedPostLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedPostLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          findMany: {
            args: Prisma.FeedPostLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>[]
          }
          create: {
            args: Prisma.FeedPostLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          createMany: {
            args: Prisma.FeedPostLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedPostLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>[]
          }
          delete: {
            args: Prisma.FeedPostLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          update: {
            args: Prisma.FeedPostLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          deleteMany: {
            args: Prisma.FeedPostLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedPostLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedPostLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>[]
          }
          upsert: {
            args: Prisma.FeedPostLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPostLikePayload>
          }
          aggregate: {
            args: Prisma.FeedPostLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedPostLike>
          }
          groupBy: {
            args: Prisma.FeedPostLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedPostLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedPostLikeCountArgs<ExtArgs>
            result: $Utils.Optional<FeedPostLikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    follow?: FollowOmit
    social?: SocialOmit
    collection?: CollectionOmit
    feedPost?: FeedPostOmit
    feedPostComment?: FeedPostCommentOmit
    feedPostLike?: FeedPostLikeOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    socials: number
    followers: number
    following: number
    Collection: number
    FeedPost: number
    FeedPostLike: number
    FeedPostComment: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socials?: boolean | UserCountOutputTypeCountSocialsArgs
    followers?: boolean | UserCountOutputTypeCountFollowersArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    Collection?: boolean | UserCountOutputTypeCountCollectionArgs
    FeedPost?: boolean | UserCountOutputTypeCountFeedPostArgs
    FeedPostLike?: boolean | UserCountOutputTypeCountFeedPostLikeArgs
    FeedPostComment?: boolean | UserCountOutputTypeCountFeedPostCommentArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSocialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCollectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedPostLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedPostCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostCommentWhereInput
  }


  /**
   * Count Type FeedPostCountOutputType
   */

  export type FeedPostCountOutputType = {
    FeedPostComment: number
    FeedPostLike: number
  }

  export type FeedPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    FeedPostComment?: boolean | FeedPostCountOutputTypeCountFeedPostCommentArgs
    FeedPostLike?: boolean | FeedPostCountOutputTypeCountFeedPostLikeArgs
  }

  // Custom InputTypes
  /**
   * FeedPostCountOutputType without action
   */
  export type FeedPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostCountOutputType
     */
    select?: FeedPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FeedPostCountOutputType without action
   */
  export type FeedPostCountOutputTypeCountFeedPostCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostCommentWhereInput
  }

  /**
   * FeedPostCountOutputType without action
   */
  export type FeedPostCountOutputTypeCountFeedPostLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostLikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    username: string | null
    email: string | null
    website: string | null
    avatar: string | null
    bio: string | null
    coverImage: string | null
    language: string | null
    timezone: string | null
    accountType: $Enums.AccountType | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    username: string | null
    email: string | null
    website: string | null
    avatar: string | null
    bio: string | null
    coverImage: string | null
    language: string | null
    timezone: string | null
    accountType: $Enums.AccountType | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    address: number
    name: number
    username: number
    email: number
    website: number
    avatar: number
    bio: number
    coverImage: number
    language: number
    timezone: number
    accountType: number
    featured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    address?: true
    name?: true
    username?: true
    email?: true
    website?: true
    avatar?: true
    bio?: true
    coverImage?: true
    language?: true
    timezone?: true
    accountType?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    address?: true
    name?: true
    username?: true
    email?: true
    website?: true
    avatar?: true
    bio?: true
    coverImage?: true
    language?: true
    timezone?: true
    accountType?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    address?: true
    name?: true
    username?: true
    email?: true
    website?: true
    avatar?: true
    bio?: true
    coverImage?: true
    language?: true
    timezone?: true
    accountType?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    address: string
    name: string | null
    username: string
    email: string | null
    website: string | null
    avatar: string
    bio: string | null
    coverImage: string
    language: string
    timezone: string
    accountType: $Enums.AccountType
    featured: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    website?: boolean
    avatar?: boolean
    bio?: boolean
    coverImage?: boolean
    language?: boolean
    timezone?: boolean
    accountType?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socials?: boolean | User$socialsArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    Collection?: boolean | User$CollectionArgs<ExtArgs>
    FeedPost?: boolean | User$FeedPostArgs<ExtArgs>
    FeedPostLike?: boolean | User$FeedPostLikeArgs<ExtArgs>
    FeedPostComment?: boolean | User$FeedPostCommentArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    website?: boolean
    avatar?: boolean
    bio?: boolean
    coverImage?: boolean
    language?: boolean
    timezone?: boolean
    accountType?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    website?: boolean
    avatar?: boolean
    bio?: boolean
    coverImage?: boolean
    language?: boolean
    timezone?: boolean
    accountType?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    address?: boolean
    name?: boolean
    username?: boolean
    email?: boolean
    website?: boolean
    avatar?: boolean
    bio?: boolean
    coverImage?: boolean
    language?: boolean
    timezone?: boolean
    accountType?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "name" | "username" | "email" | "website" | "avatar" | "bio" | "coverImage" | "language" | "timezone" | "accountType" | "featured" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socials?: boolean | User$socialsArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    Collection?: boolean | User$CollectionArgs<ExtArgs>
    FeedPost?: boolean | User$FeedPostArgs<ExtArgs>
    FeedPostLike?: boolean | User$FeedPostLikeArgs<ExtArgs>
    FeedPostComment?: boolean | User$FeedPostCommentArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      socials: Prisma.$SocialPayload<ExtArgs>[]
      followers: Prisma.$FollowPayload<ExtArgs>[]
      following: Prisma.$FollowPayload<ExtArgs>[]
      Collection: Prisma.$CollectionPayload<ExtArgs>[]
      FeedPost: Prisma.$FeedPostPayload<ExtArgs>[]
      FeedPostLike: Prisma.$FeedPostLikePayload<ExtArgs>[]
      FeedPostComment: Prisma.$FeedPostCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      name: string | null
      username: string
      email: string | null
      website: string | null
      avatar: string
      bio: string | null
      coverImage: string
      language: string
      timezone: string
      accountType: $Enums.AccountType
      featured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socials<T extends User$socialsArgs<ExtArgs> = {}>(args?: Subset<T, User$socialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends User$followersArgs<ExtArgs> = {}>(args?: Subset<T, User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Collection<T extends User$CollectionArgs<ExtArgs> = {}>(args?: Subset<T, User$CollectionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FeedPost<T extends User$FeedPostArgs<ExtArgs> = {}>(args?: Subset<T, User$FeedPostArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FeedPostLike<T extends User$FeedPostLikeArgs<ExtArgs> = {}>(args?: Subset<T, User$FeedPostLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FeedPostComment<T extends User$FeedPostCommentArgs<ExtArgs> = {}>(args?: Subset<T, User$FeedPostCommentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly website: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly coverImage: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly accountType: FieldRef<"User", 'AccountType'>
    readonly featured: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.socials
   */
  export type User$socialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    where?: SocialWhereInput
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    cursor?: SocialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * User.followers
   */
  export type User$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.Collection
   */
  export type User$CollectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    where?: CollectionWhereInput
    orderBy?: CollectionOrderByWithRelationInput | CollectionOrderByWithRelationInput[]
    cursor?: CollectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollectionScalarFieldEnum | CollectionScalarFieldEnum[]
  }

  /**
   * User.FeedPost
   */
  export type User$FeedPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    where?: FeedPostWhereInput
    orderBy?: FeedPostOrderByWithRelationInput | FeedPostOrderByWithRelationInput[]
    cursor?: FeedPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedPostScalarFieldEnum | FeedPostScalarFieldEnum[]
  }

  /**
   * User.FeedPostLike
   */
  export type User$FeedPostLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    where?: FeedPostLikeWhereInput
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    cursor?: FeedPostLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedPostLikeScalarFieldEnum | FeedPostLikeScalarFieldEnum[]
  }

  /**
   * User.FeedPostComment
   */
  export type User$FeedPostCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    where?: FeedPostCommentWhereInput
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    cursor?: FeedPostCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedPostCommentScalarFieldEnum | FeedPostCommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowAvgAggregateOutputType = {
    id: number | null
  }

  export type FollowSumAggregateOutputType = {
    id: number | null
  }

  export type FollowMinAggregateOutputType = {
    id: number | null
    followerId: string | null
    followingId: string | null
    createdAt: Date | null
  }

  export type FollowMaxAggregateOutputType = {
    id: number | null
    followerId: string | null
    followingId: string | null
    createdAt: Date | null
  }

  export type FollowCountAggregateOutputType = {
    id: number
    followerId: number
    followingId: number
    createdAt: number
    _all: number
  }


  export type FollowAvgAggregateInputType = {
    id?: true
  }

  export type FollowSumAggregateInputType = {
    id?: true
  }

  export type FollowMinAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowMaxAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowCountAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FollowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FollowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _avg?: FollowAvgAggregateInputType
    _sum?: FollowSumAggregateInputType
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    id: number
    followerId: string
    followingId: string
    createdAt: Date
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "followerId" | "followingId" | "createdAt", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      follower: Prisma.$UserPayload<ExtArgs>
      following: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      followerId: string
      followingId: string
      createdAt: Date
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followWithIdOnly = await prisma.follow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
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
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follower<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    following<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly id: FieldRef<"Follow", 'Int'>
    readonly followerId: FieldRef<"Follow", 'String'>
    readonly followingId: FieldRef<"Follow", 'String'>
    readonly createdAt: FieldRef<"Follow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model Social
   */

  export type AggregateSocial = {
    _count: SocialCountAggregateOutputType | null
    _avg: SocialAvgAggregateOutputType | null
    _sum: SocialSumAggregateOutputType | null
    _min: SocialMinAggregateOutputType | null
    _max: SocialMaxAggregateOutputType | null
  }

  export type SocialAvgAggregateOutputType = {
    id: number | null
  }

  export type SocialSumAggregateOutputType = {
    id: number | null
  }

  export type SocialMinAggregateOutputType = {
    id: number | null
    url: string | null
    userId: string | null
  }

  export type SocialMaxAggregateOutputType = {
    id: number | null
    url: string | null
    userId: string | null
  }

  export type SocialCountAggregateOutputType = {
    id: number
    url: number
    userId: number
    _all: number
  }


  export type SocialAvgAggregateInputType = {
    id?: true
  }

  export type SocialSumAggregateInputType = {
    id?: true
  }

  export type SocialMinAggregateInputType = {
    id?: true
    url?: true
    userId?: true
  }

  export type SocialMaxAggregateInputType = {
    id?: true
    url?: true
    userId?: true
  }

  export type SocialCountAggregateInputType = {
    id?: true
    url?: true
    userId?: true
    _all?: true
  }

  export type SocialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Social to aggregate.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Socials
    **/
    _count?: true | SocialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SocialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SocialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialMaxAggregateInputType
  }

  export type GetSocialAggregateType<T extends SocialAggregateArgs> = {
        [P in keyof T & keyof AggregateSocial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocial[P]>
      : GetScalarType<T[P], AggregateSocial[P]>
  }




  export type SocialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialWhereInput
    orderBy?: SocialOrderByWithAggregationInput | SocialOrderByWithAggregationInput[]
    by: SocialScalarFieldEnum[] | SocialScalarFieldEnum
    having?: SocialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialCountAggregateInputType | true
    _avg?: SocialAvgAggregateInputType
    _sum?: SocialSumAggregateInputType
    _min?: SocialMinAggregateInputType
    _max?: SocialMaxAggregateInputType
  }

  export type SocialGroupByOutputType = {
    id: number
    url: string
    userId: string
    _count: SocialCountAggregateOutputType | null
    _avg: SocialAvgAggregateOutputType | null
    _sum: SocialSumAggregateOutputType | null
    _min: SocialMinAggregateOutputType | null
    _max: SocialMaxAggregateOutputType | null
  }

  type GetSocialGroupByPayload<T extends SocialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialGroupByOutputType[P]>
            : GetScalarType<T[P], SocialGroupByOutputType[P]>
        }
      >
    >


  export type SocialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["social"]>

  export type SocialSelectScalar = {
    id?: boolean
    url?: boolean
    userId?: boolean
  }

  export type SocialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "userId", ExtArgs["result"]["social"]>
  export type SocialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SocialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Social"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      userId: string
    }, ExtArgs["result"]["social"]>
    composites: {}
  }

  type SocialGetPayload<S extends boolean | null | undefined | SocialDefaultArgs> = $Result.GetResult<Prisma.$SocialPayload, S>

  type SocialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocialCountAggregateInputType | true
    }

  export interface SocialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Social'], meta: { name: 'Social' } }
    /**
     * Find zero or one Social that matches the filter.
     * @param {SocialFindUniqueArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialFindUniqueArgs>(args: SelectSubset<T, SocialFindUniqueArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Social that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocialFindUniqueOrThrowArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Social that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindFirstArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialFindFirstArgs>(args?: SelectSubset<T, SocialFindFirstArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Social that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindFirstOrThrowArgs} args - Arguments to find a Social
     * @example
     * // Get one Social
     * const social = await prisma.social.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Socials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Socials
     * const socials = await prisma.social.findMany()
     * 
     * // Get first 10 Socials
     * const socials = await prisma.social.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialWithIdOnly = await prisma.social.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialFindManyArgs>(args?: SelectSubset<T, SocialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Social.
     * @param {SocialCreateArgs} args - Arguments to create a Social.
     * @example
     * // Create one Social
     * const Social = await prisma.social.create({
     *   data: {
     *     // ... data to create a Social
     *   }
     * })
     * 
     */
    create<T extends SocialCreateArgs>(args: SelectSubset<T, SocialCreateArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Socials.
     * @param {SocialCreateManyArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const social = await prisma.social.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialCreateManyArgs>(args?: SelectSubset<T, SocialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Socials and returns the data saved in the database.
     * @param {SocialCreateManyAndReturnArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const social = await prisma.social.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Socials and only return the `id`
     * const socialWithIdOnly = await prisma.social.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocialCreateManyAndReturnArgs>(args?: SelectSubset<T, SocialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Social.
     * @param {SocialDeleteArgs} args - Arguments to delete one Social.
     * @example
     * // Delete one Social
     * const Social = await prisma.social.delete({
     *   where: {
     *     // ... filter to delete one Social
     *   }
     * })
     * 
     */
    delete<T extends SocialDeleteArgs>(args: SelectSubset<T, SocialDeleteArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Social.
     * @param {SocialUpdateArgs} args - Arguments to update one Social.
     * @example
     * // Update one Social
     * const social = await prisma.social.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialUpdateArgs>(args: SelectSubset<T, SocialUpdateArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Socials.
     * @param {SocialDeleteManyArgs} args - Arguments to filter Socials to delete.
     * @example
     * // Delete a few Socials
     * const { count } = await prisma.social.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialDeleteManyArgs>(args?: SelectSubset<T, SocialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Socials
     * const social = await prisma.social.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialUpdateManyArgs>(args: SelectSubset<T, SocialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Socials and returns the data updated in the database.
     * @param {SocialUpdateManyAndReturnArgs} args - Arguments to update many Socials.
     * @example
     * // Update many Socials
     * const social = await prisma.social.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Socials and only return the `id`
     * const socialWithIdOnly = await prisma.social.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SocialUpdateManyAndReturnArgs>(args: SelectSubset<T, SocialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Social.
     * @param {SocialUpsertArgs} args - Arguments to update or create a Social.
     * @example
     * // Update or create a Social
     * const social = await prisma.social.upsert({
     *   create: {
     *     // ... data to create a Social
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Social we want to update
     *   }
     * })
     */
    upsert<T extends SocialUpsertArgs>(args: SelectSubset<T, SocialUpsertArgs<ExtArgs>>): Prisma__SocialClient<$Result.GetResult<Prisma.$SocialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialCountArgs} args - Arguments to filter Socials to count.
     * @example
     * // Count the number of Socials
     * const count = await prisma.social.count({
     *   where: {
     *     // ... the filter for the Socials we want to count
     *   }
     * })
    **/
    count<T extends SocialCountArgs>(
      args?: Subset<T, SocialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Social.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SocialAggregateArgs>(args: Subset<T, SocialAggregateArgs>): Prisma.PrismaPromise<GetSocialAggregateType<T>>

    /**
     * Group by Social.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialGroupByArgs} args - Group by arguments.
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
      T extends SocialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialGroupByArgs['orderBy'] }
        : { orderBy?: SocialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SocialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Social model
   */
  readonly fields: SocialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Social.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Social model
   */
  interface SocialFieldRefs {
    readonly id: FieldRef<"Social", 'Int'>
    readonly url: FieldRef<"Social", 'String'>
    readonly userId: FieldRef<"Social", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Social findUnique
   */
  export type SocialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social findUniqueOrThrow
   */
  export type SocialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social findFirst
   */
  export type SocialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Socials.
     */
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social findFirstOrThrow
   */
  export type SocialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Social to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Socials.
     */
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social findMany
   */
  export type SocialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter, which Socials to fetch.
     */
    where?: SocialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Socials to fetch.
     */
    orderBy?: SocialOrderByWithRelationInput | SocialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Socials.
     */
    cursor?: SocialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Socials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Socials.
     */
    skip?: number
    distinct?: SocialScalarFieldEnum | SocialScalarFieldEnum[]
  }

  /**
   * Social create
   */
  export type SocialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The data needed to create a Social.
     */
    data: XOR<SocialCreateInput, SocialUncheckedCreateInput>
  }

  /**
   * Social createMany
   */
  export type SocialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Socials.
     */
    data: SocialCreateManyInput | SocialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Social createManyAndReturn
   */
  export type SocialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * The data used to create many Socials.
     */
    data: SocialCreateManyInput | SocialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Social update
   */
  export type SocialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The data needed to update a Social.
     */
    data: XOR<SocialUpdateInput, SocialUncheckedUpdateInput>
    /**
     * Choose, which Social to update.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social updateMany
   */
  export type SocialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Socials.
     */
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyInput>
    /**
     * Filter which Socials to update
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to update.
     */
    limit?: number
  }

  /**
   * Social updateManyAndReturn
   */
  export type SocialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * The data used to update Socials.
     */
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyInput>
    /**
     * Filter which Socials to update
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Social upsert
   */
  export type SocialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * The filter to search for the Social to update in case it exists.
     */
    where: SocialWhereUniqueInput
    /**
     * In case the Social found by the `where` argument doesn't exist, create a new Social with this data.
     */
    create: XOR<SocialCreateInput, SocialUncheckedCreateInput>
    /**
     * In case the Social was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialUpdateInput, SocialUncheckedUpdateInput>
  }

  /**
   * Social delete
   */
  export type SocialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
    /**
     * Filter which Social to delete.
     */
    where: SocialWhereUniqueInput
  }

  /**
   * Social deleteMany
   */
  export type SocialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Socials to delete
     */
    where?: SocialWhereInput
    /**
     * Limit how many Socials to delete.
     */
    limit?: number
  }

  /**
   * Social without action
   */
  export type SocialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Social
     */
    select?: SocialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Social
     */
    omit?: SocialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialInclude<ExtArgs> | null
  }


  /**
   * Model Collection
   */

  export type AggregateCollection = {
    _count: CollectionCountAggregateOutputType | null
    _min: CollectionMinAggregateOutputType | null
    _max: CollectionMaxAggregateOutputType | null
  }

  export type CollectionMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    tags: string | null
    coverImage: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollectionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    tags: string | null
    coverImage: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollectionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    tags: number
    coverImage: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CollectionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    tags?: true
    coverImage?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollectionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    tags?: true
    coverImage?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollectionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    tags?: true
    coverImage?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CollectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collection to aggregate.
     */
    where?: CollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collections to fetch.
     */
    orderBy?: CollectionOrderByWithRelationInput | CollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collections
    **/
    _count?: true | CollectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollectionMaxAggregateInputType
  }

  export type GetCollectionAggregateType<T extends CollectionAggregateArgs> = {
        [P in keyof T & keyof AggregateCollection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollection[P]>
      : GetScalarType<T[P], AggregateCollection[P]>
  }




  export type CollectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollectionWhereInput
    orderBy?: CollectionOrderByWithAggregationInput | CollectionOrderByWithAggregationInput[]
    by: CollectionScalarFieldEnum[] | CollectionScalarFieldEnum
    having?: CollectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollectionCountAggregateInputType | true
    _min?: CollectionMinAggregateInputType
    _max?: CollectionMaxAggregateInputType
  }

  export type CollectionGroupByOutputType = {
    id: string
    title: string
    description: string
    tags: string
    coverImage: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: CollectionCountAggregateOutputType | null
    _min: CollectionMinAggregateOutputType | null
    _max: CollectionMaxAggregateOutputType | null
  }

  type GetCollectionGroupByPayload<T extends CollectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollectionGroupByOutputType[P]>
            : GetScalarType<T[P], CollectionGroupByOutputType[P]>
        }
      >
    >


  export type CollectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    coverImage?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collection"]>

  export type CollectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    coverImage?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collection"]>

  export type CollectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    coverImage?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collection"]>

  export type CollectionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    coverImage?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CollectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "tags" | "coverImage" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["collection"]>
  export type CollectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CollectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CollectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CollectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      tags: string
      coverImage: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["collection"]>
    composites: {}
  }

  type CollectionGetPayload<S extends boolean | null | undefined | CollectionDefaultArgs> = $Result.GetResult<Prisma.$CollectionPayload, S>

  type CollectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollectionCountAggregateInputType | true
    }

  export interface CollectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collection'], meta: { name: 'Collection' } }
    /**
     * Find zero or one Collection that matches the filter.
     * @param {CollectionFindUniqueArgs} args - Arguments to find a Collection
     * @example
     * // Get one Collection
     * const collection = await prisma.collection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollectionFindUniqueArgs>(args: SelectSubset<T, CollectionFindUniqueArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollectionFindUniqueOrThrowArgs} args - Arguments to find a Collection
     * @example
     * // Get one Collection
     * const collection = await prisma.collection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollectionFindUniqueOrThrowArgs>(args: SelectSubset<T, CollectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionFindFirstArgs} args - Arguments to find a Collection
     * @example
     * // Get one Collection
     * const collection = await prisma.collection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollectionFindFirstArgs>(args?: SelectSubset<T, CollectionFindFirstArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionFindFirstOrThrowArgs} args - Arguments to find a Collection
     * @example
     * // Get one Collection
     * const collection = await prisma.collection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollectionFindFirstOrThrowArgs>(args?: SelectSubset<T, CollectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collections
     * const collections = await prisma.collection.findMany()
     * 
     * // Get first 10 Collections
     * const collections = await prisma.collection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collectionWithIdOnly = await prisma.collection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollectionFindManyArgs>(args?: SelectSubset<T, CollectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collection.
     * @param {CollectionCreateArgs} args - Arguments to create a Collection.
     * @example
     * // Create one Collection
     * const Collection = await prisma.collection.create({
     *   data: {
     *     // ... data to create a Collection
     *   }
     * })
     * 
     */
    create<T extends CollectionCreateArgs>(args: SelectSubset<T, CollectionCreateArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collections.
     * @param {CollectionCreateManyArgs} args - Arguments to create many Collections.
     * @example
     * // Create many Collections
     * const collection = await prisma.collection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollectionCreateManyArgs>(args?: SelectSubset<T, CollectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collections and returns the data saved in the database.
     * @param {CollectionCreateManyAndReturnArgs} args - Arguments to create many Collections.
     * @example
     * // Create many Collections
     * const collection = await prisma.collection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collections and only return the `id`
     * const collectionWithIdOnly = await prisma.collection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollectionCreateManyAndReturnArgs>(args?: SelectSubset<T, CollectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collection.
     * @param {CollectionDeleteArgs} args - Arguments to delete one Collection.
     * @example
     * // Delete one Collection
     * const Collection = await prisma.collection.delete({
     *   where: {
     *     // ... filter to delete one Collection
     *   }
     * })
     * 
     */
    delete<T extends CollectionDeleteArgs>(args: SelectSubset<T, CollectionDeleteArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collection.
     * @param {CollectionUpdateArgs} args - Arguments to update one Collection.
     * @example
     * // Update one Collection
     * const collection = await prisma.collection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollectionUpdateArgs>(args: SelectSubset<T, CollectionUpdateArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collections.
     * @param {CollectionDeleteManyArgs} args - Arguments to filter Collections to delete.
     * @example
     * // Delete a few Collections
     * const { count } = await prisma.collection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollectionDeleteManyArgs>(args?: SelectSubset<T, CollectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collections
     * const collection = await prisma.collection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollectionUpdateManyArgs>(args: SelectSubset<T, CollectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collections and returns the data updated in the database.
     * @param {CollectionUpdateManyAndReturnArgs} args - Arguments to update many Collections.
     * @example
     * // Update many Collections
     * const collection = await prisma.collection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collections and only return the `id`
     * const collectionWithIdOnly = await prisma.collection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollectionUpdateManyAndReturnArgs>(args: SelectSubset<T, CollectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collection.
     * @param {CollectionUpsertArgs} args - Arguments to update or create a Collection.
     * @example
     * // Update or create a Collection
     * const collection = await prisma.collection.upsert({
     *   create: {
     *     // ... data to create a Collection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collection we want to update
     *   }
     * })
     */
    upsert<T extends CollectionUpsertArgs>(args: SelectSubset<T, CollectionUpsertArgs<ExtArgs>>): Prisma__CollectionClient<$Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionCountArgs} args - Arguments to filter Collections to count.
     * @example
     * // Count the number of Collections
     * const count = await prisma.collection.count({
     *   where: {
     *     // ... the filter for the Collections we want to count
     *   }
     * })
    **/
    count<T extends CollectionCountArgs>(
      args?: Subset<T, CollectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CollectionAggregateArgs>(args: Subset<T, CollectionAggregateArgs>): Prisma.PrismaPromise<GetCollectionAggregateType<T>>

    /**
     * Group by Collection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionGroupByArgs} args - Group by arguments.
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
      T extends CollectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollectionGroupByArgs['orderBy'] }
        : { orderBy?: CollectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, CollectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collection model
   */
  readonly fields: CollectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collection model
   */
  interface CollectionFieldRefs {
    readonly id: FieldRef<"Collection", 'String'>
    readonly title: FieldRef<"Collection", 'String'>
    readonly description: FieldRef<"Collection", 'String'>
    readonly tags: FieldRef<"Collection", 'String'>
    readonly coverImage: FieldRef<"Collection", 'String'>
    readonly userId: FieldRef<"Collection", 'String'>
    readonly createdAt: FieldRef<"Collection", 'DateTime'>
    readonly updatedAt: FieldRef<"Collection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Collection findUnique
   */
  export type CollectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter, which Collection to fetch.
     */
    where: CollectionWhereUniqueInput
  }

  /**
   * Collection findUniqueOrThrow
   */
  export type CollectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter, which Collection to fetch.
     */
    where: CollectionWhereUniqueInput
  }

  /**
   * Collection findFirst
   */
  export type CollectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter, which Collection to fetch.
     */
    where?: CollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collections to fetch.
     */
    orderBy?: CollectionOrderByWithRelationInput | CollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collections.
     */
    cursor?: CollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collections.
     */
    distinct?: CollectionScalarFieldEnum | CollectionScalarFieldEnum[]
  }

  /**
   * Collection findFirstOrThrow
   */
  export type CollectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter, which Collection to fetch.
     */
    where?: CollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collections to fetch.
     */
    orderBy?: CollectionOrderByWithRelationInput | CollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collections.
     */
    cursor?: CollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collections.
     */
    distinct?: CollectionScalarFieldEnum | CollectionScalarFieldEnum[]
  }

  /**
   * Collection findMany
   */
  export type CollectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter, which Collections to fetch.
     */
    where?: CollectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collections to fetch.
     */
    orderBy?: CollectionOrderByWithRelationInput | CollectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collections.
     */
    cursor?: CollectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collections.
     */
    skip?: number
    distinct?: CollectionScalarFieldEnum | CollectionScalarFieldEnum[]
  }

  /**
   * Collection create
   */
  export type CollectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Collection.
     */
    data: XOR<CollectionCreateInput, CollectionUncheckedCreateInput>
  }

  /**
   * Collection createMany
   */
  export type CollectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collections.
     */
    data: CollectionCreateManyInput | CollectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collection createManyAndReturn
   */
  export type CollectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * The data used to create many Collections.
     */
    data: CollectionCreateManyInput | CollectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collection update
   */
  export type CollectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Collection.
     */
    data: XOR<CollectionUpdateInput, CollectionUncheckedUpdateInput>
    /**
     * Choose, which Collection to update.
     */
    where: CollectionWhereUniqueInput
  }

  /**
   * Collection updateMany
   */
  export type CollectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collections.
     */
    data: XOR<CollectionUpdateManyMutationInput, CollectionUncheckedUpdateManyInput>
    /**
     * Filter which Collections to update
     */
    where?: CollectionWhereInput
    /**
     * Limit how many Collections to update.
     */
    limit?: number
  }

  /**
   * Collection updateManyAndReturn
   */
  export type CollectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * The data used to update Collections.
     */
    data: XOR<CollectionUpdateManyMutationInput, CollectionUncheckedUpdateManyInput>
    /**
     * Filter which Collections to update
     */
    where?: CollectionWhereInput
    /**
     * Limit how many Collections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collection upsert
   */
  export type CollectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Collection to update in case it exists.
     */
    where: CollectionWhereUniqueInput
    /**
     * In case the Collection found by the `where` argument doesn't exist, create a new Collection with this data.
     */
    create: XOR<CollectionCreateInput, CollectionUncheckedCreateInput>
    /**
     * In case the Collection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollectionUpdateInput, CollectionUncheckedUpdateInput>
  }

  /**
   * Collection delete
   */
  export type CollectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
    /**
     * Filter which Collection to delete.
     */
    where: CollectionWhereUniqueInput
  }

  /**
   * Collection deleteMany
   */
  export type CollectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collections to delete
     */
    where?: CollectionWhereInput
    /**
     * Limit how many Collections to delete.
     */
    limit?: number
  }

  /**
   * Collection without action
   */
  export type CollectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collection
     */
    select?: CollectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collection
     */
    omit?: CollectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectionInclude<ExtArgs> | null
  }


  /**
   * Model FeedPost
   */

  export type AggregateFeedPost = {
    _count: FeedPostCountAggregateOutputType | null
    _min: FeedPostMinAggregateOutputType | null
    _max: FeedPostMaxAggregateOutputType | null
  }

  export type FeedPostMinAggregateOutputType = {
    id: string | null
    image: string | null
    caption: string | null
    isPremium: boolean | null
    userId: string | null
    createdAt: Date | null
  }

  export type FeedPostMaxAggregateOutputType = {
    id: string | null
    image: string | null
    caption: string | null
    isPremium: boolean | null
    userId: string | null
    createdAt: Date | null
  }

  export type FeedPostCountAggregateOutputType = {
    id: number
    image: number
    caption: number
    isPremium: number
    userId: number
    createdAt: number
    _all: number
  }


  export type FeedPostMinAggregateInputType = {
    id?: true
    image?: true
    caption?: true
    isPremium?: true
    userId?: true
    createdAt?: true
  }

  export type FeedPostMaxAggregateInputType = {
    id?: true
    image?: true
    caption?: true
    isPremium?: true
    userId?: true
    createdAt?: true
  }

  export type FeedPostCountAggregateInputType = {
    id?: true
    image?: true
    caption?: true
    isPremium?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type FeedPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPost to aggregate.
     */
    where?: FeedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPosts to fetch.
     */
    orderBy?: FeedPostOrderByWithRelationInput | FeedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedPosts
    **/
    _count?: true | FeedPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedPostMaxAggregateInputType
  }

  export type GetFeedPostAggregateType<T extends FeedPostAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedPost[P]>
      : GetScalarType<T[P], AggregateFeedPost[P]>
  }




  export type FeedPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostWhereInput
    orderBy?: FeedPostOrderByWithAggregationInput | FeedPostOrderByWithAggregationInput[]
    by: FeedPostScalarFieldEnum[] | FeedPostScalarFieldEnum
    having?: FeedPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedPostCountAggregateInputType | true
    _min?: FeedPostMinAggregateInputType
    _max?: FeedPostMaxAggregateInputType
  }

  export type FeedPostGroupByOutputType = {
    id: string
    image: string | null
    caption: string | null
    isPremium: boolean
    userId: string
    createdAt: Date
    _count: FeedPostCountAggregateOutputType | null
    _min: FeedPostMinAggregateOutputType | null
    _max: FeedPostMaxAggregateOutputType | null
  }

  type GetFeedPostGroupByPayload<T extends FeedPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedPostGroupByOutputType[P]>
            : GetScalarType<T[P], FeedPostGroupByOutputType[P]>
        }
      >
    >


  export type FeedPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    image?: boolean
    caption?: boolean
    isPremium?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    FeedPostComment?: boolean | FeedPost$FeedPostCommentArgs<ExtArgs>
    FeedPostLike?: boolean | FeedPost$FeedPostLikeArgs<ExtArgs>
    _count?: boolean | FeedPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPost"]>

  export type FeedPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    image?: boolean
    caption?: boolean
    isPremium?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPost"]>

  export type FeedPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    image?: boolean
    caption?: boolean
    isPremium?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPost"]>

  export type FeedPostSelectScalar = {
    id?: boolean
    image?: boolean
    caption?: boolean
    isPremium?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type FeedPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "image" | "caption" | "isPremium" | "userId" | "createdAt", ExtArgs["result"]["feedPost"]>
  export type FeedPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    FeedPostComment?: boolean | FeedPost$FeedPostCommentArgs<ExtArgs>
    FeedPostLike?: boolean | FeedPost$FeedPostLikeArgs<ExtArgs>
    _count?: boolean | FeedPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FeedPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeedPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedPost"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      FeedPostComment: Prisma.$FeedPostCommentPayload<ExtArgs>[]
      FeedPostLike: Prisma.$FeedPostLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      image: string | null
      caption: string | null
      isPremium: boolean
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["feedPost"]>
    composites: {}
  }

  type FeedPostGetPayload<S extends boolean | null | undefined | FeedPostDefaultArgs> = $Result.GetResult<Prisma.$FeedPostPayload, S>

  type FeedPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedPostCountAggregateInputType | true
    }

  export interface FeedPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedPost'], meta: { name: 'FeedPost' } }
    /**
     * Find zero or one FeedPost that matches the filter.
     * @param {FeedPostFindUniqueArgs} args - Arguments to find a FeedPost
     * @example
     * // Get one FeedPost
     * const feedPost = await prisma.feedPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedPostFindUniqueArgs>(args: SelectSubset<T, FeedPostFindUniqueArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedPostFindUniqueOrThrowArgs} args - Arguments to find a FeedPost
     * @example
     * // Get one FeedPost
     * const feedPost = await prisma.feedPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedPostFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostFindFirstArgs} args - Arguments to find a FeedPost
     * @example
     * // Get one FeedPost
     * const feedPost = await prisma.feedPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedPostFindFirstArgs>(args?: SelectSubset<T, FeedPostFindFirstArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostFindFirstOrThrowArgs} args - Arguments to find a FeedPost
     * @example
     * // Get one FeedPost
     * const feedPost = await prisma.feedPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedPostFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedPosts
     * const feedPosts = await prisma.feedPost.findMany()
     * 
     * // Get first 10 FeedPosts
     * const feedPosts = await prisma.feedPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedPostWithIdOnly = await prisma.feedPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedPostFindManyArgs>(args?: SelectSubset<T, FeedPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedPost.
     * @param {FeedPostCreateArgs} args - Arguments to create a FeedPost.
     * @example
     * // Create one FeedPost
     * const FeedPost = await prisma.feedPost.create({
     *   data: {
     *     // ... data to create a FeedPost
     *   }
     * })
     * 
     */
    create<T extends FeedPostCreateArgs>(args: SelectSubset<T, FeedPostCreateArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedPosts.
     * @param {FeedPostCreateManyArgs} args - Arguments to create many FeedPosts.
     * @example
     * // Create many FeedPosts
     * const feedPost = await prisma.feedPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedPostCreateManyArgs>(args?: SelectSubset<T, FeedPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedPosts and returns the data saved in the database.
     * @param {FeedPostCreateManyAndReturnArgs} args - Arguments to create many FeedPosts.
     * @example
     * // Create many FeedPosts
     * const feedPost = await prisma.feedPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedPosts and only return the `id`
     * const feedPostWithIdOnly = await prisma.feedPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedPostCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedPost.
     * @param {FeedPostDeleteArgs} args - Arguments to delete one FeedPost.
     * @example
     * // Delete one FeedPost
     * const FeedPost = await prisma.feedPost.delete({
     *   where: {
     *     // ... filter to delete one FeedPost
     *   }
     * })
     * 
     */
    delete<T extends FeedPostDeleteArgs>(args: SelectSubset<T, FeedPostDeleteArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedPost.
     * @param {FeedPostUpdateArgs} args - Arguments to update one FeedPost.
     * @example
     * // Update one FeedPost
     * const feedPost = await prisma.feedPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedPostUpdateArgs>(args: SelectSubset<T, FeedPostUpdateArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedPosts.
     * @param {FeedPostDeleteManyArgs} args - Arguments to filter FeedPosts to delete.
     * @example
     * // Delete a few FeedPosts
     * const { count } = await prisma.feedPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedPostDeleteManyArgs>(args?: SelectSubset<T, FeedPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedPosts
     * const feedPost = await prisma.feedPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedPostUpdateManyArgs>(args: SelectSubset<T, FeedPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPosts and returns the data updated in the database.
     * @param {FeedPostUpdateManyAndReturnArgs} args - Arguments to update many FeedPosts.
     * @example
     * // Update many FeedPosts
     * const feedPost = await prisma.feedPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedPosts and only return the `id`
     * const feedPostWithIdOnly = await prisma.feedPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedPostUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedPost.
     * @param {FeedPostUpsertArgs} args - Arguments to update or create a FeedPost.
     * @example
     * // Update or create a FeedPost
     * const feedPost = await prisma.feedPost.upsert({
     *   create: {
     *     // ... data to create a FeedPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedPost we want to update
     *   }
     * })
     */
    upsert<T extends FeedPostUpsertArgs>(args: SelectSubset<T, FeedPostUpsertArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCountArgs} args - Arguments to filter FeedPosts to count.
     * @example
     * // Count the number of FeedPosts
     * const count = await prisma.feedPost.count({
     *   where: {
     *     // ... the filter for the FeedPosts we want to count
     *   }
     * })
    **/
    count<T extends FeedPostCountArgs>(
      args?: Subset<T, FeedPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedPostAggregateArgs>(args: Subset<T, FeedPostAggregateArgs>): Prisma.PrismaPromise<GetFeedPostAggregateType<T>>

    /**
     * Group by FeedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostGroupByArgs} args - Group by arguments.
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
      T extends FeedPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedPostGroupByArgs['orderBy'] }
        : { orderBy?: FeedPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FeedPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedPost model
   */
  readonly fields: FeedPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    FeedPostComment<T extends FeedPost$FeedPostCommentArgs<ExtArgs> = {}>(args?: Subset<T, FeedPost$FeedPostCommentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FeedPostLike<T extends FeedPost$FeedPostLikeArgs<ExtArgs> = {}>(args?: Subset<T, FeedPost$FeedPostLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedPost model
   */
  interface FeedPostFieldRefs {
    readonly id: FieldRef<"FeedPost", 'String'>
    readonly image: FieldRef<"FeedPost", 'String'>
    readonly caption: FieldRef<"FeedPost", 'String'>
    readonly isPremium: FieldRef<"FeedPost", 'Boolean'>
    readonly userId: FieldRef<"FeedPost", 'String'>
    readonly createdAt: FieldRef<"FeedPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedPost findUnique
   */
  export type FeedPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter, which FeedPost to fetch.
     */
    where: FeedPostWhereUniqueInput
  }

  /**
   * FeedPost findUniqueOrThrow
   */
  export type FeedPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter, which FeedPost to fetch.
     */
    where: FeedPostWhereUniqueInput
  }

  /**
   * FeedPost findFirst
   */
  export type FeedPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter, which FeedPost to fetch.
     */
    where?: FeedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPosts to fetch.
     */
    orderBy?: FeedPostOrderByWithRelationInput | FeedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPosts.
     */
    cursor?: FeedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPosts.
     */
    distinct?: FeedPostScalarFieldEnum | FeedPostScalarFieldEnum[]
  }

  /**
   * FeedPost findFirstOrThrow
   */
  export type FeedPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter, which FeedPost to fetch.
     */
    where?: FeedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPosts to fetch.
     */
    orderBy?: FeedPostOrderByWithRelationInput | FeedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPosts.
     */
    cursor?: FeedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPosts.
     */
    distinct?: FeedPostScalarFieldEnum | FeedPostScalarFieldEnum[]
  }

  /**
   * FeedPost findMany
   */
  export type FeedPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter, which FeedPosts to fetch.
     */
    where?: FeedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPosts to fetch.
     */
    orderBy?: FeedPostOrderByWithRelationInput | FeedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedPosts.
     */
    cursor?: FeedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPosts.
     */
    skip?: number
    distinct?: FeedPostScalarFieldEnum | FeedPostScalarFieldEnum[]
  }

  /**
   * FeedPost create
   */
  export type FeedPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedPost.
     */
    data: XOR<FeedPostCreateInput, FeedPostUncheckedCreateInput>
  }

  /**
   * FeedPost createMany
   */
  export type FeedPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedPosts.
     */
    data: FeedPostCreateManyInput | FeedPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedPost createManyAndReturn
   */
  export type FeedPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * The data used to create many FeedPosts.
     */
    data: FeedPostCreateManyInput | FeedPostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPost update
   */
  export type FeedPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedPost.
     */
    data: XOR<FeedPostUpdateInput, FeedPostUncheckedUpdateInput>
    /**
     * Choose, which FeedPost to update.
     */
    where: FeedPostWhereUniqueInput
  }

  /**
   * FeedPost updateMany
   */
  export type FeedPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedPosts.
     */
    data: XOR<FeedPostUpdateManyMutationInput, FeedPostUncheckedUpdateManyInput>
    /**
     * Filter which FeedPosts to update
     */
    where?: FeedPostWhereInput
    /**
     * Limit how many FeedPosts to update.
     */
    limit?: number
  }

  /**
   * FeedPost updateManyAndReturn
   */
  export type FeedPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * The data used to update FeedPosts.
     */
    data: XOR<FeedPostUpdateManyMutationInput, FeedPostUncheckedUpdateManyInput>
    /**
     * Filter which FeedPosts to update
     */
    where?: FeedPostWhereInput
    /**
     * Limit how many FeedPosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPost upsert
   */
  export type FeedPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedPost to update in case it exists.
     */
    where: FeedPostWhereUniqueInput
    /**
     * In case the FeedPost found by the `where` argument doesn't exist, create a new FeedPost with this data.
     */
    create: XOR<FeedPostCreateInput, FeedPostUncheckedCreateInput>
    /**
     * In case the FeedPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedPostUpdateInput, FeedPostUncheckedUpdateInput>
  }

  /**
   * FeedPost delete
   */
  export type FeedPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
    /**
     * Filter which FeedPost to delete.
     */
    where: FeedPostWhereUniqueInput
  }

  /**
   * FeedPost deleteMany
   */
  export type FeedPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPosts to delete
     */
    where?: FeedPostWhereInput
    /**
     * Limit how many FeedPosts to delete.
     */
    limit?: number
  }

  /**
   * FeedPost.FeedPostComment
   */
  export type FeedPost$FeedPostCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    where?: FeedPostCommentWhereInput
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    cursor?: FeedPostCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedPostCommentScalarFieldEnum | FeedPostCommentScalarFieldEnum[]
  }

  /**
   * FeedPost.FeedPostLike
   */
  export type FeedPost$FeedPostLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    where?: FeedPostLikeWhereInput
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    cursor?: FeedPostLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedPostLikeScalarFieldEnum | FeedPostLikeScalarFieldEnum[]
  }

  /**
   * FeedPost without action
   */
  export type FeedPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPost
     */
    select?: FeedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPost
     */
    omit?: FeedPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostInclude<ExtArgs> | null
  }


  /**
   * Model FeedPostComment
   */

  export type AggregateFeedPostComment = {
    _count: FeedPostCommentCountAggregateOutputType | null
    _min: FeedPostCommentMinAggregateOutputType | null
    _max: FeedPostCommentMaxAggregateOutputType | null
  }

  export type FeedPostCommentMinAggregateOutputType = {
    id: string | null
    comment: string | null
    createdAt: Date | null
    userId: string | null
    feedPostId: string | null
  }

  export type FeedPostCommentMaxAggregateOutputType = {
    id: string | null
    comment: string | null
    createdAt: Date | null
    userId: string | null
    feedPostId: string | null
  }

  export type FeedPostCommentCountAggregateOutputType = {
    id: number
    comment: number
    createdAt: number
    userId: number
    feedPostId: number
    _all: number
  }


  export type FeedPostCommentMinAggregateInputType = {
    id?: true
    comment?: true
    createdAt?: true
    userId?: true
    feedPostId?: true
  }

  export type FeedPostCommentMaxAggregateInputType = {
    id?: true
    comment?: true
    createdAt?: true
    userId?: true
    feedPostId?: true
  }

  export type FeedPostCommentCountAggregateInputType = {
    id?: true
    comment?: true
    createdAt?: true
    userId?: true
    feedPostId?: true
    _all?: true
  }

  export type FeedPostCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPostComment to aggregate.
     */
    where?: FeedPostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostComments to fetch.
     */
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedPostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedPostComments
    **/
    _count?: true | FeedPostCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedPostCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedPostCommentMaxAggregateInputType
  }

  export type GetFeedPostCommentAggregateType<T extends FeedPostCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedPostComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedPostComment[P]>
      : GetScalarType<T[P], AggregateFeedPostComment[P]>
  }




  export type FeedPostCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostCommentWhereInput
    orderBy?: FeedPostCommentOrderByWithAggregationInput | FeedPostCommentOrderByWithAggregationInput[]
    by: FeedPostCommentScalarFieldEnum[] | FeedPostCommentScalarFieldEnum
    having?: FeedPostCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedPostCommentCountAggregateInputType | true
    _min?: FeedPostCommentMinAggregateInputType
    _max?: FeedPostCommentMaxAggregateInputType
  }

  export type FeedPostCommentGroupByOutputType = {
    id: string
    comment: string
    createdAt: Date
    userId: string
    feedPostId: string
    _count: FeedPostCommentCountAggregateOutputType | null
    _min: FeedPostCommentMinAggregateOutputType | null
    _max: FeedPostCommentMaxAggregateOutputType | null
  }

  type GetFeedPostCommentGroupByPayload<T extends FeedPostCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedPostCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedPostCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedPostCommentGroupByOutputType[P]>
            : GetScalarType<T[P], FeedPostCommentGroupByOutputType[P]>
        }
      >
    >


  export type FeedPostCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    createdAt?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostComment"]>

  export type FeedPostCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    createdAt?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostComment"]>

  export type FeedPostCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    createdAt?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostComment"]>

  export type FeedPostCommentSelectScalar = {
    id?: boolean
    comment?: boolean
    createdAt?: boolean
    userId?: boolean
    feedPostId?: boolean
  }

  export type FeedPostCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "comment" | "createdAt" | "userId" | "feedPostId", ExtArgs["result"]["feedPostComment"]>
  export type FeedPostCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }
  export type FeedPostCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }
  export type FeedPostCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }

  export type $FeedPostCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedPostComment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      feedPost: Prisma.$FeedPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comment: string
      createdAt: Date
      userId: string
      feedPostId: string
    }, ExtArgs["result"]["feedPostComment"]>
    composites: {}
  }

  type FeedPostCommentGetPayload<S extends boolean | null | undefined | FeedPostCommentDefaultArgs> = $Result.GetResult<Prisma.$FeedPostCommentPayload, S>

  type FeedPostCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedPostCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedPostCommentCountAggregateInputType | true
    }

  export interface FeedPostCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedPostComment'], meta: { name: 'FeedPostComment' } }
    /**
     * Find zero or one FeedPostComment that matches the filter.
     * @param {FeedPostCommentFindUniqueArgs} args - Arguments to find a FeedPostComment
     * @example
     * // Get one FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedPostCommentFindUniqueArgs>(args: SelectSubset<T, FeedPostCommentFindUniqueArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedPostComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedPostCommentFindUniqueOrThrowArgs} args - Arguments to find a FeedPostComment
     * @example
     * // Get one FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedPostCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedPostCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPostComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentFindFirstArgs} args - Arguments to find a FeedPostComment
     * @example
     * // Get one FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedPostCommentFindFirstArgs>(args?: SelectSubset<T, FeedPostCommentFindFirstArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPostComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentFindFirstOrThrowArgs} args - Arguments to find a FeedPostComment
     * @example
     * // Get one FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedPostCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedPostCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedPostComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedPostComments
     * const feedPostComments = await prisma.feedPostComment.findMany()
     * 
     * // Get first 10 FeedPostComments
     * const feedPostComments = await prisma.feedPostComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedPostCommentWithIdOnly = await prisma.feedPostComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedPostCommentFindManyArgs>(args?: SelectSubset<T, FeedPostCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedPostComment.
     * @param {FeedPostCommentCreateArgs} args - Arguments to create a FeedPostComment.
     * @example
     * // Create one FeedPostComment
     * const FeedPostComment = await prisma.feedPostComment.create({
     *   data: {
     *     // ... data to create a FeedPostComment
     *   }
     * })
     * 
     */
    create<T extends FeedPostCommentCreateArgs>(args: SelectSubset<T, FeedPostCommentCreateArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedPostComments.
     * @param {FeedPostCommentCreateManyArgs} args - Arguments to create many FeedPostComments.
     * @example
     * // Create many FeedPostComments
     * const feedPostComment = await prisma.feedPostComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedPostCommentCreateManyArgs>(args?: SelectSubset<T, FeedPostCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedPostComments and returns the data saved in the database.
     * @param {FeedPostCommentCreateManyAndReturnArgs} args - Arguments to create many FeedPostComments.
     * @example
     * // Create many FeedPostComments
     * const feedPostComment = await prisma.feedPostComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedPostComments and only return the `id`
     * const feedPostCommentWithIdOnly = await prisma.feedPostComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedPostCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedPostCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedPostComment.
     * @param {FeedPostCommentDeleteArgs} args - Arguments to delete one FeedPostComment.
     * @example
     * // Delete one FeedPostComment
     * const FeedPostComment = await prisma.feedPostComment.delete({
     *   where: {
     *     // ... filter to delete one FeedPostComment
     *   }
     * })
     * 
     */
    delete<T extends FeedPostCommentDeleteArgs>(args: SelectSubset<T, FeedPostCommentDeleteArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedPostComment.
     * @param {FeedPostCommentUpdateArgs} args - Arguments to update one FeedPostComment.
     * @example
     * // Update one FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedPostCommentUpdateArgs>(args: SelectSubset<T, FeedPostCommentUpdateArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedPostComments.
     * @param {FeedPostCommentDeleteManyArgs} args - Arguments to filter FeedPostComments to delete.
     * @example
     * // Delete a few FeedPostComments
     * const { count } = await prisma.feedPostComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedPostCommentDeleteManyArgs>(args?: SelectSubset<T, FeedPostCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedPostComments
     * const feedPostComment = await prisma.feedPostComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedPostCommentUpdateManyArgs>(args: SelectSubset<T, FeedPostCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPostComments and returns the data updated in the database.
     * @param {FeedPostCommentUpdateManyAndReturnArgs} args - Arguments to update many FeedPostComments.
     * @example
     * // Update many FeedPostComments
     * const feedPostComment = await prisma.feedPostComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedPostComments and only return the `id`
     * const feedPostCommentWithIdOnly = await prisma.feedPostComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedPostCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedPostCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedPostComment.
     * @param {FeedPostCommentUpsertArgs} args - Arguments to update or create a FeedPostComment.
     * @example
     * // Update or create a FeedPostComment
     * const feedPostComment = await prisma.feedPostComment.upsert({
     *   create: {
     *     // ... data to create a FeedPostComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedPostComment we want to update
     *   }
     * })
     */
    upsert<T extends FeedPostCommentUpsertArgs>(args: SelectSubset<T, FeedPostCommentUpsertArgs<ExtArgs>>): Prisma__FeedPostCommentClient<$Result.GetResult<Prisma.$FeedPostCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedPostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentCountArgs} args - Arguments to filter FeedPostComments to count.
     * @example
     * // Count the number of FeedPostComments
     * const count = await prisma.feedPostComment.count({
     *   where: {
     *     // ... the filter for the FeedPostComments we want to count
     *   }
     * })
    **/
    count<T extends FeedPostCommentCountArgs>(
      args?: Subset<T, FeedPostCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedPostCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedPostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedPostCommentAggregateArgs>(args: Subset<T, FeedPostCommentAggregateArgs>): Prisma.PrismaPromise<GetFeedPostCommentAggregateType<T>>

    /**
     * Group by FeedPostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostCommentGroupByArgs} args - Group by arguments.
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
      T extends FeedPostCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedPostCommentGroupByArgs['orderBy'] }
        : { orderBy?: FeedPostCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FeedPostCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedPostCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedPostComment model
   */
  readonly fields: FeedPostCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedPostComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedPostCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feedPost<T extends FeedPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FeedPostDefaultArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedPostComment model
   */
  interface FeedPostCommentFieldRefs {
    readonly id: FieldRef<"FeedPostComment", 'String'>
    readonly comment: FieldRef<"FeedPostComment", 'String'>
    readonly createdAt: FieldRef<"FeedPostComment", 'DateTime'>
    readonly userId: FieldRef<"FeedPostComment", 'String'>
    readonly feedPostId: FieldRef<"FeedPostComment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FeedPostComment findUnique
   */
  export type FeedPostCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostComment to fetch.
     */
    where: FeedPostCommentWhereUniqueInput
  }

  /**
   * FeedPostComment findUniqueOrThrow
   */
  export type FeedPostCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostComment to fetch.
     */
    where: FeedPostCommentWhereUniqueInput
  }

  /**
   * FeedPostComment findFirst
   */
  export type FeedPostCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostComment to fetch.
     */
    where?: FeedPostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostComments to fetch.
     */
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPostComments.
     */
    cursor?: FeedPostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPostComments.
     */
    distinct?: FeedPostCommentScalarFieldEnum | FeedPostCommentScalarFieldEnum[]
  }

  /**
   * FeedPostComment findFirstOrThrow
   */
  export type FeedPostCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostComment to fetch.
     */
    where?: FeedPostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostComments to fetch.
     */
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPostComments.
     */
    cursor?: FeedPostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPostComments.
     */
    distinct?: FeedPostCommentScalarFieldEnum | FeedPostCommentScalarFieldEnum[]
  }

  /**
   * FeedPostComment findMany
   */
  export type FeedPostCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostComments to fetch.
     */
    where?: FeedPostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostComments to fetch.
     */
    orderBy?: FeedPostCommentOrderByWithRelationInput | FeedPostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedPostComments.
     */
    cursor?: FeedPostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostComments.
     */
    skip?: number
    distinct?: FeedPostCommentScalarFieldEnum | FeedPostCommentScalarFieldEnum[]
  }

  /**
   * FeedPostComment create
   */
  export type FeedPostCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedPostComment.
     */
    data: XOR<FeedPostCommentCreateInput, FeedPostCommentUncheckedCreateInput>
  }

  /**
   * FeedPostComment createMany
   */
  export type FeedPostCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedPostComments.
     */
    data: FeedPostCommentCreateManyInput | FeedPostCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedPostComment createManyAndReturn
   */
  export type FeedPostCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * The data used to create many FeedPostComments.
     */
    data: FeedPostCommentCreateManyInput | FeedPostCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPostComment update
   */
  export type FeedPostCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedPostComment.
     */
    data: XOR<FeedPostCommentUpdateInput, FeedPostCommentUncheckedUpdateInput>
    /**
     * Choose, which FeedPostComment to update.
     */
    where: FeedPostCommentWhereUniqueInput
  }

  /**
   * FeedPostComment updateMany
   */
  export type FeedPostCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedPostComments.
     */
    data: XOR<FeedPostCommentUpdateManyMutationInput, FeedPostCommentUncheckedUpdateManyInput>
    /**
     * Filter which FeedPostComments to update
     */
    where?: FeedPostCommentWhereInput
    /**
     * Limit how many FeedPostComments to update.
     */
    limit?: number
  }

  /**
   * FeedPostComment updateManyAndReturn
   */
  export type FeedPostCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * The data used to update FeedPostComments.
     */
    data: XOR<FeedPostCommentUpdateManyMutationInput, FeedPostCommentUncheckedUpdateManyInput>
    /**
     * Filter which FeedPostComments to update
     */
    where?: FeedPostCommentWhereInput
    /**
     * Limit how many FeedPostComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPostComment upsert
   */
  export type FeedPostCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedPostComment to update in case it exists.
     */
    where: FeedPostCommentWhereUniqueInput
    /**
     * In case the FeedPostComment found by the `where` argument doesn't exist, create a new FeedPostComment with this data.
     */
    create: XOR<FeedPostCommentCreateInput, FeedPostCommentUncheckedCreateInput>
    /**
     * In case the FeedPostComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedPostCommentUpdateInput, FeedPostCommentUncheckedUpdateInput>
  }

  /**
   * FeedPostComment delete
   */
  export type FeedPostCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
    /**
     * Filter which FeedPostComment to delete.
     */
    where: FeedPostCommentWhereUniqueInput
  }

  /**
   * FeedPostComment deleteMany
   */
  export type FeedPostCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPostComments to delete
     */
    where?: FeedPostCommentWhereInput
    /**
     * Limit how many FeedPostComments to delete.
     */
    limit?: number
  }

  /**
   * FeedPostComment without action
   */
  export type FeedPostCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostComment
     */
    select?: FeedPostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostComment
     */
    omit?: FeedPostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostCommentInclude<ExtArgs> | null
  }


  /**
   * Model FeedPostLike
   */

  export type AggregateFeedPostLike = {
    _count: FeedPostLikeCountAggregateOutputType | null
    _min: FeedPostLikeMinAggregateOutputType | null
    _max: FeedPostLikeMaxAggregateOutputType | null
  }

  export type FeedPostLikeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    feedPostId: string | null
  }

  export type FeedPostLikeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    feedPostId: string | null
  }

  export type FeedPostLikeCountAggregateOutputType = {
    id: number
    userId: number
    feedPostId: number
    _all: number
  }


  export type FeedPostLikeMinAggregateInputType = {
    id?: true
    userId?: true
    feedPostId?: true
  }

  export type FeedPostLikeMaxAggregateInputType = {
    id?: true
    userId?: true
    feedPostId?: true
  }

  export type FeedPostLikeCountAggregateInputType = {
    id?: true
    userId?: true
    feedPostId?: true
    _all?: true
  }

  export type FeedPostLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPostLike to aggregate.
     */
    where?: FeedPostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostLikes to fetch.
     */
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedPostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedPostLikes
    **/
    _count?: true | FeedPostLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedPostLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedPostLikeMaxAggregateInputType
  }

  export type GetFeedPostLikeAggregateType<T extends FeedPostLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedPostLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedPostLike[P]>
      : GetScalarType<T[P], AggregateFeedPostLike[P]>
  }




  export type FeedPostLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedPostLikeWhereInput
    orderBy?: FeedPostLikeOrderByWithAggregationInput | FeedPostLikeOrderByWithAggregationInput[]
    by: FeedPostLikeScalarFieldEnum[] | FeedPostLikeScalarFieldEnum
    having?: FeedPostLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedPostLikeCountAggregateInputType | true
    _min?: FeedPostLikeMinAggregateInputType
    _max?: FeedPostLikeMaxAggregateInputType
  }

  export type FeedPostLikeGroupByOutputType = {
    id: string
    userId: string
    feedPostId: string
    _count: FeedPostLikeCountAggregateOutputType | null
    _min: FeedPostLikeMinAggregateOutputType | null
    _max: FeedPostLikeMaxAggregateOutputType | null
  }

  type GetFeedPostLikeGroupByPayload<T extends FeedPostLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedPostLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedPostLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedPostLikeGroupByOutputType[P]>
            : GetScalarType<T[P], FeedPostLikeGroupByOutputType[P]>
        }
      >
    >


  export type FeedPostLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostLike"]>

  export type FeedPostLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostLike"]>

  export type FeedPostLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    feedPostId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedPostLike"]>

  export type FeedPostLikeSelectScalar = {
    id?: boolean
    userId?: boolean
    feedPostId?: boolean
  }

  export type FeedPostLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "feedPostId", ExtArgs["result"]["feedPostLike"]>
  export type FeedPostLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }
  export type FeedPostLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }
  export type FeedPostLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedPost?: boolean | FeedPostDefaultArgs<ExtArgs>
  }

  export type $FeedPostLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedPostLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      feedPost: Prisma.$FeedPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      feedPostId: string
    }, ExtArgs["result"]["feedPostLike"]>
    composites: {}
  }

  type FeedPostLikeGetPayload<S extends boolean | null | undefined | FeedPostLikeDefaultArgs> = $Result.GetResult<Prisma.$FeedPostLikePayload, S>

  type FeedPostLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedPostLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedPostLikeCountAggregateInputType | true
    }

  export interface FeedPostLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedPostLike'], meta: { name: 'FeedPostLike' } }
    /**
     * Find zero or one FeedPostLike that matches the filter.
     * @param {FeedPostLikeFindUniqueArgs} args - Arguments to find a FeedPostLike
     * @example
     * // Get one FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedPostLikeFindUniqueArgs>(args: SelectSubset<T, FeedPostLikeFindUniqueArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedPostLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedPostLikeFindUniqueOrThrowArgs} args - Arguments to find a FeedPostLike
     * @example
     * // Get one FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedPostLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedPostLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPostLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeFindFirstArgs} args - Arguments to find a FeedPostLike
     * @example
     * // Get one FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedPostLikeFindFirstArgs>(args?: SelectSubset<T, FeedPostLikeFindFirstArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedPostLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeFindFirstOrThrowArgs} args - Arguments to find a FeedPostLike
     * @example
     * // Get one FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedPostLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedPostLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedPostLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedPostLikes
     * const feedPostLikes = await prisma.feedPostLike.findMany()
     * 
     * // Get first 10 FeedPostLikes
     * const feedPostLikes = await prisma.feedPostLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedPostLikeWithIdOnly = await prisma.feedPostLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedPostLikeFindManyArgs>(args?: SelectSubset<T, FeedPostLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedPostLike.
     * @param {FeedPostLikeCreateArgs} args - Arguments to create a FeedPostLike.
     * @example
     * // Create one FeedPostLike
     * const FeedPostLike = await prisma.feedPostLike.create({
     *   data: {
     *     // ... data to create a FeedPostLike
     *   }
     * })
     * 
     */
    create<T extends FeedPostLikeCreateArgs>(args: SelectSubset<T, FeedPostLikeCreateArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedPostLikes.
     * @param {FeedPostLikeCreateManyArgs} args - Arguments to create many FeedPostLikes.
     * @example
     * // Create many FeedPostLikes
     * const feedPostLike = await prisma.feedPostLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedPostLikeCreateManyArgs>(args?: SelectSubset<T, FeedPostLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedPostLikes and returns the data saved in the database.
     * @param {FeedPostLikeCreateManyAndReturnArgs} args - Arguments to create many FeedPostLikes.
     * @example
     * // Create many FeedPostLikes
     * const feedPostLike = await prisma.feedPostLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedPostLikes and only return the `id`
     * const feedPostLikeWithIdOnly = await prisma.feedPostLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedPostLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedPostLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedPostLike.
     * @param {FeedPostLikeDeleteArgs} args - Arguments to delete one FeedPostLike.
     * @example
     * // Delete one FeedPostLike
     * const FeedPostLike = await prisma.feedPostLike.delete({
     *   where: {
     *     // ... filter to delete one FeedPostLike
     *   }
     * })
     * 
     */
    delete<T extends FeedPostLikeDeleteArgs>(args: SelectSubset<T, FeedPostLikeDeleteArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedPostLike.
     * @param {FeedPostLikeUpdateArgs} args - Arguments to update one FeedPostLike.
     * @example
     * // Update one FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedPostLikeUpdateArgs>(args: SelectSubset<T, FeedPostLikeUpdateArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedPostLikes.
     * @param {FeedPostLikeDeleteManyArgs} args - Arguments to filter FeedPostLikes to delete.
     * @example
     * // Delete a few FeedPostLikes
     * const { count } = await prisma.feedPostLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedPostLikeDeleteManyArgs>(args?: SelectSubset<T, FeedPostLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPostLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedPostLikes
     * const feedPostLike = await prisma.feedPostLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedPostLikeUpdateManyArgs>(args: SelectSubset<T, FeedPostLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedPostLikes and returns the data updated in the database.
     * @param {FeedPostLikeUpdateManyAndReturnArgs} args - Arguments to update many FeedPostLikes.
     * @example
     * // Update many FeedPostLikes
     * const feedPostLike = await prisma.feedPostLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedPostLikes and only return the `id`
     * const feedPostLikeWithIdOnly = await prisma.feedPostLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedPostLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedPostLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedPostLike.
     * @param {FeedPostLikeUpsertArgs} args - Arguments to update or create a FeedPostLike.
     * @example
     * // Update or create a FeedPostLike
     * const feedPostLike = await prisma.feedPostLike.upsert({
     *   create: {
     *     // ... data to create a FeedPostLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedPostLike we want to update
     *   }
     * })
     */
    upsert<T extends FeedPostLikeUpsertArgs>(args: SelectSubset<T, FeedPostLikeUpsertArgs<ExtArgs>>): Prisma__FeedPostLikeClient<$Result.GetResult<Prisma.$FeedPostLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedPostLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeCountArgs} args - Arguments to filter FeedPostLikes to count.
     * @example
     * // Count the number of FeedPostLikes
     * const count = await prisma.feedPostLike.count({
     *   where: {
     *     // ... the filter for the FeedPostLikes we want to count
     *   }
     * })
    **/
    count<T extends FeedPostLikeCountArgs>(
      args?: Subset<T, FeedPostLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedPostLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedPostLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedPostLikeAggregateArgs>(args: Subset<T, FeedPostLikeAggregateArgs>): Prisma.PrismaPromise<GetFeedPostLikeAggregateType<T>>

    /**
     * Group by FeedPostLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedPostLikeGroupByArgs} args - Group by arguments.
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
      T extends FeedPostLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedPostLikeGroupByArgs['orderBy'] }
        : { orderBy?: FeedPostLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FeedPostLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedPostLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedPostLike model
   */
  readonly fields: FeedPostLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedPostLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedPostLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feedPost<T extends FeedPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FeedPostDefaultArgs<ExtArgs>>): Prisma__FeedPostClient<$Result.GetResult<Prisma.$FeedPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedPostLike model
   */
  interface FeedPostLikeFieldRefs {
    readonly id: FieldRef<"FeedPostLike", 'String'>
    readonly userId: FieldRef<"FeedPostLike", 'String'>
    readonly feedPostId: FieldRef<"FeedPostLike", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FeedPostLike findUnique
   */
  export type FeedPostLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostLike to fetch.
     */
    where: FeedPostLikeWhereUniqueInput
  }

  /**
   * FeedPostLike findUniqueOrThrow
   */
  export type FeedPostLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostLike to fetch.
     */
    where: FeedPostLikeWhereUniqueInput
  }

  /**
   * FeedPostLike findFirst
   */
  export type FeedPostLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostLike to fetch.
     */
    where?: FeedPostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostLikes to fetch.
     */
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPostLikes.
     */
    cursor?: FeedPostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPostLikes.
     */
    distinct?: FeedPostLikeScalarFieldEnum | FeedPostLikeScalarFieldEnum[]
  }

  /**
   * FeedPostLike findFirstOrThrow
   */
  export type FeedPostLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostLike to fetch.
     */
    where?: FeedPostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostLikes to fetch.
     */
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedPostLikes.
     */
    cursor?: FeedPostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedPostLikes.
     */
    distinct?: FeedPostLikeScalarFieldEnum | FeedPostLikeScalarFieldEnum[]
  }

  /**
   * FeedPostLike findMany
   */
  export type FeedPostLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter, which FeedPostLikes to fetch.
     */
    where?: FeedPostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedPostLikes to fetch.
     */
    orderBy?: FeedPostLikeOrderByWithRelationInput | FeedPostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedPostLikes.
     */
    cursor?: FeedPostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedPostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedPostLikes.
     */
    skip?: number
    distinct?: FeedPostLikeScalarFieldEnum | FeedPostLikeScalarFieldEnum[]
  }

  /**
   * FeedPostLike create
   */
  export type FeedPostLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedPostLike.
     */
    data: XOR<FeedPostLikeCreateInput, FeedPostLikeUncheckedCreateInput>
  }

  /**
   * FeedPostLike createMany
   */
  export type FeedPostLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedPostLikes.
     */
    data: FeedPostLikeCreateManyInput | FeedPostLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedPostLike createManyAndReturn
   */
  export type FeedPostLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * The data used to create many FeedPostLikes.
     */
    data: FeedPostLikeCreateManyInput | FeedPostLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPostLike update
   */
  export type FeedPostLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedPostLike.
     */
    data: XOR<FeedPostLikeUpdateInput, FeedPostLikeUncheckedUpdateInput>
    /**
     * Choose, which FeedPostLike to update.
     */
    where: FeedPostLikeWhereUniqueInput
  }

  /**
   * FeedPostLike updateMany
   */
  export type FeedPostLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedPostLikes.
     */
    data: XOR<FeedPostLikeUpdateManyMutationInput, FeedPostLikeUncheckedUpdateManyInput>
    /**
     * Filter which FeedPostLikes to update
     */
    where?: FeedPostLikeWhereInput
    /**
     * Limit how many FeedPostLikes to update.
     */
    limit?: number
  }

  /**
   * FeedPostLike updateManyAndReturn
   */
  export type FeedPostLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * The data used to update FeedPostLikes.
     */
    data: XOR<FeedPostLikeUpdateManyMutationInput, FeedPostLikeUncheckedUpdateManyInput>
    /**
     * Filter which FeedPostLikes to update
     */
    where?: FeedPostLikeWhereInput
    /**
     * Limit how many FeedPostLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedPostLike upsert
   */
  export type FeedPostLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedPostLike to update in case it exists.
     */
    where: FeedPostLikeWhereUniqueInput
    /**
     * In case the FeedPostLike found by the `where` argument doesn't exist, create a new FeedPostLike with this data.
     */
    create: XOR<FeedPostLikeCreateInput, FeedPostLikeUncheckedCreateInput>
    /**
     * In case the FeedPostLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedPostLikeUpdateInput, FeedPostLikeUncheckedUpdateInput>
  }

  /**
   * FeedPostLike delete
   */
  export type FeedPostLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
    /**
     * Filter which FeedPostLike to delete.
     */
    where: FeedPostLikeWhereUniqueInput
  }

  /**
   * FeedPostLike deleteMany
   */
  export type FeedPostLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedPostLikes to delete
     */
    where?: FeedPostLikeWhereInput
    /**
     * Limit how many FeedPostLikes to delete.
     */
    limit?: number
  }

  /**
   * FeedPostLike without action
   */
  export type FeedPostLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedPostLike
     */
    select?: FeedPostLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedPostLike
     */
    omit?: FeedPostLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedPostLikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    address: 'address',
    name: 'name',
    username: 'username',
    email: 'email',
    website: 'website',
    avatar: 'avatar',
    bio: 'bio',
    coverImage: 'coverImage',
    language: 'language',
    timezone: 'timezone',
    accountType: 'accountType',
    featured: 'featured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    id: 'id',
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const SocialScalarFieldEnum: {
    id: 'id',
    url: 'url',
    userId: 'userId'
  };

  export type SocialScalarFieldEnum = (typeof SocialScalarFieldEnum)[keyof typeof SocialScalarFieldEnum]


  export const CollectionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    tags: 'tags',
    coverImage: 'coverImage',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CollectionScalarFieldEnum = (typeof CollectionScalarFieldEnum)[keyof typeof CollectionScalarFieldEnum]


  export const FeedPostScalarFieldEnum: {
    id: 'id',
    image: 'image',
    caption: 'caption',
    isPremium: 'isPremium',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type FeedPostScalarFieldEnum = (typeof FeedPostScalarFieldEnum)[keyof typeof FeedPostScalarFieldEnum]


  export const FeedPostCommentScalarFieldEnum: {
    id: 'id',
    comment: 'comment',
    createdAt: 'createdAt',
    userId: 'userId',
    feedPostId: 'feedPostId'
  };

  export type FeedPostCommentScalarFieldEnum = (typeof FeedPostCommentScalarFieldEnum)[keyof typeof FeedPostCommentScalarFieldEnum]


  export const FeedPostLikeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    feedPostId: 'feedPostId'
  };

  export type FeedPostLikeScalarFieldEnum = (typeof FeedPostLikeScalarFieldEnum)[keyof typeof FeedPostLikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    website?: StringNullableFilter<"User"> | string | null
    avatar?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    coverImage?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    accountType?: EnumAccountTypeFilter<"User"> | $Enums.AccountType
    featured?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socials?: SocialListRelationFilter
    followers?: FollowListRelationFilter
    following?: FollowListRelationFilter
    Collection?: CollectionListRelationFilter
    FeedPost?: FeedPostListRelationFilter
    FeedPostLike?: FeedPostLikeListRelationFilter
    FeedPostComment?: FeedPostCommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    avatar?: SortOrder
    bio?: SortOrderInput | SortOrder
    coverImage?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    accountType?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socials?: SocialOrderByRelationAggregateInput
    followers?: FollowOrderByRelationAggregateInput
    following?: FollowOrderByRelationAggregateInput
    Collection?: CollectionOrderByRelationAggregateInput
    FeedPost?: FeedPostOrderByRelationAggregateInput
    FeedPostLike?: FeedPostLikeOrderByRelationAggregateInput
    FeedPostComment?: FeedPostCommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    website?: StringNullableFilter<"User"> | string | null
    avatar?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    coverImage?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    accountType?: EnumAccountTypeFilter<"User"> | $Enums.AccountType
    featured?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socials?: SocialListRelationFilter
    followers?: FollowListRelationFilter
    following?: FollowListRelationFilter
    Collection?: CollectionListRelationFilter
    FeedPost?: FeedPostListRelationFilter
    FeedPostLike?: FeedPostLikeListRelationFilter
    FeedPostComment?: FeedPostCommentListRelationFilter
  }, "id" | "address" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    avatar?: SortOrder
    bio?: SortOrderInput | SortOrder
    coverImage?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    accountType?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    address?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    website?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringWithAggregatesFilter<"User"> | string
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    coverImage?: StringWithAggregatesFilter<"User"> | string
    language?: StringWithAggregatesFilter<"User"> | string
    timezone?: StringWithAggregatesFilter<"User"> | string
    accountType?: EnumAccountTypeWithAggregatesFilter<"User"> | $Enums.AccountType
    featured?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    id?: IntFilter<"Follow"> | number
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowOrderByWithRelationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    follower?: UserOrderByWithRelationInput
    following?: UserOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    followerId_followingId?: FollowFollowerIdFollowingIdCompoundUniqueInput
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "followerId_followingId">

  export type FollowOrderByWithAggregationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _avg?: FollowAvgOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
    _sum?: FollowSumOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Follow"> | number
    followerId?: StringWithAggregatesFilter<"Follow"> | string
    followingId?: StringWithAggregatesFilter<"Follow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Follow"> | Date | string
  }

  export type SocialWhereInput = {
    AND?: SocialWhereInput | SocialWhereInput[]
    OR?: SocialWhereInput[]
    NOT?: SocialWhereInput | SocialWhereInput[]
    id?: IntFilter<"Social"> | number
    url?: StringFilter<"Social"> | string
    userId?: StringFilter<"Social"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SocialOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SocialWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SocialWhereInput | SocialWhereInput[]
    OR?: SocialWhereInput[]
    NOT?: SocialWhereInput | SocialWhereInput[]
    url?: StringFilter<"Social"> | string
    userId?: StringFilter<"Social"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SocialOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
    _count?: SocialCountOrderByAggregateInput
    _avg?: SocialAvgOrderByAggregateInput
    _max?: SocialMaxOrderByAggregateInput
    _min?: SocialMinOrderByAggregateInput
    _sum?: SocialSumOrderByAggregateInput
  }

  export type SocialScalarWhereWithAggregatesInput = {
    AND?: SocialScalarWhereWithAggregatesInput | SocialScalarWhereWithAggregatesInput[]
    OR?: SocialScalarWhereWithAggregatesInput[]
    NOT?: SocialScalarWhereWithAggregatesInput | SocialScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Social"> | number
    url?: StringWithAggregatesFilter<"Social"> | string
    userId?: StringWithAggregatesFilter<"Social"> | string
  }

  export type CollectionWhereInput = {
    AND?: CollectionWhereInput | CollectionWhereInput[]
    OR?: CollectionWhereInput[]
    NOT?: CollectionWhereInput | CollectionWhereInput[]
    id?: StringFilter<"Collection"> | string
    title?: StringFilter<"Collection"> | string
    description?: StringFilter<"Collection"> | string
    tags?: StringFilter<"Collection"> | string
    coverImage?: StringFilter<"Collection"> | string
    userId?: StringFilter<"Collection"> | string
    createdAt?: DateTimeFilter<"Collection"> | Date | string
    updatedAt?: DateTimeFilter<"Collection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CollectionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    coverImage?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CollectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CollectionWhereInput | CollectionWhereInput[]
    OR?: CollectionWhereInput[]
    NOT?: CollectionWhereInput | CollectionWhereInput[]
    title?: StringFilter<"Collection"> | string
    description?: StringFilter<"Collection"> | string
    tags?: StringFilter<"Collection"> | string
    coverImage?: StringFilter<"Collection"> | string
    userId?: StringFilter<"Collection"> | string
    createdAt?: DateTimeFilter<"Collection"> | Date | string
    updatedAt?: DateTimeFilter<"Collection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CollectionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    coverImage?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CollectionCountOrderByAggregateInput
    _max?: CollectionMaxOrderByAggregateInput
    _min?: CollectionMinOrderByAggregateInput
  }

  export type CollectionScalarWhereWithAggregatesInput = {
    AND?: CollectionScalarWhereWithAggregatesInput | CollectionScalarWhereWithAggregatesInput[]
    OR?: CollectionScalarWhereWithAggregatesInput[]
    NOT?: CollectionScalarWhereWithAggregatesInput | CollectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Collection"> | string
    title?: StringWithAggregatesFilter<"Collection"> | string
    description?: StringWithAggregatesFilter<"Collection"> | string
    tags?: StringWithAggregatesFilter<"Collection"> | string
    coverImage?: StringWithAggregatesFilter<"Collection"> | string
    userId?: StringWithAggregatesFilter<"Collection"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Collection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Collection"> | Date | string
  }

  export type FeedPostWhereInput = {
    AND?: FeedPostWhereInput | FeedPostWhereInput[]
    OR?: FeedPostWhereInput[]
    NOT?: FeedPostWhereInput | FeedPostWhereInput[]
    id?: StringFilter<"FeedPost"> | string
    image?: StringNullableFilter<"FeedPost"> | string | null
    caption?: StringNullableFilter<"FeedPost"> | string | null
    isPremium?: BoolFilter<"FeedPost"> | boolean
    userId?: StringFilter<"FeedPost"> | string
    createdAt?: DateTimeFilter<"FeedPost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    FeedPostComment?: FeedPostCommentListRelationFilter
    FeedPostLike?: FeedPostLikeListRelationFilter
  }

  export type FeedPostOrderByWithRelationInput = {
    id?: SortOrder
    image?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    FeedPostComment?: FeedPostCommentOrderByRelationAggregateInput
    FeedPostLike?: FeedPostLikeOrderByRelationAggregateInput
  }

  export type FeedPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedPostWhereInput | FeedPostWhereInput[]
    OR?: FeedPostWhereInput[]
    NOT?: FeedPostWhereInput | FeedPostWhereInput[]
    image?: StringNullableFilter<"FeedPost"> | string | null
    caption?: StringNullableFilter<"FeedPost"> | string | null
    isPremium?: BoolFilter<"FeedPost"> | boolean
    userId?: StringFilter<"FeedPost"> | string
    createdAt?: DateTimeFilter<"FeedPost"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    FeedPostComment?: FeedPostCommentListRelationFilter
    FeedPostLike?: FeedPostLikeListRelationFilter
  }, "id">

  export type FeedPostOrderByWithAggregationInput = {
    id?: SortOrder
    image?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: FeedPostCountOrderByAggregateInput
    _max?: FeedPostMaxOrderByAggregateInput
    _min?: FeedPostMinOrderByAggregateInput
  }

  export type FeedPostScalarWhereWithAggregatesInput = {
    AND?: FeedPostScalarWhereWithAggregatesInput | FeedPostScalarWhereWithAggregatesInput[]
    OR?: FeedPostScalarWhereWithAggregatesInput[]
    NOT?: FeedPostScalarWhereWithAggregatesInput | FeedPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedPost"> | string
    image?: StringNullableWithAggregatesFilter<"FeedPost"> | string | null
    caption?: StringNullableWithAggregatesFilter<"FeedPost"> | string | null
    isPremium?: BoolWithAggregatesFilter<"FeedPost"> | boolean
    userId?: StringWithAggregatesFilter<"FeedPost"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FeedPost"> | Date | string
  }

  export type FeedPostCommentWhereInput = {
    AND?: FeedPostCommentWhereInput | FeedPostCommentWhereInput[]
    OR?: FeedPostCommentWhereInput[]
    NOT?: FeedPostCommentWhereInput | FeedPostCommentWhereInput[]
    id?: StringFilter<"FeedPostComment"> | string
    comment?: StringFilter<"FeedPostComment"> | string
    createdAt?: DateTimeFilter<"FeedPostComment"> | Date | string
    userId?: StringFilter<"FeedPostComment"> | string
    feedPostId?: StringFilter<"FeedPostComment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedPost?: XOR<FeedPostScalarRelationFilter, FeedPostWhereInput>
  }

  export type FeedPostCommentOrderByWithRelationInput = {
    id?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
    user?: UserOrderByWithRelationInput
    feedPost?: FeedPostOrderByWithRelationInput
  }

  export type FeedPostCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedPostCommentWhereInput | FeedPostCommentWhereInput[]
    OR?: FeedPostCommentWhereInput[]
    NOT?: FeedPostCommentWhereInput | FeedPostCommentWhereInput[]
    comment?: StringFilter<"FeedPostComment"> | string
    createdAt?: DateTimeFilter<"FeedPostComment"> | Date | string
    userId?: StringFilter<"FeedPostComment"> | string
    feedPostId?: StringFilter<"FeedPostComment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedPost?: XOR<FeedPostScalarRelationFilter, FeedPostWhereInput>
  }, "id">

  export type FeedPostCommentOrderByWithAggregationInput = {
    id?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
    _count?: FeedPostCommentCountOrderByAggregateInput
    _max?: FeedPostCommentMaxOrderByAggregateInput
    _min?: FeedPostCommentMinOrderByAggregateInput
  }

  export type FeedPostCommentScalarWhereWithAggregatesInput = {
    AND?: FeedPostCommentScalarWhereWithAggregatesInput | FeedPostCommentScalarWhereWithAggregatesInput[]
    OR?: FeedPostCommentScalarWhereWithAggregatesInput[]
    NOT?: FeedPostCommentScalarWhereWithAggregatesInput | FeedPostCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedPostComment"> | string
    comment?: StringWithAggregatesFilter<"FeedPostComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FeedPostComment"> | Date | string
    userId?: StringWithAggregatesFilter<"FeedPostComment"> | string
    feedPostId?: StringWithAggregatesFilter<"FeedPostComment"> | string
  }

  export type FeedPostLikeWhereInput = {
    AND?: FeedPostLikeWhereInput | FeedPostLikeWhereInput[]
    OR?: FeedPostLikeWhereInput[]
    NOT?: FeedPostLikeWhereInput | FeedPostLikeWhereInput[]
    id?: StringFilter<"FeedPostLike"> | string
    userId?: StringFilter<"FeedPostLike"> | string
    feedPostId?: StringFilter<"FeedPostLike"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedPost?: XOR<FeedPostScalarRelationFilter, FeedPostWhereInput>
  }

  export type FeedPostLikeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
    user?: UserOrderByWithRelationInput
    feedPost?: FeedPostOrderByWithRelationInput
  }

  export type FeedPostLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedPostLikeWhereInput | FeedPostLikeWhereInput[]
    OR?: FeedPostLikeWhereInput[]
    NOT?: FeedPostLikeWhereInput | FeedPostLikeWhereInput[]
    userId?: StringFilter<"FeedPostLike"> | string
    feedPostId?: StringFilter<"FeedPostLike"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedPost?: XOR<FeedPostScalarRelationFilter, FeedPostWhereInput>
  }, "id">

  export type FeedPostLikeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
    _count?: FeedPostLikeCountOrderByAggregateInput
    _max?: FeedPostLikeMaxOrderByAggregateInput
    _min?: FeedPostLikeMinOrderByAggregateInput
  }

  export type FeedPostLikeScalarWhereWithAggregatesInput = {
    AND?: FeedPostLikeScalarWhereWithAggregatesInput | FeedPostLikeScalarWhereWithAggregatesInput[]
    OR?: FeedPostLikeScalarWhereWithAggregatesInput[]
    NOT?: FeedPostLikeScalarWhereWithAggregatesInput | FeedPostLikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeedPostLike"> | string
    userId?: StringWithAggregatesFilter<"FeedPostLike"> | string
    feedPostId?: StringWithAggregatesFilter<"FeedPostLike"> | string
  }

  export type UserCreateInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateInput = {
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowersInput
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateInput = {
    id?: number
    followerId: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowersNestedInput
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyInput = {
    id?: number
    followerId: string
    followingId: string
    createdAt?: Date | string
  }

  export type FollowUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: StringFieldUpdateOperationsInput | string
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialCreateInput = {
    url: string
    user: UserCreateNestedOneWithoutSocialsInput
  }

  export type SocialUncheckedCreateInput = {
    id?: number
    url: string
    userId: string
  }

  export type SocialUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocialsNestedInput
  }

  export type SocialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialCreateManyInput = {
    id?: number
    url: string
    userId: string
  }

  export type SocialUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
  }

  export type SocialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CollectionCreateInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCollectionInput
  }

  export type CollectionUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCollectionNestedInput
  }

  export type CollectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollectionCreateManyInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostCreateInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedPostInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutFeedPostInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostUncheckedCreateInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    userId: string
    createdAt?: Date | string
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutFeedPostInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedPostNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutFeedPostNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutFeedPostNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostCreateManyInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    userId: string
    createdAt?: Date | string
  }

  export type FeedPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostCommentCreateInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedPostCommentInput
    feedPost: FeedPostCreateNestedOneWithoutFeedPostCommentInput
  }

  export type FeedPostCommentUncheckedCreateInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    userId: string
    feedPostId: string
  }

  export type FeedPostCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedPostCommentNestedInput
    feedPost?: FeedPostUpdateOneRequiredWithoutFeedPostCommentNestedInput
  }

  export type FeedPostCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostCommentCreateManyInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    userId: string
    feedPostId: string
  }

  export type FeedPostCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutFeedPostLikeInput
    feedPost: FeedPostCreateNestedOneWithoutFeedPostLikeInput
  }

  export type FeedPostLikeUncheckedCreateInput = {
    id?: string
    userId: string
    feedPostId: string
  }

  export type FeedPostLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFeedPostLikeNestedInput
    feedPost?: FeedPostUpdateOneRequiredWithoutFeedPostLikeNestedInput
  }

  export type FeedPostLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeCreateManyInput = {
    id?: string
    userId: string
    feedPostId: string
  }

  export type FeedPostLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SocialListRelationFilter = {
    every?: SocialWhereInput
    some?: SocialWhereInput
    none?: SocialWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type CollectionListRelationFilter = {
    every?: CollectionWhereInput
    some?: CollectionWhereInput
    none?: CollectionWhereInput
  }

  export type FeedPostListRelationFilter = {
    every?: FeedPostWhereInput
    some?: FeedPostWhereInput
    none?: FeedPostWhereInput
  }

  export type FeedPostLikeListRelationFilter = {
    every?: FeedPostLikeWhereInput
    some?: FeedPostLikeWhereInput
    none?: FeedPostLikeWhereInput
  }

  export type FeedPostCommentListRelationFilter = {
    every?: FeedPostCommentWhereInput
    some?: FeedPostCommentWhereInput
    none?: FeedPostCommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SocialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedPostLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedPostCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    coverImage?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    accountType?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    coverImage?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    accountType?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    coverImage?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    accountType?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FollowFollowerIdFollowingIdCompoundUniqueInput = {
    followerId: string
    followingId: string
  }

  export type FollowCountOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SocialCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
  }

  export type SocialAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SocialMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
  }

  export type SocialMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    userId?: SortOrder
  }

  export type SocialSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CollectionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    coverImage?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollectionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    coverImage?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollectionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    coverImage?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedPostCountOrderByAggregateInput = {
    id?: SortOrder
    image?: SortOrder
    caption?: SortOrder
    isPremium?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedPostMaxOrderByAggregateInput = {
    id?: SortOrder
    image?: SortOrder
    caption?: SortOrder
    isPremium?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedPostMinOrderByAggregateInput = {
    id?: SortOrder
    image?: SortOrder
    caption?: SortOrder
    isPremium?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedPostScalarRelationFilter = {
    is?: FeedPostWhereInput
    isNot?: FeedPostWhereInput
  }

  export type FeedPostCommentCountOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type FeedPostCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type FeedPostCommentMinOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type FeedPostLikeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type FeedPostLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type FeedPostLikeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feedPostId?: SortOrder
  }

  export type SocialCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput> | SocialCreateWithoutUserInput[] | SocialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutUserInput | SocialCreateOrConnectWithoutUserInput[]
    createMany?: SocialCreateManyUserInputEnvelope
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type CollectionCreateNestedManyWithoutUserInput = {
    create?: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput> | CollectionCreateWithoutUserInput[] | CollectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollectionCreateOrConnectWithoutUserInput | CollectionCreateOrConnectWithoutUserInput[]
    createMany?: CollectionCreateManyUserInputEnvelope
    connect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
  }

  export type FeedPostCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput> | FeedPostCreateWithoutUserInput[] | FeedPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCreateOrConnectWithoutUserInput | FeedPostCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostCreateManyUserInputEnvelope
    connect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
  }

  export type FeedPostLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput> | FeedPostLikeCreateWithoutUserInput[] | FeedPostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutUserInput | FeedPostLikeCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostLikeCreateManyUserInputEnvelope
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
  }

  export type FeedPostCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput> | FeedPostCommentCreateWithoutUserInput[] | FeedPostCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutUserInput | FeedPostCommentCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostCommentCreateManyUserInputEnvelope
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
  }

  export type SocialUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput> | SocialCreateWithoutUserInput[] | SocialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutUserInput | SocialCreateOrConnectWithoutUserInput[]
    createMany?: SocialCreateManyUserInputEnvelope
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type CollectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput> | CollectionCreateWithoutUserInput[] | CollectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollectionCreateOrConnectWithoutUserInput | CollectionCreateOrConnectWithoutUserInput[]
    createMany?: CollectionCreateManyUserInputEnvelope
    connect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
  }

  export type FeedPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput> | FeedPostCreateWithoutUserInput[] | FeedPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCreateOrConnectWithoutUserInput | FeedPostCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostCreateManyUserInputEnvelope
    connect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
  }

  export type FeedPostLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput> | FeedPostLikeCreateWithoutUserInput[] | FeedPostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutUserInput | FeedPostLikeCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostLikeCreateManyUserInputEnvelope
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
  }

  export type FeedPostCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput> | FeedPostCommentCreateWithoutUserInput[] | FeedPostCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutUserInput | FeedPostCommentCreateOrConnectWithoutUserInput[]
    createMany?: FeedPostCommentCreateManyUserInputEnvelope
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SocialUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput> | SocialCreateWithoutUserInput[] | SocialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutUserInput | SocialCreateOrConnectWithoutUserInput[]
    upsert?: SocialUpsertWithWhereUniqueWithoutUserInput | SocialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialCreateManyUserInputEnvelope
    set?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    disconnect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    delete?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    update?: SocialUpdateWithWhereUniqueWithoutUserInput | SocialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialUpdateManyWithWhereWithoutUserInput | SocialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialScalarWhereInput | SocialScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type CollectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput> | CollectionCreateWithoutUserInput[] | CollectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollectionCreateOrConnectWithoutUserInput | CollectionCreateOrConnectWithoutUserInput[]
    upsert?: CollectionUpsertWithWhereUniqueWithoutUserInput | CollectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollectionCreateManyUserInputEnvelope
    set?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    disconnect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    delete?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    connect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    update?: CollectionUpdateWithWhereUniqueWithoutUserInput | CollectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollectionUpdateManyWithWhereWithoutUserInput | CollectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollectionScalarWhereInput | CollectionScalarWhereInput[]
  }

  export type FeedPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput> | FeedPostCreateWithoutUserInput[] | FeedPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCreateOrConnectWithoutUserInput | FeedPostCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostUpsertWithWhereUniqueWithoutUserInput | FeedPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostCreateManyUserInputEnvelope
    set?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    disconnect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    delete?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    connect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    update?: FeedPostUpdateWithWhereUniqueWithoutUserInput | FeedPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostUpdateManyWithWhereWithoutUserInput | FeedPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostScalarWhereInput | FeedPostScalarWhereInput[]
  }

  export type FeedPostLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput> | FeedPostLikeCreateWithoutUserInput[] | FeedPostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutUserInput | FeedPostLikeCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostLikeUpsertWithWhereUniqueWithoutUserInput | FeedPostLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostLikeCreateManyUserInputEnvelope
    set?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    disconnect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    delete?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    update?: FeedPostLikeUpdateWithWhereUniqueWithoutUserInput | FeedPostLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostLikeUpdateManyWithWhereWithoutUserInput | FeedPostLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
  }

  export type FeedPostCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput> | FeedPostCommentCreateWithoutUserInput[] | FeedPostCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutUserInput | FeedPostCommentCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostCommentUpsertWithWhereUniqueWithoutUserInput | FeedPostCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostCommentCreateManyUserInputEnvelope
    set?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    disconnect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    delete?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    update?: FeedPostCommentUpdateWithWhereUniqueWithoutUserInput | FeedPostCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostCommentUpdateManyWithWhereWithoutUserInput | FeedPostCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
  }

  export type SocialUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput> | SocialCreateWithoutUserInput[] | SocialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialCreateOrConnectWithoutUserInput | SocialCreateOrConnectWithoutUserInput[]
    upsert?: SocialUpsertWithWhereUniqueWithoutUserInput | SocialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialCreateManyUserInputEnvelope
    set?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    disconnect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    delete?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    connect?: SocialWhereUniqueInput | SocialWhereUniqueInput[]
    update?: SocialUpdateWithWhereUniqueWithoutUserInput | SocialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialUpdateManyWithWhereWithoutUserInput | SocialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialScalarWhereInput | SocialScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type CollectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput> | CollectionCreateWithoutUserInput[] | CollectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollectionCreateOrConnectWithoutUserInput | CollectionCreateOrConnectWithoutUserInput[]
    upsert?: CollectionUpsertWithWhereUniqueWithoutUserInput | CollectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollectionCreateManyUserInputEnvelope
    set?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    disconnect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    delete?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    connect?: CollectionWhereUniqueInput | CollectionWhereUniqueInput[]
    update?: CollectionUpdateWithWhereUniqueWithoutUserInput | CollectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollectionUpdateManyWithWhereWithoutUserInput | CollectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollectionScalarWhereInput | CollectionScalarWhereInput[]
  }

  export type FeedPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput> | FeedPostCreateWithoutUserInput[] | FeedPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCreateOrConnectWithoutUserInput | FeedPostCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostUpsertWithWhereUniqueWithoutUserInput | FeedPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostCreateManyUserInputEnvelope
    set?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    disconnect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    delete?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    connect?: FeedPostWhereUniqueInput | FeedPostWhereUniqueInput[]
    update?: FeedPostUpdateWithWhereUniqueWithoutUserInput | FeedPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostUpdateManyWithWhereWithoutUserInput | FeedPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostScalarWhereInput | FeedPostScalarWhereInput[]
  }

  export type FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput> | FeedPostLikeCreateWithoutUserInput[] | FeedPostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutUserInput | FeedPostLikeCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostLikeUpsertWithWhereUniqueWithoutUserInput | FeedPostLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostLikeCreateManyUserInputEnvelope
    set?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    disconnect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    delete?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    update?: FeedPostLikeUpdateWithWhereUniqueWithoutUserInput | FeedPostLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostLikeUpdateManyWithWhereWithoutUserInput | FeedPostLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
  }

  export type FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput> | FeedPostCommentCreateWithoutUserInput[] | FeedPostCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutUserInput | FeedPostCommentCreateOrConnectWithoutUserInput[]
    upsert?: FeedPostCommentUpsertWithWhereUniqueWithoutUserInput | FeedPostCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedPostCommentCreateManyUserInputEnvelope
    set?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    disconnect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    delete?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    update?: FeedPostCommentUpdateWithWhereUniqueWithoutUserInput | FeedPostCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedPostCommentUpdateManyWithWhereWithoutUserInput | FeedPostCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowersInput, UserUpdateWithoutFollowersInput>, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutSocialsInput = {
    create?: XOR<UserCreateWithoutSocialsInput, UserUncheckedCreateWithoutSocialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSocialsNestedInput = {
    create?: XOR<UserCreateWithoutSocialsInput, UserUncheckedCreateWithoutSocialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialsInput
    upsert?: UserUpsertWithoutSocialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSocialsInput, UserUpdateWithoutSocialsInput>, UserUncheckedUpdateWithoutSocialsInput>
  }

  export type UserCreateNestedOneWithoutCollectionInput = {
    create?: XOR<UserCreateWithoutCollectionInput, UserUncheckedCreateWithoutCollectionInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollectionInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCollectionNestedInput = {
    create?: XOR<UserCreateWithoutCollectionInput, UserUncheckedCreateWithoutCollectionInput>
    connectOrCreate?: UserCreateOrConnectWithoutCollectionInput
    upsert?: UserUpsertWithoutCollectionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCollectionInput, UserUpdateWithoutCollectionInput>, UserUncheckedUpdateWithoutCollectionInput>
  }

  export type UserCreateNestedOneWithoutFeedPostInput = {
    create?: XOR<UserCreateWithoutFeedPostInput, UserUncheckedCreateWithoutFeedPostInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostInput
    connect?: UserWhereUniqueInput
  }

  export type FeedPostCommentCreateNestedManyWithoutFeedPostInput = {
    create?: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput> | FeedPostCommentCreateWithoutFeedPostInput[] | FeedPostCommentUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutFeedPostInput | FeedPostCommentCreateOrConnectWithoutFeedPostInput[]
    createMany?: FeedPostCommentCreateManyFeedPostInputEnvelope
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
  }

  export type FeedPostLikeCreateNestedManyWithoutFeedPostInput = {
    create?: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput> | FeedPostLikeCreateWithoutFeedPostInput[] | FeedPostLikeUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutFeedPostInput | FeedPostLikeCreateOrConnectWithoutFeedPostInput[]
    createMany?: FeedPostLikeCreateManyFeedPostInputEnvelope
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
  }

  export type FeedPostCommentUncheckedCreateNestedManyWithoutFeedPostInput = {
    create?: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput> | FeedPostCommentCreateWithoutFeedPostInput[] | FeedPostCommentUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutFeedPostInput | FeedPostCommentCreateOrConnectWithoutFeedPostInput[]
    createMany?: FeedPostCommentCreateManyFeedPostInputEnvelope
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
  }

  export type FeedPostLikeUncheckedCreateNestedManyWithoutFeedPostInput = {
    create?: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput> | FeedPostLikeCreateWithoutFeedPostInput[] | FeedPostLikeUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutFeedPostInput | FeedPostLikeCreateOrConnectWithoutFeedPostInput[]
    createMany?: FeedPostLikeCreateManyFeedPostInputEnvelope
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFeedPostNestedInput = {
    create?: XOR<UserCreateWithoutFeedPostInput, UserUncheckedCreateWithoutFeedPostInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostInput
    upsert?: UserUpsertWithoutFeedPostInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedPostInput, UserUpdateWithoutFeedPostInput>, UserUncheckedUpdateWithoutFeedPostInput>
  }

  export type FeedPostCommentUpdateManyWithoutFeedPostNestedInput = {
    create?: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput> | FeedPostCommentCreateWithoutFeedPostInput[] | FeedPostCommentUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutFeedPostInput | FeedPostCommentCreateOrConnectWithoutFeedPostInput[]
    upsert?: FeedPostCommentUpsertWithWhereUniqueWithoutFeedPostInput | FeedPostCommentUpsertWithWhereUniqueWithoutFeedPostInput[]
    createMany?: FeedPostCommentCreateManyFeedPostInputEnvelope
    set?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    disconnect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    delete?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    update?: FeedPostCommentUpdateWithWhereUniqueWithoutFeedPostInput | FeedPostCommentUpdateWithWhereUniqueWithoutFeedPostInput[]
    updateMany?: FeedPostCommentUpdateManyWithWhereWithoutFeedPostInput | FeedPostCommentUpdateManyWithWhereWithoutFeedPostInput[]
    deleteMany?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
  }

  export type FeedPostLikeUpdateManyWithoutFeedPostNestedInput = {
    create?: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput> | FeedPostLikeCreateWithoutFeedPostInput[] | FeedPostLikeUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutFeedPostInput | FeedPostLikeCreateOrConnectWithoutFeedPostInput[]
    upsert?: FeedPostLikeUpsertWithWhereUniqueWithoutFeedPostInput | FeedPostLikeUpsertWithWhereUniqueWithoutFeedPostInput[]
    createMany?: FeedPostLikeCreateManyFeedPostInputEnvelope
    set?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    disconnect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    delete?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    update?: FeedPostLikeUpdateWithWhereUniqueWithoutFeedPostInput | FeedPostLikeUpdateWithWhereUniqueWithoutFeedPostInput[]
    updateMany?: FeedPostLikeUpdateManyWithWhereWithoutFeedPostInput | FeedPostLikeUpdateManyWithWhereWithoutFeedPostInput[]
    deleteMany?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
  }

  export type FeedPostCommentUncheckedUpdateManyWithoutFeedPostNestedInput = {
    create?: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput> | FeedPostCommentCreateWithoutFeedPostInput[] | FeedPostCommentUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostCommentCreateOrConnectWithoutFeedPostInput | FeedPostCommentCreateOrConnectWithoutFeedPostInput[]
    upsert?: FeedPostCommentUpsertWithWhereUniqueWithoutFeedPostInput | FeedPostCommentUpsertWithWhereUniqueWithoutFeedPostInput[]
    createMany?: FeedPostCommentCreateManyFeedPostInputEnvelope
    set?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    disconnect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    delete?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    connect?: FeedPostCommentWhereUniqueInput | FeedPostCommentWhereUniqueInput[]
    update?: FeedPostCommentUpdateWithWhereUniqueWithoutFeedPostInput | FeedPostCommentUpdateWithWhereUniqueWithoutFeedPostInput[]
    updateMany?: FeedPostCommentUpdateManyWithWhereWithoutFeedPostInput | FeedPostCommentUpdateManyWithWhereWithoutFeedPostInput[]
    deleteMany?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
  }

  export type FeedPostLikeUncheckedUpdateManyWithoutFeedPostNestedInput = {
    create?: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput> | FeedPostLikeCreateWithoutFeedPostInput[] | FeedPostLikeUncheckedCreateWithoutFeedPostInput[]
    connectOrCreate?: FeedPostLikeCreateOrConnectWithoutFeedPostInput | FeedPostLikeCreateOrConnectWithoutFeedPostInput[]
    upsert?: FeedPostLikeUpsertWithWhereUniqueWithoutFeedPostInput | FeedPostLikeUpsertWithWhereUniqueWithoutFeedPostInput[]
    createMany?: FeedPostLikeCreateManyFeedPostInputEnvelope
    set?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    disconnect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    delete?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    connect?: FeedPostLikeWhereUniqueInput | FeedPostLikeWhereUniqueInput[]
    update?: FeedPostLikeUpdateWithWhereUniqueWithoutFeedPostInput | FeedPostLikeUpdateWithWhereUniqueWithoutFeedPostInput[]
    updateMany?: FeedPostLikeUpdateManyWithWhereWithoutFeedPostInput | FeedPostLikeUpdateManyWithWhereWithoutFeedPostInput[]
    deleteMany?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFeedPostCommentInput = {
    create?: XOR<UserCreateWithoutFeedPostCommentInput, UserUncheckedCreateWithoutFeedPostCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostCommentInput
    connect?: UserWhereUniqueInput
  }

  export type FeedPostCreateNestedOneWithoutFeedPostCommentInput = {
    create?: XOR<FeedPostCreateWithoutFeedPostCommentInput, FeedPostUncheckedCreateWithoutFeedPostCommentInput>
    connectOrCreate?: FeedPostCreateOrConnectWithoutFeedPostCommentInput
    connect?: FeedPostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeedPostCommentNestedInput = {
    create?: XOR<UserCreateWithoutFeedPostCommentInput, UserUncheckedCreateWithoutFeedPostCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostCommentInput
    upsert?: UserUpsertWithoutFeedPostCommentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedPostCommentInput, UserUpdateWithoutFeedPostCommentInput>, UserUncheckedUpdateWithoutFeedPostCommentInput>
  }

  export type FeedPostUpdateOneRequiredWithoutFeedPostCommentNestedInput = {
    create?: XOR<FeedPostCreateWithoutFeedPostCommentInput, FeedPostUncheckedCreateWithoutFeedPostCommentInput>
    connectOrCreate?: FeedPostCreateOrConnectWithoutFeedPostCommentInput
    upsert?: FeedPostUpsertWithoutFeedPostCommentInput
    connect?: FeedPostWhereUniqueInput
    update?: XOR<XOR<FeedPostUpdateToOneWithWhereWithoutFeedPostCommentInput, FeedPostUpdateWithoutFeedPostCommentInput>, FeedPostUncheckedUpdateWithoutFeedPostCommentInput>
  }

  export type UserCreateNestedOneWithoutFeedPostLikeInput = {
    create?: XOR<UserCreateWithoutFeedPostLikeInput, UserUncheckedCreateWithoutFeedPostLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostLikeInput
    connect?: UserWhereUniqueInput
  }

  export type FeedPostCreateNestedOneWithoutFeedPostLikeInput = {
    create?: XOR<FeedPostCreateWithoutFeedPostLikeInput, FeedPostUncheckedCreateWithoutFeedPostLikeInput>
    connectOrCreate?: FeedPostCreateOrConnectWithoutFeedPostLikeInput
    connect?: FeedPostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeedPostLikeNestedInput = {
    create?: XOR<UserCreateWithoutFeedPostLikeInput, UserUncheckedCreateWithoutFeedPostLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedPostLikeInput
    upsert?: UserUpsertWithoutFeedPostLikeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedPostLikeInput, UserUpdateWithoutFeedPostLikeInput>, UserUncheckedUpdateWithoutFeedPostLikeInput>
  }

  export type FeedPostUpdateOneRequiredWithoutFeedPostLikeNestedInput = {
    create?: XOR<FeedPostCreateWithoutFeedPostLikeInput, FeedPostUncheckedCreateWithoutFeedPostLikeInput>
    connectOrCreate?: FeedPostCreateOrConnectWithoutFeedPostLikeInput
    upsert?: FeedPostUpsertWithoutFeedPostLikeInput
    connect?: FeedPostWhereUniqueInput
    update?: XOR<XOR<FeedPostUpdateToOneWithWhereWithoutFeedPostLikeInput, FeedPostUpdateWithoutFeedPostLikeInput>, FeedPostUncheckedUpdateWithoutFeedPostLikeInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SocialCreateWithoutUserInput = {
    url: string
  }

  export type SocialUncheckedCreateWithoutUserInput = {
    id?: number
    url: string
  }

  export type SocialCreateOrConnectWithoutUserInput = {
    where: SocialWhereUniqueInput
    create: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput>
  }

  export type SocialCreateManyUserInputEnvelope = {
    data: SocialCreateManyUserInput | SocialCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowerInput = {
    createdAt?: Date | string
    following: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateWithoutFollowerInput = {
    id?: number
    followingId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowCreateManyFollowerInputEnvelope = {
    data: FollowCreateManyFollowerInput | FollowCreateManyFollowerInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowingInput = {
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUncheckedCreateWithoutFollowingInput = {
    id?: number
    followerId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowCreateManyFollowingInputEnvelope = {
    data: FollowCreateManyFollowingInput | FollowCreateManyFollowingInput[]
    skipDuplicates?: boolean
  }

  export type CollectionCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollectionUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollectionCreateOrConnectWithoutUserInput = {
    where: CollectionWhereUniqueInput
    create: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput>
  }

  export type CollectionCreateManyUserInputEnvelope = {
    data: CollectionCreateManyUserInput | CollectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedPostCreateWithoutUserInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutFeedPostInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostUncheckedCreateWithoutUserInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutFeedPostInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostCreateOrConnectWithoutUserInput = {
    where: FeedPostWhereUniqueInput
    create: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput>
  }

  export type FeedPostCreateManyUserInputEnvelope = {
    data: FeedPostCreateManyUserInput | FeedPostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedPostLikeCreateWithoutUserInput = {
    id?: string
    feedPost: FeedPostCreateNestedOneWithoutFeedPostLikeInput
  }

  export type FeedPostLikeUncheckedCreateWithoutUserInput = {
    id?: string
    feedPostId: string
  }

  export type FeedPostLikeCreateOrConnectWithoutUserInput = {
    where: FeedPostLikeWhereUniqueInput
    create: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput>
  }

  export type FeedPostLikeCreateManyUserInputEnvelope = {
    data: FeedPostLikeCreateManyUserInput | FeedPostLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedPostCommentCreateWithoutUserInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    feedPost: FeedPostCreateNestedOneWithoutFeedPostCommentInput
  }

  export type FeedPostCommentUncheckedCreateWithoutUserInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    feedPostId: string
  }

  export type FeedPostCommentCreateOrConnectWithoutUserInput = {
    where: FeedPostCommentWhereUniqueInput
    create: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput>
  }

  export type FeedPostCommentCreateManyUserInputEnvelope = {
    data: FeedPostCommentCreateManyUserInput | FeedPostCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SocialUpsertWithWhereUniqueWithoutUserInput = {
    where: SocialWhereUniqueInput
    update: XOR<SocialUpdateWithoutUserInput, SocialUncheckedUpdateWithoutUserInput>
    create: XOR<SocialCreateWithoutUserInput, SocialUncheckedCreateWithoutUserInput>
  }

  export type SocialUpdateWithWhereUniqueWithoutUserInput = {
    where: SocialWhereUniqueInput
    data: XOR<SocialUpdateWithoutUserInput, SocialUncheckedUpdateWithoutUserInput>
  }

  export type SocialUpdateManyWithWhereWithoutUserInput = {
    where: SocialScalarWhereInput
    data: XOR<SocialUpdateManyMutationInput, SocialUncheckedUpdateManyWithoutUserInput>
  }

  export type SocialScalarWhereInput = {
    AND?: SocialScalarWhereInput | SocialScalarWhereInput[]
    OR?: SocialScalarWhereInput[]
    NOT?: SocialScalarWhereInput | SocialScalarWhereInput[]
    id?: IntFilter<"Social"> | number
    url?: StringFilter<"Social"> | string
    userId?: StringFilter<"Social"> | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowerInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowerInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    id?: IntFilter<"Follow"> | number
    followerId?: StringFilter<"Follow"> | string
    followingId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowingInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowingInput>
  }

  export type CollectionUpsertWithWhereUniqueWithoutUserInput = {
    where: CollectionWhereUniqueInput
    update: XOR<CollectionUpdateWithoutUserInput, CollectionUncheckedUpdateWithoutUserInput>
    create: XOR<CollectionCreateWithoutUserInput, CollectionUncheckedCreateWithoutUserInput>
  }

  export type CollectionUpdateWithWhereUniqueWithoutUserInput = {
    where: CollectionWhereUniqueInput
    data: XOR<CollectionUpdateWithoutUserInput, CollectionUncheckedUpdateWithoutUserInput>
  }

  export type CollectionUpdateManyWithWhereWithoutUserInput = {
    where: CollectionScalarWhereInput
    data: XOR<CollectionUpdateManyMutationInput, CollectionUncheckedUpdateManyWithoutUserInput>
  }

  export type CollectionScalarWhereInput = {
    AND?: CollectionScalarWhereInput | CollectionScalarWhereInput[]
    OR?: CollectionScalarWhereInput[]
    NOT?: CollectionScalarWhereInput | CollectionScalarWhereInput[]
    id?: StringFilter<"Collection"> | string
    title?: StringFilter<"Collection"> | string
    description?: StringFilter<"Collection"> | string
    tags?: StringFilter<"Collection"> | string
    coverImage?: StringFilter<"Collection"> | string
    userId?: StringFilter<"Collection"> | string
    createdAt?: DateTimeFilter<"Collection"> | Date | string
    updatedAt?: DateTimeFilter<"Collection"> | Date | string
  }

  export type FeedPostUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedPostWhereUniqueInput
    update: XOR<FeedPostUpdateWithoutUserInput, FeedPostUncheckedUpdateWithoutUserInput>
    create: XOR<FeedPostCreateWithoutUserInput, FeedPostUncheckedCreateWithoutUserInput>
  }

  export type FeedPostUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedPostWhereUniqueInput
    data: XOR<FeedPostUpdateWithoutUserInput, FeedPostUncheckedUpdateWithoutUserInput>
  }

  export type FeedPostUpdateManyWithWhereWithoutUserInput = {
    where: FeedPostScalarWhereInput
    data: XOR<FeedPostUpdateManyMutationInput, FeedPostUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedPostScalarWhereInput = {
    AND?: FeedPostScalarWhereInput | FeedPostScalarWhereInput[]
    OR?: FeedPostScalarWhereInput[]
    NOT?: FeedPostScalarWhereInput | FeedPostScalarWhereInput[]
    id?: StringFilter<"FeedPost"> | string
    image?: StringNullableFilter<"FeedPost"> | string | null
    caption?: StringNullableFilter<"FeedPost"> | string | null
    isPremium?: BoolFilter<"FeedPost"> | boolean
    userId?: StringFilter<"FeedPost"> | string
    createdAt?: DateTimeFilter<"FeedPost"> | Date | string
  }

  export type FeedPostLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedPostLikeWhereUniqueInput
    update: XOR<FeedPostLikeUpdateWithoutUserInput, FeedPostLikeUncheckedUpdateWithoutUserInput>
    create: XOR<FeedPostLikeCreateWithoutUserInput, FeedPostLikeUncheckedCreateWithoutUserInput>
  }

  export type FeedPostLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedPostLikeWhereUniqueInput
    data: XOR<FeedPostLikeUpdateWithoutUserInput, FeedPostLikeUncheckedUpdateWithoutUserInput>
  }

  export type FeedPostLikeUpdateManyWithWhereWithoutUserInput = {
    where: FeedPostLikeScalarWhereInput
    data: XOR<FeedPostLikeUpdateManyMutationInput, FeedPostLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedPostLikeScalarWhereInput = {
    AND?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
    OR?: FeedPostLikeScalarWhereInput[]
    NOT?: FeedPostLikeScalarWhereInput | FeedPostLikeScalarWhereInput[]
    id?: StringFilter<"FeedPostLike"> | string
    userId?: StringFilter<"FeedPostLike"> | string
    feedPostId?: StringFilter<"FeedPostLike"> | string
  }

  export type FeedPostCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedPostCommentWhereUniqueInput
    update: XOR<FeedPostCommentUpdateWithoutUserInput, FeedPostCommentUncheckedUpdateWithoutUserInput>
    create: XOR<FeedPostCommentCreateWithoutUserInput, FeedPostCommentUncheckedCreateWithoutUserInput>
  }

  export type FeedPostCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedPostCommentWhereUniqueInput
    data: XOR<FeedPostCommentUpdateWithoutUserInput, FeedPostCommentUncheckedUpdateWithoutUserInput>
  }

  export type FeedPostCommentUpdateManyWithWhereWithoutUserInput = {
    where: FeedPostCommentScalarWhereInput
    data: XOR<FeedPostCommentUpdateManyMutationInput, FeedPostCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedPostCommentScalarWhereInput = {
    AND?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
    OR?: FeedPostCommentScalarWhereInput[]
    NOT?: FeedPostCommentScalarWhereInput | FeedPostCommentScalarWhereInput[]
    id?: StringFilter<"FeedPostComment"> | string
    comment?: StringFilter<"FeedPostComment"> | string
    createdAt?: DateTimeFilter<"FeedPostComment"> | Date | string
    userId?: StringFilter<"FeedPostComment"> | string
    feedPostId?: StringFilter<"FeedPostComment"> | string
  }

  export type UserCreateWithoutFollowersInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSocialsInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocialsInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSocialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSocialsInput, UserUncheckedCreateWithoutSocialsInput>
  }

  export type UserUpsertWithoutSocialsInput = {
    update: XOR<UserUpdateWithoutSocialsInput, UserUncheckedUpdateWithoutSocialsInput>
    create: XOR<UserCreateWithoutSocialsInput, UserUncheckedCreateWithoutSocialsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSocialsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSocialsInput, UserUncheckedUpdateWithoutSocialsInput>
  }

  export type UserUpdateWithoutSocialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCollectionInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCollectionInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCollectionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCollectionInput, UserUncheckedCreateWithoutCollectionInput>
  }

  export type UserUpsertWithoutCollectionInput = {
    update: XOR<UserUpdateWithoutCollectionInput, UserUncheckedUpdateWithoutCollectionInput>
    create: XOR<UserCreateWithoutCollectionInput, UserUncheckedCreateWithoutCollectionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCollectionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCollectionInput, UserUncheckedUpdateWithoutCollectionInput>
  }

  export type UserUpdateWithoutCollectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCollectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFeedPostInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeedPostInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeedPostInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedPostInput, UserUncheckedCreateWithoutFeedPostInput>
  }

  export type FeedPostCommentCreateWithoutFeedPostInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedPostCommentInput
  }

  export type FeedPostCommentUncheckedCreateWithoutFeedPostInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    userId: string
  }

  export type FeedPostCommentCreateOrConnectWithoutFeedPostInput = {
    where: FeedPostCommentWhereUniqueInput
    create: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput>
  }

  export type FeedPostCommentCreateManyFeedPostInputEnvelope = {
    data: FeedPostCommentCreateManyFeedPostInput | FeedPostCommentCreateManyFeedPostInput[]
    skipDuplicates?: boolean
  }

  export type FeedPostLikeCreateWithoutFeedPostInput = {
    id?: string
    user: UserCreateNestedOneWithoutFeedPostLikeInput
  }

  export type FeedPostLikeUncheckedCreateWithoutFeedPostInput = {
    id?: string
    userId: string
  }

  export type FeedPostLikeCreateOrConnectWithoutFeedPostInput = {
    where: FeedPostLikeWhereUniqueInput
    create: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput>
  }

  export type FeedPostLikeCreateManyFeedPostInputEnvelope = {
    data: FeedPostLikeCreateManyFeedPostInput | FeedPostLikeCreateManyFeedPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFeedPostInput = {
    update: XOR<UserUpdateWithoutFeedPostInput, UserUncheckedUpdateWithoutFeedPostInput>
    create: XOR<UserCreateWithoutFeedPostInput, UserUncheckedCreateWithoutFeedPostInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedPostInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedPostInput, UserUncheckedUpdateWithoutFeedPostInput>
  }

  export type UserUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FeedPostCommentUpsertWithWhereUniqueWithoutFeedPostInput = {
    where: FeedPostCommentWhereUniqueInput
    update: XOR<FeedPostCommentUpdateWithoutFeedPostInput, FeedPostCommentUncheckedUpdateWithoutFeedPostInput>
    create: XOR<FeedPostCommentCreateWithoutFeedPostInput, FeedPostCommentUncheckedCreateWithoutFeedPostInput>
  }

  export type FeedPostCommentUpdateWithWhereUniqueWithoutFeedPostInput = {
    where: FeedPostCommentWhereUniqueInput
    data: XOR<FeedPostCommentUpdateWithoutFeedPostInput, FeedPostCommentUncheckedUpdateWithoutFeedPostInput>
  }

  export type FeedPostCommentUpdateManyWithWhereWithoutFeedPostInput = {
    where: FeedPostCommentScalarWhereInput
    data: XOR<FeedPostCommentUpdateManyMutationInput, FeedPostCommentUncheckedUpdateManyWithoutFeedPostInput>
  }

  export type FeedPostLikeUpsertWithWhereUniqueWithoutFeedPostInput = {
    where: FeedPostLikeWhereUniqueInput
    update: XOR<FeedPostLikeUpdateWithoutFeedPostInput, FeedPostLikeUncheckedUpdateWithoutFeedPostInput>
    create: XOR<FeedPostLikeCreateWithoutFeedPostInput, FeedPostLikeUncheckedCreateWithoutFeedPostInput>
  }

  export type FeedPostLikeUpdateWithWhereUniqueWithoutFeedPostInput = {
    where: FeedPostLikeWhereUniqueInput
    data: XOR<FeedPostLikeUpdateWithoutFeedPostInput, FeedPostLikeUncheckedUpdateWithoutFeedPostInput>
  }

  export type FeedPostLikeUpdateManyWithWhereWithoutFeedPostInput = {
    where: FeedPostLikeScalarWhereInput
    data: XOR<FeedPostLikeUpdateManyMutationInput, FeedPostLikeUncheckedUpdateManyWithoutFeedPostInput>
  }

  export type UserCreateWithoutFeedPostCommentInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeedPostCommentInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeedPostCommentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedPostCommentInput, UserUncheckedCreateWithoutFeedPostCommentInput>
  }

  export type FeedPostCreateWithoutFeedPostCommentInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedPostInput
    FeedPostLike?: FeedPostLikeCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostUncheckedCreateWithoutFeedPostCommentInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    userId: string
    createdAt?: Date | string
    FeedPostLike?: FeedPostLikeUncheckedCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostCreateOrConnectWithoutFeedPostCommentInput = {
    where: FeedPostWhereUniqueInput
    create: XOR<FeedPostCreateWithoutFeedPostCommentInput, FeedPostUncheckedCreateWithoutFeedPostCommentInput>
  }

  export type UserUpsertWithoutFeedPostCommentInput = {
    update: XOR<UserUpdateWithoutFeedPostCommentInput, UserUncheckedUpdateWithoutFeedPostCommentInput>
    create: XOR<UserCreateWithoutFeedPostCommentInput, UserUncheckedCreateWithoutFeedPostCommentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedPostCommentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedPostCommentInput, UserUncheckedUpdateWithoutFeedPostCommentInput>
  }

  export type UserUpdateWithoutFeedPostCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedPostCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FeedPostUpsertWithoutFeedPostCommentInput = {
    update: XOR<FeedPostUpdateWithoutFeedPostCommentInput, FeedPostUncheckedUpdateWithoutFeedPostCommentInput>
    create: XOR<FeedPostCreateWithoutFeedPostCommentInput, FeedPostUncheckedCreateWithoutFeedPostCommentInput>
    where?: FeedPostWhereInput
  }

  export type FeedPostUpdateToOneWithWhereWithoutFeedPostCommentInput = {
    where?: FeedPostWhereInput
    data: XOR<FeedPostUpdateWithoutFeedPostCommentInput, FeedPostUncheckedUpdateWithoutFeedPostCommentInput>
  }

  export type FeedPostUpdateWithoutFeedPostCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedPostNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostUncheckedUpdateWithoutFeedPostCommentInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutFeedPostNestedInput
  }

  export type UserCreateWithoutFeedPostLikeInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowerInput
    following?: FollowCreateNestedManyWithoutFollowingInput
    Collection?: CollectionCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeedPostLikeInput = {
    id?: string
    address: string
    name?: string | null
    username: string
    email?: string | null
    website?: string | null
    avatar?: string
    bio?: string | null
    coverImage?: string
    language?: string
    timezone?: string
    accountType?: $Enums.AccountType
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socials?: SocialUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    Collection?: CollectionUncheckedCreateNestedManyWithoutUserInput
    FeedPost?: FeedPostUncheckedCreateNestedManyWithoutUserInput
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeedPostLikeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedPostLikeInput, UserUncheckedCreateWithoutFeedPostLikeInput>
  }

  export type FeedPostCreateWithoutFeedPostLikeInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFeedPostInput
    FeedPostComment?: FeedPostCommentCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostUncheckedCreateWithoutFeedPostLikeInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    userId: string
    createdAt?: Date | string
    FeedPostComment?: FeedPostCommentUncheckedCreateNestedManyWithoutFeedPostInput
  }

  export type FeedPostCreateOrConnectWithoutFeedPostLikeInput = {
    where: FeedPostWhereUniqueInput
    create: XOR<FeedPostCreateWithoutFeedPostLikeInput, FeedPostUncheckedCreateWithoutFeedPostLikeInput>
  }

  export type UserUpsertWithoutFeedPostLikeInput = {
    update: XOR<UserUpdateWithoutFeedPostLikeInput, UserUncheckedUpdateWithoutFeedPostLikeInput>
    create: XOR<UserCreateWithoutFeedPostLikeInput, UserUncheckedCreateWithoutFeedPostLikeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedPostLikeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedPostLikeInput, UserUncheckedUpdateWithoutFeedPostLikeInput>
  }

  export type UserUpdateWithoutFeedPostLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowerNestedInput
    following?: FollowUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedPostLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socials?: SocialUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    Collection?: CollectionUncheckedUpdateManyWithoutUserNestedInput
    FeedPost?: FeedPostUncheckedUpdateManyWithoutUserNestedInput
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FeedPostUpsertWithoutFeedPostLikeInput = {
    update: XOR<FeedPostUpdateWithoutFeedPostLikeInput, FeedPostUncheckedUpdateWithoutFeedPostLikeInput>
    create: XOR<FeedPostCreateWithoutFeedPostLikeInput, FeedPostUncheckedCreateWithoutFeedPostLikeInput>
    where?: FeedPostWhereInput
  }

  export type FeedPostUpdateToOneWithWhereWithoutFeedPostLikeInput = {
    where?: FeedPostWhereInput
    data: XOR<FeedPostUpdateWithoutFeedPostLikeInput, FeedPostUncheckedUpdateWithoutFeedPostLikeInput>
  }

  export type FeedPostUpdateWithoutFeedPostLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedPostNestedInput
    FeedPostComment?: FeedPostCommentUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostUncheckedUpdateWithoutFeedPostLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutFeedPostNestedInput
  }

  export type SocialCreateManyUserInput = {
    id?: number
    url: string
  }

  export type FollowCreateManyFollowerInput = {
    id?: number
    followingId: string
    createdAt?: Date | string
  }

  export type FollowCreateManyFollowingInput = {
    id?: number
    followerId: string
    createdAt?: Date | string
  }

  export type CollectionCreateManyUserInput = {
    id?: string
    title: string
    description: string
    tags: string
    coverImage?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedPostCreateManyUserInput = {
    id?: string
    image?: string | null
    caption?: string | null
    isPremium?: boolean
    createdAt?: Date | string
  }

  export type FeedPostLikeCreateManyUserInput = {
    id?: string
    feedPostId: string
  }

  export type FeedPostCommentCreateManyUserInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    feedPostId: string
  }

  export type SocialUpdateWithoutUserInput = {
    url?: StringFieldUpdateOperationsInput | string
  }

  export type SocialUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
  }

  export type SocialUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
  }

  export type FollowUpdateWithoutFollowerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowerInput = {
    id?: IntFieldUpdateOperationsInput | number
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowerInput = {
    id?: IntFieldUpdateOperationsInput | number
    followingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowingInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    coverImage?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FeedPostComment?: FeedPostCommentUpdateManyWithoutFeedPostNestedInput
    FeedPostLike?: FeedPostLikeUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FeedPostComment?: FeedPostCommentUncheckedUpdateManyWithoutFeedPostNestedInput
    FeedPostLike?: FeedPostLikeUncheckedUpdateManyWithoutFeedPostNestedInput
  }

  export type FeedPostUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedPostLikeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedPost?: FeedPostUpdateOneRequiredWithoutFeedPostLikeNestedInput
  }

  export type FeedPostLikeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostCommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedPost?: FeedPostUpdateOneRequiredWithoutFeedPostCommentNestedInput
  }

  export type FeedPostCommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostCommentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedPostId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostCommentCreateManyFeedPostInput = {
    id?: string
    comment: string
    createdAt?: Date | string
    userId: string
  }

  export type FeedPostLikeCreateManyFeedPostInput = {
    id?: string
    userId: string
  }

  export type FeedPostCommentUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedPostCommentNestedInput
  }

  export type FeedPostCommentUncheckedUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostCommentUncheckedUpdateManyWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFeedPostLikeNestedInput
  }

  export type FeedPostLikeUncheckedUpdateWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedPostLikeUncheckedUpdateManyWithoutFeedPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
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