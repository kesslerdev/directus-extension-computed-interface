[![npm version](https://badge.fury.io/js/directus-extension-formula-interface.svg)](https://badge.fury.io/js/directus-extension-formula-interface)

# Introduction
A [Directus](https://github.com/directus/directus) extension for automatically calculating the value of a field based on other fields of the same item, on the client side.

- **Support templating, arithmetic operations**. Concat strings, sum, subtract, multiply, modulo, convert to slug, currency, etc.
- **Can be used as an alias field**.
- **Calculation is performed on the client side**, so it would not work if the item is created/updated via direct API calls or hooks.
- **Powerfull**, uses mathjs under the hood.

![](./screenshots/screenshot1.jpeg)
![](./screenshots/screenshot2.jpeg)

# Installation
```
npm i directus-extension-formula-interface
```

# Get Started
1. Go to **Settings**, create a new field with type string or number.
2. In the **Interface** panel, choose **Formula** interface. There are 2 options:
    1. **Formula**: Determine how the field is calculated. Learn more about syntax in the next section.
    2. **Field Mode**: Choose how the value is displayed.
        - **null**: Default option. Show an input with the computed value but still allow manual editing.
        - **Display Only**: Show the computed value but will not save it to the database. Usually used for alias fields.
        - **Read Only**: Show an input with the computed value and disallow manual editing.
    3. **Prefix**: a string to prefix the computed value.
    4. **Suffix**: a string to suffix the computed value.
    5. **Custom CSS**: an object for inline style binding. Only works with **Display Only** and **Read Only** mode. You can use this option to customize the appearance of the computed value such as font size, color, etc.

# Syntax

this extension is based on mathjs, see ther [Expression Syntax documentation](https://mathjs.org/docs/expressions/syntax.html)

you can also see [mathjs defined Constants](https://mathjs.org/docs/reference/constants.html)

## Examples
Sum 2 numbers:
```
a + b
```

Multiply 2 numbers:
```
a * b
```

Convert string to slug:
```
toSlug(title)
```

Text interpolation:
```
concat('/', toSlug(title), '-', id )
```

Complex calculation:
```
2 * x + b
```

## Additional operators

### Format

Operator | Description
--- | ---
`toSlug(a)` | transform string to slug (e.g. "This is a title" &#8594; "this-is-a-title")

### Relational

Operator | Description
--- | ---
`aSum(a, b)` | Aggregated sum of O2M field. For example: calculate shopping cart total price with `ASUM(products, price * quantity)` where `products` is the O2M field in the shopping cart and `price` & `quantity` are 2 fields of `products`.

## Dynamic Variables

There are dynamic variables available that you can use in the expressions:
- `$CURRENT_USER`: return the current user's id. Example: `$CURRENT_USER.id == user` checks if the `user` field is the current user.
- `$PARENTS`: return an object containing potential parents (for using it in a repeated field) but with a limitation for extending fields, we have no reference to parent. For using it you should use the system name of the parent collection Ex for referencing the price of the "parent" collection named "machines" in a formula on a repeated field you can use `$PARENTS.machines.price` but take in care when change this value on parent collection is not updated in repeated fields, also this field is not auto evaluated.



# Limitation
- Cannot parse literal strings (`{{ 's' }}`).
