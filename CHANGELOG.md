# Changelog

## [1.1.0](https://github.com/MuriloSergioDev/shopwise-contracts/compare/v1.0.0...v1.1.0) (2026-10-27)


### Features

* close the open P3/P4 contract gaps ([3c662c9](https://github.com/MuriloSergioDev/shopwise-contracts/commit/3c662c95f0faaf3451a457f50f29b81449373afd))

## 1.0.0 (2026-10-27)


### Features

* **catalog:** product-published and variant-changed events and catalog API ([53f49a8](https://github.com/MuriloSergioDev/shopwise-contracts/commit/53f49a804cb77c1168704363e00e59c365f4d01d))
* **identity:** customer-registered event and identity API ([25cebdf](https://github.com/MuriloSergioDev/shopwise-contracts/commit/25cebdf560a92ec318bb6313e1fc19c059cb5281))
* **p3:** checkout saga commands, inventory/payments/orders/checkout/cart events and APIs ([c912dd5](https://github.com/MuriloSergioDev/shopwise-contracts/commit/c912dd58f0e2a1e82ed7f1e43452888307f0826d))
* **pricing,cart:** price-changed event and pricing + cart APIs ([cba4cfd](https://github.com/MuriloSergioDev/shopwise-contracts/commit/cba4cfde46265e0eb74bdcb42ee510e5429dc8bd))


### Bug Fixes

* **catalog:** carry variant options as a name/value list in events ([f9b2cc3](https://github.com/MuriloSergioDev/shopwise-contracts/commit/f9b2cc323de03b3f056551dd160bf061bf9085e6))
* **ci:** grant pull-requests read to the hygiene job ([783a4a8](https://github.com/MuriloSergioDev/shopwise-contracts/commit/783a4a8294af7ee182610350bf2dc141f759cae0))
* **generator:** generate nullable PHP types for required fields that may be null ([e5c41d6](https://github.com/MuriloSergioDev/shopwise-contracts/commit/e5c41d62cc55d3e8c6dc2dd4cb774ece050dec62))
* **pricing:** name the prices query parameter skus[] as Laravel expects ([f1a7b8e](https://github.com/MuriloSergioDev/shopwise-contracts/commit/f1a7b8ec2460aad4ecfa91d37ab8eaf8311622ac))
* run compat check with draft-07 since Apicurio rejects 2020-12 ([67c88f0](https://github.com/MuriloSergioDev/shopwise-contracts/commit/67c88f09e163b07bd0121c6d0d19b17704d295c8))
