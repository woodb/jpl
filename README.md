# jpl
Command line JSON parser, processor


## Installation
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
```shell
$ < example.json | jpl
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
```shell
$ < example.json | jpl -c "({ data }) => data.filter(({ foo }) => foo)"
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
