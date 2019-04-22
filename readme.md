<p align="center">
  <img src="./crates.jpg">
</p>

# Crates

Crates is a library that allows you to generate internationalization's files for any language you need using only a command.

It's perfect for sites that need to be translated into another language, you only need to call the **crates'** function adding the desired words and then execute the CLI command.

The **crates'** function is used as a marker for the library and just returns the string passed as an argument.

## Install

With npm:

```bash
$ npm install --save crates
```

With Yarn:

```bash
$ yarn add crates
```

## How it works

First, you need to check which words you want to translate and then you can use the crates' function like in the code below:

```es6
import _ from 'crates'

console.log(_('Hello World'))
```

If you run this code, it will print:

```bash
$ node code.js
Hello World
```

That means the function by itself don't do anything, only returns its first argument.

But, after executing the CLI as shown below:

```bash
$ npx crates create --lang 'es,pt' --glob '**/*.js'
```

The library will create the `internationalization` files into the `/translations` directory.

```bash
$ l translations
total 32
drwxr-xr-x  6 danieloliveira  staff   192B Feb 22 08:35 .
drwxr-xr-x  7 danieloliveira  staff   224B Feb 20 21:56 ..
-rw-r--r--  1 danieloliveira  staff   154B Feb 22 08:35 translation.es.json
-rw-r--r--  1 danieloliveira  staff   129B Feb 22 08:35 translation.pt.json

$ cat translations/translation.es.json
{
	"Hello World": "Hello World"
}
```

These files are compatible with those plugins:

| Plugin                  | Link                                                             |
| ----------------------- | ---------------------------------------------------------------- |
| **i18next**             | [Github](https://github.com/i18next/i18next)                     |
| **i18n-webpack-plugin** | [Github](https://github.com/webpack-contrib/i18n-webpack-plugin) |
| **rollup-plugin-i18n**  | [Github](https://github.com/phamtm/rollup-plugin-i18n)           |
| **gulp-i18n**           | [Github](https://github.com/ciclo-pe/gulp-i18n)                  |

If you know some another plugin, please, let me know.

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -m 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :)

or

**Feel free to open an issue.**

## License

The MIT License (MIT)

Copyright (c) 2018 Daniel Leite de Oliveira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
