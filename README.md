# Copy Copy Paste README

![Logo](images/icon.png "Copy Copy Paste Logo")

Stores a history of your clipboard and make it available in a searchable quick menu.

## Features

* Paste previously copied text
* Search copied content
* Multi cursor copying
* Multi cursor pasting
* Core copy and paste work as normal

## Key bindings

* `ctrl+c / cmd+c`: Copy
* `ctrl+x / cmd+x`: Cut
* `shift+ctrl+v / shift+cmd+v`: Display clipboard history

## Commands

* `copy-copy-paste.copy`: Copy the selected text
* `copy-copy-paste.cut`: Cut the selected text
* `copy-copy-paste.history`: Display clipboard history
* `copy-copy-paste.clear`: Clear the clipboard history

## Settings

* Maximum number of items saved in history
```
`copy-copy-paste.size`: 25
```

* When you paste a block from the clipboard history, move it to top of the history
```
`copy-copy-paste.movePastedBlockToTop`: true
```

## TODO

* [ ] Tests
* [ ] Minimum copy size
* [ ] Maximum copy size
* [ ] Persist history across sessions
* [ ] Improve UI
* [ ] README images

## Release Notes

See [CHANGELOG.md]()
