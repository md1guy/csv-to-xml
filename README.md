# csv-to-xml

Script for converting pgAdmin CSV dumps into DbUtils XML.

### Usage

1. Download `.csv` dump from pgAdmin and save it into `data/` directory:
   ![pgAdmin save as CSV](https://image.prntscr.com/image/t4AFYGlBSHCr52ubyWgGWQ.png 'pgAdmin save as CSV')
2. Execute following command from script directory(cmd/linux shell):

```
$ node app <file_name> <xml_key> <first_index> <number_of_results>
```

### Command line arguments

| Argument            | Definition                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| <file_name>         | name of the dump file, e.g. `data.csv`                                                            |
| <xml_key>           | name of the database table, e.g. `user_project`. Generated xml objects will have this as a key.   |
| <first_index>       | Optional number of starting row in dump file; default value is `0`.                               |
| <number_of_results> | Optional number of rows that will be processed; `<first_index>` is required to use this argument. |

After successful execution of the script generated XML will be displayed as terminal output and saved into `output/output.xml` file.

![terminal output](https://image.prntscr.com/image/IZleOzE1RY6Oo9tFK6k65g.png 'terminal output')

![file output](https://image.prntscr.com/image/SY3wtFy3QbenVCpFreXqIg.png 'file output')
