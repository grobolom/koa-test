This contains simple scripts for running common commands. I prefer to use
this kind of structure over jamming most of these commands into package.json.
This structure has the following benefits:

* The `package.json` file can be relatively slim.
* You avoid any confusing nesting of commands, something that is common in complex
  `package.json` files.
* You keep the full power of `bash` for scripting, and can thus have more
  complex startup scripts.
* Via good script naming, you make it more clear how the app is _intended_ to be used.