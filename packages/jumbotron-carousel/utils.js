/**
 * External dependencies
 */

import memoize from 'memize';
import times from 'lodash/times';

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */

export const getCarouselBlockTemplate = memoize((blocks) => {
    return times(blocks, () => ['glutenblocks/carousel-block']);
});
