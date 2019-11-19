# csv-to-xml

Tool for converting pgAdmin CSV dumps into DbUtils XML.

### Usage

1. Download `.csv` dump from pgAdmin and save it into `data/` directory:
   ![pgAdmin save as CSV](https://image.prntscr.com/image/t4AFYGlBSHCr52ubyWgGWQ.png 'pgAdmin save as CSV')
2. Execute following command from script directory(cmd/linux shell):

```
$ node app <file_name>
```

### Command line arguments

| Argument    | Definition                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| <file_name> | name of the csv dump file **without** `.csv` extension, e.g. `user_project` Generated xml objects will have this as a key. |

After successful execution of the script generated XML will be displayed as terminal output and saved into `output/output.xml` file.

![terminal output](https://image.prntscr.com/image/IZleOzE1RY6Oo9tFK6k65g.png 'terminal output')

![file output](https://image.prntscr.com/image/SY3wtFy3QbenVCpFreXqIg.png 'file output')
