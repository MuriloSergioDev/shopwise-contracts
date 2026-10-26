// Generated from openapi/inventory.yaml. Do not edit.
export interface paths {
    "/api/stock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Availability for up to 100 SKUs, for product pages and the cart. Unknown SKUs are left out. */
        get: operations["listAvailability"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/stock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Every known SKU's stock, ordered by SKU. */
        get: operations["listStockLevels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/stock/{sku}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sku: string;
            };
            cookie?: never;
        };
        get: operations["getStockLevel"];
        /** @description Sets the on-hand quantity (a stock count, not a delta). Records inventory.stock-level-changed when it changed. */
        put: operations["setStockLevel"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Availability: {
            sku: string;
            /** @description Units that can still be reserved. */
            available: number;
            inStock: boolean;
        };
        StockLevel: {
            sku: string;
            /** @description Physically in stock */
            onHand: number;
            /** @description Held by open (not yet committed) reservations. */
            reserved: number;
            /** @description onHand - reserved. */
            available: number;
            /** Format: date-time */
            updatedAt: string;
        };
        Reservation: {
            id: string;
            checkoutId: string;
            /** @description Units of this SKU held. */
            quantity: number;
            /** @enum {string} */
            status: "held";
            /** Format: date-time */
            expiresAt: string;
        };
        PageMeta: {
            page: number;
            perPage: number;
            total: number;
            lastPage: number;
        };
    };
    responses: never;
    parameters: {
        Page: number;
        PerPage: number;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listAvailability: {
        parameters: {
            query: {
                /** @description Repeated, e.g. skus[]=TEE-MER-BLK-M&skus[]=TEE-MER-BLK-L. */
                "skus[]": string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Availability of the requested SKUs that inventory knows. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Availability"][];
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
    listStockLevels: {
        parameters: {
            query?: {
                /** @description SKU prefix. */
                q?: string;
                /** @description Only SKUs whose available stock is at or below this number. */
                lowStock?: number;
                page?: components["parameters"]["Page"];
                perPage?: components["parameters"]["PerPage"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A page of stock levels. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["StockLevel"][];
                        meta: components["schemas"]["PageMeta"];
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
    getStockLevel: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sku: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The SKU's stock and its open reservations. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["StockLevel"] & {
                            reservations: components["schemas"]["Reservation"][];
                        };
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
        };
    };
    setStockLevel: {
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
                    onHand: number;
                };
            };
        };
        responses: {
            /** @description Stock set. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["StockLevel"];
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
}
