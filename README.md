# csv-to-xml

Script for converting pgAdmin CSV dumps into DbUtils XML.

### Usage

1. Download `.csv` dump from pgAdmin and save it into script directory.
   ![pgAdmin save as CSV](https://image.prntscr.com/image/t4AFYGlBSHCr52ubyWgGWQ.png 'pgAdmin save as CSV')
2. Execute following command from script directory(cmd/linux shell):

```
$ node app <file_name> <xml_key> <first_index> <number_of_results>
```

### Command line arguments

| Argument            | Definition                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| <file_name>         | name of the dump file, e.g. `data.csv`                                                          |
| <xml_key>           | name of the database table, e.g. `user_project`. Generated xml objects will have this as a key. |
| <first_index>       | number of starting row in dump file; counting starts from zero.                                 |
| <number_of_results> | number of rows, that will be processed.                                                         |

After succesful execution of the script generated XML will be displayed as terminal output and saved into `./output.xml` file.
![terminal output](https://image.prntscr.com/image/IZleOzE1RY6Oo9tFK6k65g.png 'terminal output')
![file output](https://image.prntscr.com/image/SY3wtFy3QbenVCpFreXqIg.png 'file output')
