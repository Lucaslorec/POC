/**
 * Types for the Airbnb Ranking API
 * Based on the API at https://api-airbnb.rebelinternet.eu/api/airbnb/v1/
 */

/**
 * Query parameters for tracking rankings
 */
export interface RankingQuery {
    /** Search location */
    location: string;

    /** Checkin date in format YYYY-MM-DD */
    checkin: string;

    /** Checkout date in format YYYY-MM-DD */
    checkout: string;

    /** Number of adults */
    adults?: number;

    /** Number of children */
    children?: number;

    /** Number of infants */
    infants?: number;

    /** Page number */
    page?: number;

    /** Number of results per page */
    pageSize?: number;

    /** Currency code (e.g., EUR, USD) */
    currency?: string;

    /** Sort by specified field */
    sortBy?: 'price' | 'rating' | 'position';

    /** Sort direction */
    sortDirection?: 'asc' | 'desc';
}

/**
 * Response when creating a new tracking query
 */
export interface QueryCreationResponse {
    /** Unique ID for the tracking query */
    id: string;

    /** Status of the tracking query */
    status: 'pending' | 'in_progress' | 'completed' | 'failed';

    /** Timestamp when the query was created */
    created_at: string;

    /** The query parameters */
    query: RankingQuery;
}

/**
 * Listing in search results
 */
export interface Listing {
    /** Listing ID */
    id: string;

    /** Listing name/title */
    name: string;

    /** Listing URL */
    url: string;

    /** Position in search results */
    position: number;

    /** Price information */
    price: {
        /** Rate amount */
        rate: number;

        /** Currency code */
        currency: string;

        /** Total price for stay */
        total: number;
    };

    /** Rating information */
    rating?: {
        /** Average rating (0-5) */
        average: number;

        /** Number of reviews */
        count: number;
    };

    /** Property details */
    details?: {
        /** Type of property */
        type: string;

        /** Number of bedrooms */
        bedrooms: number;

        /** Number of bathrooms */
        bathrooms: number;

        /** Maximum number of guests */
        maxGuests: number;
    };
}

/**
 * Query result with rankings
 */
export interface QueryResult {
    /** Query ID */
    id: string;

    /** Query status */
    status: 'pending' | 'in_progress' | 'completed' | 'failed';

    /** Original query parameters */
    query: RankingQuery;

    /** Timestamp when the query was created */
    created_at: string;

    /** Timestamp when the results were last updated */
    updated_at: string;

    /** List of property rankings */
    listings: Listing[];

    /** Pagination information */
    pagination?: {
        /** Current page number */
        page: number;

        /** Number of results per page */
        pageSize: number;

        /** Total number of results */
        total: number;

        /** Total number of pages */
        totalPages: number;
    };
}
