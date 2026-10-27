// Generated from openapi/catalog.yaml. Do not edit.
export interface paths {
    "/api/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["listCategories"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Browse and full-text search over published products. Filters combine with AND. Facets are counted over the products matching every filter except their own, so a shopper can widen a filter they already set. */
        get: operations["searchProducts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/products/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["showProduct"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Every product, drafts included, newest first. For the admin; no facets. */
        get: operations["listAdminProducts"];
        put?: never;
        /** @description Creates a draft product. Records catalog.variant-changed for every variant. */
        post: operations["createProduct"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/products/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description One product in any status, with all its variants (inactive ones included). */
        get: operations["showAdminProduct"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/products/{id}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Makes a draft visible in the storefront. Records catalog.product-published. */
        post: operations["publishProduct"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/variants/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** @description Changes a variant. Records catalog.variant-changed with its full new state. */
        patch: operations["updateVariant"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Option name to value, e.g. {"color": "Black", "size": "M"}. Names are lowercase. */
        Options: {
            [key: string]: string;
        };
        Image: {
            /** Format: uri */
            url: string;
            alt: string;
        };
        CategoryRef: {
            id: string;
            slug: string;
            name: string;
        };
        Category: {
            id: string;
            slug: string;
            name: string;
            parentId: string | null;
        };
        Variant: {
            id: string;
            sku: string;
            name: string;
            options: components["schemas"]["Options"];
            active: boolean;
        };
        ProductSummary: {
            id: string;
            slug: string;
            name: string;
            category: components["schemas"]["CategoryRef"];
            image: components["schemas"]["Image"] | null;
        };
        AdminProductSummary: components["schemas"]["ProductSummary"] & {
            /** @enum {string} */
            status: "draft" | "published";
            /** Format: date-time */
            publishedAt: string | null;
            variantCount: number;
            activeVariantCount: number;
            /** Format: date-time */
            updatedAt: string;
        };
        Product: {
            id: string;
            slug: string;
            name: string;
            description: string;
            category: components["schemas"]["CategoryRef"];
            images: components["schemas"]["Image"][];
            /** @description Public endpoints list active variants only; admin endpoints list all of them. */
            variants: components["schemas"]["Variant"][];
            /** @enum {string} */
            status: "draft" | "published";
            /** Format: date-time */
            publishedAt: string | null;
        };
        PageMeta: {
            page: number;
            perPage: number;
            total: number;
            lastPage: number;
        };
        Facets: {
            categories: {
                slug: string;
                name: string;
                count: number;
            }[];
            options: {
                name: string;
                values: {
                    value: string;
                    count: number;
                }[];
            }[];
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
    listCategories: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Every category, ordered by name. Build the tree from parentId. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Category"][];
                    };
                };
            };
        };
    };
    searchProducts: {
        parameters: {
            query?: {
                /** @description Full-text query over name and description. */
                q?: string;
                /** @description Category slug; includes its child categories. */
                category?: string;
                /** @description Variant option filter, e.g. options[color]=Black&options[size]=M. A product matches when one active variant has the value. */
                options?: {
                    [key: string]: string;
                };
                page?: number;
                perPage?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One page of products, best match first when q is set, newest first otherwise. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["ProductSummary"][];
                        meta: components["schemas"]["PageMeta"];
                        facets: components["schemas"]["Facets"];
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
    showProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A published product with its active variants. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Product"];
                    };
                };
            };
            /** @description No published product with that slug */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listAdminProducts: {
        parameters: {
            query?: {
                /** @description Matches name */
                q?: string;
                status?: "draft" | "published";
                /** @description Category slug; includes its child categories. */
                category?: string;
                page?: number;
                perPage?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description One page of products. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["AdminProductSummary"][];
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
            /** @description Invalid query parameters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createProduct: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    /** @description Defaults to the slugged name. */
                    slug?: string;
                    description?: string;
                    categoryId: string;
                    images?: components["schemas"]["Image"][];
                    variants: {
                        sku: string;
                        name: string;
                        options?: components["schemas"]["Options"];
                    }[];
                };
            };
        };
        responses: {
            /** @description Draft created. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Product"];
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
            /** @description Validation failed (including duplicate slug or SKU) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    showAdminProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The product. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Product"];
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
            /** @description Unknown product */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    publishProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Published. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Product"];
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
            /** @description Unknown product */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already published */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateVariant: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    options?: components["schemas"]["Options"];
                    active?: boolean;
                };
            };
        };
        responses: {
            /** @description Updated. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Variant"];
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
            /** @description Unknown variant */
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
