# csv-to-xml

Script for converting pgAdmin csv dumps into DbUtils xml.

#### Usage

1. Download `.csv` dump from pgAdmin and save it into script directory.
2. Execute following command from script directory:

```
$ node app <fileName> <xml_key> <first_index> <number_of_results>
```

#### Command line arguments

| Argument            | Definition                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| <fileName>          | name of the dump file, e.g. `data.csv`                                                          |
| <xml_key>           | name of the database table, e.g. `user_project`. Generated xml objects will have this as a key. |
| <first_index>       | number of starting row in dump file; counting starts from zero.                                 |
| <number_of_results> | number of rows, that will be processed.                                                         |
