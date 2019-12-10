# jpl
Command line JSON parser, processor that takes plain JavaScript.

[![CircleCI](https://circleci.com/gh/woodb/jpl.svg?style=svg&circle-token=c2d2c82867fb765e51857638f1fc0c8be80bf490)](https://circleci.com/gh/woodb/jpl)

`jpl` is similar to `jq` in that it's a command line tool used to work with
JSON. `jpl` differs from `jq` in that it takes plain JavaScript code in order
to do any processing, reducing, filtering, etc.


## Installation
Note: `jpl` requires requires Node.js v8.0.0 or later.

`npm install -g jpl`


## Usage
```shell
$ jpl --help

  Usage: jpl [options]


  Options:

    -V, --version      output the version number
    -c, --code <code>  Function to execute to parse JSON
    -h, --help         output usage information
```


### Examples

#### Parse JSON and Format
If you're interested in just formatting some (valid) JSON, pipe the file to
`jpl`.

```shell
$ < example.json jpl
{
  "data": [
    {
      "foo": "bar",
      "bar": "foo"
    },
    {
      "foo": "foobar",
      "bar": "barfoo"
    },
    {
      "bar": "foo"
    }
  ]
}
```

#### Process parsed JSON with JavaScript function
Using the previous example's JSON file as the same input, we can also do some
work on the file by simply passing some JavaScript to `jpl` via the `-c` (or
`--code`) flag.

`jpl`'s `-c/--code` argument expects a function that takes one argument, which
will be the JSON Object.

```shell
$ < example.json jpl -c "({ data }) => data.filter(({ foo }) => foo)"
[
  {
    "foo": "bar",
    "bar": "foo"
  },
  {
    "foo": "foobar",
    "bar": "barfoo"
  }
]
```

You can also chain `jpl` calls like anything else:
```shell
$ < example.json jpl -c '({ data }) => data' \                                                                                                  <<<
  | jpl -c 'd => d.filter(({ foo }) => foo)' \
  | jpl -c 'd => `${d.length} array elements have a truthy "foo" key value`'
"2 array elements have a truthy \"foo\" key value"
```
