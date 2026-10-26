// Generated from openapi/pricing.yaml. Do not edit.
export interface paths {
    "/api/prices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Current prices for up to 100 SKUs. SKUs without a price are left out of the result. */
        get: operations["listPrices"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/quotes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Prices a list of lines and an optional coupon with current prices. Read-only: nothing is stored and no coupon is redeemed. A line whose SKU has no price is returned with null amounts and does not count toward the subtotal. An invalid coupon does not fail the request: it comes back with valid=false and a reason. */
        post: operations["createQuote"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/prices/{sku}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Sets the price of a SKU. Records pricing.price-changed when the amount or currency changed. */
        put: operations["setPrice"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/coupons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["listCoupons"];
        put?: never;
        post: operations["createCoupon"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/coupons/{code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Deactivates a coupon. Quotes treat it as unknown afterwards. */
        delete: operations["deleteCoupon"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Price: {
            sku: string;
            /** @description Minor units. */
            amount: number;
            currency: string;
        };
        CouponInput: {
            /** @description Matched case-insensitively; stored uppercase. */
            code: string;
            description?: string;
            /** @enum {string} */
            type: "percent" | "fixed";
            /** @description Percent (1-100) for percent coupons, minor units for fixed ones. */
            value: number;
            /** @description Minor units the subtotal must reach. */
            minSubtotal?: number;
            /** Format: date-time */
            startsAt?: string | null;
            /** Format: date-time */
            endsAt?: string | null;
        };
        Coupon: components["schemas"]["CouponInput"] & {
            active: boolean;
            /** Format: date-time */
            createdAt: string;
        };
        Quote: {
            currency: string;
            lines: {
                sku: string;
                quantity: number;
                /** @description Null when the SKU has no price. */
                unitAmount: number | null;
                lineAmount: number | null;
            }[];
            /** @description Sum of priced lines. */
            subtotal: number;
            /** @description Never more than the subtotal. */
            discount: number;
            total: number;
            coupon: null | {
                code: string;
                valid: boolean;
                /**
                 * @description Why the coupon was not applied; null when valid.
                 * @enum {string|null}
                 */
                reason: "unknown" | "not_started" | "expired" | "min_subtotal_not_met" | null;
                description: string | null;
            };
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listPrices: {
        parameters: {
            query: {
                /** @description Repeated, e.g. skus[]=TEE-MER-BLK-M&skus[]=TEE-MER-BLK-L. */
                skus: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Prices of the requested SKUs that have one. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Price"][];
                    };
                };
            };
            /** @description Invalid query parameters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createQuote: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    lines: {
                        sku: string;
                        quantity: number;
                    }[];
                    couponCode?: string;
                };
            };
        };
        responses: {
            /** @description The priced lines and totals. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Quote"];
                    };
                };
            };
            /** @description Validation failed */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    setPrice: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sku: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    amount: number;
                    /** @enum {string} */
                    currency: "USD";
                };
            };
        };
        responses: {
            /** @description Price set. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Price"];
                    };
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an admin */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description SKU not known from catalog */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation failed */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listCoupons: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Every coupon, newest first. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Coupon"][];
                    };
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an admin */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createCoupon: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CouponInput"];
            };
        };
        responses: {
            /** @description Coupon created. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Coupon"];
                    };
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an admin */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation failed (including duplicate code) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteCoupon: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                code: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Deactivated */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an admin */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown coupon */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
