// based on https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/

/** Wrapper for primitives to be able to distinguish between two different purposes */
export type Flavored<T, F extends string> = T & {_type?: F};
