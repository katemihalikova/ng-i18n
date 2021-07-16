/** Named format for non-zoned pipes */
export type SimpleFormat = 'short' | 'medium' | 'long';
/** Named format for zoned pipes */
export type ZonedFormat = 'zonedShort' | 'zonedMedium' | 'zonedLong';
/** Named format for pipes */
export type SimpleOrZonedFormat = SimpleFormat | ZonedFormat;

/**
 * Helper type that wraps a type into an object with non-zoned named formats as keys
 * @template F Wrapped type
 */
export type IzTemporalFormatWrapper<F> = Record<SimpleFormat, F>;

/**
 * Helper type that wraps a type into an object with both non-zoned and zoned named formats as keys
 * @template F Wrapped type used for non-zoned keys
 * @template ZF Wrapped type used for zoned keys
 */
export type IzTemporalZonedFormatWrapper<F, ZF> = IzTemporalFormatWrapper<F> & Record<ZonedFormat, ZF>;
