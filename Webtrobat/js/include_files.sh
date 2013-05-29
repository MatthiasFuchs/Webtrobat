#!/bin/bash

echo "" > all.js
cat include_list.txt | while read LINE ; do
    cat $LINE >> all.js
    echo "" >> all.js
done
